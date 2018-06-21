import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QuizProvider } from '../../providers/quiz/quiz';
import { Storage } from '@ionic/storage';
import { GameViewPage } from '../game-view/game-view';

import { SettingsPage } from '../settings/settings';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  option: {
    category:number,
    difficulty:string,
    quizNum: number

    type: string
    encodage: string

  };

  constructor(
    public navCtrl: NavController, 
    private quizProvider: QuizProvider,
    private storage: Storage) {
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
          quizNum: 10
        };
      };
    
    
      this.quizProvider.getQuiz(this.option.category, this.option.difficulty, this.option.quizNum,this.option.type,this.option.encodage).

      subscribe(quiz => {
        this.storage.set('quizzes', JSON.stringify(quiz));
      });
    });
  };


  start(){

    this.navCtrl.setRoot(SettingsPage);

    this.storage.set('quizIndex', 0);
    this.storage.set('results', []);
  };
};
