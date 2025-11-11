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
