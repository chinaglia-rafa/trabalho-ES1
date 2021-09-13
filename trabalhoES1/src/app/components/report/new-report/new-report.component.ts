import { Component, OnInit } from '@angular/core';
import { UserDataServiceService } from 'src/app/services/userDataService/user-data-service.service';

@Component({
  selector: 'app-new-report',
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.scss']
})
export class NewReportComponent implements OnInit {

  curso: any;
  ultimoSemestreMestrado: any;
  ultimoSemestreDoutorado: any;
  disciplinasObrigatoriasAprovadas: any;
  disciplinasOptativasAprovadas: any;
  conceitsDivulgadosUltimoSemestre: any;
  reprovacoesTotais: any;
  reprovacoesUltimoSemestre: any;
  exameProficienciaIdiomas: any;
  exameQualificacao: any;
  limiteQualificacao: any;
  limiteDepositoDissertacao: any;
  artigosPublicados: any;
  artigosAguardandoResposta: any;
  artigoPreparacao: any;
  estagioPesquisa: any;
  congressoPais: any;
  congressoExterior: any;
  visitaPesquisa: any;
  declaracaoExtra: any;

  user: any;

  constructor(private userDataService : UserDataServiceService) { }

  ngOnInit() { }

  validate() {
    // Estimado Heitor, valide cada campo (enumerados da linha 11 até a linha 30 ali em cima) com os validadores
    // que você criou. Se todos forem válidos considerando alguns requisitos específicos, retorne true. Caso contrário
    // lansa um false.

    // ## REQUISITOS ##
    // ultimoSemestreMestrado só precisa ser validado caso curso seja 1
    // ultimoSemestreDoutorado só precisa ser validado caso curso seja 2
    // limiteQualificacao só precisa ser validado caso exameQualificacao NÃO SEJA 1
    // limiteDepositoDissertacao só precisa ser validado caso exameQualificacao seja 1

    return true;
  }

  submit() {
    if (!this.validate()) return false;
    console.log('Salvando dados bem aqui...');

    return true;
  }

  ngAfterViewInit() {
    this.userDataService.userDataObservable.subscribe((data: any) => {
      console.log('FANCY:', data);
      this.user = data;
    });
  }

  checkNomeOrient(str:any): boolean {
    if(str != '') return true;
    else return false
  }
  checkNumeroUSP(num:any): boolean {
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
  }
  isMestrado(num:any): boolean{
    if(num == 0) return true;
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
    if(typeof num === 'number' && num>0) return true;
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
    if(num===true || num===false) return true;
    else return true;
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
    if(str != '') return true;
    return false;
  }
}
