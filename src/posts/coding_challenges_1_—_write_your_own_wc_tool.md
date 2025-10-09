---
title: 'Coding Challenges #1 — Write Your Own `wc` Tool'
description: I'm working on it.
date: '2023-12-15'
categories:
  - coding_challenges
published: true
---

I’m currently learning TypeScript, and I find it’s more effective to learn a programming language by building. That, and reading through documentation is like watching paint dry.

The challenge can be found [here](https://codingchallenges.fyi/challenges/challenge-wc/). The aim is to implement the CLI tool `wc` used to get the byte, word, character or line count for a file or from standard input.

My implementation lives on [GitHub](https://github.com/henrychris/CodingChallengesFyi/tree/master/1.%20ccwc).

## Note

At first, I tried to avoid using built-in methods like `.length`, `.split` or even regex. As such, the initial code is more complex than necessary but was refactored to be more digestible.

## Main Function

The tool accepts input from the CLI, so the first task was to receive the input and decide what branch to run depending on the flag. The possible options are:

- \-c : prints the number of bytes in the file
- \-l : prints the number of lines in the file
- \-m : prints the number of characters in the file
- \-w : prints the number of words in the file

The main function looks like this:

```ts
function main(): void {
	const args = process.argv.slice(2);

	switch (args[0]) {
		case '-c':
			// use slice to remove the first parameter. that way we only have file paths.
			CountBytes(args.slice(1));
			break;
		case '-l':
			CountLines(args.slice(1));
			break;
		case '-m':
			CountCharacters(args.slice(1));
			break;
		case '-w':
			CountWords(args.slice(1));
			break;
		default:
			GetDefaultCount(args);
			break;
	}
}
```

The first slice removes the default arguments which could be “node” or “bun” and the path to the file being executed. The remaining arguments are the flag, and/or the file paths.

## Byte Count “-c”

Each subfunction in `main` follows a similar structure.

- Maintain a running `totalCount` variable.
- Loop through the provided file paths
- Check if a file exists. If not, log `` wc: ${fileName}: No such file or directory”` ``
- If the file exists, read its contents and get the relevant count.
- Log the file name along with the count.
- If multiple file paths are present, summarize the total count of all files at the end.

In code, this looks like:

```ts
function CountBytes(filePaths: string[]): void {
	// for each character get the byte size and add to the count
	let totalByteCount = 0;
	for (let index = 0; index < filePaths.length; index++) {
		let byteCount = 0;
		if (!fs.existsSync(filePaths[index])) {
			console.error(`wc: ${filePaths[index]}: No such file or directory`);
			continue;
		}

		let fileContent = fs.readFileSync(filePaths[index], 'utf-8');
		byteCount = GetByteCount(fileContent);
		totalByteCount += byteCount;
		console.log(`${byteCount} ${filePaths[index]}`);
	}
	if (filePaths.length > 1) {
		console.log(`${totalByteCount} total`);
	}
}

const byteSize = (str: string) => new Blob([str]).size;
function GetByteCount(fileContent: string): number {
	let count = 0;
	for (let j = 0; j < fileContent.length; j++) {
		count += byteSize(fileContent[j]);
	}
	return count;
}
```

Of course, this is needlessly complex, so I used the `statSync` method to get the size in bytes, and removed `GetByteCount`.

```ts
let byteCount = fs.statSync(filePath).size;
console.log(`${byteCount} ${filePath}`);
totalByteCount += byteCount;
```

## Line Count “-l”

For lines, I checked the files for line breaks`\n` and `\r\n` . These sequences typically signify line breaks on Linux and Windows. The function format is similar to that above: fetch the file, ensure it exists, read its content, and finally count the lines based on these patterns.

```ts
function GetLineCount(fileContent: string): number {
	let count = 0;
	let isLine = false;

	for (let j = 0; j < fileContent.length; j++) {
		const char = fileContent[j];

		// Check for line endings
		if (char === '\n' || char === '\r\n') {
			isLine = false;
		} else if (!isLine) {
			isLine = true;
			count++;
		}
	}
	return count;
}
t;
```

Of course, I could have used the `.split` method and passed in the required escape sequences. The result would be an array of strings where each string contained a line from the file. The function would return the size of that array.

## Character Count “-m”

For characters, the initial implementation looped through each character in the file and updated the count — which was very dumb. I changed this to simply return the length of the file.

```ts
function GetCharacterCount(fileContent: string): number {
	return fileContent.length;
}
```

## Word Count “-w”

> According to `man wc:`A word is a non-zero-length sequence of characters delimited by white space.

Here, the code checks the file for occurrences of `\n`, whitespace,\`\\t\` or `\r` and increases the word count accordingly.

```ts
function GetWordCount(fileContent: string): number {
	let count = 0;
	let isWord = false;

	for (let j = 0; j < fileContent.length; j++) {
		const char = fileContent[j];

		// Check for word boundaries (space or newline)
		if (char === ' ' || char === '\n' || char === '\t' || char === '\r') {
			isWord = false;
		} else if (!isWord) {
			isWord = true;
			count++;
		}
	}
	return count;
}
r;
```

## Default Case

There is another case to consider: when no flags are passed. In this scenario, the `wc` tool returns the byte, word and line count.

The code does the usual: loops through file paths, checks if they exist and it gets the count for all three paths and logs that. Take a look:

```ts
function GetDefaultCount(filePaths: string[]): void {
	let totalByteCount = 0;
	let totalWordCount = 0;
	let totalLineCount = 0;
	for (let index = 0; index < filePaths.length; index++) {
		if (!fs.existsSync(filePaths[index])) {
			console.error(`wc: ${filePaths[index]}: No such file or directory`);
			continue;
		}

		let fileContent = fs.readFileSync(filePaths[index], 'utf-8');
		let byteCount = GetByteCount(fileContent);
		let lineCount = GetLineCount(fileContent);
		let wordCount = GetWordCount(fileContent);

		totalByteCount += byteCount;
		totalLineCount += lineCount;
		totalWordCount += wordCount;
		console.log(`${lineCount} ${wordCount} ${byteCount} ${filePaths[index]}`);
	}
	if (filePaths.length > 1) {
		console.log(`${totalLineCount} ${totalWordCount} ${totalByteCount} total`);
	}
}
```

## Counting Standard Input

UNIX programs allow the uses of pipes to pass output from one tool as the input to another. The `wc` command allows that as well, so my version had to support it.

To do this, it would need to read from standard input. I’ll explain how I handled this for two flags: bytes and lines. Bytes are handled specially, while lines, words and characters have similar implementations.

### Bytes

First off, it checks how many files were passed in as arguments:

```ts
function CountBytes(filePaths: string[]): void {
	if (filePaths.length < 1) {
		CountBytesFromStdIn();
		return;
	}

	// other code
}
```

Next, it reads from standard input as a stream, accumulating bytes until it reaches the end. On completion, the result is logged.

```ts
function CountBytesFromStdIn(): void {
	const readStream = process.stdin;
	let byteCount = 0;

	readStream.on('data', (chunk) => {
		byteCount += chunk.length;
	});

	readStream.on('end', () => {
		console.log(`${byteCount}`);
	});
}
```

### Lines

Previously, I mentioned refactoring the code to make it more digestible. I made the code used for counting lines, words and characters reusable with the `CountItems` function.

```ts
function CountItems(filePaths: string[], getCount: (content: string) => number): void {
	let totalItemCount = 0;

	for (let index = 0; index < filePaths.length; index++) {
		let itemCount = 0;

		if (!fs.existsSync(filePaths[index])) {
			console.error(`wc: ${filePaths[index]}: No such file or directory`);
			continue;
		}

		let fileContent = fs.readFileSync(filePaths[index], 'utf-8');
		itemCount = getCount(fileContent);
		totalItemCount += itemCount;

		console.log(`${itemCount} ${filePaths[index]}`);
	}

	if (filePaths.length > 1) {
		console.log(`${totalItemCount}`);
	}
}
```

This function does the work of checking file paths and tracking the total count, and accepts a `getCount` function that performs flag-specific work. `getCount` is any function that accepts a string and returns a number. For lines, I pass in `GetLineCount.`

To handle standard input, I modified the `CountLines` function from `main:`

```ts
function CountLines(filePaths: string[]): void {
    if (filePaths.length < 1) {
        CountFromStdIn(GetLineCount);
        return;
    }
    CountItems(filePaths, GetLineCount);
}

function GetLineCount(fileContent: string): number {
    let count = 0;
    let isLine = false;

    for (let j = 0; j < fileContent.length; j++) {
        const char = fileContent[j];

        // Check for line endings
        if (char === "\n" || char === "\r\n") {
            isLine = false;
        } else if (!isLine) {
            isLine = true;
            count++;
        }
}
```

`CountFromStdIn` is another reusable function that accepts a `getCount` method to perform flag-specific work.

```ts
async function CountFromStdIn(getCount: (content: string) => number): Promise<void> {
	let fileContent = await read(process.stdin);
	console.log(`${getCount(fileContent)}`);
}

async function read(stream: ReadStream) {
	const chunks = [];
	for await (const chunk of stream) chunks.push(chunk);
	return Buffer.concat(chunks).toString('utf8');
}
```

This section reads the file content from a stream, gets the string representation and runs the relevant `getCount` method to log the count.

## Conclusion

In a nutshell, this program replicates the functionality of `wc`. I intend to work through the other challenges, and new posts will come up as I tackle them.
