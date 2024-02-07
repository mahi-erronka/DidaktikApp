import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})



export class HomePage {

  username:any;
  password:any;

  

  constructor(private http: HttpClient,private route: Router) {}

  
  login(username:any,password:any) {
    const apiUrl = 'http://192.168.73.8:80/api/erabiltzaileak';
    const requestBody = { izena: this.username, pasahitza: this.password };


    
    this.http.get(apiUrl).subscribe(
      (response) => {
        // Handle successful response
        //console.log('Data fetched successfully', response);
        var res = JSON.stringify(response);

        // Parse the JSON response
        const dataArray = JSON.parse(res);


        // Access the first element of the array
        if (dataArray.length > 0) {
          for(let i = 0;i < dataArray.length;i++){
            if(dataArray[i].izena == this.username && dataArray[i].pasahitza == this.password){
              this.route.navigate(['/intro', { id: dataArray[i].id, izena: dataArray[i].izena, pasahitza: dataArray[i].pasahitza, emaila: dataArray[i].emaila}]);
            }
          }
        } else {
          console.error("Array is empty");
        }
      },
      (error) => {
        // Handle error
        console.error('Error fetching data', error);
        console.error('User: ' + this.username + ",Password: " + this.password)
      }
    );
  }

}
