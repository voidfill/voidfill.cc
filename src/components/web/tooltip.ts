function findRect(el: HTMLElement): DOMRect {
	let r = el.getBoundingClientRect();
	if (r.width || r.height) return r;

	for (const c of el.children) {
		const r = findRect(c as HTMLElement);
		if (r.width || r.height) return r;
	}

	const Range = document.createRange();
	for (const n of el.childNodes) {
		Range.selectNode(n);
	}
	r = Range.getBoundingClientRect();

	return r;
}

class ToolTip extends HTMLElement {
	static observedAttributes = ["text"];
	tip: HTMLElement;

	isVisible = false;

	boundListeners = {
		onHover: this.onHover.bind(this),
		onLeave: this.onLeave.bind(this),
	};

	constructor() {
		super();
		this.tip = document.createElement("div");
		this.tip.classList.add("tooltip");
		this.tip.textContent = this.getAttribute("text");
	}

	connectedCallback() {
		this.onmouseenter = this.boundListeners.onHover;
	}

	disconnectedCallback() {
		this.onLeave();
	}

	adoptedCallback() {
		this.onLeave();
	}

	attributeChangedCallback(name: string, _: string, newValue: string) {
		if (name === "text") {
			this.tip.textContent = newValue;
		}
	}

	onHover() {
		if (this.isVisible) return;
		const r = findRect(this);

		this.onmouseleave = this.onLeave;
		document.addEventListener("scroll", this.boundListeners.onLeave, true);
		document.addEventListener("resize", this.boundListeners.onLeave);
		document.addEventListener("mousedown", this.boundListeners.onLeave, true);

		this.isVisible = true;
		const x = r.left + r.width / 2;
		const y = r.top;
		this.tip.setAttribute("style", `top: ${y}px; left: ${x}px;`);
		document.body.appendChild(this.tip);
	}

	onLeave() {
		if (!this.isVisible) return;

		document.removeEventListener("scroll", this.boundListeners.onLeave, true);
		document.removeEventListener("resize", this.boundListeners.onLeave);
		document.removeEventListener("mousedown", this.boundListeners.onLeave, true);

		this.isVisible = false;
		document.body.removeChild(this.tip);
	}
}

customElements.define("tool-tip", ToolTip);
