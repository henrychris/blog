---
title: 'Real-World Distance Calculations in .NET: A Guide to PostGIS and Geography Types'
description: A guide to performing accurate real-world distance calculations in .NET using PostGIS, comparing Cartesian distance, Haversine distance, and the `geography` type.
date: '2024-11-14'
categories:
  - csharp
published: true
---

In modern applications, accurate location-based features are often essential. A common requirement is calculating distances between coordinates, whether for location-based search, geofencing, or other proximity-dependent features. This article explores three methods for distance calculations in a .NET Core environment using PostGIS: Cartesian distance, Haversine distance, and the `geography` type, along with a comparison against the `geometry` type to illustrate limitations.

## Scenario: Location-Based Venue Search

I was building a feature that allows users to search for venues nearby using the Google Maps Geocode API (or similar). This API provides the user’s latitude and longitude, which is compared to venue coordinates stored in our database to find venues within a specific range. Below are the locations stored in the database, and their distances to the input location:

### Input Location: City Hall Park

- **Latitude**: 40.7128
- **Longitude**: -74.0060

### Venue Locations:

1.  **One World Trade Center  
    \-** Latitude: 40.7127  
    \- Longitude: -74.0134  
    \- Distance from input: **0.62 km**
2.  **Brooklyn Bridge  
    \-** Latitude: 40.7061  
    \- Longitude: -73.9969  
    \- Distance: **1.07 km**
3.  **Statue of Liberty  
    \-** Latitude: 40.6892  
    \- Longitude: -74.0445  
    \- Distance: **4.17 km**
4.  **Empire State Building  
    \-** Latitude: 40.7488  
    \- Longitude: -73.9857  
    \- Distance: **4.35 km**
5.  **Times Square  
    \-** Latitude: 40.7580  
    \- Longitude: -73.9855  
    \- Distance: **5.31 km**
6.  **Central Park  
    \-** Latitude: 40.7851  
    \- Longitude: -73.9654  
    \- Distance: **8.74 km**

In this example, I need the solution to accurately calculate and filter venues within the specified distances in kilometers. However, a challenge arose: the initial `.Distance()` method I tried returned distances in Cartesian coordinates, not meters. As such, the ‘range’ had no effect and all venues were returned! Let’s explore why this occurs and the solutions I tested.

![](https://miro.medium.com/v2/resize:fit:700/1*kQ3rKF5PcZnpLO04ffWx3w.jpeg 'Three persons standing beside water fountain - Photo by Pascal Bernardon')

## Cartesian Distance: Why It Doesn’t Work Here

By default, NetTopologySuite (NTS) in .NET Core uses the `geometry` type for spatial data. On a `geometry` type, the `.Distance()` method computes distances in Cartesian coordinates. Cartesian distance is suitable for small, flat distances on a 2D plane, but it fails for calculating distance on Earth’s spherical surface.

- **Limitations**: Cartesian distance assumes a flat plane, so it ignores Earth’s curvature, yielding inaccurate results over large distances.

## Solution #1: Haversine Distance for Spherical Calculations

The **Haversine formula** is a reliable method for calculating distances between two points on a sphere. It factors in Earth’s curvature and can output results in meters. Here’s an example implementation in C#:

```cs
public static double CalculateHaversineDistance(this Point point, Point point2)
{
        const double R = 6378100; // In meters
        var dLat = toRadians(point2.Y - point.Y);
        var dLon = toRadians(point2.X - point.X);

        var lat1 = toRadians(point.Y);
        var lat2 = toRadians(point2.Y);

        var a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) + Math.Sin(dLon / 2) * Math.Sin(dLon / 2) * Math.Cos(lat1) * Math.Cos(lat2);
        var c = 2 * Math.Asin(Math.Sqrt(a));
        return R * 2 * Math.Asin(Math.Sqrt(a));
}
```

The original code was sourced from [here](https://rosettacode.org/wiki/Haversine_formula#C#), then I modified it to work with NTS (Net Topology Suite).

Moving on, while the Haversine formula produces accurate measurements in meters, it cannot be directly translated to SQL by EF Core, limiting its use for database queries. Thus, I needed another approach.

### Solution #2: Geography Type for Accurate Geodetic Calculations

I did a lot of Googling, and ended back on the [Npgsql docs for NTS](https://www.npgsql.org/efcore/mapping/nts.html?tabs=ef9-with-connection-string#geography-geodetic-support), and [here](https://postgis.net/docs/manual-2.4/using_postgis_dbmanagement.html#PostGIS_Geography). It mentions that calculations on the `geography` type are performed on the sphere, and are much more accurate over long distances. Location data stored as a `geography` type gains built-in support for spherical (geodetic) calculations, supporting real-world distance computations.  
This is simple to implement:

```cs
public class Venue
{
    [Key]
    public int Id { get; set; }

    public required string Name { get; set; }

    [Column(TypeName = "geography")]
    public required Point Location { get; set; }
}
```

## Comparing `geography` vs. `geometry` Types

To show the effectiveness of the `geometry` type, I will compare it against the `geometry` type. Below is the implementation of the `geometry` type:

```cs
public class VenueGeometry
{
    [Key]
    public int Id { get; set; }

    public required string Name { get; set; }

    public required Point Location { get; set; }
    // by default, NTS uses `geometry`
}
```

As mentioned earlier, with the `geometry` type, the distance calculation in `.Distance()` operates in Cartesian coordinates, assuming a flat plane and returning distances accordingly. As a result, the distances between points do not match real-world measurements, leading to inaccurate results over large distances.

For instance:

- If we specify a **1 km search radius** around **City Hall Park** using `geometry`, the query would not yield results consistent with the true distances.
- With `geography`, specifying the same radius accurately reflects distances on Earth, with results reliably within the range.

I created two endpoints for this purpose. The first queries a `Venue` table, with locations stored as `geography`. If I query this table with a range of `2km`, I expect to see _One World Trade Center_ and _Brooklyn Bridge_ as the only results.

**Request:**

```bash
curl --request GET \
  --url 'http://localhost:5051/api/venue/nearby?latitude=40.7128&longitude=-74.0060&rangeInKm=2'
```

**Result:**

```json
{
	"success": true,
	"message": "Success",
	"note": "N/A",
	"data": [
		{
			"name": "One World Trade Center",
			"latitude": 40.7127,
			"longitude": -74.0134
		},
		{
			"name": "Brooklyn Bridge",
			"latitude": 40.7061,
			"longitude": -73.9969
		}
	]
}
```

The other locations are farther than 2km from our input distance, _City Hall Park_.

The second endpoint queries a `VenueGeometry` table, where the same locations are stored, but as `geometry` types. If I query this table with the same range of `2km`, I will instead get all locations returned.

**Request:**

```bash
curl --request GET \
  --url 'http://localhost:5051/api/venue/geometry?latitude=40.7128&longitude=-74.0060&rangeInKm=2'
```

**Response:**

```json
{
	"success": true,
	"message": "Success",
	"note": "N/A",
	"data": [
		{
			"name": "One World Trade Center",
			"latitude": 40.7127,
			"longitude": -74.0134
		},
		{
			"name": "Brooklyn Bridge",
			"latitude": 40.7061,
			"longitude": -73.9969
		},
		{
			"name": "Empire State Building",
			"latitude": 40.7488,
			"longitude": -73.9857
		},
		{
			"name": "Statue of Liberty",
			"latitude": 40.6892,
			"longitude": -74.0445
		},
		{
			"name": "Times Square",
			"latitude": 40.758,
			"longitude": -73.9855
		},
		{
			"name": "Central Park",
			"latitude": 40.7851,
			"longitude": -73.9654
		}
	]
}
```

Even at a range of `0.1km`, all items are returned.

## Conclusion

When implementing geospatial features in .NET Core, the choice of data type profoundly impacts the accuracy of location-based queries. While `geometry` provides basic more functionality, using `geography` instead makes a significant difference in accuracy for location-based searches.  
The former might suffice for short, flat-plane measurements but is unsuitable for applications where accurate, real-world distances are essential.

The repository for this article can be found [here](https://github.com/henrychris/distance-article).

## References

The links below were helpful:

- [https://www.npgsql.org/efcore/mapping/nts.html](https://www.npgsql.org/efcore/mapping/nts.html)
- [https://postgis.net/docs/manual-2.4/using_postgis_dbmanagement.html#PostGIS_Geography](https://postgis.net/docs/manual-2.4/using_postgis_dbmanagement.html#PostGIS_Geography)
- [https://learn.microsoft.com/en-us/ef/core/modeling/spatial](https://learn.microsoft.com/en-us/ef/core/modeling/spatial)
- [https://gps-coordinates.org/distance-between-coordinates.php](https://gps-coordinates.org/distance-between-coordinates.php)
- [https://gis.stackexchange.com/questions/374604/what-are-degrees-in-srid-4326-and-why-cant-they-use-meters](https://gis.stackexchange.com/questions/374604/what-are-degrees-in-srid-4326-and-why-cant-they-use-meters)
- [https://stackoverflow.com/questions/8464666/distance-between-2-points-in-postgis-in-srid-4326-in-metres](https://stackoverflow.com/questions/8464666/distance-between-2-points-in-postgis-in-srid-4326-in-metres)
