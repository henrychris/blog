export type Categories =
	| 'github_pages'
	| 'csharp'
	| 'reading'
	| 'coding_challenges'
	| 'me'
	| 'fiction'
	| 'projects'
	| 'reading';

export type Post = {
	title: string;
	slug: string;
	description: string;
	date: string;
	categories: Categories[];
	published: boolean;
};
