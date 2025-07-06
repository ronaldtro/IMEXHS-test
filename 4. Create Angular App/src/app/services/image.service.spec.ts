import { TestBed } from "@angular/core/testing";
import { ImageService } from "./image.service";


describe('ImageService', () => {
    let service: ImageService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ImageService);
    });

    it('should detect white pixels correctly', () => {
        const data = new Uint8ClampedArray(4 * 1);
        data[0] = data[1] = data[2] = 255; data[3] = 255;
        expect(service.isWhitePixel(data, 0, 0, 1)).toBeTrue();
    });
});
