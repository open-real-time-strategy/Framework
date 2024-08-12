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

// Open http 2.0 connection to server
//
const socket = new WebSocket("ws://localhost:8081");
socket.onopen = () => {
  console.log("Connected to server");
};

socket.onmessage = (event) => {
    console.log(event.data);
}

// OpenRts instance.
//
const openRts = new OpenRts(webgl);
openRts.render();