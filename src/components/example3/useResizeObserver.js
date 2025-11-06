import { useState, useSyncExternalStore } from "react";

// Создадим кастомный хук useResizeObserver, который будет в текущий момент времени вычислять размеры переданного в него HTML-элемента в виде ref
export const useResizeObserver = (ref) => {
    const [size, setSize] = useState({ height: 0, width: 0 });

    // Вычисление размеров
    const getSize = () => size;

    // Подписка на ResizeObserver. ResizeObserver высчитывает точные размеры переданного ref и сохраняет их в стейт size
    const subscribe = (callback) => {
        const observer = new ResizeObserver((entries) => {
            if (entries[0]) {
                const { height, width } = entries[0].contentRect;
                setSize({ height, width });
                callback();
            }
        });
    
        observer.observe(ref.current);

        return () => observer.disconnect();
    }

    // Получение размеров через useSyncExternalStore
    const dimensions = useSyncExternalStore(subscribe, getSize);

    return dimensions;
}
