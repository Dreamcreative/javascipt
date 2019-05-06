// Function.prototype.mybind=function(arg){
//     if(typeof this!="function")return;
//     var _this = this;
//     var args = Array.prototype.slice.call(arguments,1);
//     return function(){
//         return _this.apply(arg,args.concat(Array.prototype.slice.call(arguments)))
//     }
// }

Function.prototype.mybind=function(arg){
    if(typeof this!=="function")return;
    var _self =this;
    var args = Array.prototype.slice.call(arguments,1);
    var fnBound = function(){
        var _this = this instanceof _self? this:arg;
        return _self.apply(_this,args.concat(Array.prototype.slice.call(arguments)))
    } 
    fnBound.prototype = this.prototype;
    return fnBound;
}