import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { NewReportComponent } from './components/report/new-report/new-report.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ListComponent } from './pages/relatorios/list/list.component';
import { ViewComponent } from './pages/relatorios/view/view.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'relatorios/list', component: ListComponent },
  { path: 'relatorios/view/:id', component: ViewComponent },
  { path: 'new-report', component: NewReportComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
