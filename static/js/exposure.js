/**
 * 元素曝光加载组件
 */

var exposure = (function(){
  function bind($target, callback){
    if(isShow($target)){
      if(callback){
        callback();
      }
    }
  }
  function isShow($target){
    return $(window).height() + $(window).scrollTop() >= $target.offset().top;
  }
  return {
    bind: bind
  };
})();
