import tippy from "tippy.js";

export class Stats {
    private readonly elementCorrect: HTMLElement;
    private readonly elementWrong: HTMLElement;
    private readonly elementSkip: HTMLElement;
    private _correct: number;
    private _skip: number;
    private _wrong: number;
    private first: boolean;

    get percentCorrect(): number {
        return (this._correct / this.total) * 100
    }

    get percentWrong(): number {
        return (this._wrong / this.total) * 100
    }

    get percentSkip(): number {
        return (this._skip / this.total) * 100
    }

    get total(): number {
        return this._correct + this._wrong + this._skip
    }

    constructor() {
        this.elementCorrect = document.getElementById('stats-correct');
        this.elementWrong = document.getElementById('stats-wrong');
        this.elementSkip = document.getElementById('stats-skip');
        this._correct = 0;
        this._skip = 0;
        this._wrong = 0;
        this.first = true;

        const tooltipOptions = {
            content: '',
            animateFill: false,
            animation: 'fade',
            arrow: true
        };

        // @ts-ignore
        tippy(this.elementCorrect, {
            onShow: (instance) => {
                instance.setContent(`Answered ${this._correct} out of ${this.total} questions correct (${Math.round(this.percentCorrect)}%).`)
            },
            ...tooltipOptions
        });

        // @ts-ignore
        tippy(this.elementWrong, {
            onShow: (instance) => {
                instance.setContent(`Answered ${this._wrong} out of ${this.total} questions wrong (${Math.round(this.percentWrong)}%).`)
            },
            ...tooltipOptions
        });

        // @ts-ignore
        tippy(this.elementSkip, {
            onShow: (instance) => {
                instance.setContent(`Skipped ${this._skip} out of ${this.total} questions (${Math.round(this.percentSkip)}%).`)
            },
            ...tooltipOptions
        });
    }

    update() {
        this.elementCorrect.style.width = this.percentCorrect + '%';
        this.elementWrong.style.width = this.percentWrong + '%';
        this.elementSkip.style.width = this.percentSkip + '%';
    }

    correct() {
        if (this.first) {
            this._correct++;
            this.first = false;
        }
    }

    wrong() {
        if (this.first) {
            this._wrong++;
            this.update();
            this.first = false;
        }
    }

    skip() {
        if (this.first) {
            this._skip++;
            this.first = false;
        }
    }

    apply() {
        this.first = true;

        this.update();
    }
}