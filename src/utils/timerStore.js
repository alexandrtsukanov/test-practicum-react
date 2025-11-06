class TimerStore {
    constructor() {
        this.seconds = 0;
        this.timer = null;
        this.callbacks = new Map();
        this.savedSeconds = 0;
        this.status = 'RESET'; // RESET | PAUSED | STARTED
    }

    subscribe = (callback) => {
        const key = Symbol();

        this.callbacks.set(key, callback);

        return () => {
            if (this.callbacks.has(callback)) {
                this.callbacks.delete(key);
            }
        }
    }

    getState = () => this.seconds;

    launchTimer() {
        const timer = setInterval(() => {
            this.seconds += 1;
            this.savedSeconds += 1;
            this.call();;
        }, 1000);

        this.timer = timer;
        this.status = 'STARTED';
    }

    stopTimer() {
        clearInterval(this.timer);
        this.timer = null;
    }

    start = () => {
        if (this.status === 'STARTED') return;

        this.seconds = 0;
        this.savedSeconds = 0;

        this.call();
        this.launchTimer();
    }

    reset = () => {
        this.stopTimer();
        this.seconds = 0;
        this.savedSeconds = 0;
        this.status = 'RESET';
        this.call();
    }
    
    pause = () => {
        this.stopTimer();
        this.seconds = this.savedSeconds;
        this.status = 'PAUSED';
        this.call();
    }

    resume = () => {
        if (this.status !== 'PAUSED') return;

        this.launchTimer();
    }

    call() {
        this.callbacks.forEach(callback => {
            callback();
        });
    }
}

export const timerStore = new TimerStore();
