---
title: 'Reading - A Philosophy of Software Design'
description: 'Notes on the book "A Philosophy of Software Design" by John Ousterhout.'
date: '2025-11-11'
categories:
  - reading
published: true
---

## Chapter 1 - It's All About Complexity

The greatest limitation in writing software is the ability to understand the system being created. Complexity **will** increase over time as more features are added and modules start to depend on one another. The more complex a system, the harder it is to keep all relevant factors in ones mind while building it.Simpler designs help us build large, powerful systems before complexity becomes overwhelming.

There are two general approaches to eliminating complexity:

- Make code simpler and more obvious
- Encapsulate complexity, so programmers can work on a feature without needing to understand the entire system, aka _modular design_

Software is malleable and as such, is often developed incrementally. A small slice is designed, implemented and evaluated. Problems with the design are fixed, then a new set of features are designed, implemented and evaluated. Experience informs the new design and often makes it better.

Since software is so malleable, design is never completed. As a developer, you must always be thinking of how to improve the design of software. Reducing complexity is the most important part of improving design. Since you must always be thinking of how to improve design, you must always be thinking about complexity.

### How To Use This Book

Use in conjunction with code reviews. Think about the concepts in this book apply to the code you read and its complexity.

## Chapter 2 - The Nature Of Complexity

It's easier to tell when a design is simple than to create a simple design. But you can easily tell when it is complex, and in such a scenario, try a different approach. Over time, you'll learn that certain approaches lead to simpler designs while others introduce complexity.

Complexity is anything related to the structure of a software system that makes it hard to understand and modify said system.

Complexity is determined by the actions that are most common. Isolating complexity in a place where it will never be seen (rarely changed or read by developers) is almost as good as eliminating the complexity entirely.

Complexity is more apparent to readers than to the writer, an easy approach to gauge complexity is to ask others to read your code and share what they think.

### Symptoms Of Complexity

1. **Change Amplification**: A seemingly simple change requires modification in many different places.

2. **Cognitive Load**: How much a developer needs to know to complete a task. The higher load, the more a dev needs to learn, the greater the chance of bugs - and the greater the degree of complexity.

3. **Unknown Unknowns**: It is not obvious what code must be modified to implement a feature, or what information must be known. To make matters worse, you can't know unless you make the changes OR read all the code in the system.  
   In other words: there is something you need to know, but you won't be able to find out what it is until you make a change and see the effects.

A good design makes the system obvious. A developer can easily read the code and understand what needs to change. They can make a quick guess without thinking too hard, and be confident that the guess is correct.

### Causes of Complexity

1. **Dependencies**: A dependency exists when a piece of code can't be understood and modified in isolation because it relates in some way with some other code. The other code must be considered and/or modified if the given code is changed or to be changed.  
   Dependencies can't be eliminated from code, but they can be made simple and as obvious as possible.
2. **Obscurity**: This occurs when important information is non-obvious e.g. a generic variable name that misses important info, like a variable name `weight` that does not specify its unit (`weight`, weight in what? kg? pounds?). The only way to find out is to scan the code for places the variable is used.  
   Inconsistency is also a major contributor to obscurity, e.g. if the same variable name is used for different purposes.
   The need for excessive documentation is often a signal that a system is obscure and could do with a simpler design.

Dependencies lead to change amplification and increase cognitive load. Obscurity creates unknown unknowns and also contribute to cognitive load. Reducing both of these can reduce software complexity.

### Complexity Is Incremental

Complexity is death by a thousand cuts. It builds as new dependencies & obscurities are added, until one day it is simply too risky to make a quick change to a system.

One must adopt a zero tolerance policy to complexity. If every developer thinks - "oh it's just a little complex, but it's fine" - the application will very quickly become a maintenance nightmare.

## Chapter 3 - Working Code Is Not Enough

Mindset is important when designing software. There are two approaches you can take:

1. Tactical: Focused on getting a feature out as quickly as possible, with little care for the best design. It is believed that a little complexity is OK. The future isn't really a concern here. To make things worse, future visits to features built this way require patches to get around design problems, which begets more complexity.
2. Strategic Programming: Here, you must remember working code is not enough. The goal is a great design which also happens to work.

Try a bunch of different designs, considering ways the system might need to be changed in the future, then choose the best one.
Of course, you might discover mistakes in your design later on. Take the time to fix it, instead of patching it up.

### How Much To Invest?

Remember, software development is agile. As such, you can't design the entire system up front. Instead, make small investments on a continual basis. The initial designs will take a bit longer, but they will pay off over time. Eventually, these investments will be free, as the good design from the past greatly improves the speed of work in the future.

However, when programming tactically, development eventually slows down as you pay back the technical debt that was created at the start. To make matters worse, technical debt is never fully paid back. You pay for it forever.

### Startups and Investment

Companies can succeed using either mindset. Facebook was known to break stuff and ship fast, and got a reputation for empowering their engineers. Google are known for their high quality and focus on a healthy codebase. Both are Uber successful, but a healthy codebase is a lot more fun to work on.

The best way to lower development costs is to higher great engineers. However, they care deeply about good design, and if it is poor at your company - word will get7 out

To conclude, both approaches work. However, tactical programming contributes to complexity - death by a thousand cuts. The best approach is where every engineer makes continuous small investments in good design.

## Chapter 4 - Modules Should Be Deep

Systems should be designed so that developers need only face a small subset of complexity at once. This is known as—

### Modular Design

A system is decomposed into small, mostly independent modules, which can be classes, subsystems or services. I say mostly, because it's not possible for complete independence. There will be dependencies between modules because they must call one another to get stuff done. Changes in a module may necessitate changes in other modules.

The goal is to minimise dependencies between modules. To do this, think of modules in two parts:

- Interface: What a developer working in another module needs to know to use the current module
- Implementation: This executes on the promises made by the interface. A developer working on module must understand it's interface and implementation - plus the interfacs of other modules it invokes.

The best modules have interfaces that are much simpler than the implementation. This is great, because:

- Simple interfaces minimise the complexity the module imposes on the rest of the system
- If the interface is simple, it means a lot can be changed about the module's implementation without changing the interface.

### What's In An Interface?

Interfaces contain two types of information:

- Formal: Specified explicitly in the code, and can be checked by the programming language and compiler, e.g its method signatures
- Informal: High level behaviour, how to use the model (methods to call first). This is specified in comments.

Any information that must be known by the user of a module is part of its interface. A clearly specified interface helps eliminate unknown unknowns.

### Abstractions

An abstraction is a simplified view of an entity, which omits unimportant details. They make it easier to reason about complex things.

All modules provide abstractions in the form of an interface. They hide what actually happens within the module.

An abstraction can be created wrongly if:

- It contains too much unnecessary or unimportant information. This creates cognitive load as developers need to reason about more.
- It misses important info. This creates obscurity as developers will not have the information they need to correctly use the abstraction.

The key to designing abstractions is to understand what is important, and to look for designs that minimize the amount of information that is important.

### Deep Modules

A deep module provides a powerful implementation, with a wickedly simple interface. An example is the UNIX I/O suite, which exposes 5 methods. Only a tiny fraction of its complexity is exposed to its users.

The benefit provided by a module is its functionality, the cost is its interface. If a module has a simple interface, it creates less complexity and provides a greater benefit.

Note: When building a module, consider the default behaviour when accessing it and design with that in mind.

Another example is the Stripe Payment API:

```js
// One method handles immense complexity
stripe.charges.create({
	amount: 2000,
	currency: 'usd',
	source: 'tok_visa'
});
```

Behind this: PCI compliance, fraud detection, bank communication, currency conversion, receipt generation, etc

### Shallow Modules

Here, the interface is relatively complex compared to the functionality it offers.

The benefit they provide by not having to learn their internals, is negated by the cost of learning and using their interfaces.

An example is the getter setter pattern, when we could directly access the fields instead.

```java
// Shallow - just wrapping direct field access
public class UserProfile {
    private String name;
    private int age;
    private String email;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
```

Shallow methods generally have:

- High interface complexity compared to what they do
- Trivial implementations often 1-3 lines
- No abstraction of complexity, they simply rename existing simple operations (cough, repository pattern, cough)
- Learning cost exceed benefit

Either eliminate them, or give them enough functionality to justify the interface.

### Classitis

A disease often encountered in Java, where (extremely) smaller classes are preferred over one deep class that provides all the functionality.

```js
// Classitis example - too many classes for simple operations
const connectionFactory = new DatabaseConnectionFactory();
const connectionConfig = new ConnectionConfiguration();
const connectionBuilder = new ConnectionBuilder(connectionFactory, connectionConfig);
const connection = connectionBuilder.build();
const queryFactory = new QueryFactory(connection);
const query = queryFactory.createQuery('SELECT * FROM users');
const executor = new QueryExecutor(connection);
const result = executor.execute(query);
```

The intent is to minimise the functionality contained in a class, instead preferring to create new classes to add more functionality. While each class remains simple, usage is verbose & extremely complex due to the number of interfaces that need to be understood.

Note: Providing choice is good, but interfaces should be designed to make the common case as simple as possible.

If an interface has many features, but most developers only need to be aware of a few of them, the effective complexity of that interface is just the complexity of the commonly used features.
