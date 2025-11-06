class Storage {
    constructor() {
        this.state = {
            todos: [],
            count: 0,
        }
        this.callbacks = new Map();
    }

    subscribe = (callback) => {
        // Генерируем уникальный ключ для словаря коллбэков
        const key = Symbol();

         // Добавляем коллбэк в словарь
        this.callbacks.set(key, callback);

        // Возвращаем функцию отписки - удаляем коллбэк из словаря (перед этим проверяем наличие коллбэка по ключу, ключ попадает в функцию из замыкания)
        return () => {
            if (this.callbacks.has(key)) {
                this.callbacks.delete(key);
            }
        }
    }

    getState = () => {
        return this.state;
    };

    addTodo = (todo) => {
        this.state = {
            ...this.state,
            todos: [...this.state.todos, todo],
        }
        this.notify();
    }

    incrementCount = () => {
        this.state = {
            ...this.state,
            count: this.state.count + 1,
        }
        this.notify();
    }

    decrementCount = () => {
        this.state = {
            ...this.state,
            count: this.state.count - 1,
        }
        this.notify();
    }
    
    // При любом обновлении состояния вызываем все коллбэки
    notify = () => {
        this.callbacks.forEach(callback => {
            callback();
        });
    }
}

export const storage = new Storage();
