import { Component, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FeedbackPage} from '../feedback/feedback';
import { ResultsPage } from '../results/results';

@IonicPage()
@Component({
  selector: 'page-game-view',
  templateUrl: 'game-view.html',
})

@Injectable()
export class GameViewPage {
  quizzes:any;
  currentQuiz:any;
  answers:any;
  correct:any;
  quizIndex:number;
  totalQuizNum: number;

 difficulty: string;
  public counter: number = 0;
  public time: number = 0;
  public id: number=0;
  public score: number = 0;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
   
  ) {
  this.difficulty = navParams.get('difficulty')
  console.log(this.difficulty)
  }


  shuffle(arr){
    let currentIndex = arr.length, temporaryValue, randomIndex;
   let i: number=0;
   /* let timeTab: Date[20];
    for(let i=0;i<this.totalQuizNum;i++){
      timeTab[i] = this.timer; 
    }*/ 
    const array = [];
    for(let i:number = 0 ; i < this.totalQuizNum; i++){
      array.push(Date());
    }
    console.log(array);

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    }
    return arr;
  }


  ionViewWillEnter(){
    this.storage.get('quizIndex').then((val) => {
      this.quizIndex = val;
    
      this.timer();
     
     
    });

    this.storage.get('quizzes').then((val) => {
      this.quizzes = JSON.parse(val);
      this.totalQuizNum = this.quizzes.results.length;

      if ( this.quizzes !== null && this.totalQuizNum >= this.quizIndex +1) {
        this.currentQuiz = this.quizzes.results[this.quizIndex];
        this.answers = this.currentQuiz.incorrect_answers;
        this.correct = this.currentQuiz.correct_answer;
        this.answers.push(this.correct);
        this.shuffle(this.answers);
        this.counter++;
      } else if ( this.totalQuizNum < this.quizIndex +1) {
       

        this.navCtrl.setRoot(ResultsPage);
      
      };
    });
  }


  trackAnswers(answer){
    this.storage.get('results').then((val) => {
      let results = val,
          quizResults = {
            yourAnswer: answer,
            correctAnswer: this.correct
          }
      results.push(quizResults);
     
      this.storage.set('results', results)
    });    
  }

  handleAnswer(answer){
    if (answer === this.correct) {  
      this.trackAnswers(answer);
      this.navCtrl.setRoot(
        FeedbackPage, 
        {
        checkAnswer:true, 
        totalQuizNum: this.totalQuizNum
      });
    } else {
      this.trackAnswers(answer);
      this.navCtrl.setRoot(
        FeedbackPage, 
        {
          checkAnswer:false, 
          correctAnswer: this.correct,
          totalQuizNum: this.totalQuizNum
        });
    } 
  }

  timer() {
    var timer = () => {
       setTimeout(() => {
        this.storage.set('timeSave', this.time);   
        this.storage.get('timeSave').then((val) => {
             if(val==0){
          this.time += 1;
          console.log(val);
            }
            else{
              this.time=val+1;
              console.log(val);
            }
          });
                   timer();
            
        }, 1000);
    }
    
  timer();
}

}

