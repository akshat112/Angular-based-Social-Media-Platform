import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular'
import{Router} from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = "";
  password: string = "";
  cpassword: string = "";

  constructor(public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router) { }

  ngOnInit() {
  }

  async register(){
    const {username, password, cpassword} = this
    if(password !== cpassword){
      this.showAlert("Error", "Passwords do not match")
      return console.error("Passwords dont match")
    }
    try{
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username + "@banana.com", password)
      console.log(res)
      this.showAlert("Success", "Registered Successfully!")
      this.router.navigate(['/tabs'])
    } catch(err){
      console.dir(err)
      this.showAlert("Error", err.message)
    }
    
  }

  async showAlert(header: string, message: string){
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["Ok"]
    })

    await alert.present()
  }
}
