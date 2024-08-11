export default class Mutex {
    private locks: { [key: string]: boolean } = {};
    private queue: { [key: string]: Function[] } = {};

    /**
     * @description Lock a resource with a key.
     * @param {string} key - The key to lock the resource with.
     * @param {Function} callback - The callback to execute when the resource is locked.
     */
    public lock(key: string, callback: Function) {
        // If already locked, add to queue
        //
        if (this.locks[key]) {
            if (!this.queue[key]) {
                this.queue[key] = [];
            }
            this.queue[key].push(callback);
        }

        // If not locked, lock and execute callback
        //
        else {
            this.locks[key] = true;
            callback();
        }
    }

    /**
     * @description Unlock a resource with a key.
     * @param {string} key - The key to unlock the resource with.
     * @returns {void}
     */
    public unlock(key: string) {
        // If queue is empty, unlock
        //
        if (!this.queue[key] || this.queue[key].length === 0) {
            this.locks[key] = false;
        } else {
            const next = this.queue[key].shift();
            if (next) {
                next();
            }
        }
    }
}