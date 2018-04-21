import { Component } from '@angular/core';
import { IonicPage, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { StudentService } from '../../services/studentservice';
import { Student } from '../../models/student.model';


@IonicPage()
@Component({
  selector: 'page-student',
  templateUrl: 'student.html',
})
export class StudentPage {
  show=true;
  loading = this.loadingCtrl.create({
    spinner: 'bubbles',
    content: 'Please wait...',
    cssClass: 'my-loading-class'
  });
  studentList:Student[]=[];
  constructor(private studentService:StudentService, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private navParams: NavParams) {
    this.loading.present();
    this.studentService.getStudents().subscribe(
      (res) => {
        if(res) {
          this.studentList =  res.filter(member => member.role==="student");
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
  }
  deleteStudent(indx) {
    this.studentList.splice(indx,1);
  }
  ionViewWillEnter() {
    if(this.navParams.get('student')) {
      if(this.navParams.get('index')==undefined) 
        this.studentList.push(this.navParams.get('student'));
      else
        this.studentList[this.navParams.get('index')]=this.navParams.get('student');
    }
  }
}