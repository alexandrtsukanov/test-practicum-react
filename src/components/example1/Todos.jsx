import { useState, useSyncExternalStore } from "react";
import { storage } from "../../utils/storage";

function Todos() {
    // Извлекаем из внешнего хранилища storage поле todos
    const { todos } = useSyncExternalStore(storage.subscribe, storage.getState);

    const [title, setTitle] = useState('');

    const changeTitle = (e) => {
        setTitle(e.target.value);
    };

    const addTodo = () => {
        const newTodo = {
            id: Math.random(),
            title,
        }
        storage.addTodo(newTodo);
        setTitle('');
    }

    return (
        <>
            <div>
                {todos.map(({ title, id }) => (
                    <div key={id}>{title}</div>
                ))}
            </div>
            
            <span>
                <input type="text" value={title} onChange={changeTitle} />
                <button onClick={addTodo}>Добавить Todo</button>
            </span>
        </>
    );
}

export default Todos;
