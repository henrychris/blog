export const ROUTES = {
	HOME: '/',
	WRITING: '/writing',
	PROJECTS: '/projects',
	RESUME: '/resume',
	MEDIA: '/media'
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];
