
// 获取元素
var news = document.getElementById("news");
var imgList = news.getElementsByTagName("img"),
    data = null;

// ajax 后台请求数据
var xhr = new XMLHttpRequest();
xhr.open("get", "json/data.txt?_=" + new Date().getTime(), false);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
        data = public.toJsonObj(xhr.responseText);

    }
};
console.log(data);
xhr.send(null);

// 动态绑定数据
function bindDate() {
    if (data && data.length > 0) {
        var str = ``;
        for (var i= 0, len = data.length; i < len; i++) {
            str += `<li>
                     <div>
                        <img src="" data-src="${data[i].src}" alt="">
                     </div>
                     <div>
                        <h2>${data[i].title}</h2>
                        <p>${data[i].desc}</p>
                     </div>
                </li>`;
        }
        news.innerHTML = str;
    }
};
bindDate();

// 渐隐渐显
function fadeIn (ele) {
    ele.timer = window.setInterval(function () {
        var opacityVal = public.getCss(ele, "opacity");
        if (opacityVal >= 1) {
            window.clearInterval(ele.timer);
            public .setCss(ele, "opacity", 1);
            return;
        }
        opacityVal += 0.01;
        public .setCss(ele, "opacity", opacityVal);
    }, 20);
};

function imgLoad (img) {
    var oImg = new Image();
    oImg.src = img.getAttribute("data-src");
    oImg.onload = function () {
        img.src = this.src;
        oImg = null;
        fadeIn(img);
    }
};

// 延迟加载
function imgDelayLoad() {
    var H = public.win("clientHeight") + public.win("scrollTop");
    for (var i = 0, len = imgList.length; i < len; i++) {
        var h = imgList[i].parentNode.offsetHeight + public.offset(imgList[i].parentNode).top;
        if (H > h) {
            imgLoad(imgList[i]);
        }
    }
};

imgDelayLoad();
window.onscroll = imgDelayLoad;