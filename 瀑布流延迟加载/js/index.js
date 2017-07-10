
;(function () {

    var oUls = document.getElementsByTagName("ul");
    var imgList = document.getElementsByTagName("img");
    var oUlAry = public.toArray(oUls);

    // 创建 li
    function creatLi () {
        var li = document.createElement("li");
        var img = new Image();
        var p = document.createElement("p");
        li.style.height = public.getRandom(200, 300) + "px";
        p.innerHTML = "瀑布流 demo 😄";
        li.appendChild(img);
        li.appendChild(p);
        return li;
    }

    // 像 ul 中追加 li
    function appendToUl () {
        for (var i = 0; i < 30; i++) {
            oUlAry.sort(function (a, b) {
                return public.getCss(a, "height") - public.getCss(b, "height");
            });
            oUlAry[0].appendChild(creatLi());
        }
    }
    appendToUl();

    // 渐隐渐显
    function fadeIn (ele) {
        ele.timer = window.setInterval(function () {
            var opacityVal = public.getCss(ele, "opacity");
            if (opacityVal >= 1) {
                window.clearInterval(ele.timer);
                public .setCss(ele, "opacity", 1);
                return;
            }
            opacityVal += 0.02;
            public .setCss(ele, "opacity", opacityVal);
        }, 20);
    };

    // 延迟加载
    function imgDelayLoad () {
        for (var i = 0, len = imgList.length; i < len; i++) {
            if (imgList[i].isFlag) {continue};
            var H = public.win("clientHeight") + public.win("scrollTop");
            var h = imgList[i].parentNode.offsetHeight + public.offset(imgList[i].parentNode).top;
            if (H > h) {
                var oImg = new Image();
                oImg.src = "img/" + public.getRandom(1, 14) + ".jpg";
                oImg.i = i;
                oImg.onload = function () {
                    imgList[this.i].src = this.src;
                    oImg = null;
                    fadeIn(imgList[this.i]);
                    imgList[this.i].isFlag = true;
                }
            }
        }

    }

    imgDelayLoad();


    window.onscroll = function () {
        imgDelayLoad();
        var H = public.win("scrollTop");
        var h = public.win("scrollHeight");
        if (H > h - public.win("clientHeight") * 1.5 ) {
            appendToUl();
        }
    };

})();
