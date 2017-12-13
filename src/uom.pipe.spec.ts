import { UomPipe } from './uom.pipe';
import { UomService} from './uom.service';

describe('Pipe: Default', () => {
    let pipe: UomPipe;
    let service: UomService;
    beforeEach(() => {
        pipe = new UomPipe(new UomService());
    });

    it('successfully convert kg to g', () => {
        expect(pipe.transform(10.0, 'kg', 'g')).toBe('10000');
    });

    it('succesfully convert celsius to kelvin', () => {
        expect(pipe.transform(10.0, 'c', 'k')).toBe(String(10.0 + 273.15));
    });

    it('succesfully convert m/s to km/s', () => {
        expect(pipe.transform(1.0, 'm/s', 'km/h')).toBe('3.6');
    });

    it('succesfully convert s to hour', () => {
        expect(pipe.transform(1.0, 'h', 's')).toBe('3600');
    });
});

