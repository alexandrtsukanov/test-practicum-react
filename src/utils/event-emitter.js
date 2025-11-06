class EventEmitter {
    constructor() {
        // Храним события в виде Map<Event, Set<callback>>
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
        //  Проверяем, что событие существует
        if (!this.events.has(event)) {
            return;
        }
        
        this.events.get(event).delete(cb);
    };

    //  Вызов всех коллбэков события
    emit(event, ...args) {
        //  Проверяем, что событие существует
        if (!this.events.has(event)) {
            return;
        }
        
        this.events.get(event).forEach(cb => cb(...args));
    };
}
