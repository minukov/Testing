/**
 * Created by anton on 21.09.16.
 */

(function ($) {
    var methods = {
        init: function (options) {
            var settings = {}
            if (options) {
                $.extend(settings, options);
            }
            return this.each(function (index, value) {
                $(this).find('li').bind('click.tabable', methods.selectTab);
            });
        },

        destroy: function () {
            return this.each(function () {
                $(this).find('li').unbind('.tabable');
            })

        },

        selectTab: function (e) {
            if (e.target.tagName !== 'LI') {
                return;
            }
            var $target = $(e.target);
            methods.show($target.index(), $target.closest('div'));
        },

        show: function (index, tabpanel) {
            // console.log('index = ', index);
            var parent = tabpanel || $(this);
            // console.log('parent = ', parent);
            var li = parent.find('li').eq(index);
            // console.log('li = ', li);

            li
                .addClass('active').siblings().removeClass('active')
                .closest('div').find('div.tab').removeClass('active').eq(index).addClass('active');

            // $(this)
            //     .addClass('active').siblings().removeClass('active')
            //     .closest('div').find('div.tab').removeClass('active').eq($(this).index()).addClass('active');
            return this;
        }
    }

    $.fn.tabable = function (method) {
        // логика вызова метода
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод ' + method + ' в jQuery.tabable не существует');
        }
    };

})(jQuery);


console.log('tt = ', $('.tabs').tabable());
$('.tabs1').tabable();
$('.tabs').tabable('destroy');
console.log('show = ', $('.tabs').tabable('show', 1));



