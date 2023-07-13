import styles from "./Wordle.module.scss";
import { useEffect, useState } from "react";
import { useWindow } from "../hooks/useWindow";
import { getWordOfTheDay, isValidWord } from "../service/Request";
import { RowCompleted } from "./RowCompleted";
import { RowCurrent } from "./RowCurrent";
import { RowEmpty } from "./RowEmpty";
import { GameStatus } from "./types";
import { Keyboard } from "./Keyboard";
import Modal from "./Modal";
import Popup from "./PopUp";

const keys = [
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
];


interface responseExpected {
    status: boolean;
    meanings: [
        {
            definitions: [
                {
                    definition: string;
                }
            ]
        }
    ]
}

export function Wordle() {
    const [wordOfTheDay, setWordOfTheDay] = useState<string>("TUNAS");
    const [concept, setConcept] = useState<string>("");
    const [turn, setTurn] = useState<number>(1);
    const [currentWord, setCurrentWord] = useState<string>("");
    const [completedWord, setCompletedWord] = useState<string[]>([]);
    const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Playing);

    const handleKeyDown = (e: KeyboardEvent) => {
        const letter = e.key.toUpperCase();
        handleInput(letter);
    }

    function handleInput(letter: string) {
        if (gameStatus !== GameStatus.Playing) return;

        if (letter === "ENTER" && currentWord.length === 5) {
            submitWord();
            return;
        }
        if ((letter === "BACKSPACE" || letter === "DELETE") && currentWord.length > 0) {
            setCurrentWord(currentWord.slice(0, - 1));
            return;
        }
        if (currentWord.length >= 5) {
            return;
        }
        if (keys.includes(letter)) {
            setCurrentWord(currentWord + letter);
        }
    }

    useWindow("keydown", handleKeyDown)
    useEffect(() => {

        const word = getWordOfTheDay();
        setWordOfTheDay(word)
        return () => {
            // cleanup
        }
    }, [])

    async function submitWord() {
        //Gana el usuario
        if (currentWord === wordOfTheDay) {
            setCompletedWord([...completedWord, currentWord]);
            setGameStatus(GameStatus.Won);
            setConcept("Felicidades, ganaste el juego 🎉 Regresa mañana para una nueva palabra");
            return;
        }
        //Pierde el usuario
        if (turn === 5) {
            setCompletedWord([...completedWord, currentWord]);
            setGameStatus(GameStatus.Lost);
            return;
        }

        //Validar si existe la palabra
        const isValid: responseExpected = await isValidWord(currentWord);

        if (isValid.status) {
            setCompletedWord([...completedWord, currentWord]);
            setTurn(turn + 1);
            setCurrentWord("");
            setConcept(isValid.meanings[0].definitions[0].definition);
            return
        } else {
            setConcept("La palabra no es valida, intenta con otra");
        }
    }


    return (
        <div className={styles.mainContainer}>
            {concept !== "" && <Popup message={concept} onClose={() => setConcept("")} isOpen={concept !== ""} />}
            {
                completedWord.map((word, index) => {
                    return (
                        <RowCompleted key={index} word={word} solution={wordOfTheDay} />
                    )
                })
            }
            {
                gameStatus === GameStatus.Won
                    ? <Modal type="won" completedWords={completedWord} solution={wordOfTheDay} />
                    //Genera cajas conforme a la palabra
                    //Turno 1: 5 cajas vacias
                    //Turno 2: 4 cajas vacias pero ya había una con una letra
                    //Turno 3: 3 cajas vacias pero ya había dos con una letra
                    : gameStatus === GameStatus.Playing
                        ? <RowCurrent word={currentWord} />
                        : <Modal type="lost" completedWords={completedWord} solution={wordOfTheDay} />
            }
            {
                Array.from(Array(5 - turn)).map((_, index) => {
                    return (
                        <RowEmpty key={index} />
                    )
                })
            }

            <Keyboard letters={keys} onClick={handleInput} />

        </div>
    )
}