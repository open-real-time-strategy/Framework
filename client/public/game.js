import OpenRts from "../src/client";

// Define properties for the canvas.
//
const canvas = document.getElementById("game");
if (!canvas) {
  throw new Error("Canvas not found");
}

const webgl = canvas.getContext("webgl");
if (!webgl) {
  throw new Error("WebGL not supported");
}

// OpenRts instance.
//
const openRts = new OpenRts(webgl);
openRts.render();