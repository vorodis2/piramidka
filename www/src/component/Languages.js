



export class Languages  {
  	constructor(array) {  		
  		this.type="Languages";
  		var self=this;


        this.a=array

        this._key=array[0].key

        this.array=[];
        this.arrayC=[];

        this.setCompObj=function(comp, obj, type) {
            this.array.push(new DBLeng(comp, obj, type));
            this.dragDB(this.array[this.array.length-1])
        }

        this.dragDB=function(db){
            db.setKey(this._key)
        }


        this.setClass=function(clS){
            this.arrayC.push(clS);            
            clS.languages=this._key
        }
        
    }

    set key(value) {
        if(this._key!=value){
            this._key= value;   
            for (var i = 0; i < this.array.length; i++) {
                this.dragDB(this.array[i])
            } 

            for (var i = 0; i < this.arrayC.length; i++) {
                this.array[i].languages=this._key;

            }      
        }
    }    
    get key() { return  this._key;}

}



export class DBLeng  {
    constructor(comp, obj, type) {        
        this.type="DBLeng";
        var self=this;
        this.comp=comp;
        this.obj=obj;
        this.type="text"; 
        if(type!=undefined) this.type=type

        var s=""
        this.setKey=function(key){
            s="null";
            if(obj)if(obj[key])s=obj[key];
            comp[self.type]=s
        }
    }

}



