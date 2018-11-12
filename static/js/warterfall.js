/**
 * 瀑布流布局组件
 */

var waterfall = (function(){
  var coloumHeight = [];
  var boxWidth;
  var $container;
  var $targets;
  var containerWidth;
  var coloumNum;
  function init(_$container, _$targets){
    $container = _$container||$('.waterfall');
    $targets = _$targets||$('.waterfall-item');
    boxWidth = $targets.outerWidth(true); 
    bind();
    getColoumNum();
    start();
    return coloumHeight;
  }
  function bind(){
    var clock;
    $(window).on('resize', function(){
      if(clock){
        clearTimeout(clock);
      }
      clock = setTimeout(function(){
        getColoumNum();
        start();
      }, 300); 
    });
  }
  function getColoumNum(){
    containerWidth = $container.width();
    coloumNum = Math.floor(containerWidth/boxWidth);
    for(var i=0; i<coloumNum; i++){
      coloumHeight[i] = 0;
    }
  }
  function start(){
    $targets.each(function(){
      var minHeightIdx = 0;
      for(var i=0; i<coloumNum; i++){
        if(coloumHeight[i]<coloumHeight[minHeightIdx]){
          minHeightIdx = i;
        }
      }
      var minHeight = coloumHeight[minHeightIdx];
      $(this).css('top', minHeight);
      $(this).css('left', minHeightIdx*boxWidth);
      coloumHeight[minHeightIdx] += $(this).outerHeight(true);
      setCtHeight();
    });
  }
  function setCtHeight(){
    var maxHeight = 0;
    for(var i=0; i<coloumNum; i++){
      if(coloumHeight[i]>maxHeight){
        maxHeight = coloumHeight[i];
      }
    }
    $container.css('height', maxHeight + 'px');
  }
  return {
    init: init
  };
})();
