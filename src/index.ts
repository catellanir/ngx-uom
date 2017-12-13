import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UomPipe } from './uom.pipe';
import { UomService } from './uom.service';


export * from './uom.pipe';
export * from './uom.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UomPipe
  ],
  exports: [
    UomPipe
  ]
})
export class UomModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UomModule,
      providers: [UomService],
    };
  }
}
