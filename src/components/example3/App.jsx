import { useRef } from "react";
import { useResizeObserver } from "./useResizeObserver";

function App() {
    const ref = useRef(null);

    const dimensions = useResizeObserver(ref);

    // Выводим на экран полученные через useSyncExternalStore размеры экрана. Теперь мы можем сворачисать как угодно окно браузера, и у нас будут
    // отображаться актуальные размеры экрана в пикселях!
    return (
        <div ref={ref} style={{ height: '100vh', width: '100vw' }}>
            <div>Высота экрана: {dimensions.height}</div>
            <div>Ширина экрана: {dimensions.width}</div>
        </div>
    );
}

export default App;
