import { useSyncExternalStore } from "react"
import { timerStore } from "../../utils/timerStore";

const Timer = () => {
    const time = useSyncExternalStore(timerStore.subscribe, timerStore.getState);

    return (
        <>
            <div style={{ fontSize: 96, fontWeight: 600 }}>{time}</div>
            <br />
            <span>
                <button onClick={timerStore.start}>Старт</button>
                <button onClick={timerStore.pause}>Стоп</button>
                <button onClick={timerStore.reset}>Сбросить</button>
                <button onClick={timerStore.resume}>Возобновить</button>
            </span>
        </>
    )
}

export default Timer;