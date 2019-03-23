import 'mousetrap';
import * as template from './template';
import {random, sample, sampleSize} from 'lodash';
import {BaseTutor} from "./baseTutor";
import Dict, {DictWord} from "./dict";

enum QuestionType {
    SelectDefinition,
    SelectTokiPona,
    TypeTokiPona
}

export class SingleTutor extends BaseTutor {
    private data: Array<DictWord>;
    private enabledQuestionTypes: Array<QuestionType>;
    private correctIndex: number;
    private answeredIndex: number;
    private currentQuestionType: QuestionType;
    private correctWord: DictWord;
    private correctDefinition: string;

    constructor() {
        super();
        this.enabledQuestionTypes = [
            QuestionType.SelectDefinition,
            QuestionType.SelectTokiPona,
            QuestionType.TypeTokiPona
        ];
    }

    async getData() {
        this.data = await Dict.getOfficial();
    }

    async emitQuestion() {
        this.stats.apply();

        this.currentQuestionType = sample(this.enabledQuestionTypes);

        switch (this.currentQuestionType) {
            case QuestionType.SelectTokiPona:
                await this.selectTokiPona();
                break;
            case QuestionType.SelectDefinition:
                await this.selectDefinition();
                break;
            case QuestionType.TypeTokiPona:
                await this.typeTokiPona();
                break;
        }
    }

    async emitWrong() {
        if (this.currentQuestionType === QuestionType.TypeTokiPona) {
            await this.typeTokiPona(true);
        } else {
            let options = Array.from(this.element.querySelectorAll('li'));
            console.log(options);
            options[this.correctIndex].classList.add('is-correct');
            options[this.answeredIndex].classList.add('is-wrong');
        }
    }

    selectOnClick(i: number, e: Event) {
        e.preventDefault();
        this.checkSelectCorrect(i);
    }

    async select(f: (words: Array<DictWord>, correctWord: DictWord) => string) {
        const correctWord = sample(this.data);

        let words = sampleSize(this.data.filter(word => word.class === correctWord.class && word !== correctWord), 7);

        this.correctIndex = random(words.length);

        words.splice(this.correctIndex, 0, correctWord);

        this.element.innerHTML = f(words, correctWord);

        this.element.querySelectorAll('li > a').forEach((button, i) => {
            button.addEventListener('click', this.selectOnClick.bind(this, i));
        });

        for (let i = 1; i <= 8; i++) {
            Mousetrap.bind(i.toString(), this.checkSelectCorrect.bind(this, i - 1));
        }
    }

    async selectTokiPona() {
        await this.select((words, correctWord) => {
            return template.selectTokiPona({
                definition: sample(correctWord.definitions),
                wordClass: correctWord.formatClass(),
                words: words.map(word => word.tokipona)
            });
        });
    }

    async selectDefinition() {
        await this.select((words, correctWord) => {
            return template.selectDefinition({
                word: correctWord.tokipona,
                wordClass: correctWord.formatClass(),
                definitions: words.map(word => sample(word.definitions))
            });
        });
    }

    checkSelectCorrect(i: number) {
        this.answeredIndex = i;
        if (this.answeredIndex == this.correctIndex) {
            this.correct();
        } else {
            this.wrong();
        }
    }

    async typeTokiPona(wrong: boolean = false) {
        if (!wrong) {
            this.correctWord = sample(this.data);
            this.correctDefinition = sample(this.correctWord.definitions)
        }

        this.element.innerHTML = template.typeTokiPona({
            wordClass: this.correctWord.formatClass(),
            definition: this.correctDefinition,
            correctWord: this.correctWord.tokipona,
            wrong
        });

        // @ts-ignore
        const input: HTMLInputElement = document.getElementById('input');

        input.focus();

        document.getElementById('form').addEventListener('submit', (e) => {
            e.preventDefault();

            console.log(input.value.toLowerCase(), this.correctWord.tokipona);

            if (input.value.toLowerCase() === this.correctWord.tokipona) {
                this.correct();
            } else {
                this.wrong();
            }
        });

        if (wrong) {
            const callback = (e: Event) => {
                (e.target as HTMLElement).classList.remove('is-danger');
                (e.target as HTMLElement).classList.add('is-primary');
                document.getElementById('input').removeEventListener('input', callback);
            };

            document.getElementById('input').addEventListener('input', callback);
        }
    }
}