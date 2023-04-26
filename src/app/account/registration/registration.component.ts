import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {AccountserviceService} from '../accountservice.service';
import {Accountinfo} from '../accountinfo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  regForm!: FormGroup;
  datasaved = false;
  dataerror=false;
  message!: string;

  constructor(private formbuilder: FormBuilder, private accountservice: AccountserviceService, private router:Router) {
    if(localStorage.getItem('Loginuser')){
      router.navigate(['/']);
    }
   }
 
  ngOnInit() {
    this.setFormState();
  }
  setFormState(): void {
    this.regForm = this.formbuilder.group({
      Name: ['', [Validators.required]],
      Email: ['', [Validators.required,Validators.email]],
      Password: ['', [Validators.required]]
    })
  }
 
  onSubmit() {
    let userinfo = this.regForm.value;
    //console.log(userinfo);
    this.createuserAccount(userinfo);
    // this.regForm.reset();
  }


  createuserAccount(accinfo:Accountinfo) {
    this.accountservice.createaccount(accinfo).subscribe(
      (resResult:any) => {
        // let resp=JSON.stringify(resResult) //this will convert object to string.
        // console.log(resp);
        if (resResult['errors']) {
          this.dataerror=true;
          this.message = resResult['errors']['email'].message;

          setTimeout(() => {
            this.dataerror=false;
          }, 3000);

        } else {
          this.datasaved = true;
          this.message = resResult['msg'];
          setTimeout(() => {
            this.datasaved=false;
            this.router.navigate(['/']);

          }, 3000);
          this.regForm.reset();
        } 
      }
    )
  }
}