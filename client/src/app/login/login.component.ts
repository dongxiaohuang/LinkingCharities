import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
// import { MatDialog, MatDialogRef } from '@angular/material';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

     modalReference: NgbModalRef;
  user = { username: '', password: '', remember: false };
  errMess: string;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService) { }

  openVerticallyCentered(content) {
    this.modalReference = this.modalService.open(content, { centered: true });
  }
  ngOnInit() {
  }

  onSubmit() {
    console.log("User: ", this.user);
    this.authService.logIn(this.user)
      .subscribe(res => {
        if (res.success) {
          // this.dialogRef.close(res.success);
          this.modalReference.dismiss();
        }
        else {
          console.log(res);
        }
      },
        error => {
          console.log(error);
          this.errMess = error
        })
  }

}
