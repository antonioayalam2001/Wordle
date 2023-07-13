import { WORDS } from "./words";

function getWords() {
    return WORDS;
}

function getNumberOfDay() {
    const now = new Date().getTime(); //new Date('2023-07-12T00:04:16.000Z')
    const year = new Date().getFullYear();
    console.log(now);
    const start = new Date(year, 0, 0).getTime(); //new Date('2022-12-31T06:00:00.000Z')
    //Haciendo la resta de las dos fechas, obtenemos la cantidad de milisegundos que hay entre ellas
    const diff = now - start; //16653936358
    const oneDay = 1000 * 60 * 60 * 24; //86400000
    console.log(Math.floor(diff / oneDay));
    return Math.floor(diff / oneDay); //192
}

export function getWordOfTheDay() {
    const words = getWords();
    const index = getNumberOfDay() % words.length;
    return words[index].toUpperCase();
}

export async function isValidWord(word: string) {
    const words = getWords();
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    if (data?.title === 'No Definitions Found') {
        return {
            meanings: words,
            status: false,
        };
    }
    const { meanings } = data[0];
    return { meanings, status: true }
}