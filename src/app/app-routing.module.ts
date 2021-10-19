import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { AccountComponent } from './account/account.component';


const route: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'account', component: AccountComponent},
  {path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(route)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
