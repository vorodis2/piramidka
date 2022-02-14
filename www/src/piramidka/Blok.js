import { Menu } from './Menu.js';

export class Blok  {
    constructor(par,fun) {         
        this.type="Blok";
        var self=this;
        this.par=par;
        this.fun=fun;
        this._active=false;
        this.idArr=-1
        this._boolSah=false
        this.content3d=new THREE.Object3D()
        this.par.content3d.add(this.content3d)
        this._materialIdx=0
        this.content3d.visible=this._active;
        this.mesh=undefined
        this.uuid=Math.random()

        this.arrInfo=par.arrInfo;
        


        this.canvas = document.createElement('canvas'); // канвас для картинки
        this.ctx = this.canvas.getContext('2d'); // контекст картинки
        this.canvas.width = 256;
        this.canvas.height = 256;
        
        this.ctx.drawImage(this.par.arrInfo[this._materialIdx].image, 0, 0);

        this.canvasTexture=new THREE.CanvasTexture(this.canvas);
        this.textur=new THREE.CanvasTexture();
        this.material=new THREE.MeshPhongMaterial( {color: 0xffffff, map:this.canvasTexture})
  

//needsUpdate to true

        this.sob3d=function(e){
            self.ctx.beginPath();
            self.ctx.arc(e.uv.x*256, 256-e.uv.y*256, 2, 0, 2 * Math.PI);
            self.ctx.stroke();
            self.ctx.fill();
            self.canvasTexture.needsUpdate=true;
            this.fun("visi3d")
        }

        this.init=function(){
            if(this.mesh!=undefined)return           
            this.mesh = new THREE.Mesh( this.par.geometry, this.material);
            this.content3d.add(this.mesh); 
            this.mesh.blok=this; 
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


        this.tween=new TWEEN.Tween(this.content3d.position); 
        this.tween.onUpdate(function(){
            self.fun("visi3d")
        })  

        this.tween.onComplete(function(){
            //trace(">>>>>",self.idArr)
            //self.animat(false)
        })  

        this.animat=function(b){
            
            var xx=200;
            var tt=500;

            self.tween.stop();
            if(b){
                self.tween.to({x:Math.random()*xx-xx/2,y:Math.random()*xx-xx/2,z:Math.random()*xx-xx/2,},tt+tt*Math.random())
            }else{             
                self.tween.to({x:0,y:0,z:0},tt+tt*Math.random())
            }
            if(!b && this.content3d.position.x==0) return
            self.tween.start();
        }


       /* this.blokRredraw=function(){
            var xx=100
            for (var i = 0; i < this.par.array.length; i++) {
                self.tween.push(new TWEEN.Tween(this.par.array[i].content3d.position));
                // this.tween.stop();
                self.tween[i].to({x:Math.random()*xx-xx/2,y:Math.random()*xx-xx/2,z:Math.random()*xx-xx/2,},500).start();
                self.par.par.update(self.tween[i])
            }
        }


        */

        // this.blokRestore=function(){
        //     //trace(this.par.array[1].content3d.position)
        //     for (var i = 0; i < this.par.array.length; i++) {
        //         self.tween[i].to({x:0,y:0,z:0,},500).start();
        //     }
        // }


        this.drag=function(){            
            if(this.boolSah==true)this.mesh.geometry=this.par.geometry1
            else this.mesh.geometry=this.par.geometry
            this.fun("visi3d")
        };

        this.dragmaterial=function(){
            self.ctx.clearRect(0, 0, 256, 256);
            self.ctx.drawImage(self.par.arrInfo[self.materialIdx].image, 0, 0);
            self.canvasTexture.needsUpdate=true;
            this.fun("visi3d")
        };


        this.dragCircle=function(e){
            //self.ctx.clearRect(0, 0, 256, 256);
            self.ctx.beginPath();
            self.ctx.arc(e.uv.x*256, 256-e.uv.y*256, 10, 0, 2 * Math.PI);
            self.ctx.stroke();
            self.ctx.fill();
            self.canvasTexture.needsUpdate=true;
            this.fun("visi3d")
        }        

    }


    set active(value) {
        if (this._active != value) {
            this._active = value;
            if(this._active==true)this.init()
            this.content3d.visible=this._active
        }
    }
    get active() {
        return this._active;
    }


    set boolSah(value) {
        if (this._boolSah != value) {
            this._boolSah = value;
            trace(value)
            this.drag() 
            
        }
    }
    get boolSah() {
        return this._boolSah;
    }

    set materialIdx(value) {
        if (this._materialIdx != value) {
            this._materialIdx = value;
            this.dragmaterial()
            
        }
    }
    get materialIdx() {
        return this._materialIdx;
    }

}