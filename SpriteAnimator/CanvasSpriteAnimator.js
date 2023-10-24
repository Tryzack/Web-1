export default class CanvasSpriteAnimator extends HTMLElement {
	#animations;
	#addToElement;
	#canvas;
	#ctx;

	constructor({ animations = [], canvas_id = "canvas", canvas_width = 500, canvas_height = 500, style, addToElement }) {
		super();
		this.attachShadow({ mode: "open" });
		this.#canvas = document.createElement("canvas");
		this.#ctx = this.#canvas.getContext("2d");
		if (addToElement) this.#addToElement = addToElement;
		this.#animations = animations;
		this.#canvas.id = canvas_id;
		this.#canvas.width = canvas_width;
		this.#canvas.height = canvas_height;
		this.style = style;
		this.shadowRoot.appendChild(this.#canvas);
		this.#animations.forEach((animation) => this.#initializeAnimation(animation));
		this.addToBody();
	}

	#initializeAnimation(animation) {
		animation.playerImage = new Image();
		animation.playerImage.src = animation.source;

		animation.canvas = this.#canvas;
		animation.ctx = this.#ctx;

		if (!animation.location_in_canvas_X) animation.location_in_canvas_X = 0;
		if (!animation.location_in_canvas_Y) animation.location_in_canvas_Y = 0;
		if (!animation.destination_canvas_height) animation.destination_canvas_height = this.#canvas.height;
		if (!animation.destination_canvas_width) animation.destination_canvas_width = this.#canvas.width;

		let loc = [];
		for (let j = 0; j < animation.frames; j++) {
			let positionX = j * animation.width;
			loc.push({ x: positionX });
		}

		animation.spriteAnimation = { loc };
		animation.isActive = false;
		animation.gameFrame = 0;
		animation.staggerFrames = 5;
	}

	#animate(nombre) {
		const animation = this.#animations.find((a) => a.nombre === nombre);
		if (!animation || !animation.isActive) return;
		animation.ctx.clearRect(
			animation.location_in_canvas_X,
			animation.location_in_canvas_Y,
			animation.destination_canvas_width,
			animation.destination_canvas_height
		);
		let position = Math.floor(animation.gameFrame / animation.staggerFrames) % animation.spriteAnimation.loc.length;
		let frameX = animation.width * position;
		let frameY = 0;
		animation.ctx.drawImage(
			animation.playerImage,
			frameX,
			frameY,
			animation.width,
			animation.height,
			animation.location_in_canvas_X,
			animation.location_in_canvas_Y,
			animation.destination_canvas_height,
			animation.destination_canvas_width
		);

		requestAnimationFrame(() => this.#animate(nombre));

		animation.gameFrame++;

		if (position === animation.spriteAnimation.loc.length - 1) {
			if (animation.onAnimationEnd) {
				eval(animation.onAnimationEnd);
				animation.gameFrame = 0;
			}
		}
	}

	addAnimation(animation) {
		this.#initializeAnimation(animation);
		this.#animations.push(animation);
	}

	startAnimation(nombre) {
		const animation = this.#animations.find((a) => a.nombre === nombre);
		if (animation && !animation.isActive) {
			animation.isActive = true;
			this.#animate(nombre);
		}
	}

	stopAnimation(nombre) {
		const animation = this.#animations.find((a) => a.nombre === nombre);
		if (animation && animation.isActive) {
			animation.isActive = false;
			animation.gameFrame = 0;
		}
	}

	addToBody() {
		if (this.#addToElement) document.getElementById(this.#addToElement).appendChild(this);
		else document.body.appendChild(this);
	}

	updateAnimation({
		current_name,
		nombre,
		width,
		height,
		destination_canvas_height,
		destination_canvas_width,
		location_in_canvas_X,
		location_in_canvas_Y,
		source,
	}) {
		const animation = this.#animations.find((a) => a.nombre === current_name);
		if (animation) {
			if (nombre) animation.nombre = nombre;
			if (width) animation.width = width;
			if (height) animation.height = height;
			if (destination_canvas_height) animation.destination_canvas_height = destination_canvas_height;
			if (destination_canvas_width) animation.destination_canvas_width = destination_canvas_width;
			if (location_in_canvas_X) animation.location_in_canvas_X = location_in_canvas_X;
			if (location_in_canvas_Y) animation.location_in_canvas_Y = location_in_canvas_Y;
			if (source) animation.source = source;
		}
	}

	updateCanvas({ canvas_id, canvas_width, canvas_height, style }) {
		if (canvas_id) this.#canvas.id = canvas_id;
		if (canvas_width) this.#canvas.width = canvas_width;
		if (canvas_height) this.#canvas.height = canvas_height;
		if (style) this.style = style;
	}

	returnAnimations() {
		return this.#animations;
	}
}

customElements.define("canvas-sprite-animator", CanvasSpriteAnimator);
