import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameViewPage } from '../game-view/game-view';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {
  results: any;
  quizTotal: number;
  correctTotal: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    public http: Http) {
      this.http = http;

    
  }

  ionViewWillEnter() {
    this.storage.get('results').then((val) => {
      this.results = val;
      this.quizTotal = this.results.length;
      
      let filterAnswers = this.results.filter(
        answer => answer.yourAnswer === answer.correctAnswer
      );

     this.storage.get('option').then((val) => {
        val=JSON.parse(val)
       console.log(val);

       let coef = 0 ;
       let difficul = val.difficulty;
       if(difficul == 'easy'){
         coef = 5;
       }else if(difficul == 'medium'){
         coef = 10;
       }else if(difficul == 'hard'){
         coef = 20;
       }
       let falseAnswer = this.quizTotal - filterAnswers.length;
       let score = (filterAnswers.length * coef) + (falseAnswer * (coef * -1)); 

        //this.correctTotal = val.difficulty ;
        this.correctTotal = score;
        console.log(this.correctTotal);
        });


    });
}

  backHome() {
    this.navCtrl.setRoot(HomePage);
  }

  restart() {
    this.navCtrl.setRoot(GameViewPage);
    this.storage.set('quizIndex', 0);
    this.storage.set('results', []);
  }

<<<<<<< HEAD

  addScore(){
 
    
    let response = {
      nickname: "test",
      score: -20,
      time: 44.254,
      avatar_url: "https://api.adorable.io/avatars/test"
    };
   
    
    var link = 'https://leaderboard.lp1.eu/api/score';
   
    console.log(JSON.stringify(response));

    this.http.post(link,JSON.stringify(response))
    .subscribe(data => {
  
    }, error => {
    console.log("Oooops!");


   
  });
  }

}


=======
}
>>>>>>> 6df277f375abfcfce151d11af4844465fbecb914
