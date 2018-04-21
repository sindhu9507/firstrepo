import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeacherPage } from './teacher';
import { FormsModule } from '@angular/forms';
import { MemberService } from '../../services/memberservice';

@NgModule({
  declarations: [
    TeacherPage
  ],
  imports: [
    FormsModule,
    IonicPageModule.forChild(TeacherPage),
  ],
  providers: [MemberService]
})
export class TeacherPageModule {}
