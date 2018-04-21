import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';
import { Student } from '../../models/student.model';


@IonicPage()
@Component({
  selector: 'page-addstudent',
  templateUrl: 'addstudent.html',
})
export class AddStudentPage {
  update=false;
  student:Student={
    username: undefined,
    password: '',
    member_name: '',
    children: [],
    email: '',
    member_address: '',
    member_alt_phone: undefined,
    schoolid: {}
  }
  constructor(private navCtrl: NavController, private navParams: NavParams, private toastCtrl: ToastController) { 
  }

  addStudent(student) {
    this.navCtrl.setRoot('StudentPage', {'student': student, index: this.navParams.get('indx')});
    this.toastCtrl.create({
      message: "Added Successfully",
      duration: 4000
    }).present();
  }

  ionViewWillEnter() {
    if(this.navParams.get('student')) {
      this.student=this.navParams.get('student');
      this.update=true;
    }
  }
}