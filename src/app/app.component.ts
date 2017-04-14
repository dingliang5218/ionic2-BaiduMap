import {Component, ViewChild} from '@angular/core';
import { Platform,NavController,Menu ,ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import {FilterInterface} from '../pages/filter/FilterInterface';

declare let cordova:any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('nav')nav:NavController;

  @ViewChild('filterMenu') filterMenu:Menu;

  rootPage = TabsPage;
  filterWorker:FilterInterface;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              public toastCtrl:ToastController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  showFilterMenu(){
    this.filterMenu.open();
  }

  doSubmitFilter(){
    this.filterMenu.close();
    if(this.filterWorker){
      this.filterWorker.doSubmit();
    }
  }

  showToast(postion:string){
    let toast = this.toastCtrl.create({
      message: '正在紧张开放中，敬请期待...',
      duration: 2500,
      position: postion
    });
    toast.present();
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.filterMenu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
