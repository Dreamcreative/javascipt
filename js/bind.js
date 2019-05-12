Function.prototype.bind=function( _this){
    if( typeof this !=="function"){
        throw new Error("请使用函数调用bind");
    }
    var slice = Array.prototype.slice;
    var _fBindThis = this;
    var args = slice.call(arguments , 1 );
    var fNop=function(){};
    var fBound = function(){
        var _args =args.concat(slice.call(arguments));
        //this instanceof fBound ===true  说明返回fBound 被 new 了
        var ifisNew = this instanceof fBound;
        return _fBindThis.apply(ifisNew?this:_this,_args);
    };
    //维护自己的 原型链
    if(this.prototype){
        fNop.prototype=this.prototype;
    }
    fBound.prototype = new fNop();
    return fBound ;
}
