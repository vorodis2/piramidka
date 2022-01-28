
/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.

sdfsf
мост иницилизация основ, глобал дополнение, грабли на мобильники
*/


export class Menu  {
  	constructor(par, fun) {  		
  		this.type="Menu";
  		var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;

        this.dCont=new DCont(par.dCont); 

        
        this.window=new DWindow(this.dCont,0,0,"dsgdsg");
        new DButton(this.window.content,0,0,"test",function(){
            trace("dfg",self.param);
            self.fun("test");
        });




        var w,h,s;
        this.sizeWindow = function(_w,_h,_s){  
            if(_w){
                w= _w;
                h= _h;
                s= _s;   
            }
            trace(w,h,s)
        }   

  	}
}