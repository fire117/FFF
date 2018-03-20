var app = angular.module('app', ['ui.router', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'angularFileUpload','ngMessages']);
//路由
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/login");
    $stateProvider
        .state("login", {
            url: "/login",
            templateUrl: "login.html",
            controller: 'LoginCtrl'
        })
        .state("back", {
            url: "/back",
            templateUrl: "back.html",
            controller: 'BackCtrl'
        })
        .state("back.list", {
            // url: "/list/?page&size&type&status&title&author&startAt&endAt",
            url: "/list/:page/:size/:type/:status/:title/:author/:startAt/:endAt",
            templateUrl: "list.html",
            controller: 'ListCtrl',
            params: {
                'page': '1',
                'size': '10',
                'title': '',
                'author': '',
                'type': '',
                'status': '',
                'startAt':'',
                'endAt':''
            }
        })
        .state("back.add", {
            url: "/add?id",
            templateUrl: "add.html",
            controller: 'AddCtrl'
        });
});

//登录页
app.controller('LoginCtrl', function ($scope, $state,$http) {
    $scope.login = function () {
        $http({
            method:"POST",
            url:"/carrots-admin-ajax/a/login",
            params: { name: $scope.username, pwd: $scope.userpwd },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (resp) {
            if (resp.data.message==="success") {
                $state.go('back');
            }
            else if(resp.data.message==="用户不存在"){
                $(".tips1").text(resp.data.message);
            }
            else if(resp.data.message==="密码错误"){
                $(".tips2").text(resp.data.message);
            }
        },function (resp) {
            console.log(resp);
        });
    }
});

//后台页
app.controller('BackCtrl', function ($scope, $state) {
    $scope.GoList = function () {
        $state.go('back.list');
    };
});

//列表页
app.controller('ListCtrl', function ($scope, $state, $log, $http, $stateParams) {
   console.log($stateParams) ;
    $http({
        method: "get",
        url: "/carrots-admin-ajax/a/article/search",
        params: {
            page: $stateParams.page,
            size: $stateParams.size,
            type: $stateParams.type,
            status: $stateParams.status,
            title: $stateParams.title,
            author: $stateParams.author,
            startAt: $stateParams.startAt,
            endAt: $stateParams.endAt
        },
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function (response) {
        console.log(response);

        $scope.article = response.data.data.articleList;
        //$scope.total = response.data.data.total;
        $scope.totalItems = response.data.data.total;
        $scope.size = $stateParams.size;
        $scope.currentPage = $stateParams.page;
        $scope.type = $stateParams.type && Number($stateParams.type);
        $scope.status = $stateParams.status && Number($stateParams.status);
        // $scope.startAt = $stateParams.startAt;
        // $scope.endAt = $stateParams.endAt;
        if($scope.type=='number') {
            $scope.type = parseInt($stateParams.type);
        }
        if($scope.status=='number') {
            $scope.status = parseInt($stateParams.status);
        }

         $scope.startAt = parseInt($stateParams.startAt);
        console.log($scope.startAt);
         $scope.endAt = parseInt($stateParams.endAt);
        $scope.title = $stateParams.title;
        $scope.author = $stateParams.author;

    }, function (response) {
        console.log(response);
    });

    //去详情页
    $scope.GoAdd = function () {
        $state.go('back.add');
    };

    //分页按钮
    $scope.pageChanged = function () {
        $state.go('back.list', {page: $scope.currentPage, size: $scope.size});
    };

    //确定按钮
    $scope.submit = function () {
        $scope.currentPage = $scope.GoPage;
        $state.go('back.list', {page: $scope.currentPage, size: $scope.size});
    };

    //搜索按钮
    $scope.search = function () {
        if($scope.startAt){
            var startTime = $scope.startAt;
            var date1 = new Date(startTime);
            var time1 = date1.getTime();
        }
        if($scope.endAt){
            var stopTime =$scope.endAt ;
            var date2 = new Date(stopTime);
            var time2 = date2.getTime();
        }
        console.log(time1+","+time2);
        $state.go('back.list', {
            page: 1,
            size: $stateParams.size,
            type: $scope.type,
            status: $scope.status,
            title: $scope.title,
            author: $scope.author,
            startAt: time1,
            endAt: time2
        },{reload:true});
    };

    //清空按钮
    $scope.clear = function () {
        $state.go('back.list', {
            page: 1,
            size: 10,
            title: '',
            author: '',
            type: '',
            status: '',
            startAt: '',
            endAt: ''
        });
    };


    //搜索下拉框
    $scope.types = [
        {value: "", label: '全部'},
        {value: 0, label: '首页banner'},
        {value: 1, label: '找职位banner'},
        {value: 2, label: '找精英banner'},
        {value: 3, label: '行业大图'}
    ];
    $scope.type = "";
    $scope.statuses = [
        {value: "", label: '全部'},
        {value: 1, label: '草稿'},
        {value: 2, label: '上线'}
    ];
    $scope.status = "";


    //日历控件
    $scope.popup2 = {
        opened: false
    };
    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };
    $scope.popup1 = {
        opened: false
    };
    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    //删除
    $scope.deleteItem = function (id) {
        bootbox.confirm({
            title: "<h4 style='color:red;'>提示</h4>",
            message: "<p style='text-align: center'>确认删除吗？</p>",
            buttons: {
                confirm: {
                    label: '删除',
                    className: 'btn-danger'
                },
                cancel: {
                    label: '再考虑一下',
                    className: 'btn-default'
                }
            },
            callback: function (result) {
                if (result) {
                    $http({
                        method: 'delete',
                        url: '/carrots-admin-ajax/a/u/article/' + id,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).then(function () {
                        $state.reload();
                    });
                }
            }
        });
    };

    //上线 下线
    $scope.upOrDownItem = function (a, b) {
        bootbox.confirm({
            title: "<h4 class='bootTitle' style='color:red;text-align: left;'>提示</h4>",
            message: "<p class='bootMessage' style='text-align: center'>确认" + (b === 1 ? '上线' : '下线') + "吗？</p>",
            size: "large",
            buttons: {
                confirm: {
                    label: '<i class="fa fa-times"></i> 确定',
                    className: 'btn-success'
                },
                cancel: {
                    label: '<i class="fa fa-check"></i>再考虑一下',
                    className: 'btn-default'
                }
            },
            callback: function (result) {
                if (result) {
                    $http({
                        method: 'put',
                        url: '/carrots-admin-ajax/a/u/article/status',
                        params: {
                            id: a,
                            status: b === 1 ? 2 : 1
                        },
                        headers: {'Content-Type': 'Application/json'}
                    }).then(function successCallback() {
                        $state.reload();
                    });
                }
            }
        });
    };

    //编辑
    $scope.edit = function (id) {
        $state.go('back.add',{id: id});
        console.log(id);
    };

});

//type过滤器
app.filter("a", function () {
    return function (type) {
        if (type === 0) {
            return "首页banner";
        }
        if (type === 1) {
            return "找职位banner";
        }
        if (type === 2) {
            return "找精英banner";
        }
        if (type === 3) {
            return "行业大图";
        }
    }
});

//status过滤器
app.filter("b", function () {
    return function (status) {
        if (status === 1) {
            return "草稿";
        }
        if (status === 2) {
            return "上线";
        }
    }
});

//img过滤器
// app.filter("c", function () {
//     var noImg = 'img/noImg.png';
//     return function (img) {
//         //正则匹配图片格式
//         return (img.match(/^http:\/\/.*\.(jp[e]?g|png|bmp|gif|psd)$/igm) ? img : noImg)
//     }
// });

