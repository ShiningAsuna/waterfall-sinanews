var app = {
  init: function(){
    this.curPage = 1;
    this.loading = false;
    this.start();
    this.bind();
  },
  bind: function(){
    var _this = this;
    var clock;
    $('main').on('scroll', function(){
      if(clock){
        clearTimeout(clock);
      }
      clock = setTimeout(function(){
        exposure.bind($('.wrapper #load'), function(){
          _this.start();
        });
      }, 300); 
    });
    var clock2;
    $(window).on('resize', function(){
      if(clock2){
        clearTimeout(clock2);
      }
      clock2 = setTimeout(function(){
        $('main #load').css('top', $('.waterfall').height());
      }, 1000); 
    });
  },
  start: function(){
    var _this = this;
    if(_this.loading){
      return;
    }
    _this.loading = true;
    $.ajax({
      url: "https://platform.sina.com.cn/slide/album_tech",
      type: "get",
      dataType: "jsonp",
      jsonp: "jsoncallback",
      data: {
        app_key: "1271687855",
        format: "json",
        size: "img",
        num: 20,
        page: this.curPage
      }
    }).done(function(result){
      if(result.status.code == '0'){
        _this.render(result);
        _this.curPage++;
        _this.loading = false;
      }
    });
  },
  render: function(result){
    var tpl = `<figure>
    <img tpl-data="img_url" src="http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg" alt="">
    <figcaption tpl-data="short_name">猎豹捕杀野兔惊心场面</figcaption>
    <p tpl-data="name">重庆警方对外公布,成功破获一起利用“早起挑战”游戏行骗的网络诈骗案,在全国多地抓获犯罪嫌疑人57名,已冻结涉案资金500余万元</p>
    </figure>`
    result.data.forEach(function(node, index){
      $tpl = $(tpl);
      easytpl.append($('.waterfall'), $tpl, node);
    });

    var heightArr = waterfall.init($('.waterfall'), $('.waterfall').find('figure'));
    this.locationingLoading(heightArr);
  },
  locationingLoading: function(heightArr){
    heightArr.sort(function(n1, n2){
      return n2-n1;
    });
    var maxHeight = heightArr[0];
    $('main #load').css('top', maxHeight + 'px');
  }
}

app.init();
