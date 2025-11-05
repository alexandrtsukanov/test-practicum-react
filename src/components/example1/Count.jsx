import { useSyncExternalStore } from "react";
import { storage } from "../../utils/storage";

function Count() {
    // Извлекаем из внешнего хранилища storage поле count
    const { count } = useSyncExternalStore(storage.subscribe, storage.getState);

    const increment = () => storage.incrementCount();
    const decrement = () => storage.decrementCount();

    return (
        <>
            <div>{count}</div>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </>
    );
}

export default Count;