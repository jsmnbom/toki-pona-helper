import 'mousetrap';
import * as template from './template';
import {random, sample, sampleSize} from 'lodash';
import {BaseTutor} from "./baseTutor";
import Dict, {DictWord} from "../dict";

enum QuestionType {
    SelectSitelen,
    SelectLatin,
}

export class SitelenTutor extends BaseTutor {
    private data: Array<DictWord>;
    private enabledQuestionTypes: Array<QuestionType>;
    private correctIndex: number;
    private answeredIndex: number;
    private currentQuestionType: QuestionType;

    constructor() {
        super();
        this.enabledQuestionTypes = [
            QuestionType.SelectSitelen,
            QuestionType.SelectLatin,
        ];
    }

    async getData() {
        this.data = await Dict.getOfficial()
    }

    async emitQuestion() {
        this.stats.apply();

        this.currentQuestionType = sample(this.enabledQuestionTypes);

        switch (this.currentQuestionType) {
            case QuestionType.SelectSitelen:
                await this.selectSitelen();
                break;
            case QuestionType.SelectLatin:
                await this.selectLatin();
                break;
        }
    }

    async emitWrong() {
        let options;
        if (this.currentQuestionType === QuestionType.SelectSitelen) {
            options = Array.from(this.element.querySelectorAll('a.tile'));
        } else {
            options = Array.from(this.element.querySelectorAll('li'));

        }
        options[this.correctIndex].classList.add('is-correct');
        options[this.answeredIndex].classList.add('is-wrong');
    }

    listOnClick(i: number, e: Event) {
        e.preventDefault();
        this.checkSelectCorrect(i);
    }

    async select(f: (words: Array<DictWord>, correctWord: DictWord) => string, selector: string) {
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

    async selectSitelen() {
        await this.select((words, correctWord) => {
            return template.selectSitelen({
                correctWord: correctWord.tokipona,
                //wordClass: formatWordClass(correctWord.class),
                words: words.map(word => word.tokipona)
            });
        }, 'a.tile');
    }

    async selectLatin() {
        await this.select((words, correctWord) => {
            return template.selectLatin({
                correctWord: correctWord.tokipona,
                //wordClass: formatWordClass(correctWord.class),
                words: words.map(word => word.tokipona)
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