---
title: 'Coding Challenges #3 — Building a Simple Terminal'
description: I'm working on it.
date: '2024-10-01'
categories:
  - coding_challenges
published: true
---

I built a simple terminal using [Bun](https://bun.sh/) and Typescript. This is another challenge from John Crickett’s list, you can find it [here.](https://codingchallenges.fyi/challenges/challenge-shell)

This code evolved significantly, starting with a simple loop while the final solution listens for events/signals and reacts accordingly. I’ll walk through the journey, starting with the initial solution and explaining each iteration and the reasoning behind it.

## Steps 1–2: The Initial Shell

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:700/1*eYf24N-bDpJL6khfRvR2AQ.png 'The shell')

At this point, we have a basic shell that prompts the user for input, executes a single command without arguments, and then prompts for the next input. If the user provides a non-existent command or includes arguments, the shell will crash. However, if the user types `exit`, the shell terminates successfully.

```ts
const prompt = 'sh> ';
process.stdout.write(prompt);

for await (let line of console) {
	line = line.trim();

	if (line === 'exit') {
		process.exit(0);
	}

	const proc = Bun.spawn({
		cmd: [line],
		stdout: 'inherit'
	});
	await proc.exited;

	process.stdout.write(prompt);
}
```

I used Bun’s [console](https://bun.sh/docs/api/console) global to read from standard input and the [spawn](https://bun.sh/docs/api/spawn) API to create sub-processes.

## Step 3: Handling Errors Gracefully

At this point, invalid commands could crash the shell, so it needed to handle errors gracefully. This required a simple try-catch block.

```ts
const prompt = 'sh> ';
process.stdout.write(prompt);

for await (let line of console) {
	line = line.trim();

	if (line === 'exit') {
		process.exit(0);
	}

	try {
		const proc = Bun.spawn({
			cmd: [line],
			stdout: 'inherit'
		});
		await proc.exited;
	} catch (error) {
		console.log('No such file or directory (os error 2)');
	}

	process.stdout.write(prompt);
}
```

## Step 4: Supporting Commands with Flags/Arguments

Next, the shell needed to support arguments, also known as flags. I split the line input into an array of strings and passed that array to `Bun.spawn` to create and execute the sub-process.

```ts
const prompt = 'sh> ';
process.stdout.write(prompt);

for await (let line of console) {
	line = line.trim();

	if (line === 'exit') {
		process.exit(0);
	}

	try {
		var commands = line.trim().split(' ').filter(Boolean);

		const proc = Bun.spawn({
			cmd: commands,
			stdout: 'inherit'
		});
		await proc.exited;
	} catch (error) {
		console.log('No such file or directory (os error 2)');
	}

	process.stdout.write(prompt);
}
```

The shell now supports running commands with arguments. For example, entering `ls -l` runs the `ls` command with the `-l` option, passing both as part of the `commands` array.

## Step 5: Built-in Commands — `cd` and `pwd`

Shells often have built-in commands, like `cd` (change directory) and `pwd` (print working directory). These commands manipulate the shell’s state, so they cannot be external programs. I only needed to implement `cd` as `Bun.spawn()` handles `pwd`.

```ts
const prompt = 'sh> ';
process.stdout.write(prompt);

for await (let line of console) {
	line = line.trim();

	if (line === 'exit') {
		process.exit(0);
	}

	try {
		var commands = line.trim().split(' ').filter(Boolean);

		if (commands[0] === 'cd') {
			process.chdir(commands[1]);
		} else {
			const proc = Bun.spawn({
				cmd: commands,
				stdout: 'inherit'
			});
			await proc.exited;
		}
	} catch (error) {
		console.log('No such file or directory (os error 2)');
	}

	process.stdout.write(prompt);
}
```

## Step 6: Implementing Pipes

One of the essential features of a Unix-like shell is piping. This allows you to send the output of one command as the input to another. With pipes, you can chain commands together to create complex workflows.

```ts
// main.ts
import { createProcess, handleError } from './util.ts';

const prompt = 'sh> ';
process.stdout.write(prompt);

for await (let line of console) {
	if (line === 'exit') {
		process.exit(0);
	}

	try {
		const commands = line.split('|').map((cmd) => cmd.trim().split(' ').filter(Boolean));

		if (commands.length === 1) {
			await executeCommandAsync(commands[0]);
		} else {
			await executePipelineAsync(commands);
		}
	} catch (error) {
		handleError(error);
	}

	process.stdout.write(prompt);
}

async function executeCommandAsync(command: string[]) {
	if (command[0] === 'cd') {
		process.chdir(command[1]);
	} else {
		let proc = createProcess(command, 'inherit');
		await proc.exited;
	}
}

async function executePipelineAsync(commands: string[][]) {
	let processInput: Blob | undefined;

	for (let i = 0; i < commands.length; i++) {
		const command = commands[i];
		const isLast = i === commands.length - 1;

		if (command[0] === 'cd') {
			process.chdir(command[1]);
			continue;
		}

		// the last process should inherit the standard output stream of the main process
		// so that its results are printed to console
		let proc = createProcess(command, isLast ? 'inherit' : 'pipe', processInput);

		if (!isLast) {
			processInput = await Bun.readableStreamToBlob(proc.stdout as ReadableStream);
		}

		await proc.exited;
	}
}
```

```ts
// util.ts
import type { Subprocess } from 'bun';

export function createProcess(
	commands: string[],
	stdout: 'pipe' | 'inherit',
	stdin: any = undefined
): Subprocess {
	return Bun.spawn({
		cmd: commands,
		stdout,
		stdin,
		env: { ...Bun.env }
	});
}

export function handleError(error: unknown) {
	const err = error as Error;
	console.error(err.message);
}
```

### Breaking It Down

```ts
const commands = line.split('|').map((cmd) => cmd.trim().split(' ').filter(Boolean));
```

The input is split by the pipe (`|`) symbol, creating an array of commands. Each command is split further into individual components, where the first element is the command itself and the remaining elements are its arguments. For example, given the input `cd .. | wc -l`, we get two string arrays in `commands` : `["cd", ".."]` and `["wc", "-l"]`.

```ts
if (commands.length === 1) {
	await executeCommandAsync(commands[0]);
} else {
	await executePipelineAsync(commands);
}
```

If there is only one string array in `commands`, it’s executed directly using `executeCommandAsync`. Otherwise, `executePipelineAsync` is called to handle the chain of commands.

```ts
async function executeCommandAsync(command: string[]) {
	if (command[0] === 'cd') {
		process.chdir(command[1]);
	} else {
		let proc = createProcess(command, 'inherit');
		await proc.exited;
	}
}
```

This function handles individual commands. If the command is `cd`, it changes the working directory; otherwise, it spawns a sub-process to execute the command.

```ts
async function executePipelineAsync(commands: string[][]) {
	let processInput: Blob | undefined;

	for (let i = 0; i < commands.length; i++) {
		const command = commands[i];
		const isLast = i === commands.length - 1;

		if (command[0] === 'cd') {
			process.chdir(command[1]);
			continue;
		}

		// the last process should inherit the standard output stream of the main process
		// so that its results are printed to console
		let proc = createProcess(command, isLast ? 'inherit' : 'pipe', processInput);

		// Bun throws an error when you directly assign stdout from a subprocess to stdin of another
		// this is a workaround
		// see: https://github.com/oven-sh/bun/issues/8049
		if (!isLast) {
			processInput = await Bun.readableStreamToBlob(proc.stdout as ReadableStream);
		}

		await proc.exited;
	}
}
```

In a pipeline, the output of one command is passed as input to the next. This function tracks the output of each sub-process and ensures that it becomes the input for the _next_ command in the pipeline.

The last command inherits the main process’s standard output and writes its results to the terminal.

## Step 7: Handling Signals — CTRL+C

In a shell, you may need to terminate a running process using `Ctrl + C`, which sends a SIGINT signal. When this happens, the running command should be terminated, but the shell itself should continue running.

```ts
async function executeCommandAsync(command: string[]) {
	if (command[0] === 'cd') {
		process.chdir(command[1]);
	} else {
		let proc = createProcess(command, 'inherit');

		const handleSigint = () => {
			if (!proc.killed) {
				process.kill(proc.pid, 'SIGINT');
				process.stdout.write('\n');
				return;
			}

			process.stdout.write('\n');
			process.exit(0);
		};
		process.on('SIGINT', handleSigint);

		await proc.exited;
		process.removeListener('SIGINT', handleSigint);
	}
}
```

```ts
async function executePipelineAsync(commands: string[][]) {
	let processInput: Blob | undefined;

	for (let i = 0; i < commands.length; i++) {
		const command = commands[i];
		const isLast = i === commands.length - 1;

		if (command[0] === 'cd') {
			process.chdir(command[1]);
			continue;
		}

		// the last process should inherit the standard output stream of the main process
		// so that its results are printed to console
		let proc = createProcess(command, isLast ? 'inherit' : 'pipe', processInput);

		const handleSigint = () => {
			if (!proc.killed) {
				process.kill(proc.pid, 'SIGINT');
				process.stdout.write('\n');
				return;
			}

			process.stdout.write('\n');
			process.exit(0);
		};
		process.on('SIGINT', handleSigint);

		if (!isLast) {
			processInput = await Bun.readableStreamToBlob(proc.stdout as ReadableStream);
		}

		await proc.exited;
		process.removeListener('SIGINT', handleSigint);
	}
}
```

After creating a sub-process, I added a SIGINT signal handler. If `Ctrl + C` is pressed while a sub-process is running, it sends a SIGINT to terminate the sub-process without closing the shell. If no sub-process is running, the shell itself exits. Once the sub-process completes, the SIGINT event listener is removed to prevent unnecessary handling.

## Step 8: Implementing Command History

At this stage, the implementation became increasingly difficult to manage. Handling key presses with the `node:readline` module initially worked well but introduced several issues. SIGINT signals stopped being handled correctly, processes wouldn't terminate, and inputs were duplicated or overlapped on the screen.

Ultimately, I decided to scrap it and start fresh. But first, let’s look at the history implementation.

```ts
// history.ts
import type { BunFile } from 'bun';
import * as readline from 'readline';
import { promises as fs } from 'node:fs';
import { convertBunReadableToNodeReadable } from './util';

export class History {
	private readonly PATH: string = 'hsh_history';
	#history: BunFile;

	constructor() {
		this.#history = Bun.file(this.PATH);
	}

	push(line: string) {
		fs.appendFile(this.PATH, `${line}\n`);
	}

	showHistory(output: 'pipe' | 'stdout'): ReadableStream | undefined {
		var history = readline.createInterface({
			input: convertBunReadableToNodeReadable(this.#history.stream())
		});

		let lineNo = 0;
		if (output === 'stdout') {
			history.on('line', function (line: string) {
				process.stdout.write(`${lineNo + 1} ${line}\n`);
				lineNo++;
			});
		} else {
			return new ReadableStream({
				start(controller) {
					history.on('line', (line: string) => {
						controller.enqueue(`${lineNo + 1} ${line}\n`);
						lineNo++;
					});

					history.on('close', () => {
						controller.close();
					});
				}
			});
		}
	}

	async getLinesAsync(): Promise<string[]> {
		const content = await this.#history.text();
		return content.split('\n').filter(Boolean);
	}
}
```

The `History` class manages a shell history file. When an instance is created, it opens or creates the history file (without overwriting it if it exists). The most notable method is `showHistory()`.

```ts
showHistory(output: "pipe" | "stdout"): ReadableStream | undefined {
        var history = readline.createInterface({
            input: convertBunReadableToNodeReadable(this.#history.stream()),
        });

        let lineNo = 0;
        if (output === "stdout") {
            history.on("line", function (line: string) {
                process.stdout.write(`${lineNo + 1} ${line}\n`);
                lineNo++;
            });
        } else {
            return new ReadableStream({
                start(controller) {
                    history.on("line", (line: string) => {
                        controller.enqueue(`${lineNo + 1} ${line}\n`);
                        lineNo++;
                    });

                    history.on("close", () => {
                        controller.close();
                    });
                },
            });
        }
    }
```

If `output` is “pipe”, that means the output is being passed to a process. The function will return a `ReadableStream.` Else, when `output` is “stdout”, that means the result is to be written to the terminal.

```ts
// util.ts
// sourced from: https://stackoverflow.com/a/77370169
export function convertBunReadableToNodeReadable(stream: ReadableStream): Transform {
	const nodeStream = new Transform();

	stream.pipeTo(
		new WritableStream({
			write(value) {
				nodeStream.push(value);
			},
			close() {
				nodeStream.push(null);
			}
		})
	);

	return nodeStream;
}
```

### `showHistory(output: "pipe" | "stdout")`

- If `output` is `"stdout"`, the method prints the history to the terminal with line numbers.
- If `output` is `"pipe"`, the method returns a `ReadableStream`, which can be used as input to another process.

Let’s check the rewrite of the shell, and how history is used there.

```ts
import * as readline from 'readline';
import { createProcess, handleError } from './util.ts';
import { History } from './history.ts';
import type { Subprocess } from 'bun';

let currentSubprocess: Subprocess | null = null;
let history = new History();
let historyLines = await history.getLinesAsync();
let historyIndex = historyLines.length; // the last item in the index is history_index - 1

async function main() {
	readline.emitKeypressEvents(process.stdin);
	if (process.stdin.isTTY) {
		process.stdin.setRawMode(true);
	}

	const prompt = 'sh> ';
	let currentInput = '';
	process.stdout.write(prompt);

	process.stdin.on('keypress', async function (str, key) {
		if (key.name === 'return') {
			process.stdout.write('\n');
			if (currentInput.trim()) {
				await handleLineAsync(currentInput.trim());
				history.push(currentInput.trim());
				historyLines.push(currentInput.trim());
				historyIndex = historyLines.length; // Reset history index
			}

			currentInput = '';
			process.stdout.write(prompt);
		} else if (key.name === 'backspace') {
			if (currentInput.length > 0) {
				currentInput = currentInput.slice(0, -1);
				process.stdout.write('\b \b'); // Move back, print space, move back again to delete character
			}
		} else if (key.name === 'up') {
			if (historyIndex > 0) {
				// Navigate up in history
				historyIndex--;

				process.stdout.clearLine(-1);
				process.stdout.write(`\r${prompt}`);

				currentInput = historyLines[historyIndex];
				process.stdout.write(currentInput);
			}
		} else if (key.name === 'down') {
			if (historyIndex < historyLines.length - 1) {
				// Navigate down in history
				historyIndex++;

				process.stdout.clearLine(-1);
				process.stdout.write(`\r${prompt}`);

				currentInput = historyLines[historyIndex];
				process.stdout.write(currentInput);
			}
		} else if (key.name === 'left') {
			// do nothing
		} else if (key.name === 'right') {
			// do nothing
		} else if (key.ctrl && key.name === 'c') {
			if (currentSubprocess) {
				process.kill(currentSubprocess.pid, 'SIGINT');
				currentSubprocess = null;
				process.stdout.write('\n');
			} else {
				process.stdout.write('^C\n');
				process.exit(0);
			}
		} else {
			currentInput += str;
			process.stdout.write(str); // Echo the typed character once
		}
	});
}

async function handleLineAsync(line: string) {
	if (line === 'exit') {
		process.exit(0);
	}

	const commands = line.split('|').map((cmd) => cmd.trim().split(' ').filter(Boolean));

	try {
		if (commands.length === 1) {
			await executeCommandAsync(commands[0]);
		} else {
			await executePipelineAsync(commands);
		}
	} catch (error) {
		handleError(error);
	}
}

async function executeCommandAsync(command: string[]) {
	if (command[0] === 'cd') {
		process.chdir(command[1]);
	} else if (command[0] === 'history') {
		history.showHistory('stdout');
	} else {
		currentSubprocess = createProcess(command, 'inherit');
		await currentSubprocess.exited;
		currentSubprocess = null;
	}
}

async function executePipelineAsync(commands: string[][]) {
	let processInput: Blob | undefined;

	for (let i = 0; i < commands.length; i++) {
		const command = commands[i];
		const isLast = i === commands.length - 1;

		if (command[0] === 'cd') {
			process.chdir(command[1]);
			continue;
		}

		if (command[0] === 'history') {
			if (isLast) {
				history.showHistory('stdout');
			} else {
				processInput = await Bun.readableStreamToBlob(
					history.showHistory('pipe') as ReadableStream
				);
			}
			continue;
		}

		// the last process should inherit the standard output stream of the main process
		// so that its results are printed to console
		currentSubprocess = createProcess(command, isLast ? 'inherit' : 'pipe', processInput);

		if (!isLast) {
			processInput = await Bun.readableStreamToBlob(currentSubprocess.stdout as ReadableStream);
		}

		await currentSubprocess.exited;
		currentSubprocess = null;
	}
}
```

A lot has changed and a lot has stayed the same. Let’s dive into the main function.

```ts
// main()
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
	process.stdin.setRawMode(true);
}
```

First things first, we use `readline` to listen for `keypress` events from standard input.

```ts
process.stdin.on('keypress', async function (str, key) {
	if (key.name === 'return') {
		process.stdout.write('\n');
		if (currentInput.trim()) {
			await handleLineAsync(currentInput.trim());
			history.push(currentInput.trim());
			historyLines.push(currentInput.trim());
			historyIndex = historyLines.length; // Reset history index
		}

		currentInput = '';
		process.stdout.write(prompt);
	} else if (key.name === 'backspace') {
		if (currentInput.length > 0) {
			currentInput = currentInput.slice(0, -1);
			process.stdout.write('\b \b'); // Move back, print space, move back again to delete character
		}
	} else if (key.name === 'up') {
		if (historyIndex > 0) {
			// Navigate up in history
			historyIndex--;

			process.stdout.clearLine(-1);
			process.stdout.write(`\r${prompt}`);

			currentInput = historyLines[historyIndex];
			process.stdout.write(currentInput);
		}
	} else if (key.name === 'down') {
		if (historyIndex < historyLines.length - 1) {
			// Navigate down in history
			historyIndex++;

			process.stdout.clearLine(-1);
			process.stdout.write(`\r${prompt}`);

			currentInput = historyLines[historyIndex];
			process.stdout.write(currentInput);
		}
	} else if (key.name === 'left') {
		// do nothing
	} else if (key.name === 'right') {
		// do nothing
	} else if (key.ctrl && key.name === 'c') {
		if (currentSubprocess) {
			process.kill(currentSubprocess.pid, 'SIGINT');
			currentSubprocess = null;
			process.stdout.write('\n');
		} else {
			process.stdout.write('^C\n');
			process.exit(0);
		}
	} else {
		currentInput += str;
		process.stdout.write(str); // Echo the typed character once
	}
});
```

We perform a different action depending on what key was pressed:

- `return`: Submits the current command for execution by calling `handleLineAsync(currentInput.trim())`. If the input isn't empty, it is also added to the history and reset for the next prompt.
- `backspace`: Allows for real-time deletion of characters from the command input and visually updates the terminal.
- `up` / `down`: Implements history navigation. When the `up` arrow is pressed, the user can cycle through previous commands stored in the history. The `down` arrow lets the user scroll forward in the history.
- `ctrl + C`: If a sub-process is running, it sends a SIGINT to the process to terminate it. If no process is running, it exits the shell.

```ts
async function handleLineAsync(line: string) {
	if (line === 'exit') {
		process.exit(0);
	}

	const commands = line.split('|').map((cmd) => cmd.trim().split(' ').filter(Boolean));

	try {
		if (commands.length === 1) {
			await executeCommandAsync(commands[0]);
		} else {
			await executePipelineAsync(commands);
		}
	} catch (error) {
		handleError(error);
	}
}
```

The core of the application remains the same.

```ts
async function executeCommandAsync(command: string[]) {
	if (command[0] === 'cd') {
		process.chdir(command[1]);
	} else if (command[0] === 'history') {
		history.showHistory('stdout');
	} else {
		currentSubprocess = createProcess(command, 'inherit');
		await currentSubprocess.exited;
		currentSubprocess = null;
	}
}

async function executePipelineAsync(commands: string[][]) {
	let processInput: Blob | undefined;

	for (let i = 0; i < commands.length; i++) {
		const command = commands[i];
		const isLast = i === commands.length - 1;

		if (command[0] === 'cd') {
			process.chdir(command[1]);
			continue;
		}

		if (command[0] === 'history') {
			if (isLast) {
				history.showHistory('stdout');
			} else {
				processInput = await Bun.readableStreamToBlob(
					history.showHistory('pipe') as ReadableStream
				);
			}
			continue;
		}

		// the last process should inherit the standard output stream of the main process
		// so that its results are printed to console
		currentSubprocess = createProcess(command, isLast ? 'inherit' : 'pipe', processInput);

		if (!isLast) {
			processInput = await Bun.readableStreamToBlob(currentSubprocess.stdout as ReadableStream);
		}

		await currentSubprocess.exited;
		currentSubprocess = null;
	}
}
```

The variable `currentSubprocess` tracks whether a sub-process is running. This helps manage signals like `SIGINT` correctly—killing the current sub-process if it exists.  
After a sub-process finishes, `currentSubprocess` is reset to `null`.

## Conclusion

And that’s how I managed to create a simple yet functional command-line shell. Each step provided unique challenges, from handling errors to managing sub-processes and input/output redirection. This project has given me a deeper appreciation for the complexity and power of the shell environment.

I had built a shell before, in C. Whether you’re into shell programming or not, I recommend you build one when learning a new language — or if you’re bored and thinking of what to do next. Check out the repository [here](https://github.com/henrychris/roadmap-shell).

Next, I’m working on a browser extension. I won’t say what it does till it’s ready, so keep an eye out. See you then!
