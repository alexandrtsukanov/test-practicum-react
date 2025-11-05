class EventEmitter {
    constructor() {
        this.events = new Map();
    };

    //  Подписка на событие с коллбэком cb
    subscribe(event, cb) {
        if (!this.events.has(event)) {
            this.events.set(event, new Set());
        }
        
        this.events.get(event).add(cb);
    };
    
    //  Отписка от события с коллбэком cb
    unsubscribe(event, cb) {
        if (!this.events.has(event)) {
            return;
        }
        
        this.events.get(event).delete(cb);
    };

    //  Вызов всех коллбэков события
    emit(event, ...args) {
        if (!this.events.has(event)) {
            return;
        }
        
        this.events.get(event).forEach(cb => cb(...args));
    };
}
