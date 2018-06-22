import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http'; 

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { GameViewPage } from '../pages/game-view/game-view';
import { FeedbackPage } from '../pages/feedback/feedback';
import { ResultsPage } from '../pages/results/results';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { QuizProvider } from '../providers/quiz/quiz';
import { LeaderBoardPage } from '../pages/leader-board/leader-board';
import { RestProvider } from '../pages/leader-board/leader-board-rest';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    SettingsPage,
    GameViewPage,
    FeedbackPage,
    ResultsPage,
    LeaderBoardPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    SettingsPage,
    GameViewPage,
    FeedbackPage,
    ResultsPage,
    LeaderBoardPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    RestProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    QuizProvider
  ]
})
export class AppModule {}
