
/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.


главный класиик, стартует основное, грузит конфиг
*/

import { Glaf } from './Glaf.js';
//import { AGlaf } from '../admin/AGlaf.js';
//import { LocalStorage } from '../component/LocalStorageE6.js';

import { Param } from '../component/Param.js';
import { MHBD } from '../component/MHBD.js';

/*import { TStyle } from '../t3d/TStyle.js';

fun на индекс, хз может апи, вырубает пердзагрущик
plus окнчание для большинства загрузок, и хронитель версии
tip =0 если 1 то обрезаеться функции с php для локальной версии
*/


export class Main  {
  	constructor(fun) {  		
  		this.type="Main";  		  		
  		var self=this;

		this.contentHTML= document.createElement('div');
		this.contentHTML.style.position = 'fixed';
		this.contentHTML.style.top = '0px';
		this.contentHTML.style.left = '0px';
		document.body.appendChild(this.contentHTML);  	



		//создание сцены
  		this.start = function () {	   
			var t = new PIXI.ticker.Ticker();
			t.minFPS = 50;
			t.add(this.tick, this);
			t.start();            
           
            

            this.param=new Param().param;
            //dcmParam.color='#c7edfc';
        	//dcmParam.color1='#e2e7ed'; //https://youtu.be/MmkfOarXZLs 
        	//dcmParam.colorText1="#424242";
        	dcmParam.fontFamily = "Montserrat";
        	dcmParam.fontSize = this.param.fontSize;


        	window.mhbd=new MHBD(this);
        	this.fina()
		};

		this.fina = function () { 
			self.glaf=new Glaf(this);
		    fun("init");  
        	
        }

		//188,189,190,191,192,193
/*
		//стартуем дальше
        this.fina = function () {        
        	self.fina1();
        }



        this.aL=[
        	{key:"scenes3d",id:5,bl:false,e:null},//хронитель деревьев
        	{key:"scenes3d",id:2,bl:false,e:null},//хронитель деревьев
        	{key:"group2",id:130,bl:false,e:null},//хронитель деревьев
        ]

        this.fina1 = function () {        	
        	for (var i = 0; i < this.aL.length; i++) {
                let ii=i
                mhbd.getKeyId(this.aL[i].key, this.aL[i].id, function(e){                   
                    self.aL[ii].e=e;
                    self.aL[ii].bl=true
                    self.testLoad()
                }) 
            }
        }

        this.testLoad=function(){
            var b=true
            for (var i = 0; i < this.aL.length; i++) {
                if(self.aL[i].bl==false)b=false
            }
            if(b==true)self.fina2()

        }

    	this.arrTovar=[]
    	this.funGetKeyId = function (key,id,obj) {	
    		if(key=="group"){ 
    			for (var i = self.arrTovar.length - 1; i >= 0; i--) {
    				if(self.arrTovar[i].id==obj.id){						
    					obj.art=self.arrTovar[i].art;
    					obj.name=self.arrTovar[i].name;
    					obj.ru=self.arrTovar[i].name;
    					obj.price=self.arrTovar[i].price;
    				}
    			}
    		}    		
    	}



        this.fina2 = function () {	
        	var d=mhbd.getKeyId("scenes3d",2);
        	mhbd.infoUser=mhbd.getKeyId("group2",130);

        	this.arrTovar=mhbd.infoUser.json.arrTovar
        	mhbd.funGetKeyId=this.funGetKeyId;
			
        	self.arrSt[0]=d;
       		window.tStyle=new TStyle();

       		if(this.localStorage.object.dubag!=undefined){
                //if(this.localStorage.object.dubag==true){  
                	self.param.debug=this.localStorage.object.dubag
               // }
            }

			self.glaf=new Glaf(self);
			trace("this.localStorage.object",this.localStorage.object)

			if(this.localStorage.object.dubag!=undefined){
                if(this.localStorage.object.dubag==true){                      
                    self.glaf.scane3d.dubag.active=true;                                         
                }
            }  
						
			fun("init");
		}*/


		//тик размит надва
		var b=true
		this.tick = function () {				
			TWEEN.update();		
			if (self.glaf) {
				self.glaf.update();
			}			
		}

		//Маштабим окна 
		this.scale=1;
		var s
  		this.sizeWindow = function(w,h){  			
  			self._width=w;
			self._height=h;
			if (self._width < 800) self._width = 800;
			if (self._height < 600) self._height = 600;
			s= w/self._width;
			if(s>h/self._height)s=h/self._height;
			this.scale = s;
			if(dcmParam.isIE==true)this.scale = 1;			
			
  			if (self.glaf) { 
  				self.glaf.sizeWindow(w, h, this.scale)
  			}			
  		}

  		this.start()
  	}
}
