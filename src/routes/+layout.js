import posthog from 'posthog-js';
import { browser, dev } from '$app/environment';

export const prerender = true;
export async function load({ url }) {
	if (browser && !dev) {
		posthog.init('phc_9IJ3TdK92llkQNMVmW3wpY9geqxAXVusWRT0nIbtYRu', {
			api_host: 'https://us.i.posthog.com',
			defaults: '2025-11-30',
			person_profiles: 'identified_only' // or 'always' to create profiles for anonymous users as well
		});
	}

	return {
		url: url.pathname
	};
}
