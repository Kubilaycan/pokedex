import { CanvasTexture } from "three";

export default function TextToTexture(text: string[], width: number, height: number, fontSize: number, x: number, y: number): CanvasTexture {
    const canvas = document.createElement('canvas');

    canvas.height = height;
    canvas.width = width;
    let context = canvas.getContext('2d');

    if (context !== null && context !== void 0) {
        context.fillStyle = 'rgba(255, 255, 255, 0)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.textAlign = 'left';
        context.textBaseline = 'bottom';
        context.fillStyle = 'white';
        context.font = `${fontSize}px Gill-Sans`;
        text.forEach((line, index) => {
            context.fillText(line, x, y + ((index + 1) * fontSize));
        });
    }

    let texture = new CanvasTexture(canvas);
    texture.minFilter = 1003; // NearestFilter for pixelated view
    texture.magFilter = 1003;

    return texture;
}