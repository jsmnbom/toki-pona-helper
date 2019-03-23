import 'mousetrap';
import * as template from './template';
import {random, sample, sampleSize} from 'lodash';
import {BaseTutor} from "./baseTutor";
import Dict, {Translation} from "./dict";

enum QuestionType {
    SelectEnglish,
    SelectTokiPona,
}

export class SentenceTutor extends BaseTutor {
    private data: Array<Translation>;
    private enabledQuestionTypes: Array<QuestionType>;
    private correctIndex: number;
    private answeredIndex: number;
    private currentQuestionType: QuestionType;

    constructor() {
        super();
        this.enabledQuestionTypes = [
            QuestionType.SelectEnglish,
            QuestionType.SelectTokiPona,
        ];
    }

    async getData() {
        this.data = await Dict.getSentences()
    }

    async emitQuestion() {
        this.stats.apply();

        this.currentQuestionType = sample(this.enabledQuestionTypes);

        switch (this.currentQuestionType) {
            case QuestionType.SelectEnglish:
                await this.selectEnglish();
                break;
            case QuestionType.SelectTokiPona:
                await this.selectTokiPona();
                break;
        }
    }

    async emitWrong() {
        let options = Array.from(this.element.querySelectorAll('li'));
        options[this.correctIndex].classList.add('is-correct');
        options[this.answeredIndex].classList.add('is-wrong');
    }

    listOnClick(i: number, e: Event) {
        e.preventDefault();
        this.checkSelectCorrect(i);
    }

    async select(f: (words: Array<Translation>, correctWord: Translation) => string, selector: string) {
        const correctWord = sample(this.data);

        let words = sampleSize(this.data.filter(word => word.class === correctWord.class && word !== correctWord), 7);

        this.correctIndex = random(words.length);

        words.splice(this.correctIndex, 0, correctWord);

        this.element.innerHTML = f(words, correctWord);

        this.element.querySelectorAll(selector).forEach((button, i) => {
            button.addEventListener('click', this.listOnClick.bind(this, i));
        });

        for (let i = 1; i <= 8; i++) {
            Mousetrap.bind(i.toString(), this.checkSelectCorrect.bind(this, i - 1));
        }
    }

    async selectEnglish() {
        await this.select((words, correctWord) => {
            return template.selectDefinition({
                word: correctWord.tokipona,
                definitions: words.map(word => word.english),
                help: 'Select the <b>english translation</b> for the <b>sentence</b> above.'
            });
        }, 'li > a');
    }

    async selectTokiPona() {
        await this.select((words, correctWord) => {
            return template.selectTokiPona({
                definition: correctWord.english,
                words: words.map(word => word.tokipona),
                help: 'Select the <b>toki pona translation</b> for the <b>sentence</b> above.'
            });
        }, 'li > a');
    }

    checkSelectCorrect(i: number) {
        this.answeredIndex = i;
        if (i == this.correctIndex) {
            this.correct();
        } else {
            this.wrong();
        }
    }
}