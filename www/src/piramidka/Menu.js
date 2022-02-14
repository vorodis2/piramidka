
/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.

sdfsf
мост иницилизация основ, глобал дополнение, грабли на мобильники
*/
import { MenuS3D } from './MenuS3D.js';
import { MenuBlok } from './MenuBlok.js';

export class Menu  {
  	constructor(par, fun) {  		
  		this.type="Menu";
  		var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;

        this.dCont=new DCont(par.dCont); 


        this.menuS3D=new MenuS3D(this, function(s,p){
            if(s=="visi3d"){
                self.fun(s,p)
                return
            }
            self.fun(s,p)
        })

        this.menuBlok=new MenuBlok(this, function(s,p){
            if(s=="visi3d"){
                self.fun(s,p)
                return
            }
            self.fun(s,p)
        })


        this.object
        this.setScane3d = function(scane3d){//перекидываю сцены3д            
            this.object=scane3d
            this.menuS3D.setScane3d(scane3d)
        }

        this.setBlok  = function(blok){//перекидываю сцены3д
            this.menuBlok.setBlok(blok)
            /*
            for (var i = 0; i < this.menuBlok.array.length; i++) {
                if (this.menuBlok.array[i].object.idArr==blok.idArr) { 
                    this.menuBlok.array[i].visiActiv=true
                } else this.menuBlok.array[i].visiActiv=false
            }
             trace('blllllloooorrrr', this.menuBlok.array[0].object.idArr)
*/

        } 

        var w,h,s;
        this.sizeWindow = function(_w,_h,_s){  
            if(_w){
                w= _w;
                h= _h;
                s= _s;   
            }
            this.menuS3D.sizeWindow(w,h,s)
            this.menuBlok.sizeWindow(w,h,s)
        }   

  	}
}
