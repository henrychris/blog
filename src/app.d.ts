// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			meta?: Meta;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

type Meta = {
	title: string;
	description: string;
	url: string;
	image: string;
};

export {};
