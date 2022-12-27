import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationService } from 'src/app/shared/common/notification.service';
import { Md5hashService } from 'src/app/shared/services/auth/md5hash.service';
import { UserService } from 'src/app/shared/services/auth/user.service';
import { GlobalConstants } from 'src/app/shared/common/global_constants';

@Component({
  selector: 'auth-login',
  templateUrl: './login.html',
  styles: [
    `.form-div-padding{
    padding: 0;
    padding-right: 2rem;
    padding-left: 1rem;
    padding-top: 16rem !important;
    }
      .login-form-margin {
        margin-bottom: 16px;
      }

      .login-form-forgot {
        float: right;
      }

      .login-form-button {
        width: 100%;
      }
    `
  ]
})

export class LoginComponent implements OnInit {

  data = {
    clnt_aplcn_nm: "AMS Sunshine"
  }

  settings = {
    current_screen: "login", screen_heading: "Employee Login"
  }

  loginForm: UntypedFormGroup;  
  responseMessage!: string;
  loader: any;

  constructor(
    public fb: UntypedFormBuilder, 
    private domSanitizer: DomSanitizer,
    private route: Router,
    private userService: UserService,
    private notificationService: NotificationService,
    private md5: Md5hashService
  ) { }

  ngOnInit(): void {  
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  doLogin(): void {      
    this.loader = true;
    const formData = this.loginForm.value;
    console.log("==formData==", formData);
    const obj = {
      email: formData.username,
      password: this.md5.passwordEncrypt(formData.password)
    };
    this.userService.login(obj).subscribe((response: any) => {
      this.loader = false;
      console.log("response in Login: ", response);
      this.responseMessage = "You are logged-in";
      this.notificationService.createNotification('success', this.responseMessage);
      localStorage.setItem('token', response?.token);
      localStorage.setItem('role', 'admin');
      sessionStorage.setItem('user_data',JSON.stringify(response?.user_data));
      this.route.navigate(['/internal/ams/dashboard']);
    }, (error) => {      
      this.loader = false;
      if (error?.error?.message) {
        this.responseMessage = error?.error?.message;
      } else if (error?.message) {
        this.responseMessage = error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.notificationService.createNotification('error', this.responseMessage);
    });
  }

}