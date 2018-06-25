import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameViewPage } from '../game-view/game-view';
import { Storage } from '@ionic/storage';
import { HomePage} from '../home/home';
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
  score: any;
  pseudo: string;
  time: number;
  data:any = {};
  response: any;
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
       this.storage.set('score', JSON.stringify(score));
        //this.correctTotal = val.difficulty ;
        this.correctTotal = score;
        this.storage.get('pseudo').then((val) => {
          this.storage.get('timeSave').then((data) => {
          if(val!==null){
            this.pseudo = JSON.parse(val);
            this.time = JSON.parse(data);
            this.response = {
              nickname: this.pseudo,
              avatar_url: "https://api.adorable.io/avatars/"+this.pseudo,
              time: this.time,
              score: this.correctTotal
        
              }
          }
        });
          }); 

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


  addScore(){
 

    var link = 'https://leaderboard.lp1.eu/api/score';
    console.log(link);
    console.log(this.response);
    this.http.post(link,this.response)
    .subscribe(response => {
      console.log('true');  
     // this.data.response = data["_body"];
    }, error => {
    console.log("Oooops!");
  
  })

 
 /*   this.storage.get('pseudo').then((val) => {
    let pseudo=val.pseuo;
    });

    let response = {  
      nickname: 'test',
      score: 20,
      time: 44.254,
      avatar_url: "https://api.adorable.io/avatars/test"
    };
   
    
    var link = 'https://leaderboard.lp1.eu/';
    console.log(link);
    console.log(response);
    this.http.post('api/score',response, link)
    .subscribe(data => {
      console.log('true');  
      this.data.response = data["_body"];
    }, error => {
    console.log("Oooops!");
  
  }); */




    }
  }


