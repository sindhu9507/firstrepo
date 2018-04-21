import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClassPage } from './class';
import { ClassService } from '../../services/classesservice';

@NgModule({
  declarations: [
    ClassPage,
  ],
  imports: [
    IonicPageModule.forChild(ClassPage),
  ],
  providers: [ClassService]
})
export class ClassPageModule {}
