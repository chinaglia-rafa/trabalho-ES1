import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserDataServiceService } from 'src/app/services/userDataService/user-data-service.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';

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
  parecer: boolean = false;
  parecerText: string = '';
  parecerAvaliacao: string = '';
  private uid: any = '';

  constructor(
    public userDataService: UserDataServiceService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private db: AngularFirestore,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.uid = params.get('id');
    });
  }

  /** Pega o texto preenchido pelo orientador para ser salvo no firebase */
  sendParecerOrientador() {
    console.log('Texto a ser salvo:', this.parecerText);
    console.log('Id do relatório:', this.uid);
    console.log('Avaliação foi:', this.parecerAvaliacao);
    this.report.parecerOrientador = this.parecerText;
    this.report.parecerOrientadorAvaliacao = this.parecerAvaliacao;
    this.parecer = false;

    if(this.uid != '' && this.parecerText != '' && this.parecerAvaliacao != '')
    {
      this.db.collection("reports").doc(this.uid).update({
        parecerOrientador: this.parecerText,
        parecerOrientadorAvaliacao : this.parecerAvaliacao
      })
    }
    

    // Mills, aqui precisa dar um UPDATE no relatório com o id this.uid e
    // atualizar seu status pra Devolvido
  }

  /** Autoriza apenas estudantes, orientadores ou a CCP */
  private authorize(report: any) {
    console.log('authorizing student:', report.studentOwnerCode, this.userDataService.getUserUID());
    console.log('authorizing professor:', report.leaderCode, this.userDataService.getUserUID());
    if (this.userDataService.getUserData().type == "CCP") return true;
    if (![report.leaderCode, report.studentOwnerCode].includes(this.userDataService.getUserUID())) return false;
    return true;
  }

  ngAfterViewInit(): void {
    this.userDataService.userDataObservable.subscribe((data: any) => {
      if (!data.reports) return;
      setTimeout(() => {
        /** Deusa me ajude de ter começado a usar "temp" como nome de variável */
        const temp = data.reports.filter((element: any) => element.uid == this.uid);
        if (temp.length == 0) return;
        this.report = temp[0];
        if (!this.authorize(this.report)) {
          alert('Você não tem permissão para ver este relatório!');
          this.route.navigateByUrl('/relatorios/list');
        }
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
        console.log('Reports:', data.reports);
        console.log('Report:', this.report);
      }, 1000);
    });
  }

}
