import { Component, ViewChild } from "@angular/core";
import { Platform, Nav, Events, PopoverController, ViewController, NavParams } from "ionic-angular";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { HomePage } from "../pages/home/home";
import { LoginPage, LogoutPage } from "../pages/login/login";
import { LocalWeatherPage } from "../pages/local-weather/local-weather";
import { TeacherPage } from "../pages/teacher/teacher";
import { ClassPage } from "../pages/class/class";
import { StudentPage } from "../pages/student/student";

export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  appMenuItems: Array<MenuItem>=[];
  user;
  userrole;
  childrenList = [];
  student;
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    public events: Events,
    public popoverCtrl: PopoverController
  ) {
    this.initializeApp();
    this.events.subscribe('userloggedin', (()=> {
      this.getMenu();
    }));
  }

  getMenu() {
    this.user = JSON.parse(localStorage.getItem('userCred'));
    this.userrole = this.user.role;
    this.getMenuItems(this.userrole);
    if(this.user.children) {
      this.childrenList = JSON.parse(localStorage.getItem('children'));
      this.student = this.childrenList[0];
    }
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage, this.childrenList);
    popover.present({
      ev: myEvent
    });
  }

  getMenuItems(userrole) {
    if(userrole=='admin') {
      this.appMenuItems = [
        {title: 'Home', component: HomePage, icon: 'home'},
        {title: 'Teachers', component: TeacherPage, icon: 'people'},
        {title: 'Classes', component: ClassPage, icon: 'clipboard'},
        {title: 'Students', component: StudentPage, icon: 'people'},
        {title: 'Circular', component: LocalWeatherPage, icon: 'notifications'},
        {title: 'Logout', component: LogoutPage, icon: 'log-out'}
      ];
    }
    else if(userrole=='teacher') {
      this.appMenuItems = [
        {title: 'Home', component: HomePage, icon: 'home'},
        {title: 'Home Work', component: HomePage, icon: 'clipboard'},
        {title: 'Student', component: HomePage, icon: 'person'},
        {title: 'Parent Interaction', component: HomePage, icon: 'chatbubbles'},
        {title: 'Circular', component: HomePage, icon: 'notifications'},
        {title: 'Logout', component: LogoutPage, icon: 'log-out'}
      ];
    }
    else {
      this.appMenuItems = [
        {title: 'Home', component: HomePage, icon: 'home'},
        {title: 'Home Work', component: HomePage, icon: 'clipboard'},
        {title: 'Circular', component: LocalWeatherPage, icon: 'notifications'},
        {title: 'Teacher Interaction', component: HomePage, icon: 'chatbubbles'},
        {title: 'Logout', component: LogoutPage, icon: 'log-out'}
      ];
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      //*** Control Splash Screen
      // this.splashScreen.show();
      // this.splashScreen.hide();

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      //*** Control Keyboard
      this.keyboard.disableScroll(true);
    });
    if(localStorage.getItem('userCred')){
      this.rootPage=HomePage;
      this.getMenu();
    }
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}

@Component({
  template: `
    <ion-list>
      <button ion-item *ngFor="let opt of students" (click)="close()">{{opt.member_name}}</button>
    </ion-list>
  `
})
export class PopoverPage {
  students;
  constructor(public viewCtrl: ViewController, private navParams:NavParams) {
    this.students = this.navParams.data;
  }

  close() {
    this.viewCtrl.dismiss();
  }
}