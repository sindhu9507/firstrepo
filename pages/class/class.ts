import { Component } from '@angular/core';
import { IonicPage, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ClassService } from '../../services/classesservice';
import { Class } from '../../models/class.model';
import { Teacher } from '../../models/teacher.model';
import { MemberService } from '../../services/memberservice';


@IonicPage()
@Component({
  selector: 'page-class',
  templateUrl: 'class.html',
})
export class ClassPage {
  show=true;
  teacherList: Teacher[];
  loading = this.loadingCtrl.create({
    spinner: 'bubbles',
    content: 'Please wait...',
    cssClass: 'my-loading-class'
  });
  classList:Class[]=[];
  constructor(private classService:ClassService, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private navParams: NavParams, private memberService: MemberService) {
    this.loading.present();
    this.classService.getClasses().subscribe(
      (res) => {
        if(res) {
          this.classList =  res;
          this.loading.dismiss();
        }
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
    this.memberService.getTeachers("teacher").subscribe(
      (res) => {
        this.teacherList = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  deleteClass(indx) {
    this.classList.splice(indx,1);
  }
  getTeacher(teacherid) {
    if(this.teacherList)
      return this.teacherList.filter(member => member.id===teacherid)[0].member_name;
  }
  ionViewWillEnter() {
    if(this.navParams.get('class')) {
      if(this.navParams.get('index')==undefined) 
        this.classList.push(this.navParams.get('class'));
      else
        this.classList[this.navParams.get('index')]=this.navParams.get('class');
    }
  }
}