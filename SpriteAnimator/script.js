import CanvasSpriteAnimator from "./CanvasSpriteAnimator.js";

document.getElementById("animations").addEventListener("change", function (e) {
	animation.forEach((element) => {
		if (element == e.target.value) canvas.startAnimation(element);
		else canvas.stopAnimation(element);
	});
});

const spriteWidth = 128;
const spriteHeight = 128;
const spriteType = "Fighter";
let animation = ["attack1", "attack2", "attack3", "dead", "hurt", "idle", "jump", "run", "shield", "walk"];
let defaultAnimation = animation[5];
animation.forEach((element) => {
	let optionPanel = document.getElementById("animations");
	let option = document.createElement("option");
	option.value = element;
	option.innerHTML = element;
	if (element === defaultAnimation) option.selected = true;
	optionPanel.appendChild(option);
});

let background = new CanvasSpriteAnimator({
	animations: [{
		nombre: "background",
			frames: 1,
			width: 600,
			height: 600,
			source: `./sprites/background.png`,
	}],
	canvas_id: "canvas",
	canvas_width: 600,
	canvas_height: 600,
	style: `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-style: solid;
    `,
})

background.startAnimation('background')


//Crear otros sprites

/* 
let canvas2 = new CanvasSpriteAnimator({
	animations:[{
		nombre: 'runningShinobi',
		frames: 5,
		width: spriteWidth,
		height: spriteHeight,
		destination_canvas_height: 100,
		destination_canvas_width: 100,
		location_in_canvas_Y: 450,
		location_in_canvas_X: 0,
		source: `./sprites/Shinobi/Run.png`
	}],
	canvas_id: "canvas2",
	canvas_width: 600,
	canvas_height: 600,
	style: `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-style: solid;
    `,
});

let canvas3 = new CanvasSpriteAnimator({
	animations:[{
		nombre: 'walkingSamurai',
		frames: 5,
		width: spriteWidth,
		height: spriteHeight,
		destination_canvas_height: 100,
		destination_canvas_width: 100,
		location_in_canvas_Y: 400,
		location_in_canvas_X: 0,
		source: `./sprites/Samurai/Walk.png`
	}],
	canvas_id: "canvas3",
	canvas_width: 600,
	canvas_height: 600,
	style: `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-style: solid;
    `,
});
canvas2.startAnimation('runningShinobi')
canvas3.startAnimation('walkingSamurai')

const shinobispeed = 1;
const samuraispeed = 0.5;
let samurai = canvas3.returnAnimations();
let shinobi = canvas2.returnAnimations();
setInterval(() => {
    let samuraiAnimation = samurai.find(a => a.nombre === 'walkingSamurai');
    let shinobiAnimation = shinobi.find(a => a.nombre === 'runningShinobi');

    if (samuraiAnimation.location_in_canvas_X <= 610) {
        samuraiAnimation.location_in_canvas_X += samuraispeed;
    } else {
        samuraiAnimation.location_in_canvas_X = -100;
    }

    if (shinobiAnimation.location_in_canvas_X <= 610) {
        shinobiAnimation.location_in_canvas_X += shinobispeed;
    } else {
        shinobiAnimation.location_in_canvas_X = -100;
    }

    canvas3.updateAnimation({ current_name: 'walkingSamurai', location_in_canvas_X: samuraiAnimation.location_in_canvas_X });
    canvas2.updateAnimation({ current_name: 'runningShinobi', location_in_canvas_X: shinobiAnimation.location_in_canvas_X });
}, 10);
 */


let canvas = new CanvasSpriteAnimator({
	animations: [
		{
			nombre: "attack1",
			frames: 6,
			width: spriteWidth,
			height: spriteHeight,
			source: `./sprites/${spriteType}/Attack_1.png`,
			onAnimationEnd: `
            this.stopAnimation();
            let selectElement = document.getElementById('animations');
            selectElement.value = 'idle';
            selectElement.dispatchEvent(new Event('change'));
            `,
		},
		{
			nombre: "attack2",
			frames: 3,
			width: spriteWidth,
			height: spriteHeight,
			source: `./sprites/${spriteType}/Attack_2.png`,
		},
		{
			nombre: "attack3",
			frames: 4,
			width: spriteWidth,
			height: spriteHeight,
			source: `./sprites/${spriteType}/Attack_3.png`,
		},
		{
			nombre: "dead",
			frames: 3,
			width: spriteWidth,
			height: spriteHeight,
			source: `./sprites/${spriteType}/Dead.png`,
			onAnimationEnd: "this.stopAnimation('dead')",
		},
		{
			nombre: "hurt",
			frames: 3,
			width: spriteWidth,
			height: spriteHeight,
			source: `./sprites/${spriteType}/Hurt.png`,
		},
		{
			nombre: "idle",
			frames: 6,
			width: spriteWidth,
			height: spriteHeight,
			source: `./sprites/${spriteType}/Idle.png`,
		},
		{
			nombre: "jump",
			frames: 10,
			width: spriteWidth,
			height: spriteHeight,
			source: `./sprites/${spriteType}/Jump.png`,
		},
		{
			nombre: "run",
			frames: 8,
			width: spriteWidth,
			height: spriteHeight,
			source: `./sprites/${spriteType}/Run.png`,
		},
		{
			nombre: "shield",
			frames: 2,
			width: spriteWidth,
			height: spriteHeight,
			source: `./sprites/${spriteType}/Shield.png`,
		},
		{
			nombre: "walk",
			frames: 8,
			width: spriteWidth,
			height: spriteHeight,
			source: `./sprites/${spriteType}/Walk.png`,
		},
	],
	canvas_id: "canvas",
	canvas_width: 450,
	canvas_height: 450,
	style: `
        position: absolute;
        top: 57%;
        left: 50%;
        transform: translate(-50%, -50%);
    `,
});

canvas.startAnimation(defaultAnimation);
