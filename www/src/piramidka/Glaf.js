
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
        this.par=par;
        this.param=this.par.param 

       
        this.content3d=new THREE.Object3D()


        dcmParam.fontFamily = "SFUIDisplay-Bold";

        //dcmParam._color1="#aaaaaa"

  
        //порезаный от пикси вювер        
		this.visi3D = new MVisi3D(par.contentHTML, null, dcmParam.mobile, true, true, true, true);		
	 	this.visi3D.yes3d = true;       	
		this.visi3D.groupObject.add(this.content3d);
        this.content3d.rotation.x=Math.PI
        window.visi3D=this.visi3D
        this.visi3D.rotationX=1.63;
        this.visi3D.rotationZ=0.5;
        this.visi3D.zume=450;
        this.visi3D.position3d.isDragPan=true;

       // this.visi3D.alwaysRender=true

 
        this.dCont=new DCont(par.contentHTML); 
       
        this.scane3d = new Scane3d(this, function(s, p){
            if(s=="visi3d"){
                self.visi3D.intRend=1;  
                return
            }
            if(s=="setBlok"){
                self.menu.setBlok(p)
                return
            }

        }) 

        this.menu = new Menu(this, function(s, p){
            if(s=="visi3d"){
                //trace(self.visi3D.upDate)
                self.visi3D.intRend=1;
                return
            } 
            if(s=="redraw"){               
                self.scane3d.redraw()
                return
            }
            if(s=="restore"){         
                self.scane3d.rstore()
                return
            }
             
        }) 

        this.menu.setScane3d(this.scane3d)


		this.update = function () {
			this.visi3D.upDate()
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
  		}
  	}
}