import Game from "../game/game";
import Mutex from "./mutex/mutex";

export default class State {
    /**
     * @description Mutexes are used to lock and unlock resources
     *              that are shared between multiple threads.
     *
     * @type {Mutex}
     */
    private readonly mutexes = new Mutex();

    /**
     * @description A timeline of events that have occurred on the server.
     *             The key is the time the event occurred.
     *
     * @type {Map<number, Map<string>}
     */
    private events: Map<number, Map<string, any> | null> = new Map();

    /**
     * @description A map of all the games that are currently running
     *              on the server.
     *
     *              The key is the game id.
     *
     * @type {Map<string, Game>}
     */
    games: Map<string, Game> = new Map();


    /**
     * @description State is shared between all threads. When a thread
     *              modifies the state, it must lock the resources it
     *              is modifying.
     *
     *              For example, if a thread is modifying a game, it will
     *              lock only the game it is modifying and not the entire
     *              games map.
     */
    private modify(key: string, callback: Function): void {
        this.mutexes.lock(
            key,
            () => {
                callback();
                this.mutexes.unlock(key);
            }
        );
    }


    /**
     * @description
     */
    public updateEvents() {
        const now = Date.now();
        if (!this.events.has(now)) {
            this.events.set(now, null);
        }
    }


}