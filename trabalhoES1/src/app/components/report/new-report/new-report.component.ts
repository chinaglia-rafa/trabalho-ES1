import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-report',
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.scss']
})
export class NewReportComponent implements OnInit {

  curso: any;

  constructor() { }

  ngOnInit(): void {
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
