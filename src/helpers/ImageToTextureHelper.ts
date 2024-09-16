import { CanvasTexture } from "three";

export default function ImageToTexture(url: string, width: number, height: number, x: number, y: number, fillColor: string): CanvasTexture {
    const canvas = document.createElement('canvas');

    canvas.height = height;
    canvas.width = width;
    const context = canvas.getContext('2d');

    if (context !== null && context !== void 0) {
        context.fillStyle = fillColor;
        context.fillRect(0, 0, canvas.width, canvas.height);

        const image = new Image();
        image.src = url;
        image.crossOrigin = 'anonymous';
        context.drawImage(image, x, y);
    }

    const texture = new CanvasTexture(canvas);
    texture.minFilter = 1003; // NearestFilter for pixelated view
    texture.magFilter = 1003;

    return texture;
}