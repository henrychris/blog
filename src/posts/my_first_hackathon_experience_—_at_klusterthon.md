---
title: 'My First Hackathon Experience — at Klusterthon'
description: A personal account of my first hackathon experience at Klusterthon, where my team and I built a solution for simplifying small business payments.
date: '2023-11-29'
categories:
  - me
published: true
---

I decided to sign up for Klusterthon for two reasons:  
1\. I just finished NYSC, left my last role and have nothing better to do.  
2\. I wanted to test my skills as a backend developer.

**Klusterthon** was an event hosted by Stutern. It gathered over 6,000 tech professionals to tackle critical business challenges. Spanning seven days from Nov 20th to Nov 27th, this hackathon aimed to proffer solutions to pressing industry problems.

I was placed in a team with three others: _David Ishaya_, a UI/UX designer, _Sapna Jha_, a front-end developer, and one other. I’ll shed more light on that later. The organisers noticed that most teams had incomplete or incompatible groups, and allowed participants to switch teams. That’s how _Promise Nwafor_, another front-end developer, joined us.

I was drawn to the problem statement titled [Simplifying Small Business Payments](https://www.kluster.africa/problem-statements/simplifying-small-business-payments) due to my background in fintech, albeit nine months of experience, and a genuine interest in helping artisans and SMEs to quickly digitize their businesses. The goals of the product were to help business owners manage their clients and track payments. Luckily for me, my teammates had a similar interest.

In a nutshell, the application needed **three** main features:  
1\. Business owners should be able to create profiles for their clients.  
2\. Business owners should be able to issue invoices to their clients.  
3\. The platform should track these invoices and automatically issue reminders as necessary.

As the sole backend developer, I was to manage and develop the API powering the web application.

## The Product

### Dashboard

![](https://miro.medium.com/v2/resize:fit:700/1*kKKQ75JMY_f8nKCFYAeylA.png 'The SimpleBiz dashboard')

The dashboard was quite simple, just like the rest of the product. You’d get a rundown of the number of registered clients, the size of your product catalogue and the number of issued invoices.

### Clients

![](https://miro.medium.com/v2/resize:fit:700/1*4fvvuwKjW1mGbAmyNjDJfg.png 'The Client overview page')

A list of clients, and you can easily add a new one or edit the existing clients.

### Catalogue

![](https://miro.medium.com/v2/resize:fit:700/1*LeWH7yKpLMGnkk2-uc7OcQ.png 'An overview of the products available.')

To make it easier to issue the invoices, users could create a catalogue of their products and select from the list when generating an invoice.

### Invoices

![](https://miro.medium.com/v2/resize:fit:700/1*8eNCYSVE3DFtob3UEYJdRw.png 'A list of invoices.')

Invoices can be generated and are listed here. As mentioned above, you select the products from the catalog, and they are included in the total and sent along to the client.

![](https://miro.medium.com/v2/resize:fit:700/1*G2LSKdBxRGbALBtjEDLExg.png 'Selecting products from the catalog')

Once an invoice is generated, an initial email is sent to the client, with a link to pay off the invoice.

![](https://miro.medium.com/v2/resize:fit:700/1*Jb8CYlD9VZsXDrMFaejEtA.png 'An email with invoice information.')

![](https://miro.medium.com/v2/resize:fit:700/1*erHmxScpapvpds_hqifEUA.png 'A screen to pay off the invoice.')

### Missing Features

The hackathon lasted only a week, and we had to deal with some teammates vanishing. As such, we had to cut some out.

1.  **Wallet:** The wallet system was demo-ready, but there was no time to implement it in the front-end. I also forgot to add it to the Postman collection — a lot was going on 🤧. The plan was for payments to credit _SimpleBiz_ and then the user’s wallet. Users could then request a payout, and funds would be sent to their bank accounts. Easy as pie.
2.  **Custom Notifications:** The current notification setup uses [Hangfire](https://hangfire.io/) to schedule reminders. For short-term invoices, a reminder goes out the morning it’s due. While longer-term invoices might get notifications weekly. I planned to allow users to customise that setting, but, no time. I also had not thought up an inexpensive way to get it done.
3.  **Admin Dashboard:** I did not see the point of burning time on this for such a short project.

## The Development Process

### Tools

My stack is .NET. I used the following libraries and tools:  
1\. Azure Key Vault — to store secrets.  
2\. Azure Blob Storage — to store notification templates.  
3\. Docker  
4\. ErrorOr — I love being able to return errors **or** the actual value, instead of passing `null` around the application.  
5\. Fluent Validation  
6\. Hangfire — to create and schedule background jobs, specifically reminders.  
7\. MassTransit & RabbitMQ  
8\. Ngrok — to expose a local server to the internet.  
9\. PostgreSQL — the database of choice.  
10\. Postman — for API testing and documenting  
11\. Serilog and Seq — for structured logging.  
12\. Refit — to easily send API requests  
13\. Railway and Fly.io — for hosting

### Requirements Engineering

To start, we talked about the product requirements, user flows, what entities to track and possible use cases. Our PM asked us to take notes, from which she would generate a PRD to help us track what needed work. I used [draw.io](http://draw.io/) to visualise what we talked about; this was the result:

![](https://miro.medium.com/v2/resize:fit:700/1*VCYMqEnlSwiTi2RDRsY-og.png 'You might need to zoom in to view all use cases. Or to see any at all.')

Our PM ended up not returning that day. Or the day after that, or ever. That is how I became both backend dev and product manager.

## Architecture

About a month prior, I was building an application using modular monolithic architecture, described [here](https://medium.com/design-microservices-architecture-with-patterns/microservices-killer-modular-monolithic-architecture-ac83814f6862). I used the knowledge from that to bootstrap this project. A modular monolith separates concerns similar to microservices but without the [inherent insanity](https://renegadeotter.com/2023/09/10/death-by-a-thousand-microservices.html) of working with microservices. You also do not need to deploy them separately. It looks like this:

![](https://miro.medium.com/v2/resize:fit:700/1*JEmR1m_RZU67LC4GJpLIEg.png 'Architecture for the SimpleBiz API')

### Database Setup

After the requirements discussion, I thought hard about the database and how the various entities would interact. I needed to nail it at the start to prevent excessive refactoring and developer pain. I came up with this:

![](https://miro.medium.com/v2/resize:fit:700/1*UFid0K7R6qZZg3LKafdQEQ.jpeg 'ERD Version 1')

As much as I would like to say it was a one-and-done design, this led to some _heavy_ problems. I discuss the issue in a later section.

I initially planned to have the `Users` table hold both `Clients` and `Business` owners, but then I thought:

> “Clients aren’t ever going to access the platform, they only make payments. Why would we need all that data?”.

Instead, I created a Clients table and linked it to the business.  
The new ERD looked like this:

![](https://miro.medium.com/v2/resize:fit:700/1*RUH4XwBrMTkKs8Pv0sRVDQ.png 'ERD Version 2')

### What Module Handles What Data?

In a modular monolith, you define boundaries between the modules. Part of that includes deciding what data they are allowed to access directly. I defined the boundaries like so:

**User Module  
\-** Users

**Business Module  
\-** Businesses  
\- Clients  
\- Products

**Payments Module  
\-** Invoices  
\- Payments

For any data they need and aren’t allowed to directly access, they’d have to communicate with other modules.

### Inter-Module Communication

There are two situations where they’d need to communicate:  
1\. To Fetch Data  
2\. To Persist Data

**To Fetch Data…**

My approach was to create contracts, _interfaces_ in C#, and store them in the shared library. Those contracts would be implemented and registered in their related module, and the calling module can use DI to get the data required.

> DI = Dependency Injection.

For example, the Invoice module has to check that a business exists, just a common sense check. To do that, it injects and calls the `IBusinessService`. This interface is implemented by a `BusinessService` class, and the concrete implementation is registered in the Business module.

If we need to move to microservices, we can create a new implementation that uses an API call instead.

**To Persist Data…**

For this, I used a message broker. Specifically, I used [RabbitMQ](https://www.rabbitmq.com/) with the help of the [MassTransit](https://masstransit.io/) library. If a module needed to create some data, or delete some data in another module, I would publish this event to a queue to ensure that it happened at **least** once.

Take this example, these entities are all related: `Businesses` -> `Products` and `Invoices` -> `Payments`. If the application was a monolith with a single database schema, deleting a business from the database would automatically cause a cascade deletion. In this scenario though, the modular nature means a module can only access the entities within its defined boundary.  
So, when deleting a `Business`, I would publish an event to delete all related `Clients`, `Invoices`, `Products` and `Payments`.

### Adding Features

My process has remained the same for some time now. I pull out a notebook and plot out the rough implementation of a feature, and what each step requires. As I write the code, I often think of new approaches or things I had not previously thought of — then I reorder the flow to include them.

When that is done, I go through the code from entry point to conclusion, adding logs and checking that everything is logical. When the endpoint is finalised, I document it in the shared Postman collection for the front-end team to use.

## Challenges

### Migrations

Handling migrations is a pain in the ass (yet, managing Docker was worse at times). Each module was to handle migrations for entities within its boundaries, but, I didn’t know I was to use different schemas and _properly_ separate the entities.

You see, in C# we use a `DataContext` to define how we access a database. So, I had a separate context for each module. We also have _navigation properties_, which allow you to implicitly fetch an entity related to the current one by a foreign key, by including it in its class definition. For example, here’s the original Payment class:

```cs
public class Payment
    {
        [Key, MaxLength(DomainConstants.MaxIdLength)]
        public string PaymentReference { get; set; } = SharedLogic.GenerateReference("PAY");

        [Column(TypeName = "decimal(18,2)")] public required decimal Amount { get; set; }
        public DateTime? DateOfPayment { get; set; }

        [MaxLength(DomainConstants.MaxJsonLength)]
        public string? OtherDetails { get; set; }

        [MaxLength(DomainConstants.MaxEnumLength)]
        public string? PaymentChannel { get; set; }

        public bool IsCompleted { get; set; }

        // navigation properties
        [MaxLength(DomainConstants.MaxIdLength)]
        public required string BusinessId { get; set; }
        public Business Business { get; set; } = null!;

        [MaxLength(DomainConstants.MaxIdLength)]
        public required string InvoiceId { get; set; }
        public Invoice Invoice { get; set; } = null!;

        [MaxLength(DomainConstants.MaxIdLength)]
        public required string ClientId { get; set; }
        public Client Client { get; set; } = null!;
}
```

Notice the `Business`, `Invoice` and `Client` properties underneath their respective IDs? By including them here, I can just write something like `context.Include(c => c.Invoice)` and it’ll include the data for the Invoice entity related to the payment by its `InvoiceId` foreign key, without having to make a separate DB call.

In a nutshell, navigation properties handle the `SQL JOIN` statement.

The problem is, the `Business` and `Client` classes are outside the boundaries of the Payment module, so their inclusion would mess with the migrations. The migrations system would create and access tables **within** the module to represent the tables on the outside, even though the internal tables wouldn’t have any data.

The resolution involved a thorough clean-up: removing the classes, retaining only the `Id` strings, and implementing careful checks for the existence of related entities before storing the `Ids`. I also had to establish distinct schemas for each module, specifying the data they could access.

The new, working Payment.cs class:

```cs
public class Payment
    {
        [Key, MaxLength(DomainConstants.MaxIdLength)]
        public string PaymentReference { get; set; } = SharedLogic.GenerateReference("PAY");

        [Column(TypeName = "decimal(18,2)")] public required decimal Amount { get; set; }
        public DateTime? DateOfPayment { get; set; }

        [MaxLength(DomainConstants.MaxJsonLength)]
        public string? OtherDetails { get; set; }

        [MaxLength(DomainConstants.MaxEnumLength)]
        public string? PaymentChannel { get; set; }

        public bool IsCompleted { get; set; }

        // navigation properties
        [MaxLength(DomainConstants.MaxIdLength)]
        public required string BusinessId { get; set; }

        [MaxLength(DomainConstants.MaxIdLength)]
        public required string InvoiceId { get; set; }

        [MaxLength(DomainConstants.MaxIdLength)]
        public required string ClientId { get; set; }

        public Invoice Invoice { get; set; } = null!;
    }
```

### Docker

I use Docker a lot, usually to run software I prefer not to install, such as database servers. I had to use it to share code with the front-end team, making it easier for them to run and use the API during development.

I learned to set up a docker-compose file, bind mounts so Docker could access secrets, and how networking worked inside the container. I only learned what I needed to make things work, though. Now that the hackathon is over, I plan to deepen my understanding of the technology.

**NOTE**: On the last day of the hackathon, Docker could not find certain files, despite binding them. I had no idea why this was happening and did not have the time to investigate. Instead, I asked the team to download dotnet, which helped us continue working on the project :)

### Deployment

On the final day, I woke up at 8 am and began working on deploying my application. Unfortunately, the process took longer than expected and I wasn’t able to complete it until 3 pm. I had planned on using [Fly](https://fly.io/), but by 2 pm, I hadn’t made any progress, so I switched to [Railway](https://railway.app/), which didn’t take as long. I still had to host [Seq](https://datalust.co/seq) on Fly because Railway does not support exposing a service to the internet on multiple ports at the moment.

My main challenge during the deployment process was my lack of networking knowledge, which I plan to improve as soon as possible. Dealing with deployments gave me a profound appreciation for Docker though, it’s a remarkable piece of tech.

## Teamwork Makes The Dream Work

My teammates were wonderful. They were:

1.  [David Ishaya](https://www.linkedin.com/in/david-ishaya-15a059155/) — UI/UX designer, you can find the Figma [here](https://www.figma.com/file/0Y4r9I2GxWn9fWb11a07DA/Klustherthon?type=design&node-id=2204-1228&mode=design).
2.  [Promise Nwafor](https://www.linkedin.com/in/promise-nwafor-8765711a0/) — Front-end Developer
3.  [Sapna Jha](https://www.linkedin.com/in/sapna-jha-55287a233/) — Front-end Developer

At the start of the day, we’d mention what we planned to work on and give feedback when close of day came around. Questions were asked and resolved as quickly as possible, sometimes with a quick call. We were free to share feedback on each others work with no one taking it personal. It was great.

**NOTE:** For this project, the front-end team used React, TypeScript, Next.js and Tailwind.

## Closing Thoughts

I’m looking forward to not touching any code for the next week, as I spent every waking hour, 10am to 4am, writing code for 7 days straight. I learned a lot, I met some cool people and I came out knowing I am more capable than I thought. However, there’s still lots more to do and improve on:  
\- Master Docker  
\- Delve deeper into networking and the world of DevOps  
\- Learn to work even **faster**

The plan is to finetune the existing API after the competition closes on December 19th, and try my hand at the other problem statements . I like building stuff.

I could also use what I’ve learned to work on original ideas. Time will tell.
