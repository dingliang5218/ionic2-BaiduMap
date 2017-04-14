import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';

import {HttpClient} from "../providers/HttpClient";
import {JsonpModule, HttpModule} from "@angular/http";
import {NewsPagePage} from "../pages/news/news-page/news-page";
import {NewsDetailPagePage} from "../pages/news/news-detail-page/news-detail-page";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    NewsPagePage,
    NewsDetailPagePage
  ],
  imports: [
    HttpModule,
    JsonpModule,

    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages:"true",
      backButtonText: '',
      iconModel:'ios',
      mode:'ios'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    NewsPagePage,
    NewsDetailPagePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    HttpClient,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
