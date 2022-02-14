
/**
 * Класс отрисовки сцены
 **/
import { Blok } from './Blok.js';//импортируем класс блока для отрисовки

export class Scane3d  {
    /**
     * par= параметры родителя (в нашем случае параметры класса Glaf)
     * fun= функция поведения при отловленом событии
     **/
  	constructor(par, fun) {//конструктор принимает в себя некие параметры и функцию  		
  		this.type="Scane3d";
  		var self=this;//чтобы использовать основной контекст внутри вложенной функции
        this.par=par;//параметры полученные от родителя
        this.fun=fun;//функция поведения при неком событии (событие слушается в Glaf.js)
        this.param=this.par.param//возможно для более короткого обращения к параметрам
        this.array=[]//массив элеменов (кубиков)

        this._number=5;//сеттер начального количества кубиков
        this._width=10;//сеттер начальной ширины
        this._height=10;//сеттер начальной высоты
        this._depth=10;//сеттер начальной глубины
		
        this.content3d=new THREE.Object3D()//базовый класс, который предоставляет набор свойств и методов для управления объектом в пространстве
        this.par.content3d.add(this.content3d)//?????????
        this.content3d.add(new THREE.AxesHelper( 10 ));//добавляем на сцену оси координат X Y Z



        this.geometry = new THREE.BoxGeometry( 1, 1, 1 );//геометрия элемента - куб
        this.geometry1 = new THREE.SphereGeometry( 0.5, 16, 16 );//геометрия элемента - сфера
        this.material=[]//массив материалов

        this.material[0] = new THREE.MeshBasicMaterial( {color: 0xffffff*Math.random()});//рандомные материалы кубиков
        this.material[1] = new THREE.MeshBasicMaterial( {color: 0xffffff*Math.random()});
        this.material[2] = new THREE.MeshBasicMaterial( {color: 0xffffff*Math.random()});
        this.material[3] = new THREE.MeshBasicMaterial( {color: 0xffffff*Math.random()});
        this.material[4] = new THREE.MeshBasicMaterial( {color: 0xffffff*Math.random()});
        this.material[5] = new THREE.MeshBasicMaterial( {color: 0xffffff*Math.random()});
        this.material[6] = new THREE.MeshBasicMaterial( {color: 0xffffff*Math.random()});
        this.material[7] = new THREE.MeshBasicMaterial( {color: 0xffffff*Math.random()});
        this.material[8] = new THREE.MeshBasicMaterial( {color: 0xffffff*Math.random()});
        this.material[9] = new THREE.MeshBasicMaterial( {color: 0xffffff*Math.random()});

        this.arrInfo=[
            {name:"котик", link:"resources/image/load2.png", image:null},
            {name:"слоник", link:"resources/image/elefant.png", image:null},
            {name:"самолетик", link:"resources/image/plane.png", image:null},
        ]

        this.loadImageAsync = function (url,id) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = url;
                img.onload = resolve;
                self.arrInfo[id].image=img
            });
        }
        Promise.all([
            this.loadImageAsync(this.arrInfo[0].link,0),
            this.loadImageAsync(this.arrInfo[1].link,1),
            this.loadImageAsync(this.arrInfo[2].link,2)
        ])
            .then(images => {
                this.drag()
            });




        this.testLoad=function(){
            //this.drag()
        }
        this.testLoad()
/*
        this.arrayPic=[]
        for (var i = 0; i < 4; i++) {
            this.arrayPic[i]=new DImage(par.dCont,400*Math.random(),400*Math.random(),"resources/image/im_"+i+".png") 
        }*/


        ///????????
        this.clear=function(){//????????
            for (var i = 0; i < this.array.length; i++) {               
                this.array[i].clear()//????????
            }
        }

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

        
        //изменение материала
        this.redraw=function(){ 
            for (var i = 0; i < this.array.length; i++) {//проходим по массиву
                if(this.array[i].active==true){//если элемент массива не отрисован
                   this.array[i].animat(true)
                }
            }
        };

        this.restore=function(){ 
            for (var i = 0; i < this.array.length; i++) {//проходим по массиву
                this.array[i].animat(false)
            }
        };


        //построение пирамиды    
        var blok
        this.drag = function(){  
            this.clear();            

            var s=10;
            var s1=s;  
            var xx, zz, dx, kol, dd;
            var otstup=this._width/3
            for (var j = 0; j < this._number; j++) { //высота пирамиды
                kol=this._number-j//уменьшение кубиков на один в каждой следующей строке чтобы получилась пирамида
                dd=this._width+(otstup+this._width)*(kol-1)//длина основания пирамиды для центрирования сцены
                for (var i = 0; i < kol; i++) { //ширина пирамиды
                    

                    blok=this.getBlok()//вызов метода создания блока
                    blok.active=true;//установка атрибута 

                    //trace("qq",i,j,blok.idArr)

                  
                    xx=-dd/2 + i * (otstup+this._width)+this._width/2//координата по оси X для каждого блока

                    zz = j*this._height+this._height/2//координата по оси Z для каждого блока


                    blok.setPosit(xx,  0, zz )//позиция блока на сцене
                    blok.setScale(this._width,this._depth,this._height)//габариты блока
                }
            }
           /* setTimeout(function() {

                self.fun("setBlok", self.array[0])
                self.fun("setBlok", self.array[1])
                self.fun("setBlok", self.array[2])
                self.fun("setBlok", self.array[3])
                self.fun("setBlok", self.array[4])
                // self.fun("setBlok", self.array[5])
                // self.fun("setBlok", self.array[6])
                // self.fun("setBlok", self.array[7])
                // self.fun("setBlok", self.array[8])
                // self.fun("setBlok", self.array[9])
                // self.fun("setBlok", self.array[10])
                // self.fun("setBlok", self.array[11])
            }, 10);*/
            
            this.fun("visi3d")//????????

        }


        this.par.visi3D.addChildMouse(this.content3d);

        this.par.visi3D.addEvent("down",function(e){
            
            if(e){
                if(e.target  && e.target.blok ){
                    //trace(e.target.blok,e.target.blok.arrInfo[e.target.blok._materialIdx].image)
                    //e.target.blok.sob3d(e)
                    //blok.sob3d(e)
                    e.target.blok.dragCircle(e)
                    self.fun("setBlok", e.target.blok)
                    return
                }
            }
            self.fun("setBlok", null)
        })


        this.par.visi3D.addEvent("move",function(e){
            
            if(e){
                if(e.target  && e.target.blok ){
                    e.target.blok.sob3d(e)
                    self.fun("setBlok", e.target.blok)
                }
            }

        })  

        //изменение масштаба сцены при изменении размеров окна
        var w,h,s;
        this.sizeWindow = function(_w,_h,_s){  
            if(_w){//если есть определенные значения - то передаем их для масштабирование 
                w= _w;
                h= _h;
                s= _s;   
            }
            //trace(w,h,s)
        }   


        



  	}


    set number(value) {
        if (this._number != value) {
            this._number = value;          
            this.drag()          
        }
    }
    get number() {
        return this._number;
    }

    set width(value) {
        if (this._width != value) {
            this._width = value;
            this.drag()          
        }
    }
    get width() {
        return this._width;
    }

    set height(value) {
        if (this._height != value) {
            this._height = value;
            this.drag()          
        }
    }
    get height() {
        return this._height;
    }

    set depth(value) {
        if (this._depth != value) {
            this._depth = value;
            this.drag()          
        }
    }
    get depth() {
        return this._depth;
    }
}
