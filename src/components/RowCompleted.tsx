import { Box } from "./Box"
import styles from "./row.module.css"

interface RowCompletedProps {
    word: string,
    solution: string
}
export function RowCompleted({ word, solution }: RowCompletedProps) {

    function checkLetter(letter: string, index: number) {
        //La solucion si cuenta con la letra
        if (solution.includes(letter)) {
            //Revisando si el inice de la letra coincide con el indice de la solucion
            if (solution[index] === letter) {
                return "correct"
            } else {
                return "present"
            }
        } else {
            //La solucion no cuenta con la letra
            return "absent"
        }
    }
    return (
        <div className={styles.row}>
            {
                Array.from(Array(5)).map((_, index) => {
                    return <Box key={index} value={word[index]} status={checkLetter(word[index], index)} />
                })
            }
        </div>)
}