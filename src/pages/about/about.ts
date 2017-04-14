import { Component } from '@angular/core';

import {NavController, NavParams, MenuController, LoadingController} from 'ionic-angular';
import {NewsPagePage} from "../news/news-page/news-page";
import {HttpClient} from "../../providers/HttpClient";
import {ISSPage} from "../common/ISSPage"
import {NewsItemModel} from "../../models/common/NewsItemModel"
import {NewsItemGroupModel} from "../../models/common/NewsItemGroupModel";
import {ISSConfig} from "../../models/common/ISSConfig";
import {NewsDetailPagePage} from "../news/news-detail-page/news-detail-page";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage extends ISSPage{

  private pageSize:number = 10;

  private newsPageIndex:number =0;
  private newsPageTotal:number =0;
  newList:Array<NewsItemModel>=[];

  hotListOne:Array<NewsItemModel> =[];
  hotListTwo:Array<NewsItemModel> =[];
  hotListThree:Array<NewsItemModel> =[];

  serveListOne = ISSConfig.serveListOne;
  serveListTwo = ISSConfig.serveListTwo;
  serveListThree = ISSConfig.serveListThree;
  serveListFour = ISSConfig.serveListFour;

  mySeg: string="info";
  mySegFour: string="activity";

  constructor(public navCtrl: NavController,public navPara:NavParams,
              public menuCtrl:MenuController,public loadingCtrl: LoadingController,
              public httpclient:HttpClient) {

    super();
  }

  ionViewDidLoad(){
    this.getNews();
  }

  getNews(){
    this.newsPageIndex++;
    let jsonFile = "assets/json/newsList.json";
    let jsonDict = {"jsonFile": jsonFile,"pageIndex":this.newsPageIndex,"pageSize":this.pageSize};
    this.httpclient.getNews<NewsItemGroupModel>(jsonDict).subscribe((item)=>
      {
        this.stopLoading();
        if(item && item.result.length>0){
          this.newList.push(...item.result);
        }
        this.hotListOne = this.newList.slice(0,3);
        this.hotListTwo = this.newList.slice(1,4);
        this.hotListThree = this.newList.slice(2,5);
      },(errmsg)=>
      {
        this.stopLoading();
        console.log(errmsg);
      }
    )
  }

  showNesDetails(item:NewsItemModel){
    this.navCtrl.push(NewsDetailPagePage,{"item":item});
  }

  showMoreHotNews(){
    this.navCtrl.push(NewsPagePage);
  }

  doSubmit(){}

  showFilter(){
    this.menuCtrl.open('filterMenu');
  }

  fiveSelectType(index:number){
    this.navCtrl.push(NewsPagePage);
  }

}
