import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);

  senha = new FormControl('', [Validators.required]);

  numeroUsp = new FormControl('', [Validators.required]);
  
  nome = new FormControl('', [Validators.required]);

  constructor() { }

  ngOnInit(): void {
    
  }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Você deve inserir um e-mail valido';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  
}
