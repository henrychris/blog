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

**Note**: When building a module, consider the default behaviour when accessing it and design with that in mind.

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

**Note**: Providing choice is good, but interfaces should be designed to make the common case as simple as possible.

If an interface has many features, but most developers only need to be aware of a few of them, the effective complexity of that interface is just the complexity of the commonly used features.

## Chapter 5 - Information Hiding (and Leakage)

Information hiding is the most important technique for achieving **deep modules**. Deep modules are central to managing complexity in software because they feature simple interfaces that hide **significant** implementation complexity.

### Information Hiding

Each module encapsulates knowledge within its implementation that is not included in it's interface, and thus, is hidden from the users of said module, reducing its complexity. The system is also easier to evolve, as any changes within the module do not require changes to its callers, as there are no dependencies between the caller and the hidden information.

Note that simply marking a variable as private is not sufficient if the underlying design details are still exposed using public accessor methods.

### Information Leakage

On the other hand, information leakage occurs when design decisions or internal implementation are reflected in or relied on by multiple modules. If these decisions are included within the module interface, it means there are dependencies between that information and the caller. If changes are needed in the future, the changes must be made both within the module, and everywhere it is used.

If you notice leakage, ask yourself — “How can I reorganize these classes so that this particular piece of knowledge only affects a single class?”

There are two approaches to fixing leakage:

- Merge the classes or modules
- Create a new class the holds & hides that information. This only works if you can create a simple interface, else, you just move the leakage to the interface.

### Temporal Decomposition

Temporal decomposition is a design structure that leads to information leakage. It is characterized by structuring the system based on the time order in which operations occur. Because design decisions often manifest themselves at several different times over the life of an application, following temporal decomposition means that the same piece of knowledge gets encoded in multiple places.

For instance, if you have an application that reads a file, modifies it, and then writes it out again, temporal decomposition would create one class to read the file and another to write the file. Both the reading and writing steps must possess knowledge about the file format, which is the definition of information leakage.

The recommended approach is to focus on the knowledge required for each task, not the order in which tasks occur. This usually means combining the functions that use the same piece of knowledge into a single class to encapsulate it.

### Information Hiding Within A Class

Information hiding can be applied within a class as well. The goal is to design the private methods within a class so that each method encapsulates some information or capability and hides it from the rest of the class.

Specifically, you should also try to minimize the number of places where each instance variable is used.

- Some variables might need wide access across the class.
- However, if you can reduce the number of places a variable is used, you eliminate dependencies within the class and reduce its complexity.

### Taking It Too Far

To avoid taking information hiding too far, you must ensure that important information is not hidden. Here is the guiding principle:

- Only hide information that is not needed outside its module.
- If information is needed outside the module, then you must not hide it.

**Examples of Information You Should Expose**:

1. **Necessary Configuration Parameters**: If a module’s performance or operation is fundamentally affected by certain configuration parameters, and different uses of the module require different settings, these parameters should be exposed in the interface. This allows the user to turn them appropriately. (Though, ideally, the module would automatically adjust its configuration to avoid exposing parameters when possible.)
2. **Essential Status/Error Information**: In a network communication module, masking all network exceptions would prevent applications from finding out if messages were lost or a peer server failed. Without this information, it is impossible to build robust applications. In such a case, the module must expose the exceptions, even if they add complexity to the interface.
   The core task of the software designer is to determine what is important and what is not. Things that are not important should be hidden, but when something is important, it must be exposed.

### Conclusion

When building modules, think carefully about what the caller's need to know & what operations must be included within a module. Encapsulate knowledge within modules & expose a simple interface that hides a deep class with a lot of functionality inside it.

For example, when building Qball Admin, I used the strategy pattern to define different payment providers. I defined a common interface for all providers to follow, like:

```cs
interface IPaymentProvider {
   Task<Result<Payment>> InitiateCheckout(decimal amount, object metadata);
}
```

I then implemented this for Monnify:

```cs
class MonnifyProvider: IPaymentProvider {
   public async Task<Result<Payment>> InitiateCheckout(decimal amount, object metadata) {
       // Implementation for Monnify payment provider
   }
}
```

The Monnify provider handled the quirks with the Monnify API, like:

1. If our metadata included a nested object, that object had to be serialised to a JSON string.
2. It did not accept metadata keys whose values were numeric. Everything had to be a string.
3. It did not accept emoji in the metadata fields, and would crash in that scenario.

The provider also had internal private methods for handling these quirks, authenticating the API and so on - all hidden behind the simple interface.

## Chapter 6 - General Purpose Modules are Deeper

Over specialisation is a major cause of complexity in software. Code designed to be general is usually simpler & easier to understand.

Whenever you need to design a new software module, there's often a choice between specialising to solve the problem & creating a general implementation that can address a broader set of problems. However, it's hard to predict the needs of a software system & the direction it would go. As such, the specialised approach would seem in-line with the incremental method often used in software development.

The best approach is to implement modules in a **somewhat general-purpose** way. The interface should be general enough to support multiple use cases, and not be strictly tied to current needs. This leads to simpler and deeper module compared to special purpose designs, providing better information hiding and facilitating reuse.

This generality ensures a cleaner separation between classes. For example, a general-purpose text class does not need to know the specifics of how a user interface handles a "backspace" key; those specialized details are encapsulated elsewhere.

### General v Special Purpose (Example)

Special-purpose designs are discouraged because they frequently result in information leakage.

| Design Style        | Example (Text Editor API)                                                                                      | Outcome                                                                                                                                                                                                                                                       |
| :------------------ | :------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Special-Purpose** | Methods like `void backspace(Cursor cursor)` or `void deleteSelection(Selection selection)`.                   | This leaks user interface abstractions (like "selection") into the underlying text class, increasing cognitive load and complexity.                                                                                                                           |
| **General-Purpose** | Methods like `void insert(Position position, String newText)` and `void delete(Position start, Position end)`. | The interface is based on fundamental text operations, hiding application-specific logic. This allows the same method to be reused for different actions (e.g., implementing backspace, delete key, or selection deletion using the generic `delete` method). |

### Questions To Ask Yourself

If trying to de-specialise an interface, ponder these questions:

**What is the simplest interface that will cover all my current needs?**

This only works if the simple interface accepts a reasonable number of arguments (3-4). If it surpasses that, then you're probably not simplifying anything.

**In how many situations will this method be used?**
If it's only used in one scenario, it is possibly too special purpose and should be reviewed.

**Is this API easy to use for my current needs?**
If you need to write a lot of additional code to use the module, it's probably a sign that the interface is too general.

### Push specialization upwards (and downwards!)

- **Pushing Upwards**: This is the principle of separating general-purpose and special-purpose code. Lower layers should be general-purpose (like a Text class exposing generic insert and delete operations). Specialised features (like a text editor's backspace function) are then implemented upwards in the higher-level module that uses the general component, eliminating information leakage into the core logic.

- **Pushing Downwards**: This is the rule to pull complexity downward. If complexity is unavoidable (like device-specific details), the module developer should handle it internally. This is why it is more important for a module to have a simple interface than a simple implementation. The complexity of device drivers, for instance, is hidden within the driver itself, ensuring the higher layers (the operating system) are simpler.

### Eliminate special cases in code

The goal is to design APIs such that the normal behaviour handles edge conditions without the need for additional error checking or special conditional statements throughout the code.

**Example: The Java substring Method**

If the Java String class's substring method receives indices that are outside the range of the string, it throws an IndexOutOfBoundsException. This forces the caller to write additional code to check and round the indices to the limits of the string before invoking the method.

To eliminate this special case, the method could be redefined to automatically perform this adjustment. If the API were: "returns the characters of the string (if any) with index greater than or equal to beginIndex and less than endIndex," the method would automatically handle indices that are too large or too small by returning the overlapping characters or an empty result.

This automatically defines the exception out of existence, making the API simpler for the user and eliminating complexity in all the code that calls it.

### Don't Over Generalise

While aiming for generality, designers must avoid going too far. A module should still be easy to use for its current purpose. If a general interface forces higher-level code to write a lot of additional complexity (e.g., forcing single-character operations when range operations are common), the module is too general and inefficient.
