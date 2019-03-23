import Dict, {Translation} from "./dict";

function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

class Searcher {
    private readonly data: Translation[];

    constructor(data: Translation[]) {
        this.data = data;
    }

    search(query: string): Translation[] {
        let exact = RegExp(`\\b${escapeRegExp(query)}\\b`, 'gi');
        console.log(exact);
        let results: [number, Translation][] = [];
        for (const translation of this.data) {
            let scores = [];

            for (const test of [translation.tokipona.replace(/\s(\(e \))?$/g, ''), translation.english]) {
                let occurrences = 0;
                let arr;
                while ((arr = exact.exec(test)) !== null) {
                    occurrences++;
                }
                if (occurrences > 0) {
                    scores.push(occurrences * ((500 / occurrences) - test.length));
                }

            }
            if (scores.length != 0) {
                let score = scores.length == 1 ? scores[0] : (scores[0] + scores[1])/2;
                if (score > 0) {
                    results.push([score, translation]);
                }
            }

        }
        results.sort((a, b) => {
            return a[0] < b[0] ? 1 : -1
        });
        console.log(results);
        return results.map(x => x[1]);
    }
}

class Dictionary {
    private table: HTMLTableElement;
    private searcher: Searcher;

    constructor() {

    }

    async run() {
        const data: Array<Translation> = [];

        for (const word of await Dict.getOfficial(false)) {
            data.push({
                tokipona: word.tokipona,
                english: `${word.formatClass()}: ${word.definitions.join(', ')}`
            })
        }

        data.push(...await Dict.getProperNouns());
        data.push(...await Dict.getSentences());
        data.push(...await Dict.getWords());

        this.searcher = new Searcher(data);

        document.getElementById('search').addEventListener('submit', (e) => {
            e.preventDefault();

            let formData = new FormData((e.target as HTMLFormElement));
            let searchQuery = (formData.get('query') as string);

            if (searchQuery) {
                this.search(searchQuery).catch(err => {
                    console.error(err);
                });
            }
        });

        this.table = (document.getElementById('table') as HTMLTableElement);
    }

    async search(query: string) {
        console.log('Searched for:', query);

        const tbody = document.createElement('tbody');

        const results = this.searcher.search(query);

        for (const result of results) {
            const row = tbody.insertRow(-1);
            row.insertCell(-1).innerHTML = result.tokipona;
            row.insertCell(-1).innerHTML = result.english;
        }

        this.table.replaceChild(tbody, this.table.tBodies[0]);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    let dictionary = new Dictionary();

    dictionary.run().catch(err => {
        console.error(err);
    });
});
