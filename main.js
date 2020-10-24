// 時計の表示
$(function() {
    const html = `
    <div id="timer">
        <p class="close">Close</p>
        <div id="current_time"></div>
        <div class="stop_watch">
            <div id="elapsed_time"></div>
            <div class="buttons">
                <p id="start">START</p>
                <p id="pause">PAUSE</p>
                <p id="reset">RESET</p>
            </div>
        </div>
    </div>
    `
    $('body').prepend(html);

    // ドラッグドロップができるようにする
    $("#timer").draggable(
        {
            // draggble とposition absoluteの両立 https://stackoverrun.com/ja/q/4709593
            start: function (event, ui) {
                $(this).css({
                    right: "auto",
                    top: "auto"
                });
            }
        }
    ); 
});

// closeボタンクリックで、時計の非表示
$('.close').on('click', function() {
    $('#timer').css('display', 'none');
});


// 時計機能
// 桁数が1桁だったら先頭に0を加えて2桁に調整する
function addZero(num) {
    let n;
    if( num < 10 ) { n = "0" + num; }
    else { n = num; }
    return n;
}
function showClock() {
    let nowTime = new Date();
    let nowHour = addZero( nowTime.getHours() );
    let nowMin  = addZero( nowTime.getMinutes() );
    let clock = nowHour + ':' + nowMin;
    $('#current_time').html(clock);
}
setInterval('showClock()',1000);


// ストップウォッチ機能 https://javascript-style.hatenablog.com/entry/2018/09/15/090000
let a = 0;
let tm1 = null;

$(function() {
    $("#elapsed_time").html("00:00");
    // スタートボタン
     $("#start").click(function() {
          if(tm1 == null) { tm1 = setInterval("stopWatch()",100); }
     });
     // ストップボタン
     $("#pause").click(function() {
          clearInterval(tm1);
          tm1 = null;
     });
     // リセットボタン
     $("#reset").click(function() {
          $("#elapsed_time").html("00:00");
          a = 0;
     });
});

function stopWatch() {
     a += 1;
     var second = Math.floor(a / 10) % 60;
     var minute = Math.floor(a / 600) % 60;
    //  var hour = Math.floor(a / 36000) % 60;

     // 時間の表示を更新している
     $("#elapsed_time").html(addZero(minute) + ":" + addZero(second));
}