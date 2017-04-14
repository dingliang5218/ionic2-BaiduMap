import { Component ,ViewChild,ElementRef} from '@angular/core';

import {MenuController, NavController, Platform} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';


declare var BMap;
declare var BMap_Symbol_SHAPE_POINT;
declare var BMAP_ANCHOR_BOTTOM_RIGHT;
declare var BMAP_ANCHOR_TOP_RIGHT;
declare var BMAP_ANCHOR_TOP_LEFT;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public map: any;
  public marker: any;


  showFilter(){
    this.menuCtrl.open('filterMenu');
  }

  // #container可以通过ElementRef引用在TypeScript代码中引用
  @ViewChild('container') mapElement: ElementRef;
  constructor(public navCtrl: NavController, public platform: Platform, public geolocation: Geolocation,
              public menuCtrl:MenuController
              // public sanitizer:DomSanitizer
  ) {
    this.platform.ready().then(
      ()=>{
        this.map=new BMap.Map(this.mapElement.nativeElement);
        let map = this.map = new BMap.Map(this.mapElement.nativeElement, { enableMapClick: true });//创建地图实例
        map.enableScrollWheelZoom();//启动滚轮放大缩小，默认禁用
        map.enableContinuousZoom();//连续缩放效果，默认禁用
        let point = new BMap.Point(116.397232, 39.549284);//坐标可以通过百度地图坐标拾取器获取
        map.centerAndZoom(point, 13);//设置中心和地图显示级别

        //地图放大缩小控件
        let sizeMap = new BMap.Size(10, 80);//显示位置
        map.addControl(new BMap.NavigationControl({
          anchor: BMAP_ANCHOR_BOTTOM_RIGHT,//显示方向
          offset: sizeMap
        }));

        //3D效果矢量图控件
        let size3D = new BMap.Size(10, 10);
        map.addControl(new BMap.MapTypeControl({
          anchor: BMAP_ANCHOR_TOP_RIGHT,
          offset: size3D
        }));
        map.setCurrentCity("深圳");//3D效果需要设置城市

        //城市列表控件
        let sizeCity = new BMap.Size(10, 10);
        map.addControl(new BMap.CityListControl({
          anchor: BMAP_ANCHOR_TOP_LEFT,
          offset: sizeCity
        }));

        function showAttractionControl() {
          //定义显示位置
          this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
          this.defaultOffset = new BMap.Size(10, 50);
        }

        //初始化控件
        // showAttractionControl.prototype = new BMap.Control();
        // showAttractionControl.prototype.initialize = function (map) {
        //   let div = document.createElement("button");// 创建一个按钮
        //   div.appendChild(document.createTextNode("附近景点"));
        //   div.style.width = "135px";
        //   div.style.height = "35px";
        //   div.style.borderRadius = "15px";
        //   div.onclick = function (e) {
        //     let local = new BMap.LocalSearch(map, {
        //       renderOptions: { map: map, autoViewport: true }
        //     });
        //     local.search("景点");
        //   }
        //   map.getContainer().appendChild(div);// 添加DOM元素到地图中
        //   return div;
        // }
        // let showAttraction = new showAttractionControl();
        // map.addControl(showAttraction);//添加控件

        // //添加自定义标注在地图中
        // showAttractionControl.prototype.div.onclick = function (e) {//地图上可以添加自定义标注
        //   let icon = new BMap.Icon('http://pic002.cnblogs.com/images/2011/308287/2011091516161618.png', new BMap.Size(20, 32), {
        //     anchor: new BMap.Size(10, 30),
        //   })//设置标注图片和位置
        //   var mkr = new BMap.Marker(new BMap.Point(116.06827, 22.549284), {
        //     icon: icon,
        //     enableDragging: true,
        //     raiseOnDrag: true
        //   });//设置起始坐标点
        //   map.addOverlay(mkr);//添加标注在地图中并实现拖拽
        // }

        // let point = new BMap.Point(116.397232,39.907501);
        // this.map.centerAndZoom(point,13);
        // this.marker=new BMap.Marker(point,{
        //   icon:
        //   new BMap.Symbol(BMap_Symbol_SHAPE_POINT,{
        //     scale:1,
        //     fillColor:"orange",
        //     fillOpacity:0.9
        //   })
        // });
        // this.map.addOverlay(this.marker);
        //获取坐标定位
        // var geolocation = new BMap.Geolocation();
        // geolocation.getCurrentPosition().then(
        //   (resp) =>{
        //     var new_point =
        //       new BMap.Point(resp.coords.longitude,
        //       resp.coords.latitude);
        //     var convertor=new BMap.Convertor();
        //     var pointArr = [];
        //     pointArr.push(new_point);
        //     convertor.translate(pointArr,1,5,(data)=>
        //       {
        //         if(data.status ===0){
        //           this.map.panTo(data.points[0]);
        //           this.marker.setPosition(point);
        //         }
        //       });
        //   });
      }).catch((error) =>{
        console.log('Error getting location',error);
    });
  }

}
