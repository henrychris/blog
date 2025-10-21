---
title: 'Optimising an N+1 Query'
description: How I optimised an N+1 query in an endpoint at work.
date: '2025-10-21'
categories:
  - projects
  - backend
  - performance
published: true
---

<script>
	import TwitterEmbed from "$lib/components/TwitterEmbed.svelte";
</script>

At work, one of our API endpoints was taking 11 seconds to respond. This endpoint was responsible for fetching a list of customers, along with some related data.

The existing implementation fetched all customers and then, for each customer, made separate database calls to retrieve the other information we needed. This resulted in a significant performance hit, especially when dealing with a large number of customers.

## The Problem - A Cascade of DB queries

The existing implementation was straightforward but inefficient. It followed this pattern:

1. Fetch all customers with filters (1 query)
2. For each customer, make 2 additional queries
   - One to count their total orders
   - One to fetch all order details for aggregation

This is the "N+1" problem. For 100 customers, this resulted in _1 + (100 \* 2) = **201**_ database queries! The database round-trips alone were killing our performance.

```ts
async function getCustomers(): Customer[] {
	const customers = await Customer.find().sort({
		createdAt: -1
	});

	let data = await updateCustomer(customers);
	return reply.code(200).send(data);
}

async function updateCustomer(customers: Customer[]) {
	let result: any[] = [];

	if (!customers || customers.length === 0) {
		return [];
	}

	for (const customer of customers) {
		const totalOrders = await Order.countDocuments({ customerId: customer._id });
		const orderDetails = await Order.find({ customerId: customer._id });

		result.push({
			...customer.toObject(),
			totalOrders,
			orderDetails
		});
	}

	return result;
}
```

## The Solution - An Aggregation Pipeline

To solve this, I replaced the N+1 pattern with a single MongoDB aggregation pipeline. Rather than fetching data piece by piece, returning to the database for each step, this approach let the database do all the heavy lifting of joining and shaping the data in one pass.

In a nutshell:

1. **Aggregate, Don't Iterate:** Use $lookup to join the orders collection to the customers in a single query.
2. **Select Only The Fields Needed:** Use pipeline stages like $addFields and $project to compute counts and select only the fields needed by the frontend, reducing data transfer size.
3. **Use Indexes:** Ensure proper indexing on the fields used for joining (customerId in orders) and sorting (createdAt in customers).

```ts
async function aggregateCustomer(): Promise<GetAllCustomersResponse[]> {
	const result = await Customer.aggregate<GetAllCustomersResponse>([
		{
			$sort: {
				createdAt: -1
			}
		},
		{
			$lookup: {
				from: 'orders',
				let: { customerId: '$_id' },
				as: 'customerOrders'
			}
		},
		{
			$addFields: {
				totalOrders: { $size: '$customerOrders' }
			}
		},
		{
			$project: {
				_id: 1,
				firstName: 1,
				lastName: 1,
				email: 1,
				phone: 1,
				store: 1,
				location: 1,
				customerOrders: 1
			}
		}
	]);

	return result;
}
```

## Results

The impact was immediate.

- From 200+ queries → 1 aggregation query
- The P90 response time dropped from multiple seconds (maxing out around 11.7 seconds) to consistently under 1.6 seconds.

In the charts below, the new code (solid line) handles a spike in user load gracefully, while the old code (dotted line) quickly buckles under the pressure.

![](https://res.cloudinary.com/dit0zbles/image/upload/v1760997925/spike-new-code-old-limit_msfqse.png 'Spike test: new code (solid) maintains performance while old code (dotted) fails')

![](https://res.cloudinary.com/dit0zbles/image/upload/v1760997925/constant-load-default-limit-new-code_aobjep.png 'Sustained load: new code handles constant traffic with stable latency')

I used Postman's collection runner to test the endpoint.

## Key Takeaways and Lessons Learned

1. **Measure First, Optimise Second, Measure Again:** Never assume you know the bottleneck. Before I wrote a line of code, I measured the performance of the endpoint to pinpoint the problem. Then after making changes, I measured again to ensure my optimisations made a difference.

2. **Let the Database Handle It:** Pushing computation and aggregation down to the database is almost always more efficient than doing it in the application code.

3. **The Aggregation Pipeline is Your Friend:** While it has a learning curve, the aggregation pipeline is a powerful tool for complex queries.

4. **Think About the Data Shape:** The optimisation wasn't just about reducing query count. Using $project to send only necessary data over the wire provided a secondary performance boost.

Sometimes the simplest changes are the most effective.
