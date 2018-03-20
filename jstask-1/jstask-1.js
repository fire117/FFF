var sq=document.getElementsByClassName('sq');//定义变量sq来存放获取的类名
var start=document.getElementById('start');//定义变量start来存放获取的start按钮
var stop=document.getElementById('stop');//定义变量stop来存放获取的stop按钮
var clock;//定义计时器变量clock
// 随机颜色的函数
function getColor() {
    var arr = [];
    i =0;
    C = '0123456789ABCDEF';
    while(i++ < 6) {
        x=Math.random()*16;
        b=parseInt(x);
        c=C.substr(b,1);
        arr.push(c);
    }
    var cl = "#"+ arr.join('');
    return cl;
    var box=document.getElementById('box');
    box.addEventListener()
}

//给格子的背景色赋值
function setColor() {
    var num1 = Math.floor(Math.random()*9);//随机的格子
    var num2 = Math.floor(Math.random()*9);
    var num3 = Math.floor(Math.random()*9);
    if (num1===num2||num1===num3) {num1++;}
    if (num2===num1||num2===num3) {num2++;}
    if (num3===num1||num3===num2) {num3++;}
    for(var i=0;i<sq.length;i++) {//每次随机重置背景颜色
        sq[i].style.backgroundColor='#f93';
    }
    sq[num1].style.backgroundColor= getColor();//将随机颜色赋值给随机格子的背景色
    sq[num2].style.backgroundColor= getColor();
    sq[num3].style.backgroundColor= getColor();
    //console.log(num1 + ' ' + num2 + ' ' + num3);
}

//点击start按钮时运行此函数
function startBtn() {
    clearInterval(clock);//清除计时器
    clock = setInterval(setColor,1000);//开始计时器
    // start.disabled = true;
}

//点击stop按钮时运行此函数
function stopBtn() {
    clearInterval(clock);//清除计时器
    // start.disabled = false;
    for(var i=0;i<sq.length;i++){//点击stop按钮时重置所有格子的背景色
        sq[i].style.backgroundColor='#f93';
    }
}