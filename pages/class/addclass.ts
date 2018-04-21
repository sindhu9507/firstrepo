import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';
import { Class } from '../../models/class.model';
import { MemberService } from '../../services/memberservice';
import { Teacher } from '../../models/teacher.model';


@IonicPage()
@Component({
  selector: 'page-addclass',
  templateUrl: 'addclass.html',
})
export class AddClassPage {
  update=false;
  updateSubjct=false;
  index;
  class:Class={
      class: undefined,
      sec: '',
      classteacher: undefined,
      subjects: []
  };
  sub={
    subject: '',
    teacher: undefined
  };
  teacherList: Teacher[];
  constructor(private navCtrl: NavController, private navParams: NavParams, private toastCtrl: ToastController, private memberService: MemberService) {
    this.memberService.getTeachers("teacher").subscribe(
      (res) => {
        if(res) {
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addClass(cls) {
    cls.classteacher = Number(cls.classteacher);
    this.navCtrl.setRoot('ClassPage', {'class': cls, index: this.navParams.get('indx')});
    this.toastCtrl.create({
      message: "Added Successfully",
      duration: 4000
    }).present();
  }

  addSubject(subjct) {
    subjct.teacher = Number(subjct.teacher);
    if(!this.updateSubjct) {
      this.class.subjects.push(subjct);
    }
    else {
      this.class.subjects[this.index]=subjct;
      this.updateSubjct=false;
    }
    this.sub = {
      subject: '',
      teacher: ''
    };
  }

  getTeacher(teacherid) {
    if(this.teacherList)
      return this.teacherList.filter(member => member.id===Number(teacherid))[0].member_name;
  }

  deleteSubject(indx) {
    this.class.subjects.splice(indx, 1);
  }

  editSubject(subjct, indx) {
    this.updateSubjct = true;
    this.sub.subject = subjct.subject;
    this.sub.teacher = subjct.teacher;
    this.index = indx;
  }

  ionViewWillEnter() {
    if(this.navParams.get('class')) {
      this.class=this.navParams.get('class');
      this.update=true;
    }
  }

}