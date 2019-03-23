export class DictWord {
    tokipona: string;
    class: string;
    definitions: string[];

    constructor(raw: object, trimE: boolean) {
        // @ts-ignore
        this.tokipona = raw['tokipona'];
        if (trimE) {
            this.tokipona = this.tokipona.replace(/\s(\(e \))?$/g, '');
        }
        // @ts-ignore
        this.class = raw['class'].trim();
        // @ts-ignore
        this.definitions = raw['english'].split(/,/).map(def => def.trim());
    }

    formatClass() {
        if (['verb transitive', 'verb intransitive'].indexOf(this.class) !== -1) {
            return this.class.split(' ').reverse().join(' ')
        }
        return this.class;
    }
}

export type Translation = {
    tokipona: string;
    english: string;
    [key: string]: string
}

export default class Dict {
    static async getOfficial(trimE: boolean = true): Promise<Array<DictWord>> {
        const raw = (await import("../dict/official.csv")).default;
        return raw.map((rawWord: object) => new DictWord(rawWord, trimE));
    }

    static async getWords(): Promise<Array<Translation>> {
        const raw = (await import("../dict/words.csv")).default;
        return raw.map((rawWord: object) => rawWord);
    }

    static async getProperNouns(): Promise<Array<Translation>> {
        const raw = (await import("../dict/proper-nouns.csv")).default;
        return raw.map((rawWord: object) => rawWord);
    }

    static async getSentences(): Promise<Array<Translation>> {
        const raw = (await import("../dict/sentences.csv")).default;
        return raw.map((rawWord: object) => rawWord);
    }
}