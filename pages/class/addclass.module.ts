import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClassService } from '../../services/classesservice';
import { FormsModule } from '@angular/forms';
import { AddClassPage } from './addclass';

@NgModule({
  declarations: [
    AddClassPage
  ],
  imports: [
    FormsModule,
    IonicPageModule.forChild(AddClassPage),
  ],
  providers: [ClassService]
})
export class AddClassPageModule {}
