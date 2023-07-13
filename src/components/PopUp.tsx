import { useEffect, useState } from "react";
import "./PopUp.css";
import { CSSTransition } from "react-transition-group";

interface PopupProps {
    isOpen: boolean;
    message: string;
    onClose: () => void;
}

const Popup = ({ isOpen, message, onClose }: PopupProps) => {
    const [isClosing, setIsClosing] = useState(isOpen);

    useEffect(() => {
        const closeTimeout = setTimeout(() => {
            setIsClosing(false)
        }, 2000); // Duración de la animación en milisegundos
        const clearModal = setTimeout(() => {
            onClose()
        }, 4500); // Duración de la animación en milisegundos

        return () => {
            clearTimeout(closeTimeout);
            clearTimeout(clearModal);
        };
    }, [onClose]);

    return (
        <CSSTransition
            in={isClosing}
            timeout={3000} // Duración de la animación en milisegundos
            classNames="popup-transition"
            appear={true}
            onExit={() => setIsClosing(false)}
        >
            <div className="popup">
                <div className="popup-content">
                    <h4>{message}</h4>
                </div>
            </div>

        </CSSTransition>

    );
};

export default Popup;