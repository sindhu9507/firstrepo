import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams, LoadingController } from 'ionic-angular';
import { Teacher } from '../../models/teacher.model';
import { MemberService } from '../../services/memberservice';
import { TeacherPage } from './teacher';
import { MyApp } from '../../app/app.component';


@IonicPage()
@Component({
  selector: 'page-addteacher',
  templateUrl: 'addteacher.html',
})
export class AddTeacherPage {
  update=false;
  teacher:Teacher={
    username: undefined,
    password: '',
    member_name: '',
    children: [],
    email: '',
    member_address: '',
    member_alt_phone: undefined,
    schoolid: {}
  }
  loading = this.loadingCtrl.create({
    spinner: 'bubbles',
    content: 'Please wait...',
    cssClass: 'my-loading-class'
  });
  constructor(private navCtrl: NavController, private navParams: NavParams, private toastCtrl: ToastController, private memberService: MemberService, private loadingCtrl: LoadingController, private myApp:MyApp) { 
  }

  addTeacher(teacher) {
    this.loading.present();
    if(!teacher.id) {
      teacher.role="teacher";
      teacher.createdBy=this.myApp.user.id;
      this.memberService.addTeacher(teacher).subscribe(
        (res) => {
          this.loading.dismiss();
          this.navCtrl.setRoot(TeacherPage);
        },
        (err) => {
          this.loading.dismiss();
          console.log(err);
        }
      )
    }
    else {
      teacher.modifiedBy=this.myApp.user.id;
      this.memberService.updateTeacher(teacher).subscribe(
        (res) => {
          this.loading.dismiss();
          this.navCtrl.setRoot(TeacherPage);
        },
        (err) => {
          this.loading.dismiss();
          console.log(err)
        }
      )
    }
    
    // this.navCtrl.setRoot('TeacherPage', {'teacher': teacher, index: this.navParams.get('indx')});
    // this.toastCtrl.create({
    //   message: "Added Successfully",
    //   duration: 4000
    // }).present();
  }

  ionViewWillEnter() {
    if(this.navParams.get('teacher')) {
      this.teacher=this.navParams.get('teacher');
      this.update=true;
    }
  }

}