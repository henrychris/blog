import { error } from '@sveltejs/kit';
import { siteUrl } from '$lib/config';

export async function load({ params, url }) {
	try {
		const post = await import(`../../../posts/${params.slug}.md`);

		return {
			content: post.default,
			meta: post.metadata,
			url: `${siteUrl}${url.pathname}`
		};
	} catch {
		error(404, `Could not find ${params.slug}`);
	}
}
