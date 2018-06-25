import { Component } from '@angular/core';
import { NavController, Alert } from 'ionic-angular';
import { QuizProvider } from '../../providers/quiz/quiz';
import { Storage } from '@ionic/storage';
import { GameViewPage } from '../game-view/game-view';

import { SettingsPage } from '../settings/settings';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   
  option: {
    category:number,
    difficulty:string,
    quizNum: number,
    type: string,
    encodage: string,
  };

  pseudo:string


 constructor(
    public navCtrl: NavController, 
    private quizProvider: QuizProvider,
    private storage: Storage,
    private alertCtrl: AlertController
  ) {
  };

  ionViewWillEnter(){
    this.storage.get('option').then((val) => {
      if (val !== null) {
        this.option = JSON.parse(val);
      } else {
         this.option = {
          category: 15,
          difficulty: 'medium',
          type:  '',
          encodage: '',
          quizNum: 10,
         
        };
      };
    
    
      this.quizProvider.getQuiz(this.option.category, this.option.difficulty, this.option.quizNum,this.option.type,this.option.encodage).

      subscribe(quiz => {
        this.storage.set('quizzes', JSON.stringify(quiz));
      });
    });
  
//Repmplissage du champ "pseudo" avec la valeur du pseudo stocké localement
    
    this.storage.get('pseudo').then((val) => {
    if(val!==null){
      this.pseudo = JSON.parse(val);
      console.log(JSON.parse(val));
    }
    }); 
    
  };


  getValue(){
    this.storage.get("object").then((data)=>{
      console.log(data);
    })
  }



  start(){


    this.navCtrl.setRoot(GameViewPage);

    this.storage.set('quizIndex', 0);
    this.storage.set('results', []);
    this.storage.set("pseudo",JSON.stringify(this.pseudo));
   
    }

  getPseudo(){
    return this.pseudo;
  }


  
  
  };
  









