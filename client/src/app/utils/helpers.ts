import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";

export function  matchOtherValidator (otherControlName: string) {

 let thisControl: FormControl;
 let otherControl: FormControl;

 return function matchOtherValidate (control: FormControl) {

    if (!control.parent) {
      return null;
    }

    // Initializing the validator.
    if (!thisControl) {
      thisControl = control;
      otherControl = control.parent.get(otherControlName) as FormControl;
      if (!otherControl) {
        throw new Error('matchOtherValidator(): other control is not found in parent group');
      }
      otherControl.valueChanges.subscribe(() => {
        thisControl.updateValueAndValidity();
      });
    }

    if (!otherControl) {
      return null; //pass
    }

    if (otherControl.value !== thisControl.value) {
      return {
        matchOther: true //validator symbol
      };
    }

    return null;

 }
};

export interface AuthResponse {
  status: string,
  success: string,
  token: string
};
export interface MapResponse{
     results: {
          address_components: Object[],
          formatted_address:string,
          geometry:{
               location:{
                    lat: number,
                    lng: number
               }
          }
     }[],
     status: string
}
export interface MakerResponse {
     lat: number,
     lng: number,
     img: string,
     name: string,
     description: string
}

export interface RegisterResponse {
  status: string,
  success: string
};

export interface JWTResponse {
  status: string,
  success: string,
  user: any
};

export function onValueChanged(errs, errMsg, data?: any, fg?: FormGroup) {
  if (!fg) return;
  const form = fg;
  for (const field in errs) {
   errs[field] = '';
   const control = fg.get(field);
   if (control && control.dirty && !control.valid) {
      const messages = errMsg[field];
      for (const key in control.errors) {
        errs[field] += messages[key] + ' ';
      }
   }
  }
}
