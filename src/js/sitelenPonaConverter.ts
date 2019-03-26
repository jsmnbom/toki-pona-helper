import {stringify} from 'query-string';
import * as ClipboardJS from 'clipboard';
import tippy from "tippy.js";

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): [string[], number] {
    let lines: string[] = [];
    let maxSeenWidth = 0;

    for (const line of text.split('\n')) {
        lines.push('');
        const words = line.split(' ');

        for (let n = 0; n < words.length; n++) {
            const line = lines[lines.length - 1] + words[n] + ' ';
            const width = ctx.measureText(line).width;
            if (width > maxSeenWidth) {
                maxSeenWidth = width;
            }
            if (width > maxWidth && n > 0) {
                lines.push('');
                lines[lines.length - 1] = words[n] + ' ';
            } else {
                lines[lines.length - 1] = line;
            }
        }
    }

    return [lines.map(line => line.trim()), maxSeenWidth]
}

function base64UrlSafeEncode(unencoded: string) {
    return new Buffer(unencoded || '').toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

class SitelenPonaConverter {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private outputBox: HTMLDivElement;
    private helpModal: HTMLDivElement;
    private textInput: HTMLTextAreaElement;
    private fontSizeInput: HTMLInputElement;
    private wrapInput: HTMLInputElement;
    private fontSize: number;
    private wrap: boolean;
    private ready: boolean = false;

    onFontSizeChange = async () => {
        this.fontSize = parseInt(this.fontSizeInput.value);

        await this.redraw();
    };

    onTextChange = async () => {
        if (this.textInput.scrollHeight > this.textInput.clientHeight && this.textInput.clientHeight <= 250) {
            this.textInput.style.height = this.textInput.scrollHeight + 10 + "px";
        }

        await this.redraw();
        await this.redraw();
    };

    onWrapChange = async () => {
        this.wrap = this.wrapInput.checked;

        await this.redraw();
        await this.redraw();
    };

    onDownload = async () => {
        const data = this.canvas.toDataURL('image/png');
        let a = document.createElement('a');
        a.href = data;
        a.download = `${this.textInput.value}.png`;
        document.body.appendChild(a);
        a.click();
    };

    getCopyLinkText = () => {
        const [width, height, lines] = this.getData();

        const query = stringify({
            w: width,
            h: height,
            f: this.fontSize,
            l: lines.map(line => base64UrlSafeEncode(line))
        }, {
            arrayFormat: 'bracket'
        });
        const link = `https://toki-pona-helper.glitch.me/sitelen?${query}`;

        console.log('Link: ', link);
        return link
    };

    onHelp = async () => {
        this.helpModal.classList.add('is-active');
    };

    onCloseHelp = async () => {
        this.helpModal.classList.remove('is-active');
    };

    getData = (): [number, number, string[]] => {
        const boxComputedStyle = window.getComputedStyle(this.outputBox);

        const maxWidth = this.wrap ? (this.outputBox.clientWidth - parseFloat(boxComputedStyle.paddingLeft) - parseFloat(boxComputedStyle.paddingRight) - 10 * 2) : Infinity;

        const [lines, maxSeenWidth] = wrapText(this.ctx, this.textInput.value, maxWidth);

        const width = this.wrap ? (maxSeenWidth > maxWidth ? maxSeenWidth : maxWidth) : maxSeenWidth + 10;
        const height = 10 + (this.fontSize * lines.length * 1.25);

        return [width, height, lines];
    };

    redraw = async () => {
        if (this.ready) {
            const [width, height, lines] = this.getData();

            this.canvas.width = width;
            this.canvas.height = height;
            this.ctx.font = `${this.fontSize}px linja-pona`;
            this.ctx.textBaseline = 'top';

            this.ctx.fillStyle = 'white';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.ctx.fillStyle = 'black';
            for (const [index, line] of lines.entries()) {
                this.ctx.fillText(line, 10, 10 + (index * this.fontSize * 1.25));
            }
        }
    };

    async run() {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.outputBox = document.getElementById('output_box') as HTMLDivElement;
        this.helpModal = document.getElementById('help_modal') as HTMLDivElement;
        this.textInput = document.getElementById('text_input') as HTMLTextAreaElement;
        this.wrapInput = document.getElementById('wrap_input') as HTMLInputElement;
        this.fontSizeInput = document.getElementById('font_size_input') as HTMLInputElement;

        this.fontSizeInput.addEventListener('input', this.onFontSizeChange);
        this.textInput.addEventListener('input', this.onTextChange);
        this.wrapInput.addEventListener('change', this.onWrapChange);

        document.getElementById('download_button').addEventListener('click', this.onDownload);
        document.getElementById('help_button').addEventListener('click', this.onHelp);
        document.getElementById('modal_background').addEventListener('click', this.onCloseHelp);
        document.getElementById('modal_close').addEventListener('click', this.onCloseHelp);


        const copyLinkButton = document.getElementById('copy_link_button');
        //TODO: ClipboardJS.isSupported()
        const clipboard = new ClipboardJS(copyLinkButton, {
            text: this.getCopyLinkText
        });
        const clipBoardTooltip = tippy(copyLinkButton, {
            content: '',
            animateFill: false,
            animation: 'fade',
            arrow: true,
            trigger: 'manual',
        });
        for (const [event, message] of [['success', 'Copied!'], ['error', 'Not supported!']]) {
            clipboard.on(event, () => {
                // @ts-ignore
                clipBoardTooltip.setContent(message);
                // @ts-ignore
                clipBoardTooltip.show();
            });
        }

        this.wrapInput.dispatchEvent(new Event('change'));
        this.fontSizeInput.dispatchEvent(new Event('input'));
        this.textInput.dispatchEvent(new Event('input'));

        this.ready = true;
        await this.redraw();
        await this.redraw();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let converter = new SitelenPonaConverter();

    converter.run().catch(err => {
        console.error(err);
    });
});
