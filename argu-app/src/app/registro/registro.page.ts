import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  username : any;
  emaila : any;
  password1 : any;
  password2: any;

  pasahitza_error = 'hidden';
  errorea = "Datuak falta dira edo pasahitzak ez dira berdinak"

  constructor(private http: HttpClient,private route: Router) { }

  erregistratu(){
    const apiUrl = 'http://192.168.73.8:80/api/erabiltzaileak';
    const requestBody = { izena: this.username,emaila: this.emaila,pasahitza: this.password1,pasahitza2: this.password2};

 
      if(this.username && this.emaila && this.password1 && this.password2 && this.password1 == this.password2){
        this.http.post(apiUrl,requestBody).subscribe(
          (response) => {
            this.route.navigate(['/home']);
            this.username = ""
            this.emaila = ""
            this.password1 = ""
            this.password2 = ""
          },
          (error) => {
            // Handle error
            console.error('Error fetching data', error);
            console.error('User: ' + this.username + ",Password: " + this.password1)
          }
        );
      }else{
        this.pasahitza_error = 'visible';
      }
  }

  ngOnInit() {
  }

}
