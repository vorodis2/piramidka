
/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.

sdfsf
мост иницилизация основ, глобал дополнение, грабли на мобильники
*/



import { MVisi3D } from '../libMy/visi3D/MVisi3D.js';

import { Scane3d } from './Scane3d.js';
import { Menu } from './Menu.js';

export class Glaf  {
  	constructor(par) {  		
  		this.type="Glaf";
  		var self=this;



        
        this.scale=1;
		
        this.content3d=new THREE.Object3D()

        this.par=par;
        this.param=this.par.param

/*
        //u1 Включена замена полок апдейт up1_10_06_2020 
        this.up1 = false; //смена полок 55 иди
        this.up1Obj = undefined;

        this.urlSave = null;

        if(main.confText.up1){ 
            if(main.confText.up1.active){
                this.up1 = true
                this.up1Obj = main.confText.up1;
            }else{
                this.up1 = false;
                this.up1Obj = main.confText.up1;
                if(main.localStorage.object.up1!=undefined&&main.localStorage.object.up1.sahTime!=15){   
                    main.localStorage.object.up1.sahTime=15
                    main.localStorage.save();
                }                  
            }
        }




        
        //-----------------------

*/

     





        
        dcmParam.color='#c7edfc';
        dcmParam.color1='#e2e7ed'; //https://youtu.be/MmkfOarXZLs 
        dcmParam.colorText1="#424242";




        dcmParam.fontFamily = "SFUIDisplay-Bold";

        




  
        //порезаный от пикси вювер        
		this.visi3D = new MVisi3D(par.contentHTML, null, dcmParam.mobile, true, true, true, true);		
	 	this.visi3D.yes3d = true;       	
		this.visi3D.groupObject.add(this.content3d);
        window.visi3D=this.visi3D
        this.visi3D.rotationX=1.63;
        this.visi3D.rotationZ=0.5;
        this.visi3D.zume=450;
        this.visi3D.position3d.isDragPan=true;

 
        this.dCont=new DCont(par.contentHTML); 
       
        this.scane3d = new Scane3d(this, function(s, p){
            if(s=="visi3d"){
                self.visi3D.intRend=1;  

                return
            }                               
        }) 

        this.menu = new Menu(this, function(s, p){
            if(s=="visi3d"){
                self.visi3D.intRend=1;
                return
            } 
            if(s=="test"){                
                self.scane3d.test()
                return
            } 

        }) 


		this.update = function () {
			this.visi3D.upDate()

            /*this.menuDiv.upDate()
            this.scane3d.unDate() */	
		}

        //расчет окна
        var w,h,s;
  		this.sizeWindow = function(_w,_h,_s){  
            if(_w){
                w= _w;
                h= _h;
                s= _s;   
            }

  			this.scale=s;
            this.dCont.scale=s;
            this.visi3D.sizeWindow(0,0,w,h);
            this.scane3d.sizeWindow(w,h,s);
            this.menu.sizeWindow(w,h,s);
            // this.dragPic.scale=s;
/*
  			this.menuDiv.sizeWindow(w,h,s);
  			this.scane2d.sizeWindow(w,h,s);
  			this.scane3d.sizeWindow(w,h,s);
            this.galleres.sizeWindow(w,h,s);
  			
            this.webCamera.sizeWindow(w,h,s); 
            this.dragCent3d();*/
  		}

        /*
        var arrNa=[]
        this.keydown=function(e){
            if(arrNa.indexOf(e.keyCode)==-1){
                arrNa.push(e.keyCode);
            }
            self.scane3d.sobKey("down", e, arrNa);            
        }
        this.keyup=function(e){ 
            self.scane3d.sobKey("up", e, arrNa);            
            for (var i = 0; i < arrNa.length; i++) {
                if(arrNa[i]==e.keyCode){
                    arrNa.splice(i,1)
                    i=0
                }
            }           
        }
        window.addEventListener( 'keydown', this.keydown );    
        window.addEventListener( 'keyup', this.keyup );
/**/

  	}
}