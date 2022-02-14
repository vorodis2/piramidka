import { Scane3d } from './Scane3d.js';
//import { MVisi3D } from '../libMy/visi3D/MVisi3D.js';

export class MenuBlok  {
    constructor(par, fun) {         
        this.type="MenuBlok";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;
        this.dCont=new DCont(par.dCont);
        this.array=[]//массив элеменов меню
     

        var xx=this.param.otstup
        var yy=this.param.otstup

        this.window=new DWindow(this.dCont,0,this.param.otstup,"MenuBlok");
        this.window.width=this.param.sizeBase2
        this.window._dragBool=false
        this.window.hasMinimizeButton=false

        //panel.width=this.window.width-this.param.otstup*2
        //yy+=this.param.otstup+panel.height
        this.dCont.visible=false

        //this.window.height=yy


        //????????
        this.getBlok=function(){
            for (var i = 0; i < this.array.length; i++) {//проходим по массиву
                if(this.array[i].active==false){//если элемент массива не отрисован
                    return this.array[i];//????????
                }
            }

            this.array.push(new Blok(this,this.fun))//добавляем в массив элементов новый элемент
            this.array[this.array.length-1].idArr=this.array.length-1;  //добавляем элементу свойство idArr, чтобы обращаться к элементу по нему          
            return this.array[this.array.length-1];//возвращаем новый элемент как результат работы функции
        }


        this.setBlok  = function(blok){//перекидываю сцены3д           
            if(blok==null){
                this.dCont.visible=false
                return
            }
            this.window.text = `MenuBlok: ${blok.idArr}`
            this.window.height+=60
            this.mMBlok=new MMBlok(this, function(s,p){})
            this.window.content.add(this.mMBlok.dCont)
            this.mMBlok.setBlok(blok)
            this.dCont.visible=true

        } 
        this.clear=function(){
            this.active=false;
        }

        var w,h,s;
        this.sizeWindow = function(_w,_h,_s){  
            if(_w){
                w= _w;
                h= _h;
                s= _s;   
            }
            this.window.x=w/s-this.window.width-this.param.otstup
            trace(w,h,s)
        } 

    }

}






export class MMBlok  {
    constructor(par, fun) {         
        this.type="MMBlok";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;
        this.dCont=new DCont();
        this.object

        this._width=this.param.sizeBase2-this.param.otstup*2
        this.setBlok  = function(blok){//перекидываю сцены3д 
             this.object=blok;
            var yy=this.param.otstup

            var panel=new DPanel(this.dCont,this.param.otstup,this.param.otstup+self.object.idArr*60)
            panel.width= this._width
            panel.height= 60
            
            var label=new DLabel(panel,this.param.otstup,yy,`Blok # ${self.object.idArr}`);
            yy+=label.fontSize+this.param.otstup;
            
            var checkBox=new DCheckBox(panel.content,this.param.otstup,yy,"boolSah",function(){
                self.object.boolSah=this.value
            });
                
            trace("this",this.object)

            checkBox.value=this.object.boolSah

        }


        this.init  = function(){//перекидываю сцены3д       
          

            var yy=this.param.otstup

            var panel=new DPanel(this.dCont,this.param.otstup,this.param.otstup+self.object.idArr*60)
            panel.width= this._width
            panel.height= 60
            
            var label=new DLabel(panel,this.param.otstup,yy,`Blok # ${self.object.idArr}`);
            yy+=label.fontSize+this.param.otstup;
            
            var checkBox=new DCheckBox(panel.content,this.param.otstup,yy,"boolSah",function(){
                self.object.boolSah=this.value
            });
                
            trace("this",this.object)

            checkBox.value=this.object.boolSah
        } 

        this.clear=function(){
            for (var i = 0; i < this.array.length; i++) {               
                this.array[i].clear()
            }
        }

    }

    set active(value) {
        if (this._active != value) {
            this._active = value;
            //if(this._active==true)this.init() 
            if(this._active==true)this.setBlok() 
            this.dCont.visible=this._active
        }
    }
    get active() {
        return this._active;
    }
}


