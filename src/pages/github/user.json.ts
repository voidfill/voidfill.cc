import type { APIRoute } from "astro";
import octokit from "../../octokit";
import type { Endpoints } from "@octokit/types";

export const prerender = false;

export type ret = Endpoints["GET /users/{username}"]["response"]["data"];
export const GET: APIRoute = async () => {
	try {
		const user = await octokit.rest.users.getAuthenticated();

		return new Response(JSON.stringify(user.data), {
			headers: {
				"content-type": "application/json",
				"Cache-Control": "public, max-age=86400",
			},
		});
	} catch (error) {
		return new Response("internal server error", { status: 500 });
	}
}