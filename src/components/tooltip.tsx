import { type FlowProps, children } from "solid-js";

import "./tooltip.css";
import { render } from "solid-js/web";

export default function Tooltip(props: FlowProps<{ text: string }>) {
	const resolved = children(() => props.children);
	const c = resolved.toArray()[0] as HTMLElement;
	if (!c) throw new Error("Tooltip must have a child.");
	c.style.position = "relative";
	c.classList.add("tooltip-container");

	render(() => <div class="tooltip">{props.text}</div>, c);

	return <>{resolved()}</>;
}
