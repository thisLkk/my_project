export default function (Vue) {
  Vue.directive("height", { //高
    inserted(el, binding) {
      if (binding.value == undefined) {
        $(el).height($(window).height())
      } else if (typeof binding.value == 'number') {
        $(el).height($(window).height() - binding.value)
      }
    }
  });
  Vue.directive("width", { //宽
    inserted(el, binding) {
		if (binding.value == undefined) {
			$(el).width($(window).width())
		  } else if (typeof binding.value == 'number') {
			$(el).width($(window).width() - binding.value)
		  }
      $(window).resize(function () { //当浏览器大小变化时
        if (binding.value == undefined) {
          $(el).width($(window).width())
        } else if (typeof binding.value == 'number') {
          $(el).width($(window).width() - binding.value)
        }
      });
    }
  });
}
