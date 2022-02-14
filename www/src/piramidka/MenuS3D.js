export class MenuS3D  {
    constructor(par, fun) {         
        this.type="MenuS3D";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;

        this.dCont=new DCont(par.dCont); 



        var yy=this.param.otstup
        this.window=new DWindow(this.dCont,this.param.otstup,this.param.otstup,"MenuS3D");
        this.window.width=this.param.sizeBase2
        this.window.dragBool=false
        this.window.hasMinimizeButton=false
        var button=new DButton(this.window.content,this.param.otstup,yy,"redraw",function(){ 
            self.object.redraw();           
            self.fun("visi3d");          
        })
        button.width=this.window.width-this.param.otstup*2
        yy+=this.param.otstup+button.height

        var button1=new DButton(this.window.content,this.param.otstup,yy,"restore",function(){ 
            self.object.restore();
            self.fun("visi3d");          
        })
        button1.width=this.window.width-this.param.otstup*2
        yy+=this.param.otstup+button.height

        this.array=[]

        this.drag=function(){
            self.object[this.text]=Math.floor(this.value)
            self.fun("visi3d");
        }   

        this.array.push(new DSliderBig(this.window.content,0,0,this.drag,"number",2,32))//drtedrt
        this.array.push(new DSliderBig(this.window.content,0,0,this.drag,"width",1,30))
        this.array.push(new DSliderBig(this.window.content,0,0,this.drag,"height",1,30))
        this.array.push(new DSliderBig(this.window.content,0,0,this.drag,"depth",1,30))



        for (var i = 0; i < this.array.length; i++) {
            this.array[i].y=yy;
            this.array[i].width=this.window.width-this.param.otstup*2;
            this.array[i].x=this.param.otstup;
            this.array[i].okrug=1;
            yy+=this.param.otstup+this.array[i].height
            
        }            

        this.window.height=yy+32
        this.object
        this.setScane3d = function(scane3d){//перекидываю сцены3д            
            this.object=scane3d
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].text &&  this.object[this.array[i].text]){
                    this.array[i].value=this.object[this.array[i].text]
                }
            }

        }

        var w,h,s;
        this.sizeWindow = function(_w,_h,_s){  
            if(_w){
                w= _w;
                h= _h;
                s= _s;   
            }
            //trace(w,h,s)
        } 

    }
}