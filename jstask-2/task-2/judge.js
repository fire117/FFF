
var allPlayer = sessionStorage.all;
var all = JSON.parse(allPlayer);
var i;
var play = '';
for (i = 0; i < all.length; i++) {
    play += '<div class="main-box">' + '<div class="main-box-hide"></div>' +
        '<div class="main-box-open">' + all[i] + '</div>' +
        '<div class="main-box-number">' + (i + 1) + '号</div>' + '</div>';
    console.log(play);
    $('.main').eq(0).html(play);
}
$('#startGame').click(function () {
    window.location.href = 'step.html'
});