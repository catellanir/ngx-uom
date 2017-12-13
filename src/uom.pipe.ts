import { Injectable, PipeTransform, Pipe } from '@angular/core';
import { UomService } from './uom.service';
/**
 * Transforms any input value
 */
@Pipe({
  name: 'uom',
  pure: true
})
@Injectable()
export class UomPipe implements PipeTransform {
  constructor(private uomService: UomService) {

  }

  transform(value: number, sourceUom: string, destUom: string): string {
    return String(this.uomService.convert(value, sourceUom, destUom));
  }
}
