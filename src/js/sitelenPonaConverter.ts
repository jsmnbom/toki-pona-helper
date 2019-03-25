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

class SitelenPonaConverter {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private outputBox: HTMLDivElement;
    private downloadButton: HTMLButtonElement;
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

    redraw = async () => {
        if (this.ready) {
            const boxComputedStyle = window.getComputedStyle(this.outputBox);

            const maxWidth = this.wrap ? (this.outputBox.clientWidth - parseFloat(boxComputedStyle.paddingLeft) - parseFloat(boxComputedStyle.paddingRight) - 10 * 2) : Infinity;

            const [lines, maxSeenWidth] = wrapText(this.ctx, this.textInput.value, maxWidth);

            this.canvas.width = maxSeenWidth;
            this.canvas.height = 10 + (this.fontSize * lines.length * 1.25);
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
        this.downloadButton = document.getElementById('download_button') as HTMLButtonElement;
        this.textInput = document.getElementById('text_input') as HTMLTextAreaElement;
        this.wrapInput = document.getElementById('wrap_input') as HTMLInputElement;
        this.fontSizeInput = document.getElementById('font_size_input') as HTMLInputElement;

        this.fontSizeInput.addEventListener('input', this.onFontSizeChange);
        this.textInput.addEventListener('input', this.onTextChange);
        this.wrapInput.addEventListener('change', this.onWrapChange);
        this.downloadButton.addEventListener('click', this.onDownload);

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
