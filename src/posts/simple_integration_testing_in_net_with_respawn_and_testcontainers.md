---
title: Simple Integration Testing in .NET with Respawn & TestContainers
description: A guide on how to set up simple integration tests in .NET using Respawn and TestContainers for a clean and isolated testing environment.
date: '2024-08-13'
categories:
  - csharp
published: true
---

The project I am working on these days is a little strange. I am building an API to power mobile and web applications, but the architecture is not what most people are used to.

Assume there are two services: a web API and a [hosted application](https://learn.microsoft.com/en-us/dotnet/core/extensions/generic-host). Both are written in .NET. The web API is the only application that receives requests from the internet. It exposes endpoints and the incoming requests are handled by the hosted application. How?

We use [NATS](https://nats.io/) as a message broker. NATS has a neat [request-reply](https://docs.nats.io/nats-concepts/core-nats/reqreply) pattern that allows users to send messages to the broker and receive a response in return. The flow is such:

- Web API receives a HTTP request
- Web API sends a message to NATS
- Hosted service receives the message and processes it
- Hosted service returns a response to NATS
- Web API receives the response from NATS
- Web API returns a HTTP response to the client

Now that you understand what we are working with, let’s move on to testing. I prefer to use integration tests where I mock only external services and use a database (or an [in-memory database](https://learn.microsoft.com/en-us/ef/core/providers/in-memory/)) in my tests. The problem is, I can’t use the [common](https://learn.microsoft.com/en-us/aspnet/core/test/integration-tests?view=aspnetcore-8.0) .NET approach where `WebApplicationFactory` is used to create an instance of the application for testing — because the hosted service is not a web application.

I could instead perform end to end tests from the web API, but that project is in a different repository and to end tests take too long to run. I can’t spend all day waiting for CI to complete.

My preferred approach is to create an instance of the class I wish to test, and pass in instances of any dependencies it needs, which are then used to test various scenarios.

I use [TestContainers](https://dotnet.testcontainers.org/) to spin up a [Postgres](https://www.postgresql.org/) database so that my tests target a **real** database, which can help detect issues I would otherwise miss. One issue this helped me catch was saving a `DateTime` object with no timezone into a column that only accepts [dates with timezones](https://www.postgresql.org/docs/current/datatype-datetime.html).

I use [Respawn](https://github.com/jbogard/Respawn) to reset the database to its initial state after every test. This way tests aren’t [contaminated](https://www.joshuamoon.co.uk/improve-testing-test-isolation) with the results of tests that ran before them.

Now, enough talk. Let’s see some code.

The demo application is a simple web API with a single route and the source code can be found [here](https://github.com/henrychris/TestContainersArticle). I’ve grown of fond of [vertical slice architecture](https://www.jimmybogard.com/vertical-slice-architecture/), and that’s what I use here.

The controller:

```cs
public class ArticleController(IMediator mediator) : BaseController
{
  [HttpPost]
  public async Task<IActionResult> CreateArticle(CreateArticleRequest request)
  {
    var result = await mediator.Send(request);
    return result.Match(_ => Ok(result.ToSuccessfulApiResponse()), ReturnErrorResponse);
  }
}
```

The `CreateArticleRequest` class, handler and validator:

```cs
public class CreateArticleRequest : IRequest<Result<CreateArticleResponse>>
{
    public DateTime DateToPublish { get; set; }
    public string Content { get; set; } = null!;
    public string Title { get; set; } = null!;
}

public class CreateArticleHandler(IUnitOfWork unitOfWork, IValidator<CreateArticleRequest> validator, ILogger<CreateArticleHandler> logger)
    : IRequestHandler<CreateArticleRequest, Result<CreateArticleResponse>>
{
    public async Task<Result<CreateArticleResponse>> Handle(CreateArticleRequest request, CancellationToken cancellationToken)
    {
        var validationResult = await validator.ValidateAsync(request, cancellationToken);
        if (!validationResult.IsValid)
        {
            var err = validationResult.ToErrorList();
            logger.LogError("Validation failed for request.\nErrors: {errors}.", err);
            return Result<CreateArticleResponse>.Failure(err);
        }

        var article = ArticleMapper.CreateArticle(request);
        await unitOfWork.Articles.AddAsync(article);
        await unitOfWork.CompleteAsync();

        var response = ArticleMapper.CreateArticleResponse(article);
        return Result<CreateArticleResponse>.Success(response);
    }
}

public class CreateArticleValidator : AbstractValidator<CreateArticleRequest>
{
    public CreateArticleValidator()
    {
        RuleFor(x => x.Title).NotEmpty();
        RuleFor(x => x.Content).NotEmpty();
        RuleFor(x => x.DateToPublish).NotEmpty().GreaterThan(DateTime.UtcNow);
    }
}
```

We receive three properties as input, validate & map them to an article domain object and save it in the database. For the sake of demonstration, we will accept a date as input.

For tests, I create a base class that is inherited by all test classes. The base class includes common setup & disposal logic required by most, if not all tests. This is where `TestContainers` and `Respawn` come in.

The base class:

```cs
using Microsoft.EntityFrameworkCore;
using Npgsql;
using Respawn;
using Testcontainers.PostgreSql;
using TestContainersArticle.Main.Data;
using TestContainersArticle.Main.Data.Repositories.UoW;

namespace TestContainersArticle.Tests.Base;

internal abstract class TestBase
{
    private static PostgreSqlContainer _container = null!;
    private static string _connectionString = null!;
    private DataContext _context = null!;
    protected IUnitOfWork unitOfWork = null!;

    [OneTimeSetUp]
    public static async Task OneTimeSetUp()
    {
        _container = new PostgreSqlBuilder().WithImage("postgres:16.1").Build();
        await _container.StartAsync();

        _connectionString = _container.GetConnectionString();
    }

    [OneTimeTearDown]
    public static async Task OneTimeTearDown()
    {
        await _container.StopAsync();
        await _container.DisposeAsync();
    }

    [SetUp]
    public async Task Setup()
    {
        var options = new DbContextOptionsBuilder<DataContext>().UseNpgsql(_connectionString).Options;
        _context = new DataContext(options);

        await _context.Database.EnsureCreatedAsync();
        unitOfWork = new UnitOfWork(_context);
    }

    [TearDown]
    protected async Task TearDown()
    {
        var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        var respawner = await Respawner.CreateAsync(
            conn,
            new RespawnerOptions { SchemasToInclude = ["public", "postgres"], DbAdapter = DbAdapter.Postgres }
        );
        await respawner.ResetAsync(conn);

        conn.Dispose();
        await _context.DisposeAsync();
        unitOfWork.Dispose();
    }
}
```

Let’s dissect it.

### \[OneTimeSetup\] & \[OneTimeTearDown\]

```cs
[OneTimeSetUp]
public static async Task OneTimeSetUp()
{
  _container = new PostgreSqlBuilder().WithImage("postgres:16.1").Build();
  await _container.StartAsync();

  _connectionString = _container.GetConnectionString();
}

[OneTimeTearDown]
public static async Task OneTimeTearDown()
{
  await _container.StopAsync();
  await _container.DisposeAsync();
}
```

Like the name implies, `OneTimeSetup` is called once before all tests start to run. It creates a new a container using the `postgres:16.1` image & sets the connection string. On the other hand, `OneTimeTeardown` is called once after the last test runs to stop & dispose the container.

### \[Setup\]

```cs
[SetUp]
public async Task Setup()
{
    var options = new DbContextOptionsBuilder<DataContext>().UseNpgsql(_connectionString).Options;
    _context = new DataContext(options);

    await _context.Database.EnsureCreatedAsync();
    unitOfWork = new UnitOfWork(_context);
}
```

I prefer to use a [unit of work](https://learn.microsoft.com/en-us/aspnet/mvc/overview/older-versions/getting-started-with-ef-5-using-mvc-4/implementing-the-repository-and-unit-of-work-patterns-in-an-asp-net-mvc-application) as I find the pattern useful when saving database updates as a single unit. Some might argue that `[EFCore](https://learn.microsoft.com/en-us/ef/core/)` implements the unit of work pattern — and I agree with them. I just **like** working this way.  
The `[Setup]` method runs before every test and ensures the database exists and has the correct schema.

### \[Teardown\]

`[Teardown]` runs when a test finishes, and this is where `Respawn` comes in.

```cs
[TearDown]
protected async Task TearDown()
{
    var conn = new NpgsqlConnection(_connectionString);
    await conn.OpenAsync();

    var respawner = await Respawner.CreateAsync(
        conn,
        new RespawnerOptions { SchemasToInclude = ["public", "postgres"], DbAdapter = DbAdapter.Postgres }
    );
    await respawner.ResetAsync(conn);

    conn.Dispose();
    await _context.DisposeAsync();
    unitOfWork.Dispose();
}
```

Here, we open a new connection to our postgres database and use it to create a `Respawner` object. We specify the schemas we wish to keep in the database, and `Respawn` deletes everything else. After that, we dispose the resources used.

I wrote seven tests for the method, and they all ran in `1.5s`.

![](https://miro.medium.com/v2/resize:fit:700/1*cHkCiC-ICmL1Uu10o74f5Q.png 'Test Run results')

How is this useful? Let me demonstrate.

The `Article` domain model looks like so:

```cs
public class Article : BaseEntity
{
    public required string Title { get; set; }
    public required string Content { get; set; }

    /// <summary>
    /// We allow this as input just so we can test the database's response
    /// </summary>
    public required DateTime DateToPublish { get; set; }
}

public abstract class BaseEntity
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public DateTime DateCreated { get; set; } = DateTime.UtcNow;
    public DateTime DateUpdated { get; set; } = DateTime.UtcNow;
}
```

In Postgres, `DateTime` objects have a `timestamp with time zone` data type. In .NET terms, the `[DateTime.Kind](https://learn.microsoft.com/en-us/dotnet/api/system.datetime.kind?view=net-8.0)` property must have a value that isn’t `Unspecified`. In the article mapper, we don’t try to convert the `DateToPublish` input to UTC, nor do we do perform any validation.

```cs
public static class ArticleMapper
{
    internal static Article CreateArticle(CreateArticleRequest request)
    {
        return new Article
        {
            Title = request.Title,
            Content = request.Content,
            DateToPublish = request.DateToPublish
        };
    }
}
```

Since we are hitting a real database, Postgres will throw an exception if we try to store a normal date string with no time zone information (or where DateTime.Kind = Unspecified).

```cs
[Test]
public async Task Handle_UseNonUtcDate_ThrowsException()
{
    // arrange
    var request = CreateArticleRequestBuilder
        .Default()
        .WithTitle($"Article with bad date.")
        .WithContent($"This date is in the past.")
        .WithDateToPublish(DateTime.Now.AddDays(1))
        .Build();

    // act & assert
    await FluentActions
        .Invoking(() => _handler.Handle(request, CancellationToken.None))
        .Should()
        .ThrowAsync<Microsoft.EntityFrameworkCore.DbUpdateException>();
}

// Test result: success
```

So this gives me confidence that my tests reflect the reality of my application. If I choose to mock my database or use an in-memory database, then I could run into these issues in production.

That’s all for now, I hope this was helpful. Again, you can find the source code [here](https://github.com/henrychris/TestContainersArticle). Thanks for reading!

### References

These links were useful while researching:

- [https://www.jimmybogard.com/vertical-slice-architecture/](https://www.jimmybogard.com/vertical-slice-architecture/)
- [https://github.com/nadirbad/VerticalSliceArchitecture/tree/main](https://github.com/nadirbad/VerticalSliceArchitecture/tree/main)
- [https://github.com/pdevito3/PeakLimsApiSample](https://github.com/pdevito3/PeakLimsApiSample)
- [https://medium.com/@iamprovidence/mediatr-vs-services-or-why-slices-architecture-better-2e1eb4afae43](https://medium.com/@iamprovidence/mediatr-vs-services-or-why-slices-architecture-better-2e1eb4afae43)
- [Integration Testing using Testcontainers in .NET 8 | CodeNx](https://medium.com/codenx/integration-testing-using-testcontainers-in-net-8-520e8911d081)
- [How to use Testcontainers with .NET Unit Tests | The .NET Tools Blog](https://blog.jetbrains.com/dotnet/2023/10/24/how-to-use-testcontainers-with-dotnet-unit-tests/)
- [Best practices with .Net Core and TestContainers.MsSql : r/dotnet](https://www.reddit.com/r/dotnet/comments/16j65bf/best_practices_with_net_core_and/)
