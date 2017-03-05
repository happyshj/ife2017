;(function ($) {
    /* 控制按钮变量 */
    var container = $('.container'),
        container_control = $('.container-control'),
        music_name = $('.music-name'),
        music_name_text = $('.music-name span'),
        music_from = $('.music-from'),
        music_time = $('.music-time'),
        music_volume_icon = $('.music-volume-icon'),
        music_volume_bk = $('.music-volume-bk'),
        music_volume_text = $('.music-volume-text'),
        volume_drag = $('.volume-drag'),
        sidebar = $('.sidebar'),
        music_sidebar = $('.music-sidebar'),
        sidebar_drag = $('.sidebar-drag'),
        music_mode = $('#music-mode'),
        play_prev = $('.play-prev'),
        play_next = $('.play-next'),
        music_list = $('.music-list'),
        list = $('.list'),
        list_to_top = $('.list .to-top'),
        list_to_bottom = $('.list .to-bottom'),
        list_content = $('.list-content'),
        list_ul = $('.list ul'),
        list_li = $('.list ul li'),
        list_mark = $('.list-mark'),
        music_prev = $('.music-prev'),
        music_play_or_pause = $('#playorpause'),
        music_play = $('.music-play'),
        music_next = $('.music-next'),
        container_img = $('.container-img');

    /* 元素变量 */
    var list_li_h = '<li></li>';

    /* 其余变量 */
    var audio = document.getElementById('audio'),
        currentIndex = -1,
        msrc = [
            "music/1.mp3",
            "music/2.mp3",
            "music/3.mp3",
            "music/4.mp3",
            "music/5.mp3",
            "music/6.mp3",
            "music/7.mp3",
            "music/8.mp3",
            "music/9.mp3",
            "music/10.mp3"
        ],
        timer,
        timer_name,
        timer_top,
        timer_bottom,
        volume_num = 0.8,
        volume_none = false;


    // 获取数据
    function getData() {
        $.getJSON("package.json",function (data) {
            $.each(data,function (t,arr) {
                music_name_text.text(arr[currentIndex].name);
                music_from.text(arr[currentIndex].from);
                container_img.find("img").attr('src',arr[currentIndex].img);
            })
        });
    }
    // 初始化信息
    function init() {
        // $.getJSON("package.json",function (data) {
        //     $.each(data,function (t,arr) {
        //         for(var i = 0;i<arr.length;i++){
        //             list_ul.append(list_li_h);
        //             list_ul.find('li').eq(i).text(arr[i].name);
        //         }
        //     })
        // });
        music_volume_text.css({
            "width": music_volume_bk.width() * volume_num
        });
        set_volume(volume_num);
        if(currentIndex == -1){
            audio.src = msrc[0];
            currentIndex = 0;
        }
        $.getJSON("package.json",function (data) {
            $.each(data,function (t,arr) {
                music_name_text.text(arr[currentIndex].name);
                music_from.text(arr[currentIndex].from);
            })
        });
        container_img.css({
            "animation-iteration-count": 0
        })
    }
    init();

    // 音乐名称滚动
    function music_name_scroll() {
        var i = music_name.scrollLeft() + 1;
        music_name.scrollLeft(i);
        if(music_name.scrollLeft() >= music_name.width()){
            music_name.scrollLeft(0);
        }
    }

    setInterval(function () {
        var a = container_img.css('transform')
        console.log(a)
    },1000)

    function play_timer() {
        container_img.css({
            "animation-iteration-count": "infinite"
        });
        clearInterval(timer);
        timer = setInterval(function () {
            music_side();
        },1000);
        clearInterval(timer_name);
         timer_name = setInterval(music_name_scroll,30);
    }
    // 播放暂停按钮
    music_play_or_pause.click(function () {
        playAudio();
    });
    function playAudio() {
        if(currentIndex == -1){
            $.getJSON("package.json",function (data) {
                 $.each(data,function (t,arr) {
                   audio.src = arr[0].src1;
                 })
            });
            audio.src = msrc[0];
            currentIndex = 0;
        }
        getData();
        if(audio.paused){
            audio.play();
            play_timer();
            music_play_or_pause.removeClass("music-play");
            music_play_or_pause.addClass("music-pause");
        }else{
            audio.pause();
            container_img.css({
                "animation-iteration-count": 0
            })
            clearInterval(timer);
            clearInterval(timer_name);
            music_play_or_pause.removeClass("music-pause");
            music_play_or_pause.addClass("music-play");
        }
    }

    // 上一首下一首按钮
    music_prev.click(function () {
        if(currentIndex == -1){
            currentIndex = 0;
        }
        if(music_mode.hasClass("play-circle")){
            if (currentIndex == 0) {
                currentIndex = msrc.length - 1;
            } else {
                currentIndex--;
            }
        } else if(music_mode.hasClass("play-single")){

        } else if(music_mode.hasClass("play-random")){
            var x = parseInt(Math.random()*(msrc.length - 1));
            if(!isNaN(x)){
                currentIndex = x;
            }
        }
       getData();
        audio.src = msrc[currentIndex];
        audio.play();
        play_timer();
        isPlay();
    });
    music_next.click(function () {
        if(currentIndex == -1){
            currentIndex = 0;
        }
        if(music_mode.hasClass("play-circle")){
            if (currentIndex == msrc.length - 1) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
        } else if(music_mode.hasClass("play-single")){

        } else if(music_mode.hasClass("play-random")){
            var x = parseInt(Math.random()*(msrc.length - 1));
            if(!isNaN(x)){
                currentIndex = x;
            }
        }
        getData();
        audio.src = msrc[currentIndex];
        audio.play();
        play_timer();
        isPlay();
    });
    function isPlay() {
        if(!audio.paused){
            music_play_or_pause.addClass("music-pause");
            music_play_or_pause.removeClass("music-play");
        }else{
            music_play_or_pause.addClass("music-play");
            music_play_or_pause.removeClass("music-pause");
        }
    }

    // 随机播放，循环播放，单曲循环模式选择
    music_mode.click(function () {
        if(music_mode.hasClass("play-circle")){
            music_mode.removeClass("play-circle");
            music_mode.addClass("play-single");
        } else if(music_mode.hasClass("play-single")){
            music_mode.removeClass("play-single");
            music_mode.addClass("play-random");
        } else if(music_mode.hasClass("play-random")){
            music_mode.removeClass("play-random");
            music_mode.addClass("play-circle");
        }
    });

    // 一首歌播放完成事件
    audio.addEventListener('ended',function(){
        if(music_mode.hasClass("play-circle")){
            if (currentIndex == (msrc.length-1)) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
        } else if(music_mode.hasClass("play-single")){

        } else if(music_mode.hasClass("play-random")){
            var x = parseInt(Math.random()*(msrc.length - 1));
            if(!isNaN(x)){
                currentIndex = x;
            }
        }
        getData();
        audio.src = msrc[currentIndex];
        audio.play();
        play_timer();
    },false);

    /* 进度条与播放时间 */

    // // 点击进度条选择播放进度
    // sidebar.click(function (e) {
    //     sidebar_text(e);
    // });
    // music_sidebar.click(function (e) {
    //     sidebar_text(e);
    // });
    function music_side() {
        music_sidebar.css({
            "width": (audio.currentTime / audio.duration)* sidebar.width()
        });
        music_time.text(music_time_text())
    }
    // 剩余时间显示
    function music_time_text() {
        var all_seconds = Math.round(audio.duration - audio.currentTime);// 四舍五入取整
        var minutes = Math.floor(all_seconds / 60);
        var seconds = all_seconds % 60;
        if(minutes < 10){
            minutes = "0" + minutes;
        }
        if(seconds < 10){
            seconds = "0" + seconds;
        }
        return "-" + minutes + ":" + seconds;
    }
    function sidebar_text(e) {
        music_sidebar.css({
            "width": e.pageX - sidebar.offset().left
        });
        audio.currentTime = music_sidebar.width() / sidebar.width() * audio.duration;
    }

    // 拖拽进度条选择播放进度
    sidebar_drag.mousedown(function () {
        $(document).on("mousemove.drag_sidebar",function (e) {
            var w = e.pageX - sidebar.offset().left;
            if(w < 0){
                w = 0;
            }
            if(w > sidebar.width()){
                w = sidebar.width();
            }
            music_sidebar.css({
                "width": w
            });
            music_sidebar.css({
                "width": w
            });
            audio.currentTime = music_sidebar.width() / sidebar.width() * audio.duration;
        }).on("mouseup.drag_sidebar",function () {
            $(document).unbind(".drag_sidebar")
        })
    });

    // 快进，快退事件（分别是10s）
    play_prev.click(function () {
        if(audio.currentTime > 10){
            audio.currentTime = audio.currentTime - 10;
        }else {
            audio.currentTime = 0;
        }
    });
    play_next.click(function () {
        if(audio.duration - audio.currentTime > 10){
            audio.currentTime = audio.currentTime + 10;
        }else {
            audio.currentTime = audio.duration - 1;
        }
    });

    /* 音量控制 */
    function set_volume(volume) {
        audio.volume = volume;
        if(audio.volume == 0){
            if(music_volume_icon.hasClass("volume-down")){
                music_volume_icon.removeClass("volume-down");
            } else if(music_volume_icon.hasClass("volume-up")){
                music_volume_icon.removeClass("volume-up");
            }
            music_volume_icon.addClass("volume-off");
        }else if(audio.volume >0 && audio.volume <= 0.6){
            if(music_volume_icon.hasClass("volume-off")){
                music_volume_icon.removeClass("volume-off");
            } else if(music_volume_icon.hasClass("volume-up")){
                music_volume_icon.removeClass("volume-up");
            }
            music_volume_icon.addClass("volume-down");
        }else if(audio.volume > 0.6){
            if(music_volume_icon.hasClass("volume-down")){
                music_volume_icon.removeClass("volume-down");
            } else if(music_volume_icon.hasClass("volume-off")){
                music_volume_icon.removeClass("volume-off");
            }
            music_volume_icon.addClass("volume-up");
        }
    }

    // 音量按钮控制，点击可静音
    music_volume_icon.click(function () {
        if(!volume_none){
            volume_none = true;
            audio.volume = 0;
            set_volume(audio.volume);
            music_volume_text.css({
                "width": 0
            });
        }else{
            volume_none = false;
            music_volume_text.css({
                "width": music_volume_bk.width() * volume_num
            });
            set_volume(volume_num);
        }
    });

    // 点击音量进度条选择音量大小
    music_volume_bk.click(function (e) {
       volume_text(e);
    });
    music_volume_text.click(function (e) {
       volume_text(e);
    });
    function volume_text(e) {
        music_volume_text.css({
            "width": e.pageX - music_volume_bk.offset().left
        });
        audio.volume = music_volume_text.width() / music_volume_bk.width();
        set_volume(audio.volume);
    }

    // 拖拽音量进度条控制音量
    volume_drag.mousedown(function () {
        $(document).on("mousemove.volume_sidebar",function (e) {
            var w = e.pageX - music_volume_bk.offset().left;
            if(w < 0){
                w = 0;
            }
            if(w > music_volume_bk.width()){
                w = music_volume_bk.width();
            }
            music_volume_text.css({
                "width": w
            });
            audio.volume = music_volume_text.width() / music_volume_bk.width();
            set_volume(audio.volume);
        }).on("mouseup.volume_sidebar",function () {
            $(document).unbind(".volume_sidebar")
        })
    });

    /* 列表功能 */
    music_list.click(function () {
        list_mark.show();
        list.show();
    });

    // 点击非列表区域隐藏列表
    list_mark.click(function () {
        list.hide();
        list_mark.hide();
    });

    // 点击列表音乐播放
    list_li.click(function () {
        currentIndex = $(this).index();
        getData();
        audio.src = msrc[currentIndex];
        audio.play();
        play_timer();
        music_play_or_pause.addClass("music-pause");
        music_play_or_pause.removeClass("music-play");
        list.hide();
        list_mark.hide();
    });

    // 点击列表上下按钮滑动列表
    list_to_top.click(function () {
        var i = list_content.scrollTop() + 30;
        list_content.scrollTop(i);
    });
    list_to_bottom.click(function () {
        var i = list_content.scrollTop() - 30;
        list_content.scrollTop(i);
    });

    // 鼠标移入上下按钮，显示隐藏音乐
    list_to_top.mouseover(function () {
        timer_top = setInterval(timer_top_f,50);
    });
    list_to_top.mouseout(function () {
        clearInterval(timer_top);
    });
    list_to_bottom.mouseover(function () {
        timer_bottom = setInterval(timer_bottom_f,50);
    });
    list_to_bottom.mouseout(function () {
        clearInterval(timer_bottom);
    });
    function timer_top_f() {
        var i = list_content.scrollTop() + 1;
        list_content.scrollTop(i);
    }
    function timer_bottom_f(){
        var i = list_content.scrollTop() - 1;
        list_content.scrollTop(i);
    }

})(jQuery);
