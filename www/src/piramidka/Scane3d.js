
/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.

sdfsf
мост иницилизация основ, глобал дополнение, грабли на мобильники
*/


export class Scane3d  {
  	constructor(par, fun) {  		
  		this.type="Scane3d";
  		var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param

        this.array=[]

		
        this.content3d=new THREE.Object3D()
        this.par.content3d.add(this.content3d)


        this.geometry = new THREE.BoxGeometry( 10, 10, 10 );
        this.material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );

/*

        var s=444
        for (var i = 0; i < 222; i++) {
            var cube = new THREE.Mesh( this.geometry, this.material );
            cube.position.set(s*Math.random()-s/2,s*Math.random()-s/2,s*Math.random()-s/2)
            cube.scale.set(0.1+Math.random(),0.1+Math.random(),0.1+Math.random())
            this.content3d.add( cube );  
        }  */

        this.clear=function(){
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].clear()
            }
        }


        this.getBlok=function(){
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].active==false){
                    return this.array[i];
                }
            }

            this.array.push(new Blok(this))


            return this.array[this.array.length-1];
        }





        var blok
        this.test = function(){  
            trace("dfgdfg");
            this.clear();            

            var s=444
            var s1=10
            for (var i = 0; i < 222; i++) {
                blok=this.getBlok()
                blok.active=true;
                blok.setPosit(s*Math.random()-s/2,s*Math.random()-s/2,s*Math.random()-s/2)
                blok.setScale(s1*Math.random()-s1/2,s1*Math.random()-s1/2,s1*Math.random()-s1/2)
            }

            this.fun("visi3d")
        }


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

export class Blok  {
    constructor(par) {         
        this.type="Blok";
        var self=this;
        this.par=par;

        this._active=false;

        this.content3d=new THREE.Object3D()
        this.par.content3d.add(this.content3d)

        this.content3d.visible=this._active;
        this.mesh=undefined
        this.init=function(){
            if(this.mesh!=undefined)return

            this.mesh = new THREE.Mesh( this.par.geometry, this.par.material );
            this.content3d.add(this.mesh); 

        }
        this.clear=function(){
            this.active=false;
        }

        this.setPosit=function(x,y,z){
            
            this.mesh.position.set(x,y,z)
        }

        this.setScale=function(x,y,z){
            this.mesh.scale.set(x,y,z)
        }



        this.init()
    
    }


    set active(value) {
        if (this._active != value) {
            this._active = value;
            this.content3d.visible=this._active
        }
    }
    get active() {
        return this._active;
    }
}