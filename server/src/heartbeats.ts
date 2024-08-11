import Heartbeats from "./core/heartbeat/heartbeats";
import Beat from "./core/heartbeat/beat";
import Heart from "./core/heartbeat/heart";

/**
 * @description Makes a new Heartbeats object.
 *
 * @param {Beat[]} beats - An array of Beat objects.
 *
 * @returns {Heartbeats}
 */
export function makeHeartBeats(
    ...beats: Beat[]
): Heartbeats {
    if (hasDuplicateBeats(beats)) {
        throw new Error("heart_beat_duplicate_error");
    }
    return new Heartbeats(beats);
}

/**
 * @description Check if given array of beats contains duplicates.
 *
 * @param {Beat[]} beats - An array of Beat objects.
 *
 * @returns {boolean}
 */
export function hasDuplicateBeats(beats: Beat[]): boolean {
    return beats.some((beat: Beat, index: number) => beats.findIndex((t: Beat) => (
        t.rate === beat.rate &&
        t.hearts.length === beat.hearts.length &&
        t.hearts.every((heart: Heart, i: number) => heart.callbacks.length === beat.hearts[i].callbacks.length)
    )) !== index);
}

/**
 * @description Makes a new Beat object for a Heartbeats object.
 *
 * @param {Heart[]} hearts - An array of Heart objects.
 * @param {number} rate - The rate at which the Beat object will pulse.
 *
 * @returns {Beat}
 */
export function makeBeat(hearts: Heart[], rate: number): Beat {
    return new Beat(hearts, rate);
}

/**
 * @description Makes a new Heart object for a Beat object.
 *
 * @param {Function[]} callbacks - An array of callback functions to be called when the Heart object pulses.
 *
 * @returns {Heart}
 */
export function makeHeart(callbacks: Function[]): Heart {
    return new Heart(callbacks);
}