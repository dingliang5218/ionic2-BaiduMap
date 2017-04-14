/**
 * Created by lding on 17/4/5.
 */
/*
 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
import { Injectable} from '@angular/core'
import {Http,Response,Jsonp,URLSearchParams,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {HTTP} from '@ionic-native/http';
import {Platform} from 'ionic-angular';
// import {Platform} from 'ionic-angular';

@Injectable()
export class HttpClient{

  constructor(public jsonp:Jsonp,public http:Http,public platform:Platform){

  }

  getNews<T>(jsonDict: any): Observable<T> {
    if (!jsonDict || (typeof jsonDict != 'object')) {
      return Observable.throw("无效的请求参数: " + jsonDict);
    }

    let newJsonDict = jsonDict;

    let url = "";
    if (jsonDict["jsonFile"] && jsonDict["jsonFile"].length > 0) {
      url = jsonDict["jsonFile"];
      return this.getFromJsonFile(url);
    }

  }

  private getFromJsonFile(url){
    return this.http.get(url).map(res=>{
      return res.json();
    }).catch(this.handleError);
  }

  private handleError(error:Response |any){
    console.error("origin error:"+error);

    let  errMsg:string;
    if(error instanceof Response){
      errMsg = error.toString();
    }else{
      errMsg=error.message?error.message:error.toString();
    }
    console.error("error:"+errMsg);
    return Observable.throw(errMsg);
  }

  //百度TTS 合成token
  getTTSAccessToken()
  {
    // let url = "https://openapi.baidu.com/oauth/2.0/token";
    // let params = {
    //   "grant_type": "client_credentials",
    //   "client_id": "TPnGgO8zxIayL9iTTctlxqny",
    //   "client_secret": "820591dad6912546574487991d6bcb7d"
    // };
    // if(this.platform.is("cordova"))
    // {
    //   return Observable.fromPromise(this.http.get(url, params, {})).map(res=>{
    //     return JSON.parse(res.data);
    //   }).catch(this.handleError);
    // }
    // else
    // {
    //   url = url.replace("https:/", "");
    //   let searchParams = new URLSearchParams();
    //   for(let key in params)
    //   {
    //     searchParams.set(key, params[key]);
    //   }
    //   let reqOpts = new RequestOptions({"search": searchParams, "headers": new Headers()});
    //   return this.http.get(url, reqOpts).map(res=>{
    //     return res.json();
    //   }).catch(this.handleError);
    // }
  }
  }

