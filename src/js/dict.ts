export class DictWord {
    tokipona: string;
    class: string;
    definitions: string[];

    constructor(raw: object) {
        // @ts-ignore
        this.tokipona = raw['tokipona'].replace(/\s(\(e \))?$/g, '');
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

export class Translation {
    tokipona: string;
    english: string;

    constructor(raw: object) {
        // @ts-ignore
        this.tokipona = raw['tokipona'];
        // @ts-ignore
        this.english = raw['english'];
    }
}

export default class Dict {
    static async getOfficial(): Promise<Array<DictWord>> {
        const raw = (await import("../dict/official.csv")).default;
        return raw.map((rawWord: object) => new DictWord(rawWord));
    }

    static async getWords(): Promise<Array<Translation>> {
        const raw = (await import("../dict/words.csv")).default;
        return raw.map((rawWord: object) => new Translation(rawWord));
    }

    static async getProperNouns(): Promise<Array<Translation>> {
        const raw = (await import("../dict/proper-nouns.csv")).default;
        return raw.map((rawWord: object) => new Translation(rawWord));
    }

    static async getSentences(): Promise<Array<Translation>> {
        const raw = (await import("../dict/sentences.csv")).default;
        return raw.map((rawWord: object) => new Translation(rawWord));
    }

    static async getAll(): Promise<Array<Translation | DictWord>> {
        let all: Array<Translation | DictWord> = [];

        all.concat(await this.getOfficial());
        all.concat(await this.getWords());
        all.concat(await this.getProperNouns());
        all.concat(await this.getSentences());

        return all;
    }
}