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

    start = () => {
        if (this.status === 'STARTED') return;

        this.seconds = 0;
        this.savedSeconds = 0;

        this.call();

        const timer = setInterval(() => {
            this.seconds += 1;
            this.savedSeconds += 1;
            this.call();
        }, 1000);

        this.timer = timer;
        this.status = 'STARTED';
    }

    reset = () => {
        clearInterval(this.timer);
        this.timer = null;
        this.seconds = 0;
        this.savedSeconds = 0;
        this.status = 'RESET';
        this.call();
    }
    
    pause = () => {
        clearInterval(this.timer);
        this.timer = null;
        this.seconds = this.savedSeconds;
        this.status = 'PAUSED';
        this.call();;
    }

    resume = () => {
        if (this.status !== 'PAUSED') return;

        const timer = setInterval(() => {
            this.seconds += 1;
            this.savedSeconds += 1;
            this.call();;
        }, 1000);

        this.timer = timer;

        this.status = 'STARTED';
    }

    call() {
        this.callbacks.forEach(callback => {
            callback();
        });
    }
}

export const timerStore = new TimerStore();
