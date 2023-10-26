//Might implement greensock, phraser, createJs, or pixiJs in the future

export default class CanvasSpriteAnimator extends HTMLElement {
	
	#animations;
	#addToElement;
	#canvas;
	#ctx;

	/**
	 * Creates a new CanvasSpriteAnimator instance.
	 * @constructor
	 * @param {Object} - contains the parameters for the CanvasSpriteAnimator instance.
	 * 	@property {Object[]} animations - An array of animation objects.
	 *		 Each animation object should have the following properties:
	 *	   @property {string} nombre - The name of the animation.
	 *	   @property {Image} playerImage - The image to use for the animation.
	 *	   @property {number} frames - The amount of Frames in the animation.
	 *	   @property {number} width - The width of each frame in the animation.
	 *	   @property {number} height - The height of each frame in the animation.
	 *	   @property {number} location_in_canvas_X - The X location of the animation in the canvas.
	 *	   @property {number} location_in_canvas_Y - The Y location of the animation in the canvas.
	 *	   @property {number} destination_canvas_height - The height of the animation in the canvas.
	 *	   @property {number} destination_canvas_width - The width of the animation in the canvas.
	 *	   @property {string} source - The source of the spritesheet to use for the animation (has to be a png with vertical only sprites).
	 *	   @property {string} [onAnimationEnd] - The function to call when the animation ends.
	 * 	@param {string} canvas_id - The ID of the canvas element to use.
	 * 	@param {number} canvas_width - The width of the canvas element.
	 * 	@param {number} canvas_height - The height of the canvas element.
	 * 	@param {string} [style] - The CSS style to apply to the canvas element.
	 * 	@param {HTMLElement} [addToElement] - The element to append the canvas element to.
	 */
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

	/**
	 * @function addAnimation - Adds an animation to the canvas.
	 * @param {Object} animation - The animation object to add.
	 *  The animation object should have the following properties:
	 *	 @property {string} nombre - The name of the animation.
	 *   @property {Image} playerImage - The image to use for the animation.
	 *   @property {number} frames - The amount of Frames in the animation.
	 *   @property {number} width - The width of each frame in the animation.
	 *   @property {number} height - The height of each frame in the animation.
	 *   @property {number} location_in_canvas_X - The X location of the animation in the canvas.
	 *   @property {number} location_in_canvas_Y - The Y location of the animation in the canvas.
	 *   @property {number} destination_canvas_height - The height of the animation in the canvas.
	 * 	 @property {number} destination_canvas_width - The width of the animation in the canvas.
	 *   @property {string} source - The source of the spritesheet to use for the animation (has to be a png with vertical only sprites).
	 *   @property {string} [onAnimationEnd] - The function to call when the animation ends.
	 */
	addAnimation(animation) {
		this.#initializeAnimation(animation);
		this.#animations.push(animation);
	}

	/**
	 * @function startAnimation - Starts an animation.
	 * @param {string} nombre - The name of the animation to start.
	 */
	startAnimation(nombre) {
		const animation = this.#animations.find((a) => a.nombre === nombre);
		if (animation && !animation.isActive) {
			animation.isActive = true;
			this.#animate(nombre);
		}
	}

	/**
	 * @function stopAnimation - Stops an animation.
	 * @param {string} nombre - The name of the animation to stop if it is active.
	 */
	stopAnimation(nombre) {
		const animation = this.#animations.find((a) => a.nombre === nombre);
		if (animation && animation.isActive) {
			animation.isActive = false;
			animation.gameFrame = 0;
		}
	}

	/**
	 * @function addToBody - Adds the canvas element to the body of the document.
	 * If the addToElement property was set in the constructor, it will add the canvas element to that element instead.
	 */
	addToBody() {
		if (this.#addToElement) document.getElementById(this.#addToElement).appendChild(this);
		else document.body.appendChild(this);
	}

	/**
	 * @function updateAnimation - Updates an animation.
	 * @param {Object} animation - The animation object to update.
	 * The animation object should have the following properties:
	 *	@property {string} current_name - The current name of the animation.
	 *	@property {string} [nombre] - The new name of the animation.
	 * 	@property {number} [width] - The new width of each frame in the animation.
	 * 	@property {number} [height] - The new height of each frame in the animation.
	 * 	@property {number} [destination_canvas_height] - The new height of the animation in the canvas.
	 * 	@property {number} [destination_canvas_width] - The new width of the animation in the canvas.
	 * 	@property {number} [location_in_canvas_X] - The new X location of the animation in the canvas.
	 * 	@property {number} [location_in_canvas_Y] - The new Y location of the animation in the canvas.
	 * 	@property {string} [source] - The new source of the spritesheet to use for the animation (has to be a png with vertical only sprites).
	 * 	@property {string} [onAnimationEnd] - The new function to call when the animation ends.
	 */
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
		onAnimationEnd,
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
			if (onAnimationEnd) animation.onAnimationEnd = onAnimationEnd;
		}
	}

	/**
	 * @function updateCanvas - Updates the canvas element.
	 * @param {string} [canvas_id] - The ID of the canvas element to use.
	 * @param {number} [canvas_width] - The width of the canvas element.
	 * @param {number} [canvas_height] - The height of the canvas element.
	 * @param {string} [style] - The CSS style to apply to the canvas element.
	 */
	updateCanvas({ canvas_id, canvas_width, canvas_height, style }) {
		if (canvas_id) this.#canvas.id = canvas_id;
		if (canvas_width) this.#canvas.width = canvas_width;
		if (canvas_height) this.#canvas.height = canvas_height;
		if (style) this.style = style;
	}

	/**
	 * @function returnAnimations - Returns the animations array.
	 * @returns {Object[]} The animations array.
	 */
	getAnimations() {
		return this.#animations;
	}
}

customElements.define("canvas-sprite-animator", CanvasSpriteAnimator);
