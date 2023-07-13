
import { Box } from "./Box"
import styles from "./row.module.css"
export function RowEmpty() {
    return (
        <div className={styles.row}>
            {
                Array.from(Array(5)).map((_, index) => {
                    return <Box key={index} value="" status="empty" />
                })
            }
        </div>)
}