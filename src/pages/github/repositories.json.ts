import type { APIRoute } from "astro";
import octokit from "../../octokit";
import type { Endpoints } from "@octokit/types";

export const prerender = false;

export type ret = Endpoints["GET /user/repos"]["response"]["data"];
export const GET: APIRoute = async () => {
	try {
		const repositories = await octokit.rest.repos.listForAuthenticatedUser({
			sort: "updated",
			type: "owner",
			per_page: 20,
		});

		return new Response(JSON.stringify(repositories.data.filter((r) => !r.fork)), {
			headers: {
				"content-type": "application/json",
				"Cache-Control": "public, max-age=86400",
			},
		});
	} catch (error) {
		return new Response("internal server error", { status: 500 });
	}
}