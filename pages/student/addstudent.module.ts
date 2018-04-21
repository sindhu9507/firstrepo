import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentService } from '../../services/studentservice';
import { FormsModule } from '@angular/forms';
import { AddStudentPage } from './addstudent';

@NgModule({
  declarations: [
    AddStudentPage
  ],
  imports: [
    FormsModule,
    IonicPageModule.forChild(AddStudentPage),
  ],
  providers: [StudentService]
})
export class AddStudentPageModule {}
