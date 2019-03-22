export class Word {
    word: string;
    class: string;
    definitions: string[];

    constructor(raw: object) {
        // @ts-ignore
        this.word = raw['word'].replace(/\s(\(e \))?$/g, '');
        // @ts-ignore
        this.class = raw['class'].trim();
        // @ts-ignore
        this.definitions = raw['definitions'].split(/[;,]/).map(def => def.trim());
    }
}

export async function getOfficialDict() {
    const raw = (await import("../data/official-dict.csv")).default;
    return raw.map((rawWord: object) => new Word(rawWord)).filter((word: Word) => !(['separator', 'conjuction'].includes(word.class)));
}

export function formatWordClass(wordClass: string) {
    let flip = ['verb transitive', 'verb intransitive'];

    if (flip.indexOf(wordClass) !== -1) {
        return wordClass.split(' ').reverse().join(' ')
    }
    return wordClass;
}