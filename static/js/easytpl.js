/**
 * 模板替换组件
 */

var easytpl = {
  // append: 根据名称填充数据并append到容器的尾部
  append: function($container, $tpl, data){
    $tpl.find('[tpl-data]').each(function(){
      var key = $(this).attr('tpl-data');
      if($(this).prop('tagName').toLowerCase() === 'img'){
        $(this).attr('src', data[key]);
      }
      $(this).text(data[key]);
    });
    $container.append($tpl);
  }
};
