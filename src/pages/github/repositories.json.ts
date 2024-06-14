import type { APIRoute } from "astro";
import octokit from "../../octokit";
import type { Endpoints } from "@octokit/types";

export type ret = Endpoints["GET /user/repos"]["response"]["data"];
export const GET: APIRoute = async () => {
	try {
		const repositories = await octokit.rest.repos.listForAuthenticatedUser({
			sort: "updated",
			visibility: "public",
			per_page: 20,
		});

		return new Response(JSON.stringify(repositories.data), {
			headers: {
				"content-type": "application/json",
			},
		});
	} catch (error) {
		return new Response("internal server error", { status: 500 });
	}
}