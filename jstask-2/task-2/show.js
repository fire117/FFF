var allPlayer = sessionStorage.all;//接收缓存的数据
var all = JSON.parse(allPlayer); //使用json将字符串转换为对象
console.log(all); //打印所有玩家身份
var clickNum = 1;//定义点击按钮被点击的次数
var playNum = 2;//定义玩家的号数

$(document).ready(function () {
   $('#btn').click(function() {
       if (clickNum > 2 * all.length - 1) {
           //每个玩家查看身份及传递身份需要点击两次按钮，第一个页面不用点击隐藏，所以当点击总次数超过玩家人数*2-1时，跳转到下一个页面
           window.location.href = 'judge.html';
       } else if (clickNum % 2 == 0) {
           //当点击次数为偶数次时，是未翻牌的状态
           $('#imgShow').toggle();
           $('#imgHide').toggle();
           $('#tips').toggle();
           $('#playerNum').text(playNum);
           $('#btn').text('查看' + playNum + '号身份');
           playNum++;
       } else {
           //当点击次数为奇数次时，是已翻牌的状态
           $('#imgHide').toggle();
           $('#imgShow').toggle();
           $('#tips').toggle().text('角色：' + all[playNum - 2]);
           if (playNum < all.length + 1) {
               $('#btn').text('隐藏并传递给' + playNum + '号');
           } else {
               $('#btn').text('查看法官台本');
           }
       }
       clickNum++;//一次点击事件结束后总次数加1
   });
});




