import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberService } from '../../services/memberservice';
import { FormsModule } from '@angular/forms';
import { AddTeacherPage } from './addteacher';

@NgModule({
  declarations: [
    AddTeacherPage
  ],
  imports: [
    FormsModule,
    IonicPageModule.forChild(AddTeacherPage),
  ],
  providers: [MemberService]
})
export class AddTeacherPageModule {}
