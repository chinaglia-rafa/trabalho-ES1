import { Component, OnInit } from '@angular/core';
import { UserDataServiceService } from 'src/app/services/userDataService/user-data-service.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

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

  report: any = null;

  constructor(private userDataService: UserDataServiceService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.userDataService.userDataObservable.subscribe((data: any) => {
      if (!data.reports) return;
      setTimeout(() => {
        this.report = data.reports[0];
        console.log('this.report.answers.curso', this.report.courseLevel);
        console.log('this.report.answers.ultimoSemestreMestrado', this.report.answers.ultimoSemestreMestrado);
        console.log('this.report.answers.ultimoSemestreDoutorado', this.report.answers.ultimoSemestreDoutorado);
        console.log('this.report.answers.disciplinasObrigatoriasAprovadas', this.report.answers.disciplinasObrigatoriasAprovadas);
        console.log('this.report.answers.disciplinasOptativasAprovadas', this.report.answers.disciplinasOptativasAprovadas);
        console.log('this.report.answers.conceitosDivulgadosUltimoSemestre', this.report.answers.conceitosDivulgadosUltimoSemestre);
        console.log('this.report.answers.reprovacoesTotais', this.report.answers.reprovacoesTotais);
        console.log('this.report.answers.reprovacoesUltimoSemestre', this.report.answers.reprovacoesUltimoSemestre);
        console.log('this.report.answers.exameProficienciaIdiomas', this.report.answers.exameProficienciaIdiomas);
        console.log('this.report.answers.exameQualificacao', this.report.answers.exameQualificacao);
        console.log('this.report.answers.limiteQualificacao', this.report.answers.limiteQualificacao);
        console.log('this.report.answers.limiteDepositoDissertacao', this.report.answers.limiteDepositoDissertacao);
        console.log('this.report.answers.artigosPublicados', this.report.answers.artigosPublicados);
        console.log('this.report.answers.artigosAguardandoResposta', this.report.answers.artigosAguardandoResposta);
        console.log('this.report.answers.artigoPreparacao', this.report.answers.artigoPreparacao);
        console.log('this.report.answers.estagioPesquisa', this.report.answers.estagioPesquisa);
        console.log('this.report.answers.congressoPais', this.report.answers.congressoPais);
        console.log('this.report.answers.congressoExterior', this.report.answers.congressoExterior);
        console.log('this.report.answers.visitaPesquisa', this.report.answers.visitaPesquisa);
        console.log('this.report.answers.declaracaoExtra', this.report.answers.declaracaoExtra);
        this.curso = this.report.courseLevel;
        this.ultimoSemestreMestrado = this.report.answers.ultimoSemestreMestrado;
        this.ultimoSemestreDoutorado = this.report.answers.ultimoSemestreDoutorado;
        this.disciplinasObrigatoriasAprovadas = this.report.answers.disciplinasObrigatoriasAprovadas;
        this.disciplinasOptativasAprovadas = this.report.answers.disciplinasOptativasAprovadas;
        this.conceitosDivulgadosUltimoSemestre = this.report.answers.conceitosDivulgadosUltimoSemestre;
        this.reprovacoesTotais = this.report.answers.reprovacoesTotais;
        this.reprovacoesUltimoSemestre = this.report.answers.reprovacoesUltimoSemestre;
        this.exameProficienciaIdiomas = this.report.answers.exameProficienciaIdiomas;
        this.exameQualificacao = this.report.answers.exameQualificacao;
        this.limiteQualificacao = this.report.answers.limiteQualificacao;
        this.limiteDepositoDissertacao = this.report.answers.limiteDepositoDissertacao;
        this.artigosPublicados = this.report.answers.artigosPublicados;
        this.artigosAguardandoResposta = this.report.answers.artigosAguardandoResposta;
        this.artigoPreparacao = this.report.answers.artigoPreparacao;
        this.estagioPesquisa = this.report.answers.estagioPesquisa;
        this.congressoPais = this.report.answers.congressoPais;
        this.congressoExterior = this.report.answers.congressoExterior;
        this.visitaPesquisa = this.report.answers.visitaPesquisa;
        this.declaracaoExtra = this.report.answers.declaracaoExtra;
      }, 1000);
      console.log('Report:', data.reports);
    });
  }

}
