// Procesamiento de la imagen y área.

import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ImageService {
    
    private canvas = document.createElement('canvas');
    private ctx = this.canvas.getContext('2d')!;

    loadImage(file: File): Promise<ImageData> {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                this.canvas.width = img.width;
                this.canvas.height = img.height;
                this.ctx.drawImage(img, 0, 0);
                const imageData = this.ctx.getImageData(0, 0, img.width, img.height);
                resolve(imageData);
            };
            img.src = URL.createObjectURL(file);
        });
    }

    isWhitePixel(data: Uint8ClampedArray, x: number, y: number, width: number): boolean {
        const index = (y * width + x) * 4;
        const r = data[index], g = data[index + 1], b = data[index + 2];
        return r === 255 && g === 255 && b === 255;
    }

    estimateArea(imageData: ImageData, n: number): number {
        const { width, height, data } = imageData;
        let inside = 0;

        for (let i = 0; i < n; i++) {
            const x = Math.floor(Math.random() * width);
            const y = Math.floor(Math.random() * height);

            if (this.isWhitePixel(data, x, y, width)) {
                inside++;
            }
        }

        return (width * height) * (inside / n);
    }
}
