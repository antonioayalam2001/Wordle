import styles from "./keyboard.module.scss"
interface KeyboardProps {
    letters: string[],
    onClick: (letter: string) => void
}
export function Keyboard({ letters, onClick }: KeyboardProps) {
    const handleInput = (e: MouseEventHandler<HTMLButtonElement>) => {
        onClick(e.target.innerText.trim().toUpperCase())
    }

    return (
        <div className={styles.keyboardContainer}>
            {Array.from(Array(10)).map((_, i) => (
                <button key={i} className={styles.key} onClick={handleInput}>
                    {letters[i]}
                </button>
            ))}
            <div className={styles.emptyKey}></div>
            {Array.from(Array(9)).map((_, i) => (
                <button key={i + 10} className={styles.key} onClick={handleInput}>
                    {letters[i + 10]}
                </button>
            ))}
            <button className={styles.enterKey} onClick={handleInput}>
                ENTER
            </button>
            {Array.from(Array(7)).map((_, i) => (
                <button key={i + 19} className={styles.key} onClick={handleInput}>
                    {letters[i + 19]}
                </button>
            ))}
            <button className={styles.deleteKey} onClick={handleInput}>
                DELETE
            </button>
        </div>
    )
}