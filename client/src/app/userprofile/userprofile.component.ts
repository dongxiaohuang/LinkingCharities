import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchOtherValidator } from '../utils/helpers';
import { baseURL } from '../shared/baseurl';
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
          private fb: FormBuilder) { }

  ngOnInit() {
      this.authService.getProfile()
          .subscribe( profile =>
               { this.user = profile;

               });
     this.userForm = this.fb.group({
                    firstname: ['', [Validators.required]],
                    lastname: ['', [Validators.required]],
                    password: ['', [Validators.required, Validators.minLength(6)]],
                    country: ['', Validators.required],
                    confirmPSW:['', [Validators.required, matchOtherValidator('password') ]],
                    profile:['']
               })
  }

}
