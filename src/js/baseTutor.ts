import {Stats} from "./stats";

export abstract class BaseTutor {
    element: HTMLElement;
    stats: Stats;

    protected constructor() {
        this.element = document.getElementById('content');

        this.stats = new Stats();

        document.getElementById('skip-button').addEventListener('click', this.skip.bind(this));
    }

    abstract getData(): void;

    abstract emitQuestion(): Promise<void>;

    abstract emitWrong(): Promise<void>;

    async run() {
        await this.getData();
        await this.emitQuestion()
    }

    correct(e: Event = null) {
        if (e !== null) {
            e.preventDefault();
        }
        console.log('Correct!');
        this.stats.correct();
        this.emitQuestion().catch(err => {
            console.error(err);
        });
    }

    wrong(e: Event = null) {
        if (e !== null) {
            e.preventDefault();
        }
        console.log('Wrong!');
        this.stats.wrong();
        this.emitWrong().catch(err => {
            console.error(err);
        });
    }


    skip(e: Event = null) {
        if (e !== null) {
            e.preventDefault();
        }
        console.log('Skip!');
        this.stats.skip();
        this.emitQuestion().catch(err => {
            console.error(err);
        });
    }
}
