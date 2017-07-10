

var  public = (function(){
    // 标志 用来判断浏览器的版本
    var standardBrowser="getComputedStyle" in window;

    /** 1.
     * 类数组转数组
     * @param likeArray
     * @returns {*}
     */
    function toArray(likeArray) {
        var ary = [];
        if (standardBrowser) {
            // 在 IE 6 - 8 下是不支持借用数组的 slice 实现将元素集合（节点集合）类数组转为数组的；
            // 但是 对于 arguments 借用数组的方法是不存在任何兼容性问题的
            return ary.slice.call(likeArray);
        }
        for (var i = 0; i < likeArray.length; i++) {
            ary.push(likeArray[i]);
        }
        return ary;
    }



    /** 2.
     * JSON 字符串转 JSON 对象
     * @param jsonStr
     * @returns {Object}
     */
    function toJsonObj(jsonStr) {
        return "JSON" in window ? JSON.parse(jsonStr) : eval("(" + jsonStr + ")");
    }



    /** 3.
     * 获取 n 到 m 之间的随机整数
     * @param n
     * @param m
     * @returns {number}
     */
    function getRandom(n, m) {
        n = Number(n);
        m = Number(m);
        if (isNaN(n) || isNaN(m)) {
            return Math.random();
        }
        if (n > m) {
            n = n + m;
            m = n - m;
            n = n - m;
        }
        return Math.round(Math.random() * (m - n) + n);
    }



    /** 4.
     * 获取当前盒子模型对应的值
     * @param attr  [string] 当前要操作的元素对象
     * @param val   [string] 获取的样式属性名称
     * @returns {*}  根据参数的不同返回不同的值
     */
    function win(attr, val) {
        if (typeof val === "undefined") {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = val;
        document.body[attr] = val;
    }



    /** 5.
     * 获取当前元素的偏移量
     * @param curEle
     * @returns {{left: (Number|number), top: (number|Number)}} 上偏移量跟左偏移量
     */
    function offset(curEle) {
        var l = curEle.offsetLeft;
        var t = curEle.offsetTop;
        var p = curEle.offsetParent;
        while (p) {
            if (window.navigator.userAgent.indexOf("MSIE 8") === -1) {// ie8 浏览器中偏移量包含了父级参照物的边框
                l += p.clientLeft;
                t += p.clientTop
            }
            l += p.offsetLeft;
            t += p.offsetTop;
            p = p.offsetParent;
        }
        return {
            left : l,
            top : t
        }
    }



    /** 6.
     * 获取经过浏览器渲染过的样式
     * @param curEle
     * @param attr  样式名
     * @returns {*} 获取的样式值
     */
    function getCss(curEle, attr) {
        var val = null;
        if ("getComputedStyle" in window) {
            val = window.getComputedStyle(curEle)[attr];
        } else {
            if (attr == "opacity" || attr == "filter") {
                val = curEle.currentStyle["filter"];
                var reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                return reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            }
            val = curEle.currentStyle[attr];
        }
        var reg = /^-?\d+(\.\d+)?(px|pt|pp|em|rem|deg)?$/;
        return reg.test(val) ? parseFloat(val) : val;
    }



    /** 7.
     * 给指定的元素设置样式
     * @param curEle  当前元素
     * @param attr  样式名
     * @param val   样式值
     */
    function setCss(curEle, attr, val) {
        if (attr === "opacity") {
            curEle.style.opacity = val;
            curEle.style.filter = val;
            return;
        }
        if (attr === "float") {
            curEle.style.cssFloat = val;
            curEle.style.styleFloat = val;
            return;
        }
        var reg = /^(width|height|left|right|top|bottom|(margin|padding)(Left|Right|Top|Bottom)?)$/;
        reg.test(attr)&&!isNaN(val) ? val += "px" : null;
        curEle.style[attr] = val;
    }



    /** 8.
     * 批量设置样式
     * @param curEle  当前元素
     * @param obj  一组对象存放着样式跟样式值
     */
    function setGroupCss(curEle, obj) {
        obj = obj || [];
        if (obj.toString() === "[object Object]") {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    setCss(curEle, key, obj[key]);
                }
            }
        }
    }



    /** 9.
     * 根据参数的不同判断是获取样式类名还是设置样式类名
     * @returns {*}
     */
    function css() {
        if (arguments.length === 3) {
            setCss.apply(this, arguments);
            return;
        }
        if (arguments.length === 2 && arguments[1].toString() === "[object Object]") {
            setGroupCss.apply(this, arguments);
            return ;
        }
        return getCss.apply(this, arguments);
    }



    /** 10.
     * 判断但前元素的是否存在这个 class 类名
     * @param curEle
     * @param classStr
     * @returns {boolean}
     */
    function hasClass(curEle, classStr) {
        return new RegExp("(^| +)" + classStr + "( +|$)").test(curEle.className);
    }



    /** 11.
     * 给指定元素增加 class 类名
     * @param curEle
     * @param classStr
     */
    function addClass(curEle, classStr) {
        classStr = classStr.replace(/^ +| +$/g, "").split(/ +/g);
        for (var i = 0; i < classStr.length; i++) {
            if (!hasClass(curEle, classStr[i])) {
                curEle.className += " " + classStr[i];
            }
        }
        curEle.className = curEle.className.replace(/^ +| +$/g, "");
    }



    /** 12.
     * 给指定的元素删除 class 类名
     * @param curEle
     * @param classStr
     */
    function removeClass(curEle, classStr) {
        classStr = classStr.replace(/^ +| +$/g, "").split(/ +/g);
        for (var i = 0; i < classStr.length; i++) {
            var reg = new RegExp("(^| +)" + classStr[i] + "( +|$)");
            curEle.className = curEle.className.replace(reg, "");
        }
        curEle.className = curEle.className.replace(/^ +| +$/g, "");
    }



    /** 13.
     * 类名的切换, 当前元素中有这个类名删除，没有增加
     * @param curEle
     * @param classStr
     */
    function toggleClass(curEle, classStr) {
        classStr = classStr.replace(/^ +| +$/g,"").split(/ +/g);
        for (var i = 0; i < classStr.length; i++) {
            this.hasClass(curEle, classStr[i]) ? this.removeClass(curEle, classStr[i]) : this.addClass(curEle, classStr[i]);
        }
    }



    /** 14.
     * 获取上一个哥哥元素节点
     * @param curEle
     * @returns {*}
     */
    function prev(curEle) {
        if (standardBrowser) {
            return curEle.previousElementSibling;
        }
        var pre = curEle.previousSibling;
        while (pre&& pre.nodeType !== 1) {
            pre = pre.previousSibling
        }
        return pre;
    }



    /** 15.
     * 获取下一个弟弟元素节点
     * @param curEle
     * @returns {*}
     */
    function next(curEle) {
        if (standardBrowser) {
            return curEle.nextElementSibling;
        }
        var nex = curEle.nextSibling;
        while (nex && nex.nodeType !== 1) {
            nex = nex.nextSibling;
        }
        return nex;
    }



    /** 16.
     * 获取所有的哥哥元素节点, 返回一个数组
     * @param curEle
     * @returns {Array}
     */
    function prevAll(curEle) {
        var ary = [];
        var pre = this.prev(curEle);
        while (pre) {
            ary.unshift(pre);
            pre = this.prev(pre);
        }
        return ary;
    }



    /** 17.
     * 获取所有的弟弟元素节点，返回一个数组
     * @param curEle
     * @returns {Array}
     */
    function nexAll(curEle) {
        var ary = [];
        var nex = this.next(curEle);
        while (nex) {
            ary.push(nex);
            nex = this.next(nex);
        }
        return ary;
    }



    /** 18.
     * 获取相邻的两个元素节点
     * @param cueEle
     */
    function sibling(cueEle) {
        var ary = [];
        var pre = this.prev(cueEle);
        var nex = this.prev(cueEle);
        pre ? ary.push(pre) : void 0;
        nex ? ary.push(nex) : void 0;
    }


    /** 19.
     * 获取所有的兄弟元素节点
     * @param curEle
     * @returns {string|Array.<T>}
     */
    function siblings(curEle) {
        var preAll = this.prevAll(curEle);
        var nexAll = this.nexAll(curEle);
        return preAll.concat(curEle, nexAll);
    }


    /** 20.
     * 获取当前元素的索引位置
     * @param curEle
     */
    function index(curEle) {
        return this.prevAll(curEle).length;
    }


    /** 21.
     * 获取当前元素的所有子节点  /  获取所有指定的子节点
     * @param curEle
     * @param tagName  获取指定的子元素节点
     */
    function children(curEle, tagName) {
        var kids=curEle.childNodes;
        //所有的孩子节点
        var kidsAry=[];
        for(var i=0;i<kids.length;i++){
            if(kids[i].nodeType===1){
                if(typeof tagName!=="undefined"){
                    if(kids[i].nodeName == tagName.toUpperCase()){
                        kidsAry.push(kids[i]);
                        //continue;
                    }
                }else{
                    kidsAry.push(kids[i]);
                }
            }
        }
        return kidsAry;
    }


    /** 22.
     * 获取当前元素的第一个孩子元素节点
     * @param curEle
     * @returns {*}
     */
    function firstChild(curEle) {
        if (standardBrowser) {
            return curEle.firstElementChild;
        }
        var firstKid = curEle.firstChild;
        while (firstKid&&firstKid.nodeType !== 1) {
            firstKid = firstKid.nextSibling;
        }
        return firstKid;
    }


    /** 23.
     * 获取最后一个孩子节点
     * @param curEle
     * @returns {*}
     */
    function lastChild(curEle) {
        if (standardBrowser) {
            return curEle.lastElementChild;
        }
        var lastKid = curEle.lastChild;
        while (lastKid&&lastKid.nodeType !== 1) {
            lastKid = lastKid.previousSibling;
        }
        return lastKid;
    }


    /** 24.
     * append 向指定的容器末尾追加一个新的元素节点
     * @param newEle
     * @param container
     */
    function append(newEle, container) {
        container.appendChild(newEle);
    }


    /** 25.
     * 将新元素节点追加到老元素节点前面
     * @param newEle
     * @param oldEle
     */
    function insertBefore(newEle, oldEle) {
        oldEle.parentNode.insertBefore(newEle, oldEle);
    }


    /** 26.
     * 向指定的容器开头追加元素 -> 在第一个元素子节点的前面追加一个新的子节点, 如果一个元素子节点也没有就追加到末尾
     * @param newEle
     * @param container
     */
    function prepend(newEle, container) { // 面试经常被问到
        var fir = this.firstChild(container);
        if (fir) {
            container.insertBefore(newEle, fir);
            return;
        }
        container.appendChild(newEle);
    }


    /** 27.
     * 将指定的新元素追加到指定的老元素的后面 -> 相当于追加到老元素的弟弟元素前面
     * @param newEle
     * @param oldEle
     */
    function insertAfter(newEle, oldEle) { // 面试经常被问到
        var nex = this.next(oldEle);
        if (nex) {
            oldEle.parentNode.insertBefore(newEle, nex);
            return;
        }
        oldEle.parentNode.appendChild(newEle);
    }


    /** 28.
     * 通过元素的样式类名获取一组元素集合
     * @param strName 要获取的样式类名（可能是一个或多个）
     * @param context  获取元素的上下文（不传值默认 document）
     */
    function getElementsByClassName(strName, context) {
        context = context || document;
        if (standardBrowser) {
            return this.toArray(context.getElementsByClassName(strName));
        }
        // ie6 - 8
        var ary = [] , classNameAry = strName.replace(/^ +| +$/g, "").split(/ +/);
        // 获取所有元素标签
        var nodeList = context.getElementsByTagName("*");
        for (var i = 0; i < nodeList.length; i++) {
            var curNode = nodeList[i];
            var isFlag = true;
            for (var j = 0; j < classNameAry.length; j++) {
                var reg = new RegExp("(^| +)" + classNameAry[j] + "( +|$)");
                if (!reg.test(curNode.className)) {
                    isFlag = false;
                    break;
                }
            }
            if (isFlag) {
                ary.push(curNode);
            }
        }
        return ary;
    }




    return {
        toArray : toArray,
        toJsonObj : toJsonObj,
        getRandom : getRandom,
        win : win,
        offset : offset,
        getCss : getCss,
        setCss : setCss,
        setGroupCss : setGroupCss,
        css : css,
        hasClass : hasClass,
        addClass : addClass,
        removeClass : removeClass,
        toggleClass : toggleClass,
        prev : prev,
        next : next,
        prevAll : prevAll,
        nexAll : nexAll,
        sibling : sibling,
        siblings : siblings,
        index : index,
        children : children,
        firstChild : firstChild,
        lastChild : lastChild,
        append : append,
        insertBefore : insertBefore,
        prepend : prepend,
        insertAfter : insertAfter,
        getElementsByClassName : getElementsByClassName
    }
})();