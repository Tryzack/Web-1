import CanvasSpriteAnimator from "./CanvasSpriteAnimator.js";

constructor(
{
animations[{},{
nombre: ,
source: ,
width: ,
height: ,
location_in_canvas_X: default(0),
location_in_canvas_Y: default(0),
destination_canvas_height: (default: canvas_height),
destination_canvas_width: (default: canvas_width),
onAnimationEnd: (evals content to run as a function between``),
}],
canvas_id: default('canvas'),
canvas_width: default(500),
canvas_height: default(500),
style: ,
addToElement: (insert ID of element in document to append there)
})

addAnimation({same as animations array in constructor})

startAnimation('animation.nombre')

stopAnimation('animation.nombre')

addToBody() adds element to body or to 'addtoElement'

updateAnimation({current_name (string of the current name of the animation), same as animations array in constructor})

updateCanvas({
canvas_id: ,
canvas_width: ,
canvas_height: ,
style: ,
}

returnAnimations() returns the animation list (used to check properties in animations like location_in_canvas_X)
