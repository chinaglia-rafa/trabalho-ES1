import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserDataServiceService } from 'src/app/services/userDataService/user-data-service.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

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

  orientador : any = "";

  docentes: any = [];

  constructor(public userDataService: UserDataServiceService,
              public authorization: AngularFireAuth,
              private db: AngularFirestore,
              private router: Router
    ) { 
      

  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.userDataService.getAllLeaders().then((data: any) => {
      console.log("professores: ", data);
      this.docentes = data;
    })
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Você deve inserir um e-mail valido';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  submit(){
    const emailSubmit = this.email.value;
    const senhaSubmit = this.senha.value;

    this.authorization.createUserWithEmailAndPassword(emailSubmit, senhaSubmit).then((response:any) => {
      console.log("resposta do sign up", response.user.uid);

      this.db.collection("userData").doc(response.user.uid).set({
        "name": this.nome.value,
        "email" : emailSubmit,
        "uspNumber" : this.numeroUsp.value,
        "leaderID" : this.orientador,
        "type" : "aluno",
        "lastResult" : "N/A",
        "lattesLink" : ""
      }).then(() =>{
        this.router.navigateByUrl("/login")
      })

    })

  }

}
