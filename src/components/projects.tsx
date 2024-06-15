import type { JSX } from "astro/jsx-runtime";
import { ErrorBoundary, For, Show, Suspense, createMemo, createResource } from "solid-js";
import { OcRepoforked2, OcStar2 } from "solid-icons/oc";

import type { ret as repoRet } from "../pages/github/repositories.json";
import type { ret as langRet } from "../pages/github/[owner]/[repo]/languages.json";

import "./projects.scss";

const languageColors = await fetch("/lang-colors.json").then((r) => r.json());

function Languages(props: { fullname: string }): JSX.Element {
	const [languages] = createResource<langRet>(async () => {
		const r = await fetch(`/github/${props.fullname}/languages.json`);
		if (!r.ok) throw new Error("Failed to fetch languages.");
		return await r.json();
	});

	return (
		<div class="languages">
			<Suspense fallback={<div class="fallback">Loading languages...</div>}>
				{(() => {
					const sorted = createMemo(() => Object.entries(languages() || {}).sort((a, b) => b[1] - a[1]));
					const total = createMemo(() => Object.values(languages() || {}).reduce((a, b) => a + b, 0));

					return (
						<For each={sorted()}>
							{([lang, size]) => (
								<div
									class="language"
									style={{
										width: `${(size / total()) * 100}%`,
										"background-color": languageColors[lang] ?? "#fff",
									}}
								/>
							)}
						</For>
					);
				})()}
			</Suspense>
		</div>
	);
}

function RepositoryCard(props: repoRet[number]): JSX.Element {
	return (
		<a class="repository-card" href={props.html_url}>
			<div class="info">
				<div class="header">
					<h2>{props.name}</h2>
					<Show when={props.stargazers_count}>
						<OcStar2 />
						{props.stargazers_count}
					</Show>
					<Show when={props.forks_count}>
						<OcRepoforked2 />
						{props.forks_count}
					</Show>
				</div>
				<h3>
					<Show when={props.description} fallback={<i>No description provided.</i>}>
						{props.description}
					</Show>
				</h3>
			</div>
			<Languages fullname={props.full_name} />
		</a>
	);
}

export default function Projects(): JSX.Element {
	const [repositories] = createResource<repoRet>(async () => {
		const r = await fetch("/github/repositories.json");
		if (!r.ok) throw new Error("Failed to fetch repositories.");
		return await r.json();
	});

	return (
		<div class="projects">
			<ErrorBoundary fallback={<span>Something went wrong when trying to load repositories.</span>}>
				<div class="repositories">
					<Suspense
						fallback={
							<div class="fallback">
								<Show when={repositories.loading}>Loading...</Show>
							</div>
						}
					>
						<For each={repositories()}>{RepositoryCard}</For>
					</Suspense>
				</div>
			</ErrorBoundary>
		</div>
	);
}
