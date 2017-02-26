var show_menu = document.getElementById("right_menu"),
    menu_right = document.getElementsByClassName("menu")[0],
    menu_bk = document.getElementsByClassName("bk")[0],
    item = menu_right.getElementsByTagName("li");
show_menu.oncontextmenu = function (e) {
    var e = e || window.event;
    stopDefault(e);

    menu_bk.style.display = "block";
    menu_right.style.display = "block";

    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
    var win = document.documentElement.clientWidth || document.body.clientWidth;
    var hei = document.documentElement.clientHeight || document.body.clientHeight;
    var obj_w = menu_right.clientWidth;
    var obj_h = menu_right.clientHeight;

    if(win - x < obj_w){
        menu_right.style.left = x - obj_w + 'px';
        if(hei - y < obj_h){
            menu_right.style.top = y - obj_h + 'px';
        }else {
            menu_right.style.top = y + 'px';
        }
    }else {
        menu_right.style.left = x + 'px';
        if(hei - y < obj_h){
            menu_right.style.top = y - obj_h + 'px';
        }else {
            menu_right.style.top = y + 'px';
        }
    }
};
for(var i = 0; i < item.length; i++){
    item[i].index = i;
    item[i].onclick = function () {
        alert(item[this.index].innerHTML);
        menu_bk.style.display = "none";
        menu_right.style.display = "none";
    }
}
menu_bk.onclick = function () {
    menu_right.style.display = "none";
    menu_bk.style.display = "none";
};
function stopDefault( e ) {
    //阻止默认浏览器动作(W3C)
    if ( e && e.preventDefault )
        e.preventDefault();
    //IE中阻止函数器默认动作的方式
    else
        window.event.returnValue = false;
    return false;
}
