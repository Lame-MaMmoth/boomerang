/**
 * Created by user01 on 17.04.16.
 */
$(function() {
   $('.container').click(function() {
       var cont$ = $(this),
           target$, duration, rotateSpeed, to;

       if (!cont$.hasClass('container--animation')) {
           target$     = cont$.find('.img:first-child');
           duration    = 2000;
           rotateSpeed = 3;
           to          = random();

           cont$.addClass('container--animation');
           target$.addClass('img--boomerang');

           $({ deg: getRotationDeg(target$) })
            .animate({deg: 360*rotateSpeed + to}, {
                duration: duration,
                    step: function (now) {
                        target$.css({
                            transform: "rotate("+ now +"deg)"
                        });
                    },
                complete: function () {
                    target$
                        .css({
                            transform: "rotate("+ to +"deg)"
                        })
                        .appendTo(cont$)
                        .removeClass('img--over img--boomerang');
                    cont$.removeClass('container--animation');
                }
            });

           setTimeout(function () {
               target$.addClass('img--over');
           }, duration/2);
       }
   });

    window.init = function () {
        $('.img').each(function() {
            var deg = random();

            $(this).css({
                transform: "rotate("+ deg +"deg)"
            });
        });
    };

    window.random = function () {
        var n = 30;
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

    window.init();
});
