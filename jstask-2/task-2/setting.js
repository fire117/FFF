var userNum = document.getElementById('user');//获取玩家人数输入框里的数字
var slider = document.getElementById('range');//获取滑动条

var btnAdd = document.getElementById('btnAdd');//获取+号按钮
var btnSub = document.getElementById('btnSub');//获取-号按钮

var userSet = document.getElementById('userSet');//获取玩家显示区域的设置按钮
var userShow = document.getElementById('userShow');//获取玩家显示区域的设置按钮

var gotoNext = document.getElementById('gotoNext');//获取去发牌按钮

var allPlayer;
var all = [];
var killer = [];//设置一个空的杀手数组
var person = [];//设置一个空的平民数组
var player = "";

//拖动滑动条时 将slider的value赋值给userNum
slider.oninput = function () {
    userNum.value = slider.value;
};

//对玩家人数输入框做出验证 当输入框失去焦点时
//如果输入的数字小于6或大于18 弹窗提示
//同时也保持输入的数字和滑动条是彼此关联的 相等的
userNum.onblur = function () {
    if (userNum.value < 6) {
        alert('大于6人才能开始游戏哟');
        userNum.value = 6;
        slider.value = userNum.value;
    } else if (userNum.value > 18) {
        alert('少于18人才能开始游戏哟');
        userNum.value = 18;
        slider.value = userNum.value;
    } else {
        slider.value = userNum.value;
    }
    if (isNaN(userNum.value)) {
        alert('请输入6-18之间的数字哟');
        userNum.value = 6;
        slider.value = userNum.value;
    }
};

//点击+号按钮时 userNum和slider的value值同时自增+1
btnAdd.onclick = function () {
    userNum.value++;
    if (userNum.value > 18) {
        alert('少于18人才能开始游戏哟');
        userNum.value = 18;
    } else {
        slider.value = userNum.value;
    }
};

//点击-号按钮时 userNum和slider的value值同时自减-1
btnSub.onclick = function () {
    userNum.value--;
    if (userNum.value < 6) {
        alert('大于6才能开始游戏哟');
        userNum.value = 6;
    } else {
        slider.value = userNum.value;
    }
};

//分配玩家身份
userSet.onclick = function () {
    killer = [];//设置一个空的杀手数组
    person = [];//设置一个空的平民数组
    player = '';
    //不同人数范围设置不同的杀手数量
    if (userNum.value >= 6 && userNum.value <= 8) {
        killer.length = 1;
    } else if (userNum.value >= 9 && userNum.value <= 11) {
        killer.length = 2;
    } else if (userNum.value >= 12 && userNum.value <= 15) {
        killer.length = 3;
    } else if (userNum.value >= 16 && userNum.value <= 18) {
        killer.length = 4;
    }

    //填充杀手数组
    for (var i = 0; i < killer.length; i++) {
        killer[i] = '杀手';
        console.log(killer[i]);
    }
    //填充平民数组
    for (var j = 0; j < userNum.value - killer.length; j++) {
        person[j] = '平民';
        console.log(person[j]);
    }
    //将两个数组合并 存放在变量all里面
    all = killer.concat(person);

    //打乱数组的顺序
    function randomSort(a, b) {
        return Math.random() > 0.5 ? -1 : 1;
    }

    all.sort(randomSort);
    console.log(all);//打印所有的角色身份

    //要显示的区域
    for (var m = 0; m < all.length; m++) {
        if (all[m] == '杀手') {
            player = player + "<li><span></span>" + (m + 1) + "号" + all[m] + "</li>";
        } else {
            player = player + "<li><i></i>" + (m + 1) + "号" + all[m] + "</li>";
        }
        userShow.innerHTML = player;
    }
    // console.log(player);
    allPlayer = JSON.stringify(all);//使用json把对象转换为字符串
    sessionStorage.all = allPlayer;//把字符串储存到缓存中

};

gotoNext.onclick = function gotoNext() {
    if (!all.length) {
        alert('要设置人数才能开始游戏哟');
    } else if (all.length != slider.value) {
        alert('要更新数据哟');
    } else {
        window.location.href = 'show.html';
    }
};
//mmp


