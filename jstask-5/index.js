var btn = document.getElementById('btn');//获取登录按钮
var userName = document.getElementById('text');//获取用户账户框
var userPwd = document.getElementById('pwd');//获取用户密码框
var tips1 = document.getElementById('tips1');//获取用户账户框提示
//var tips2 = document.getElementById('tips2');//获取用户密码框提示
var tips=document.getElementById('tips');//获取非空区域提示

btn.onclick = function login() {
    console.log(userName.value);
    console.log(userPwd.value);
    tips.textContent = "";
    if (!userName.value) {
        tips.textContent = "请输入账号";
        tips.style.color='red';
    } else if (!userPwd.value) {
        tips.textContent = "请输入密码";
        tips.style.color='red';
    } else {
        //新建xhr对象
        var request = new XMLHttpRequest();
        //POST请求把参数放在send里面
        request.open("POST","/carrots-admin-ajax/a/login");
        //将html文本框里的value值拼成一段url形式的参数  每个参数中间用&符隔开
        var data = "name=" + userName.value + "&pwd=" + userPwd.value;
        //添加请求头信息
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        //将data参数这个字符串作为参数传给send方法  把输入框的值发送给接口
        request.send(data);

        //对整个过程的状态进行监听
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    console.log(request.responseText);//打印json字符串
                    var data = JSON.parse(request.responseText);
                    console.log(data);//打印json对象  数组
                    if (data.code === 0) {
                        window.location.href = 'http://dev.admin.carrots.ptteng.com/';
                    }else {
                        alert('请填写正确的账号和密码');
                    }
                } else {
                    alert("发生错误：" + request.status);
                }
            }
        };
    }
};
userName.oninput = function () {
    if (userName.value.length <= 4 && userName.value.length >= 1) {
        userName.style.outlineColor = 'red';
        tips1.innerHTML = '请输入最少4个字符哟';
        tips1.style.opacity = 1;
        tips1.style.color = 'red';
    } else {
        userName.style.outlineColor = '#fff';
        tips1.style.opacity = 0;
    }
};
// userPwd.oninput = function () {
//     if (userPwd.value.length < 5 && userPwd.value.length > 1) {
//         userPwd.style.outlineColor = 'red';
//         tips2.innerHTML = '请输入最少4个字符哟';
//         tips2.style.opacity = 1;
//         tips2.style.color = 'red';
//
//     } else {
//         userPwd.style.outlineColor = '#fff';
//         tips2.style.opacity = 0;
//     }
// };





