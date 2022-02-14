import { Scane3d } from './Scane3d.js';
//import { MVisi3D } from '../libMy/visi3D/MVisi3D.js';

export class MenuBlok  {// объект 
    constructor(par, fun) {  //конструктор принимает в себя некие параметры и функцию       
        this.type="MenuBlok";
        var self=this;//для вызова функций внутри класса
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;
        this.dCont=new DCont(par.dCont);//
        this.array=[]//массив элеменов меню
        this._active=false;//выставляем сеттер отрисовки меню
        this._index=-1;//выставляем сеттер индекса элемента меню
        this._boolSah=false //выставляем сеттер чекбокса
        this._materialIdx=0 //выставляем сеттер материала
        this.window=new DWindow(this.dCont,0,this.param.otstup,"MenuBlok");//в контексте ранее созданого дива создаем окно меню
        this.window.width=this.param.sizeBase2;//задаем ширину окна меню
        this.window.dragBool=false;//запрещаем перетаскивать окно мышкой
        this.window.hasMinimizeButton=false; //запрещаем менюхе сворачиваться
        this.dCont.visible=false;  //делаем меню невидимым

        this.dCBlok1=new DCont(this.window.content);
        this.dCBlok=new DCont(this.dCBlok1);

        this.dScrollBarV = new DScrollBarV(this.window.content,0,0, function(){
            self.dragScrol(this.value)
        });
        this.dScrollBarV.visible=false
        this.dScrollBarV.width=this.param.otstup
        this.dScrollBarV.x=this.window.width-this.dScrollBarV.width
        this.scrollMouse=50


        //this.dCBlok1.div.style.clip = "rect(1px "+this.window.width+"px "+this.dScrollBarV.height+"px 0px)";
        //this.dCBlok1.div.style.clip = "rect(1px 200px 600px 0px)";
        //trace(this.dScrollBarV.height)

        //
        
        this.dragScrol=function(num){
         
            self.dCBlok.y=-num*(self.dScrollBarV.heightContent-self.dScrollBarV.height)/100

            self.dScrollBarV.value=num

            this.dCBlok1.div.style.clip = "rect(1px "+this.window.width+"px "+this.dScrollBarV.height+"px 0px)";

            


        }

        this.sob=function(s,p){
            if(s="index"){
                self.index=p
                return
            }


        }

        this.sob1=function(s,p){
            if(s="materialIdx"){
                self.materialIdx=p
                return
            }


        }

          
        this.clear=function(){
            for (var i = 0; i < this.array.length; i++) {               
                this.array[i].clear()
            }
        }

        this.getBlok=function(){
            for (var i = 0; i < this.array.length; i++) {//перебираем элементы меню
                if(this.array[i].active==false){//если существует неактивный элемент мню - возвращаем его, иначе - создаем новый элемент меню
                    return this.array[i];
                }
            }
            this.array.push(new MMBlok(this,this.sob))//закидываем в массив экземпляр класса, передаем в него параметры родителя и функцию
            this.array[this.array.length-1].idArr=this.array.length-1; //присваиваем элементу меню порядковый номер
            return this.array[this.array.length-1];//возвращаем новый элемент массива в качестве результата работы функции
        }

        var mblok 
        this.setBlok  = function(blok){//метод 
            if(blok==null){
                this.clear();
                this.dragScrol(0);
                this.dCont.visible=false
                this.array=[]
                return
            }
            this.window.title="Blok: "+blok.idArr

            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].active==true){//если элемент массива не отрисован
                    if (this.array[i].object){
                        if (this.array[i].object.idArr == blok.idArr) {
                            this.index=this.array[i].idArr;
                            this.array[i].setBlok1()
                            this.dragIndex(); 

                            return
                        }
                    }
                }
            }

            mblok=this.getBlok()//вызов метода создания блока

            this.index=mblok.idArr;
            mblok.setBlok(blok);
            mblok.active=true;
            this.dCont.visible=true

            this.drag()

            this.dragIndex() 

        }

        var yy, vv1
        this.drag  = function(){
            yy=this.param.otstup
            for (var i = 0; i < this.array.length; i++) {//проходим по массиву
                if(this.array[i].active!==false){//если элемент массива не отрисован
                    this.array[i].dCont.y=yy;
                    this.array[i].dCont.x=this.param.otstup;
                    yy+=(this.param.otstup+this.array[i].height)
                    
                }
            }
            this.scroll(yy)
        }


        var b, hhh, hh1
        this.scroll = function(_h) {
            b=false
            hhh=this.window.height-32
            hh1=h/s-this.window.y-32-this.param.otstup;
            //trace(hh1, _h, h, this.param.otstup )

            if (hh1 < _h) {
                b=true
                this.window.height=hh1+32
                this.dScrollBarV.height=hh1                         //высота полосы прокрутки= окна
                this.dScrollBarV.heightContent=yy                    //высота самого ползунка - тем меньше чем больше элементов в списке               
            }else{
                this.window.height=_h+32
            }
            this.dScrollBarV.visible=b
        }


        this.dragIndex  = function(){
            //  this.content1.div.style.clip = "rect(1px "+this._width+"px "+this._height+"px 0px)";
            // this.div.addEventListener('mousewheel', this.mousewheel)

            var p=-1;
            var y, y1


            for (var i = 0; i < this.array.length; i++) {
                if (this.array[i].idArr==this._index) { 
                    this.array[i].visiActiv=true;
                    p=i;
                    y=this.array[i].dCont.y+self.dCBlok.y
                    y1=y+this.array[i].height
                    //this.dragScrol(this.index*27);
                    //trace('eeeee',this.index)  

                } else{
                    this.array[i].visiActiv=false;
                } 
            }

            if(p!=-1){
                var hhh=self.dScrollBarV.heightContent-self.dScrollBarV.height
                var ost = self.dScrollBarV.height-self.array[self.index].height
                var vv = (self.array[self.index].dCont.y-self.param.otstup)/hhh*100
                if(y<0){
                    this.dragScrol(vv)
                    return
                }
                if (self.dScrollBarV.visible && y1>self.dScrollBarV.height){
                    vv=(self.array[self.index].dCont.y+self.param.otstup-ost)/hhh*100
                    this.dragScrol(vv)
                    return
                }
            }
        }



        var w,h,s ;
        this.sizeWindow = function(_w,_h,_s){  
            if(_w){
                w= _w;
                h= _h;
                s= _s;   
            }
            this.drag()         
            this.window.x=w/s-this.window.width-this.param.otstup

            if(this.array.length>0) {
                var hhh1=this.dScrollBarV.heightContent-this.dScrollBarV.height
                var ost1 = this.dScrollBarV.height-this.array[this.array.length-1].height
                var vv1 = (this.array[this.array.length-1].dCont.y-this.param.otstup)/hhh1*100
                if (this.dScrollBarV.visible && s>=1) {
                    vv1=(this.array[this.array.length-1].dCont.y+this.param.otstup-ost1)/hhh1*100
                    this.dragScrol(vv1)
                }                
            }
        } 


        //var hhh, www;
        this.mousewheel = function (e) {
            
            var delta=-1;
            var p=e.delta
            if(e.wheelDelta==undefined){
                p=e.wheelDelta
            }

            if(e.delta)if(e.delta<0)delta=1;
            if(e.deltaY)if(e.deltaY<0)delta=1;
            if(e.detail)if(e.detail<0)delta=1;

            
            if(e.wheelDelta!=undefined){
                if(e.wheelDelta>0)delta=-1;
                else delta=1;
            }


            p=delta;

            if(self.dScrollBarV.visible==false)return
            var s=p*7+self.dScrollBarV.value
            if(s<0)s=0
            if(s>100)s=100
            self.dragScrol(s)
            trace('rrrr',p,e)
        };
        this.dCBlok1.div.addEventListener('mousewheel', this.mousewheel)
    }


    set index(value) {
        if (this._index != value) {
            this._index = value;            
            this.dragIndex()
        }
    }
    get index() {
        return this._index;
    }


}



export class MMBlok  {
    constructor(par, fun) {         
        this.type="MMBlok";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;
        this.idArr=-1
        this.object
        this._active=false;      
        this._visiActiv=false;
        this._width=this.param.sizeBase2-this.param.otstup*2;
        this._height=100;      
        this.dCont=new DCont(par.dCBlok);
        this.arrCopm=undefined
        this.panel=undefined

        this.arrInfo=[]


        this.setBlok  = function(blok){
            this.object=blok;
            this.init()
            this.setBlok1()
        }

        this.setBlok1 = function(){    
            this.arrCopm[0].text="idArr: "+this.object.idArr+"  mune: "+this.idArr;
            this.arrCopm[1].value=this.object.boolSah
            
            if(this.object.arrInfo.length!=this.arrInfo.length){
                this.arrInfo=this.object.arrInfo;
                var a=[];
                for (var i = 0; i < this.arrInfo.length; i++) {
                    a[i]=this.arrInfo[i].name
                }
                this.arrCopm[2].array=a
            } 
            this.arrCopm[2].index=self.object.materialIdx
            this.arrCopm[4].link=this.object.ctx.canvas.toDataURL();
        }

        this.init  = function(){    
           
            if(this.arrCopm!=undefined)return

            this.arrCopm=[]    
            var yy=this.param.otstup

            this.panel=new DPanel(this.dCont,0,0)          
            this.panel.width= this._width;

          
            this.arrCopm[0]=new DLabel(this.panel,this.param.otstup,yy,"null");
            yy+=this.arrCopm[0].fontSize+this.param.otstup;
            this.arrCopm[0].width=this.panel.width
            
            this.arrCopm[1]=new DCheckBox(this.panel.content,this.param.otstup,yy,"boolSah",function(){
                self.object.boolSah=this.value
                self.fun("index", self.idArr)
            });
            yy+=this.arrCopm[1].height+this.param.otstup;
  
            this.arrCopm[2]=new DComboBox(this.panel,this.param.otstup,yy,[],function(){     //выпадающий список с материалами
                self.object.materialIdx=this.index*1
                self.setBlok1()
            });
            this.arrCopm[2].width=this.panel.width-this.param.otstup*2            
            
            yy+=this.arrCopm[2].height+this.param.otstup;
            this.arrCopm[3]=new DPanel(this.panel,this.param.otstup,yy);
            this.arrCopm[3].height=this.arrCopm[3].width=this.panel.width-this.param.otstup*2   //подложка для картинки
            
            yy+=this.param.otstup*2;

            this.arrCopm[4]=new DImage(this.panel,this.param.otstup,yy,null,function(){
                self.arrCopm[4].width=170
                self.arrCopm[4].height=170 
            });  //картинка

            yy+=this.arrCopm[4].height+this.param.otstup+70;


            this._height=yy
            this.panel.height= yy


            /*setTimeout(function() {
                setTimeout(function() {

                    self.visiActiv=false
                }, 3000);
                self.visiActiv=true
            }, 1000);*/

            this.drahAvt()
        }

        this.setImage = function() {
            trace('rrrrr')
        }

        this.drahAvt=function(){
            if(this.panel){
                 if(this._visiActiv==true) {
                    this.panel.color=dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color1), -20);
                }else {
                    this.panel.color=dcmParam._color1;
                }
            }
        }


        this.clear=function(){
            this.active=false;
        }
    }

    set active(value) {
        if (this._active != value) {
            this._active = value;
            if(this._active==true)this.init() 
            this.dCont.visible=this._active;
        }
    }
    get active() {
        return this._active;
    }


    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }


    set visiActiv(value) {
        if (this._visiActiv != value) {
            this._visiActiv = value;
            this.drahAvt()
        }
    }
    get visiActiv() {
        return this._visiActiv;
    }
}

