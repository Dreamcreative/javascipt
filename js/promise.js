class Mypromise {
    constructor(executor){
        if(typeof executor !=="function"){
            throw new Error("Executor must be a function");
        }
        this.state = "PENDING";
        this.chained = [];
        const resolve=res=>{
            if( this.state !=="PENDING"){
                return 
            }
            this.state ="FULLFILLED";
            this.internalValue = res;
            for(const { onFullfilled } of this.chained){
                onFullfilled(res);
            }
        }
        const reject = err=>{
            if(this.state !=="PENDING"){
                return 
            }
            this.state ="REJECTED";
            this.internalValue = err;
            for( const {onRejected } of this.chained ){
                onRejected(err)
            }
        }
        try{
            executor(resolve , reject);
        }catch(err){
            reject(err)
        }
    }
    then( onFullfilled ,onRejected ){
        if(this.state ==="FULLFILLED"){
            onFullfilled(this.internalValue)
        }else if( this.state ==="REJECTED"){
            onRejected(this.internalValue)
        }else{
            this.chained.push(onFullfilled,onRejected)
        }
    }
}