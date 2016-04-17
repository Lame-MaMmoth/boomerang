/**
 * Created by user01 on 17.04.16.
 */
$(function() {
   $('.container').click(function() {
       var cont$ = $(this),
           target$, to, duration;

       if (!cont$.hasClass('container--animation')) {
           target$ = cont$.find('.img:first-child');
           to = random();
           duration = (1080+to)/1260*2000;

           cont$.addClass('container--animation');
           setTimeout(function () {
               target$.removeAttr('style')
                      .css({
                          transform: 'rotate('+ to +'deg)'
                      })
                      .appendTo(cont$)
                      .removeClass('img--over');
               cont$.removeClass('container--animation');
           }, duration);
           target$.removeAttr('style')
                  .css('animation', 'boomerang-rotation 2s infinite linear, boomerang-movement '+ (duration/1000) +'s 1 ease-in-out');

           setTimeout(function () {
               target$.addClass('img--over');
           }, duration/2);
       }
   });

    window.random = function () {
        var n = 180;
        return Math.floor(Math.random() * (n*2 + 1)) - n;
    };

    window.getRotationDeg = function (elem$) {
        var transform, value, angle;

        transform = elem$.css("-webkit-transform") ||
                       elem$.css("-moz-transform") ||
                        elem$.css("-ms-transform") ||
                         elem$.css("-o-transform") ||
                            elem$.css("transform");

        if (value = String(transform).match( /rotate\((-?\d+)deg\)/)) {
            return Number(value[1]);
        } else if (transform !== 'none') {
            value = transform.split('(')[1].split(')')[0].split(',');
            angle = Math.round(Math.atan2(value[1], value[0]) * (180/Math.PI));
        } else {
            angle = 0;
        }

        return angle;
    };

    window.init = function () {
        $('.img').each(function() {
            var deg = random();

            $(this).css({
                transform: "rotate("+ deg +"deg)"
            });
        });
    };

    window.init();
});
