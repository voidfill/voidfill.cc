import { type JSX, createEffect, type FlowProps } from "solid-js";
import "../web/tooltip";
import "../css/tooltip.css";

declare module "solid-js" {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace JSX {
		interface IntrinsicElements {
			"tool-tip": FlowProps<{
				text: string;
			}>;
		}
	}
}

export default function Tooltip(props: FlowProps<{ text: string }>): JSX.Element {
	const el = <tool-tip text={props.text}>{props.children}</tool-tip>;

	// eslint-disable-next-line solid/reactivity
	(el as HTMLElement).setAttribute("text", props.text);
	createEffect(() => {
		(el as HTMLElement).setAttribute("text", props.text);
	});

	return el;
}
