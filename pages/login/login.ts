import {Component} from "@angular/core";
import {NavController, ToastController, MenuController, Events, LoadingController} from "ionic-angular";
import { LoginService } from "../../services/loginservice";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Login } from "../../models/login.model";
import { MyApp } from "../../app/app.component";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  userLogin:Login = {
    'username': undefined,
    'password': ''
  };
  loading = this.loadingCtrl.create({
    spinner: 'bubbles',
    content: 'Please wait...',
    cssClass: 'my-loading-class'
  });
  loginform: FormGroup;
  loginSubmitted: boolean = false;
  constructor(private navCtrl: NavController, private fb: FormBuilder, private toastCtrl: ToastController, private loginService: LoginService, private loadingCtrl: LoadingController, private menu: MenuController, private events: Events) {
    this.menu.swipeEnable(false);
    this.validateForm();
  }

  validateForm() {
    this.loginform = this.fb.group({
      mobile: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)]) ],
      password: ['', Validators.required]
    });
  }

  // login and go to home page
  login() {
    this.loading.present();
    this.loginService.getMemberLogin(this.userLogin).subscribe(
      (res) => {
        if(res[0]) {
          localStorage.setItem("userCred", JSON.stringify(res[0]));
          this.loading.dismiss();
          this.navCtrl.setRoot(MyApp);
          this.userLogin={};
          this.events.publish('userloggedin');
        }
        else {
          this.loading.dismiss();
          this.userLogin.password="";
          this.toastCtrl.create({
            message: "Not Valid Credentials.. Please Check it",
            duration: 4000
          }).present();
        }
      },
      (err) => {
        this.loading.dismiss();
        console.log(err);
        this.toastCtrl.create({
          message: "Sorry.. Try Again",
          duration: 4000
        }).present();
      }
    );    
    // this.nav.setRoot(HomePage);
  }

}

@Component({
  selector: 'page-logout',
  template: ''
})
export class LogoutPage {
  constructor(private navCtrl: NavController) {
    this.navCtrl.setRoot(LoginPage);
    // this.navCtrl.setRoot(LoginPage);
    localStorage.removeItem('userCred');
  }
}
