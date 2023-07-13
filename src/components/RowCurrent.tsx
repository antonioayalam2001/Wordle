import { Box } from "./Box"
import styles from "./row.module.css"
interface RowCompletedProps {
    word: string
}
// Rellena cada caja con un valor, se evalua a nivel de estado al dar enter se dice si esta o no correcto
export function RowCurrent({ word }: RowCompletedProps) {
    return (
        <div className={styles.row}>
            {
                Array.from(word).map((letter, index) => {
                    return (
                        <Box key={index} value={letter} status="edit" />
                    )
                })
            }
            {
                // Rellena las cajas vacias con un valor
                Array.from(Array(5 - word.length)).map((letter: string, index) => {
                    return (
                        <Box key={index} value={letter} status="edit" />
                    )
                })
            }
        </div>)
}