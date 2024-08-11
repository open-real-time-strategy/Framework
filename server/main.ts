import Server from "./src/server";
import {makeBeat, makeHeart, makeHeartBeats} from "./src/heartbeats";
import State from "./src/core/state";

// Some basic configuration
//
const debug: boolean = true;

// Initialize the state and its heartbeat.
//
const state = new State();
const stateHeart = makeHeart([
    state.updateEvents.bind(state),
]);




// Create the heartbeats and start the server.
//
const beat = makeBeat([stateHeart], 1000);
const heartbeats = makeHeartBeats(beat);

const server = new Server({
    debug: debug,
    heartbeats: heartbeats,
});
server.start();

