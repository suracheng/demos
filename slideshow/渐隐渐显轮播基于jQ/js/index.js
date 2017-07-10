
;(function () {

    function banner (url,interval) {
        var $inner = this.children(".bannerInner");
        var $bannerTip = this.children(".focusList");
        var $left = this.children(".left");
        var $right = this.children(".right");
        var $step = 0;
        var $isOkClick = true;
        var $interval = interval || 3000;
        var $data = null;
        var $list = null;
        var $imgList = null;
        var $timer = null;

        // 获取 ajax
        $.ajax({
            type : "get",
            url : url + "?_=" + new Date().getTime(),
            dataType: "json",
            data: null,
            async: false,
            success : function (data) {
                $data = data;
            },
            error: function (message) {
                console.log(message);
            }
        });

        // 绑定数据
        ;(function () {
            if ($data && $data.length > 0) {
                var str1 = ``, str2 = ``;
                $.each($data, function (index, item) {
                    str1 += `
                        <div><img src="" data-src="${item.src}" alt=""></div>
                    `;
                    str2 += index === 0 ? `<li class="selected"></li>` : `<li></li>`;
                });
                $inner.html(str1);
                $bannerTip.html(str2);
                $list = $bannerTip.children("li");
                $imgList = $inner.find("img");
            }
        })();

        // 延迟加载
        ;(function () {
            $imgList.each(function (index, item) {
                var _this = this;
                var oImg = new Image();
                oImg.src = $(item).attr("data-src");
                oImg.onload = function () {
                    $(_this).prop("src", this.src).css("display", "block");
                }
            });
            $imgList.eq(0).parent().css({zIndex : 1}).stop().animate({opacity : 1}, 1000);
        })();


        // 自动轮播
        function autoMove () {
            if ($step == $data.length - 1) {
                $step = -1;
            }
            $step ++;
            setImg();
        }
        // autoMove();
        function setImg() {
            $imgList.eq($step).parent().css({zIndex: 10}).siblings().css({zIndex:0});
            $imgList.eq($step).parent().stop().animate({opacity: 1}, 1000, function () {
                $isOkClick = true;
                $(this).siblings().css({opacity: 0});
            });
            $list.eq($step).addClass("selected").siblings().removeClass("selected");
        }

        $timer = window.setInterval(autoMove, $interval);


        // 鼠标移入移除
        this.mouseover(function () {
            window.clearInterval($timer);
            $left.css({display : "block"});
            $right.css({display : "block"});
        });
        this.mouseout(function () {
            $timer = window.setInterval(autoMove, $interval);
            $left.css({display : "none"});
            $right.css({display : "none"});
        });


        // 左右按钮点击
        function btnClick () {
            $right.click(function () {
                if ($isOkClick) {
                    $isOkClick = false;
                    autoMove();
                }
            });
            $left.click(function () {
                if ($isOkClick) {
                    $isOkClick = false;
                    if ($step == 0) {
                        $step = $data.length - 1;
                    }
                    $step --;
                    setImg();
                }
            });
        }
        btnClick();


        // 焦点点击
        function tipClick () {
            $list.each(function (index, item) {
                $(item).click(function () {
                    if ($isOkClick) {
                        $isOkClick = false;
                        $step = index;
                        setImg();
                    }
                });
            });
        }
        tipClick();


    }


    jQuery.fn.extend({
        banner : banner
    });
})();





