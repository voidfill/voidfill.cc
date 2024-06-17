import type { FlowProps } from "solid-js";
import { Dynamic } from "solid-js/web";

export default function HeaderLink(props: FlowProps<{ level: number; id?: string }>) {
	return (
		<a
			href={"#" + props.id}
			class={"heading-link level-" + props.level}
			style={{
				"text-decoration": "none",
				color: "inherit",
			}}
		>
			<Dynamic component={"h" + props.level} id={props.id}>
				{props.children}
			</Dynamic>
		</a>
	);
}

export function h(level: number) {
	return (props: FlowProps<{ id?: string }>) => (
		<HeaderLink level={level} id={props.id}>
			{props.children}
		</HeaderLink>
	);
}
