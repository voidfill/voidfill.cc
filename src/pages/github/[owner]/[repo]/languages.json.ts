import octokit from "../../../../octokit";
import type { APIRoute } from "astro";
import type { Endpoints } from "@octokit/types";

export const prerender = false;

export type ret = Endpoints["GET /repos/{owner}/{repo}/languages"]["response"]["data"];
export const GET: APIRoute = async (req) => {
	try {
		const { owner, repo } = req.params;
		if (!owner || !repo) {
			return new Response("not found", { status: 404 });
		}

		const languages = await octokit.rest.repos.listLanguages({
			owner,
			repo,
		});

		return new Response(JSON.stringify(languages.data), {
			headers: {
				"content-type": "application/json",
				"Cache-Control": "public, max-age=86400",
			},
		});

	} catch (error) {
		return new Response("internal server error", { status: 500 });
	}
}