import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule,
         MatIconModule,
         MatCardModule,
         MatGridListModule,
         MatAutocompleteModule,
         MatDialogModule,
         MatStepperModule,
         MatFormFieldModule,
         MatInputModule
          } from '@angular/material';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  // Specifies a list of directives/pipes/modules that can be used within the template of any component that is part of an Angular module that imports this Angular module.
  exports: [
       MatButtonModule,
       MatIconModule,
       MatCardModule,
       MatGridListModule,
       MatAutocompleteModule,
       MatDialogModule,
       MatStepperModule,
       MatFormFieldModule,
       MatInputModule
 ]
})
export class MaterialModule { }
