import { Component } from '@angular/core';
import { IonicPage, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { MemberService } from '../../services/memberservice';
import { Teacher } from '../../models/teacher.model';


@IonicPage()
@Component({
  selector: 'page-teacher',
  templateUrl: 'teacher.html',
})
export class TeacherPage {
  teacherList:Teacher[]=[];
  loading = this.loadingCtrl.create({
    spinner: 'bubbles',
    content: 'Please wait...',
    cssClass: 'my-loading-class'
  });
  constructor(private memberService:MemberService, private toastCtrl: ToastController, private navParams: NavParams, private loadingCtrl:LoadingController) {
    this.loading.present();
    this.memberService.getTeachers("teacher").subscribe(
      (res) => {
        this.teacherList = res;
        this.loading.dismiss();
      },
      (err) => {
        this.loading.dismiss();
        console.log(err);
        this.toastCtrl.create({
          message: 'Sorry.. Try Again',
          duration: 4000 
        }).present();
      }
    );
  }
  deleteTeacher(id) {
    this.loading.present();
    this. memberService.deleteMember(id).subscribe(
      (res) => {
        this.loading.dismiss();
      },
      (err) => {
        this.loading.dismiss();
        console.log(err)
      }
    )
  }
}
