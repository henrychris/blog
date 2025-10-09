---
title: 'Coding Challenges #2 — Building a Cat Tool'
description: A walkthrough of building my own version of the `cat` command-line tool in TypeScript.
date: '2024-08-10'
categories:
  - coding_challenges
published: true
---

I’m still learning TypeScript. I have built a lot more since the last entry in this series, including a text-based game, a URL shortener and a basic REST API with NestJS.

You can find this challenge [here](https://codingchallenges.fyi/challenges/challenge-cat). The aim is to implement the command line(CLI) tool `cat.` The man description is:

```bash
cat- concatenate files and print on the standard output
```

You can find the code on [GitHub](https://github.com/henrychris/CodingChallengesFyi/tree/master/cat-tool).

## Note

I wrote this code between 12am to 3am.

## Step 1

The first task is to open a file passed in on the CLI and write its content to standard output (`STDOUT`). So, we read the arguments in using `process.argv` and remove the first two arguments: `node/bun` and the `path` to the executing file. They aren’t needed.

Then, we print out the contents of the file.

```ts
function main(): void {
	// get cmdline arguments and remove node/bun and path
	const args = process.argv.slice(2);

	readFile(args[0]);
}

function readFile(filePath: string) {
	// read the file and write its contents to stdout
	process.stdout.write(fs.readFileSync(filePath, 'utf-8'));
}
```

## Step 2

The next goal is to read input piped into the program from standard input (`STDIN`). Here’s an example of how this is done:

```bash
head -n1 test.txt | cat -

> "Your heart is the size of an ocean. Go find yourself in its hidden depths."
```

According to the `man` [page](https://www.man7.org/linux/man-pages/man1/cat.1.html), cat processes input in command line order, aka, in order of appearance. So, it reads from `STDIN` when a _hyphen_ is encountered. Let’s update our code:

```ts
function main(): void {
	const args = process.argv.slice(2);

	if (args[0] === '-' || args.length === 0) {
		readFromStdIn();
		return;
	}

	readFile(args[0]);
}

function readFromStdIn() {
	process.stdin.on('data', (data) => {
		process.stdout.write(data.toString());
	});
}
```

To read from `STDIN`, we’ll use an event listener, then write the data to `STDOUT`.

## Step 3

Now, we have to concatenate files. When multiple files are passed in, we will write their contents to `STDOUT`, one file at a time, with no spaces in between. Let’s add a new function to the program.

```ts
function main(): void {
	const args = process.argv.slice(2);

	if (args[0] === '-' || args.length === 0) {
		readFromStdIn();
		return;
	}

	readFiles(args);
}

function readFiles(filePaths: string[]) {
	for (let index = 0; index < filePaths.length; index++) {
		const filePath = filePaths[index];
		readFile(filePath);
	}
}

function readFile(filePath: string) {
	process.stdout.write(fs.readFileSync(filePath, 'utf-8'));
}

function readFromStdIn() {
	process.stdin.on('data', (data) => {
		process.stdout.write(data.toString());
	});
}
```

The function `readFiles()` receives the full list of CLI arguments, and iterates over the list, writing the contents of each file to `STDOUT`.

## Step 4

This task requires us to number each line printed to `STDOUT`. An example:

```
1  "Life isn’t about getting and having, it’s about giving and being."
2  "Whatever the mind of man can conceive and believe, it can achieve."
3  "Strive not to be a success, but rather to be of value."
```

### Note

> At this point, I renewed my hate for JavaScript and its ecosystem. I found that there was no straightforward way to read a file line-by-line **without** placing the entire file in memory.
>
> I found a [library](https://www.npmjs.com/package/n-readlines) to do this though. I also had to make a lot of changes to the code structure.

```ts
function main(): void {
	const args = process.argv.splice(2);

	if (args.length === 0) {
		readFromStdIn();
		return;
	}

	let lineNum = 1;
	if (args.includes('-n')) {
		// print with line numbers
		args.forEach((element) => {
			if (element === '-n' && args.length === 1) {
				// if we only have one element and it is the number flag, it
				// means we are reading from stdin
				let lineNum = 1;
				lineNum = readFromStdInWithNum(lineNum);
			} else if (element === '-n') {
				// when iterating over arguments, don't print or read '-n'
				// skip haha
			} else if (element === '-') {
				// stop to read stdin when this is encountered
				let lineNum = 1;
				lineNum = readFromStdInWithNum(lineNum);
			} else {
				lineNum = readFileWithNum(element, lineNum);
			}
		});
	} else {
		// print without line numbers
		args.forEach((element) => {
			if (element === '-') {
				readFromStdIn();
			} else {
				readFile(element);
			}
		});
	}
}
```

Keeping track of the line number when reading multiple files was more annoying than I’d have liked. I settled on returning the line number to the main function scope, so it doesn’t reset between files.

Here are the `readFromStdInWithNum` and `readFileWithNum` functions:

```ts
function readFromStdInWithNum(startLineNumber: number): number {
	let lineNum = startLineNumber;
	let line: any;

	const liner = new lineByLine(process.stdin.fd);
	while ((line = liner.next())) {
		process.stdout.write(lineNum.toString() + ' ');
		process.stdout.write(line);
		process.stdout.write('\n');
		lineNum++;
	}

	return lineNum;
}

function readFileWithNum(filePath: string, startLineNumber: number): number {
	let lineNum = startLineNumber;
	let line: any;

	const liner = new lineByLine(filePath);
	while ((line = liner.next())) {
		process.stdout.write(lineNum.toString() + ' ');
		process.stdout.write(line);
		process.stdout.write('\n');
		lineNum++;
	}

	return lineNum;
}
```

Above, we create a `lineByLine` object, which we use to iterate over each line in the file or from `STDIN`. We write the current line number, then the line contents, a new line and finally increase the line number for the next line.

## Step 5

With `cat` you can choose to number blank lines, like so:

```
1  "Life isn’t about getting and having, it’s about giving and being."
2
3  "Whatever the mind of man can conceive and believe, it can achieve."
4
```

Or, to exclude blank lines from numbering, like this:

```
 1  "Life isn’t about getting and having, it’s about giving and being."

 2  "Whatever the mind of man can conceive and believe, it can achieve."

 3  "Strive not to be a success, but rather to be of value."
```

The first option uses the `-n` flag, while the latter uses the `-b` flag.

To achieve this, let’s add a `skipBlanks` boolean to `readFromStdInWithNum` and `readFileWithNum`.

```ts
function readFromStdInWithNum(startLineNumber: number, skipBlanks: boolean = false): number {
	let lineNum = startLineNumber;
	let line: any;

	const liner = new lineByLine(process.stdin.fd);
	while ((line = liner.next())) {
		if (skipBlanks) {
			if (line.length > 1) {
				// print non-blank lines
				process.stdout.write(lineNum + ' ');
				lineNum++;
			}
			process.stdout.write(`${line}\n`);
		} else {
			process.stdout.write(`${lineNum} ${line}\n`);
			lineNum++;
		}
	}
	return lineNum;
}
```

If the boolean value is `true`, and the current line is blank, the line number won’t be written or increased by 1.

Let’s also add cover for the `-b` flag in the main function, and pass in `true` as an argument where necessary.

```ts
function main(): void {
	const args = process.argv.slice(2);

	if (args.length === 0) {
		readFromStdIn();
		return;
	}

	let lineNum = 1;
	if (args.includes('-n')) {
		args.forEach((element) => {
			if (element === '-n' && args.length === 1) {
				lineNum = readFromStdInWithNum(lineNum);
			} else if (element === '-n') {
				// skip haha
			} else if (element === '-') {
				lineNum = readFromStdInWithNum(lineNum);
			} else {
				lineNum = readFileWithNum(element, lineNum);
			}
		});
	} else if (args.includes('-b')) {
		args.forEach((element) => {
			if (element === '-b' && args.length === 1) {
				lineNum = readFromStdInWithNum(lineNum, true);
			} else if (element === '-b') {
				// skip haha
			} else if (element === '-') {
				lineNum = readFromStdInWithNum(lineNum, true);
			} else {
				lineNum = readFileWithNum(element, lineNum, true);
			}
		});
	} else {
		args.forEach((element) => {
			if (element === '-') {
				readFromStdIn();
			} else {
				readFile(element);
			}
		});
	}
}
```

## Conclusion

You can compare the functionality of this against `cat` by running the same test cases I did. First off, get the test data by running these commands:

```bash
% curl "https://dummyjson.com/quotes?limit=10" | jq '.quotes | .[] | .quote' > test.txt
% curl "https://dummyjson.com/quotes?limit=10&skip=10" | jq '.quotes | .[] | .quote' > test2.txt
```

Then, run these commands from your working directory:

```bash
bun ./ccat.ts test.txt

head -n1 test.txt | bun ./ccat.ts -

bun ./ccat.ts test.txt test2.txt

bun ./ccat.ts test.txt test2.txt -n

head -n5 test.txt | bun ./ccat.ts -n

sed G test.txt | bun ./ccat.ts -n | head -n4

sed G test.txt | bun ./ccat.ts -b | head -n5
```

![](https://miro.medium.com/v2/resize:fit:700/1*4nfdBoVfGeQtWVG8MJCfsA.png 'Output for `bun ./ccat.ts test.txt`')

You can swap out `bun` for `node`, I prefer Bun because it automatically transpiles my TypeScript code.

That’s it for this challenge, find the source code [here](https://github.com/henrychris/CodingChallengesFyi/tree/master/cat-tool). Next time, I will be building a [shell](https://codingchallenges.fyi/challenges/challenge-shell).
