import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserDataServiceService } from 'src/app/services/userDataService/user-data-service.service';

@Component({
  selector: 'app-new-report',
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.scss']
})
export class NewReportComponent implements OnInit {

  curso: any = "";
  ultimoSemestreMestrado: any = "";
  ultimoSemestreDoutorado: any = "";
  disciplinasObrigatoriasAprovadas: any = "";
  disciplinasOptativasAprovadas: any = "";
  conceitosDivulgadosUltimoSemestre: any = "";
  reprovacoesTotais: any = "";
  reprovacoesUltimoSemestre: any = "";
  exameProficienciaIdiomas: any = "";
  exameQualificacao: any = "";
  limiteQualificacao: any = "";
  limiteDepositoDissertacao: any = "";
  artigosPublicados: any = "";
  artigosAguardandoResposta: any = "";
  artigoPreparacao: any = "";
  estagioPesquisa: any = "";
  congressoPais: any = "";
  congressoExterior: any = "";
  visitaPesquisa: any = "";
  declaracaoExtra: any = "";

  user: any;

  constructor(
    private userDataService : UserDataServiceService,
    private router: Router,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit() { }

  validate() {
    // Estimado Heitor, valide cada campo (enumerados da linha 11 até a linha 30 ali em cima) com os validadores
    // que você criou. Se todos forem válidos considerando alguns requisitos específicos, retorne true. Caso contrário
    // lansa um false.

    if(!this.checkPosGrad(this.curso)) {
      console.log('Campo curso não passou na validação', this.curso);
      return false;
    }
    if(this.curso == 1 && !this.checkSemestreMestrado(this.ultimoSemestreMestrado)) {
      console.log('Campo ultimoSemestreMestrado não passou na validação', this.ultimoSemestreMestrado);
      return false;
    } else if(this.curso == 2 && !this.checkSemestreDoutorado(this.ultimoSemestreDoutorado)) {
      console.log('Campo ultimoSemestreDoutorado não passou na validação', this.ultimoSemestreDoutorado);
      return false;
    }
    if(!this.checkDiscAprov(this.disciplinasObrigatoriasAprovadas)) {
      console.log('Campo disciplinasObrigatoriasAprovadas não passou na validação', this.disciplinasObrigatoriasAprovadas);
      return false;
    }
    if(!this.checkDiscAprov(this.disciplinasOptativasAprovadas)) {
      console.log('Campo disciplinasOptativasAprovadas não passou na validação', this.disciplinasOptativasAprovadas);
      return false;
    }
    if(!this.checkBool(this.conceitosDivulgadosUltimoSemestre)) {
      console.log('Campo conceitosDivulgadosUltimoSemestre não passou na validação', this.conceitosDivulgadosUltimoSemestre);
      return false;
    }
    if(!this.checkReprovasTotal(this.reprovacoesTotais)) {
      console.log('Campo reprovacoesTotais não passou na validação', this.reprovacoesTotais);
      return false;
    }
    if(!this.checkReprovasUltSem(this.reprovacoesUltimoSemestre)) {
      console.log('Campo reprovacoesUltimoSemestre não passou na validação', this.reprovacoesUltimoSemestre);
      return false;
    }
    if(!this.checkAprovProfIdiomas(this.exameProficienciaIdiomas)) {
      console.log('Campo exameProficienciaIdiomas não passou na validação', this.exameProficienciaIdiomas);
      return false;
    }
    if(!this.checkAprovExamQualifi(this.exameQualificacao)) {
      console.log('Campo exameQualificacao não passou na validação', this.exameQualificacao);
      return false;
    }
    if(this.exameQualificacao != 1 && !this.checkTempoRestanteExamQualif(this.limiteQualificacao)) {
      console.log('Campo limiteQualificacao não passou na validação', this.limiteQualificacao);
      return false;
    } else if(this.exameQualificacao == 1 && !this.checkTempoMaxDissert(this.limiteDepositoDissertacao)) {
      console.log('Campo limiteDepositoDissertacao não passou na validação', this.limiteDepositoDissertacao);
      return false;
    }
    if(!this.checkQtdArtigosAceitos(this.artigosPublicados)) {
      console.log('Campo artigosPublicados não passou na validação', this.artigosPublicados);
      return false;
    }
    if(!this.checkQtdArtigosEspera(this.artigosAguardandoResposta)) {
      console.log('Campo artigosAguardandoResposta não passou na validação', this.artigosAguardandoResposta);
      return false;
    }
    if(!this.checkArtigoPrep(this.artigoPreparacao)) {
      console.log('Campo artigoPreparacao não passou na validação', this.artigoPreparacao);
      return false;
    }
    if(!this.checkParagrafo(this.estagioPesquisa)) {
      console.log('Campo estagioPesquisa não passou na validação', this.estagioPesquisa);
      return false;
    }
    if(!this.checkParagrafo(this.congressoPais)) {
      console.log('Campo congressoPais não passou na validação', this.congressoPais);
      return false;
    }
    if(!this.checkParagrafo(this.congressoExterior)) {
      console.log('Campo congressoExterior não passou na validação', this.congressoExterior);
      return false;
    }
    if(!this.checkParagrafo(this.visitaPesquisa)) {
      console.log('Campo visitaPesquisa não passou na validação', this.visitaPesquisa);
      return false;
    }
    if(!this.checkParagrafo(this.declaracaoExtra)) {
      console.log('Campo declaracaoExtra não passou na validação', this.declaracaoExtra);
      return false;
    }

    console.log('All set.');

    return true;
  }

  submit() {
    if (!this.validate()) return false;
    console.log('Salvando dados bem aqui...');

    const data = new Date();
    let s = 1;
    if (data.getMonth() >= 6) s = 2;
    const semester = `${data.getFullYear()}-${s}`

    const newReport = {
      semester: semester,
      courseLevel: this.curso,
      lattes: this.user.lattesLink,
      leaderCode: this.user.leaderID,
      answers: {
        ultimoSemestreMestrado: this.ultimoSemestreMestrado,
        ultimoSemestreDoutorado: this.ultimoSemestreDoutorado,
        disciplinasObrigatoriasAprovadas: this.disciplinasObrigatoriasAprovadas,
        disciplinasOptativasAprovadas: this.disciplinasOptativasAprovadas,
        conceitosDivulgadosUltimoSemestre: this.conceitosDivulgadosUltimoSemestre,
        reprovacoesTotais: this.reprovacoesTotais,
        reprovacoesUltimoSemestre: this.reprovacoesUltimoSemestre,
        exameProficienciaIdiomas: this.exameProficienciaIdiomas,
        exameQualificacao: this.exameQualificacao,
        limiteQualificacao: this.limiteQualificacao,
        limiteDepositoDissertacao: this.limiteDepositoDissertacao,
        artigosPublicados: this.artigosPublicados,
        artigosAguardandoResposta: this.artigosAguardandoResposta,
        artigoPreparacao: this.artigoPreparacao,
        estagioPesquisa: this.estagioPesquisa,
        congressoPais: this.congressoPais,
        congressoExterior: this.congressoExterior,
        visitaPesquisa: this.visitaPesquisa,
        declaracaoExtra: this.declaracaoExtra,
      }
    }

    console.log('Data to be saved:', newReport);
    this.userDataService.setNewReport(newReport);
    // Mills, aqui está o objeto com os dados que eu tenho! Crie uma função no serviço pra completar os que faltam
    // e grave o novo relatório *CASO NÃO HAJA UM COM O MESMO SEMESTER JÁ GRAVADO* pra evitar problemas de alunos
    // mandando vários relatórios pro mesmo semestre


    this.snackbar.open(`Novo relatório para o semestre ${semester} enviado com sucesso!`, 'Okay', {
      duration: 3000
    });
    this.router.navigateByUrl('/relatorios/list', {replaceUrl: true});

    return true;
  }

  ngAfterViewInit() {
    // this.userDataService.userDataObservable.subscribe((data: any) => {
    //   console.log('FANCY:', data);
    //   this.user = data;
    // });
    this.user = this.userDataService.getUserData()
  }

  /*checkNumeroUSP(num:any): boolean {
    if(typeof num === 'number' && num.toString.length > 4) return true;
    else return false;
  }
  validURL(str:any): boolean {
    var pattern = new RegExp('^(https?:\/\/)?'+ // protocol
      '((([a-z\d]([a-z\d-][a-z\d]))\.)+[a-z]{2,}|'+ // domain name
      '((\d{1,3}\.){3}\d{1,3}))'+ // OR ip (v4) address
      '(\:\d+)?(\/[-a-z\d%.~+])'+ // port and path
      '(\?[;&a-z\d%.~+=-])?'+ // query string
      '(\#[-a-z\d_])?$','i'); // fragment locator
    return !!pattern.test(str);
  }
  checkDate(str:any): boolean{
    if(Date.parse(str)!= NaN) return true;
    else return false;
  }
  checkAvaLast(num:any): boolean{
    if(num>=0 && num<=3) return true;
    else return false;
  }*/
  checkPosGrad(num:any): boolean{
    if(num > 0 && num < 3) return true;
    else return false;
  }
  checkSemestreMestrado(num:any): boolean{
    if(num>=1 || num<=5) return true;
    else return false;
  }
  checkSemestreDoutorado(num:any): boolean{
    if(num>=1 || num<=8) return true;
    else return false;
  }
  checkDiscAprov(num:any): boolean{
    if(num == parseInt(num) && num>=0) return true;
    else return false;
  }
  checkBool(num:any): boolean{
    if(num) return true;
    else return false;
  }
  checkReprovasTotal(num:any): boolean{
    if(num>=0 || num<=2) return true;
    else return false;
  }
  checkReprovasUltSem(num:any): boolean{
    if(num>=0 || num<=3) return true;
    return false;
  }
  checkAprovProfIdiomas(num:any): boolean{
    if(num==1 || num==0) return true;
    return false;
  }
  checkAprovExamQualifi(num:any): boolean{
    if(num>=0 || num<=2) return true;
    else return false;
  }
  checkTempoRestanteExamQualif(num:any): boolean{
    if(num>=0 || num>=2) return true;
    else return false;
  }
  checkTempoMaxDissert(num:any): boolean{
    if(num>=0 || num>=2) return true;
    else return false;
  }
  checkQtdArtigosAceitos(num:any): boolean{
    if(num>=0 || num<=3) return true;
    else return false;
  }
  checkQtdArtigosEspera(num:any): boolean{
    if(num>=0 || num<=3) return true;
    else return false;
  }
  checkArtigoPrep(num:any): boolean{
    if(num>=0 || num<=5) return true;
    else return false;
  }
  checkParagrafo(str:any): boolean{
    if(str && str != '') return true;
    return false;
  }
}
