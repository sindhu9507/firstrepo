import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentPage } from './student';
import { StudentService } from '../../services/studentservice';

@NgModule({
  declarations: [
    StudentPage,
  ],
  imports: [
    IonicPageModule.forChild(StudentPage),
  ],
  providers: [
    StudentService
  ]
})
export class StudentPageModule {}
