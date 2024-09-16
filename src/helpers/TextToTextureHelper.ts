import { CanvasTexture } from "three";

export default function TextToTexture(text: string[], width: number, height: number, fontSize: number, x: number, y: number, fillColor: string, textColor: string, isCentered: boolean): CanvasTexture {
    const canvas = document.createElement('canvas');

    canvas.height = height;
    canvas.width = width;
    const context = canvas.getContext('2d');

    if (context !== null && context !== void 0) {
        context.fillStyle = fillColor;
        context.fillRect(0, 0, canvas.width, canvas.height);

        if (isCentered) {
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillStyle = textColor;
            context.font = `${fontSize}px Gill-Sans`;
            text.forEach((line, index) => {
                context.fillText(line, (canvas.width * 0.5) + x, y + ((index + 1) * fontSize));
            });
        } else {
            context.textAlign = 'left';
            context.textBaseline = 'bottom';
            context.fillStyle = textColor;
            context.font = `${fontSize}px Gill-Sans`;
            text.forEach((line, index) => {
                context.fillText(line, x, y + ((index + 1) * fontSize));
            });
        }
    }

    const texture = new CanvasTexture(canvas);
    texture.minFilter = 1003; // NearestFilter for pixelated view
    texture.magFilter = 1003;

    return texture;
}