import { useSyncExternalStore } from "react";

// В функции подписки добавляем обработчик на события online - срабатывает, когда сеть
// пользователя появляется и offline - срабатывает, когда сеть пропадает
function subscribe(callback) {
    window.addEventListener('online', callback);
    window.addEventListener('offline', callback);

    return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
    };
}

// В функции получения данных берем информацию, есть ли соединение с сетью,
// из глобального объекта navigator
function getIsOnline() {
    return navigator.onLine;
}

function App() {
    // Получаем информацию, есть ли соединение с сетью, внутри компонента
    const isOnline = useSyncExternalStore(subscribe, getIsOnline);
  
    return (
        <h1>{isOnline ? 'Online' : 'Disconnected'}</h1>
    );
}

export default App;
