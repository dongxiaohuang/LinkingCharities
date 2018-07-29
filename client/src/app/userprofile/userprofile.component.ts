import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchOtherValidator } from '../utils/helpers';
import { baseURL } from '../shared/baseurl';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { Location } from '@angular/common';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  userForm: FormGroup;
  user;
  baseUrl = baseURL;
  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private http: HttpClient,
    private location: Location) { }
  selectedFile: File = undefined;
  ngOnInit() {
    this.authService.getProfile()
      .subscribe(profile => {
        this.user = profile;
      });
    this.userForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      country: ['', Validators.required],
      confirmPSW: ['', [Validators.required, matchOtherValidator('password')]],
      profile: ['']
    })
  }
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }
  onUpload() {
    const fd = new FormData();
    fd.append('imageFile', this.selectedFile, this.selectedFile.name);
    // console.log('form data', fd);
    this.http.post(baseURL + 'imageUpload', fd, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            console.log('Upload Progree', Math.round(event.loaded / event.total * 100));
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
    this.http.put(baseURL + 'users/profile' , {"profile": this.selectedFile.name})
     .subscribe(res => console.log(res));
       console.log("CHANGE profile image successful");
       this.user.profile = 'images/userprofile/'+this.user._id+this.selectedFile.name;
       console.log(this.user.profile);
  }
}
