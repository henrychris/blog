export const ROUTES = {
	HOME: '/',
	WRITING: '/writing',
	BRAG: '/writing/brag-doc',
	PROJECTS: '/projects',
	RESUME: '/resume',
	MEDIA: '/media'
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];
