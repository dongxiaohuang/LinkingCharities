import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule,
         MatIconModule,
         MatCardModule,
         MatGridListModule
          } from '@angular/material';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [
       MatButtonModule,
       MatIconModule,
       MatCardModule,
       MatGridListModule

 ]
})
export class MaterialModule { }
