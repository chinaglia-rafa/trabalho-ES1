import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Injectable, NgZone } from '@angular/core';

import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);

  senha = new FormControl('', [Validators.required]);

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,  
   
  ) {
    
  }

  ngOnInit(): void {
  }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Você deve inserir um e-mail valido';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  logIn(){
    return this.ngFireAuth.signInWithEmailAndPassword(this.email.value, this.senha.value).then((res) => {
      console.log(res);
    }).catch(() =>{
      if (this.email.hasError('required')) {
        return 'Você deve inserir um e-mail valido';
      }
  
      return this.email.hasError('email') ? 'Not a valid email' : '';
    })
  }

}