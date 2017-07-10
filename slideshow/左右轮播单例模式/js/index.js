
window.Banner = (function(){
    return function (id,url,duration){
        duration = duration || 2000;
        var banner = document.getElementById(id);
        var bannerInner = public.children(banner, "div")[0];
        var focusList = public.children(banner, "ul")[0];
        var leftBtn = public.children(banner, "a")[0];
        var rightBtn = public.children(banner, "a")[1];
        var imgList = bannerInner.getElementsByTagName("img");
        var list = focusList.getElementsByTagName("li");
        var step = 0, isOkClick = true, timer = null;

        // Ajax 获取数据
        ;(function () {
            var xhr = new XMLHttpRequest();
            xhr.open("get", url + "?$=" + new Date().getTime(), false);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
                    window.data = public.toJsonObj(xhr.responseText);
                }
            }
            xhr.send(null);
            console.log(window.data);
        })();

        // 动态绑定数据
        ;(function () {
            if (window.data) {
                var str1 = ``, str2 = ``;
                for (var i = 0; i < window.data.length; i++) {
                    str1 += `<div><img src="" data-src="${window.data[i].src}" alt=""></div>`;
                    str2 += i === 0 ? `<li class="selected"></li>` : `<li></li>`;
                }
                str1 += `<div><img src="" data-src="${window.data[0].src}" alt=""></div>`;
                public.css(bannerInner, {width: (window.data.length + 1) * 900});
                bannerInner.innerHTML = str1;
                focusList.innerHTML = str2;
            }
        })();

        // 延迟加载
        ;(function () {
            for (var i = 0; i < imgList.length; i++) {
                var oImg = document.createElement("img");
                oImg.src = imgList[i].getAttribute("data-src");
                oImg.i = i;
                oImg.onload = function () {
                    imgList[this.i].src = this.src;
                    fadeIn(imgList[this.i]);
                }
            }
        })();
        function fadeIn(ele) {
            ele.timer = window.setInterval(function () {
                var opacityVal = public.css(ele, "opacity");
                if (opacityVal >= 1) {
                    window.clearInterval(ele.timer);
                    public.css(ele, {opacity : 1});
                    return;
                }
                public.css(ele, {opacity : opacityVal += 0.02});
            }, 17);
        };

        // 自动轮播
        function autoMove () {
            timer = window.setInterval(move, duration);
            banner.flag = true;
            hasAuto();
        };
        function move() {
            if (step === window.data.length) {
                step = 0;
                public.css(bannerInner, {left : step * -900});
            }
            step ++;
            animation(bannerInner, {left : step * -900}, 1000, function () {
                isOkClick = true;
            });
            foucsAlign();
        };

        // 焦点跟随
        function foucsAlign() {
            for (var i = 0; i < list.length; i++) {
                if (step === window.data.length) {
                    list[0].className = "selected";
                }
                list[i].className = i === step ? "selected" : "";
            }
        };

        // 鼠标移入移出
        banner.onmouseover = function () {
            window.clearInterval(timer);
        };

        function hasAuto() {
            if (!banner.flag) {
                banner.onmouseout = function () {
                    public.css(leftBtn, {display : "none"});
                    public.css(rightBtn, {display : "none"});
                }
            } else {
                banner.onmouseout = function () {
                    timer = window.setInterval(move, duration);
                    public.css(leftBtn, {display: "none"});
                    public.css(rightBtn, {display: "none"});
                }
            }
        };


        // 左右点击
        function btnClick() {
            banner.onmouseover = function () {
                window.clearInterval(timer);
                public.css(leftBtn, {display : "block"});
                public.css(rightBtn, {display : "block"});
            };
            hasAuto();
            rightBtn.onclick = function () {
                if (isOkClick) {
                    isOkClick = false;
                    move();
                }
            }
            leftBtn.onclick = function () {
                if (isOkClick) {
                    isOkClick = false;
                    if (step === 0) {
                        step = window.data.length;
                        public.css(bannerInner, {left : step * -900});
                    }
                    step --;
                    animation(bannerInner, {left : step * -900}, 1000, function () {
                        isOkClick = true;
                    });
                    foucsAlign();
                }
            }
        };


        // 焦点点击事件
        function focusClick() {
            for (var i = 0; i < list.length; i++) {
                list[i].onclick = (function (i) {
                    return function () {
                        if (isOkClick) {
                            isOkClick = false;
                            step = i;
                            animation(bannerInner, {left : step * -900}, 1000, function () {
                                isOkClick = true;
                            });
                            foucsAlign();
                        }
                    }
                })(i);
            }
        };

        return {
            autoMove : autoMove,
            btnClick : btnClick,
            focusClick : focusClick
        }
    };
})();

