import { useEffect } from 'react';
//Agregando y eliminando eventos de ventana
export function useWindow(eventName: keyof WindowEventMap, callback: any) {
    useEffect(() => {
        window.addEventListener(eventName, callback);
        return () => {
            window.removeEventListener(eventName, callback);
        }
    }, [eventName, callback])

}