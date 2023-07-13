import { BoxStatus } from "./types"
import styles from "./box.module.scss"
// Queremos hacer un binding de estilos y que solo aplique aquellos que sean verdaderos
import classNames from "classnames/bind"

const classes = classNames.bind(styles)  // Esto es para hacer el binding de estilos

interface BoxProps {
    value: string,
    status: BoxStatus
}
export function Box({ value, status }: BoxProps) {
    const boxStatus = classes({
        correct: status === "correct",
        present: status === "present",
        absent: status === "absent",
        empty: status === "empty",
        edit: status === "edit",
    })
    return (
        <div className={boxStatus}>
            <p>{value}</p>
        </div>)
}