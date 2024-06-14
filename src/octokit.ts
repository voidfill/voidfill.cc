import { Octokit } from "octokit";

const token = import.meta.env.GITHUB_ACCESS_TOKEN;
if (!token || typeof token !== "string") throw new Error("GITHUB_ACCESS_TOKEN is not set");

const octokit = new Octokit({
	auth: token,
});

export default octokit;