import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchOtherValidator, onValueChanged } from '../utils/helpers';
import { baseURL } from '../shared/baseurl';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Countries } from '../shared/countries';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  progress: number = 0;
  userForm: FormGroup;
  passwordForm: FormGroup;
  user;
  baseUrl = baseURL;
  countries = Countries;
  userMsg:string = undefined;
  pswMsg:string = undefined;
  selectedFile: File = undefined;

  userFormErrors = {
    'firstname': '',
    'lastname': '',
    'country': ''
  };
  passwardFormErrors = {
    'password': '',
    'confirmPSW': '',
  };
  userFormValidationMsg = {
    'firstname': {
      'required': 'First Name is required.',
      'minlength': 'First Name must be at least 2 characters long.',
      'maxlength': 'First Name cannot be more than 25 characters.'
    },
    'lastname': {
      'required': 'Last Name is required.',
      'minlength': 'Last Name must be at least 2 characters long.',
      'maxlength': 'Last Name cannot be more than 25 characters.'
    },
    'contry': {
      'required': 'Country is required.',
    }
  }
  passwordFormValidationMsg = {
    'password': {
      'required': 'Password is required.',
      'minlength': 'Password should have at least 6 characters.'
    },
    'confirmPSW': {
      'required': 'Please retype password.',
      'matchOther': 'Password is inconsistent.'
    },
  }
  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private http: HttpClient,
    private location: Location) { }
  ngOnInit() {

    this.authService.getProfile()
      .subscribe(profile => {
        this.user = profile;
        console.log("profile", profile);
      });

    this.userForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      country: ['', [Validators.required]],
      // profile: ['']
    });

    this.userForm.valueChanges.subscribe(data => onValueChanged(this.userFormErrors, this.userFormValidationMsg, data, this.userForm))

    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPSW: ['', [Validators.required, matchOtherValidator('password')]],
    });
    this.passwordForm.valueChanges.subscribe(data => onValueChanged(this.passwardFormErrors, this.passwordFormValidationMsg, data, this.passwordForm));
  }
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }
  onUpload() {
    const fd = new FormData();
    fd.append('imageFile', this.selectedFile, this.selectedFile.name.toLowerCase());
    // console.log('form data', fd);
    this.authService.postImage(fd)
      .subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            console.log('Upload Progree', Math.round(event.loaded / event.total * 100));
            this.progress = Math.round(event.loaded / event.total * 100)
          } else if (event.type === HttpEventType.Response) {
            // if(event.)
            console.log(event);
            if (event.ok) {
              this.changeImg();
            }
          }
        }
      )
  }
  changeImg(): any {
    this.authService.changeProfile({ "profile": this.selectedFile.name.toLowerCase() })
      .subscribe(res => console.log(res));
    console.log("CHANGE profile image successful");
    this.user.profile = 'images/userprofile/' + this.user._id + this.selectedFile.name;
    console.log(this.user.profile);
  }

  changeProfile():any {
       this.authService.changeProfile(this.userForm.value)
          .subscribe(res => {
               this.userMsg = 'Update profile successfully';
          }, err=> this.userMsg='Update profile failed')
 }
  changePSW():any {
       this.authService.changePSW(this.passwordForm.value)
       .subscribe(res => {
            console.log(res)
            this.pswMsg = "Update passward successfully";
            this.authService.logOut();
       }, err => this.pswMsg = "Update passward failed" );
 }
 onCancel(){
      this.passwordForm.reset();
}
}
