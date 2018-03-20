//详情页
app.controller('AddCtrl', function ($scope, $state, $stateParams, $http, FileUploader, $window) {

    //富文本
    var E = window.wangEditor;
    var editor = new E('#editor');
    editor.create();


    $scope.types = [
        {value: '', label: '请选择'},
        {value: 0, label: '首页banner'},
        {value: 1, label: '找职位banner'},
        {value: 2, label: '找精英banner'},
        {value: 3, label: '行业大图'}
    ];
    $scope.type = "";
    $scope.industries = [
        {value: '', label: '请选择'},
        {value: 0, label: '移动互联网'},
        {value: 1, label: '电子商务'},
        {value: 2, label: '企业服务'},
        {value: 3, label: 'O2O'},
        {value: 4, label: '教育'},
        {value: 5, label: '金融'},
        {value: 6, label: '游戏'}
    ];
    $scope.industry = "";



    //上传图片
    var uploader = $scope.uploader = new FileUploader({
        method: 'post',
        url: '/carrots-admin-ajax/a/u/img/task',
        queueLimit: 1,
        params: {
            file: $scope.imgLoad
        },
        header: {'Content-Type': "Application/json"}
    });
    uploader.filters.push({
        name: 'imageFilter',
        fn: function (item, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });
    uploader.onSuccessItem = function (fileItem, response) {
        $scope.imgLoad = response.data.url;
    };
    $scope.delete = function () {
        $scope.imgLoad = '';
        $scope.uploader.clearQueue();
    };


    // 编辑和新增
    if ($stateParams.id) {
        $scope.titleContent = "编辑";
        $http({
            method: 'get',
            url: '/carrots-admin-ajax/a/article/' + $stateParams.id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (res) {
            $scope.imgLoad = res.data.data.article.img;
            $scope.title = res.data.data.article.title;
            $scope.type = res.data.data.article.type;
            $scope.url = res.data.data.article.url;
            $scope.createAt = res.data.data.article.createAt;
            $scope.industry = res.data.data.article.industry;
            editor.txt.html(res.data.data.article.content);
        }, function () {
            console.log("错误");
        });

        //编辑上线
        $scope.onLineNow = function () {
            bootbox.confirm({
                title: "<h4 style='color:red;text-align: left;'>提示</h4>",
                message: "<p style='text-align: center'>确认上传吗？</p>",
                buttons: {
                    confirm: {
                        label: '上线',
                        className: 'btn-success'
                    },
                    cancel: {
                        label: '再考虑一下',
                        className: 'btn-default'
                    }
                },
                callback: function (result) {
                    if (result) {
                        $http({
                            method: 'put',
                            url: '/carrots-admin-ajax/a/u/article/' + $stateParams.id,
                            params: {
                                title: $scope.title,
                                type: $scope.type,
                                status: 2,
                                img: $scope.imgLoad,
                                url: $scope.url,
                                createAt: $scope.createAt,
                                // industry: $scope.type == 3 ? '' : $scope.industry,
                                industry: $scope.industry,
                                content: editor.txt.html()
                            },
                            headers: {
                                'Content-Type': 'Application/json'
                            }
                        }).then(function () {
                            $window.history.back();
                        });
                    }
                }
            });
        };

        //编辑草稿
        $scope.draftSave = function () {
            bootbox.confirm({
                title: "<h4 style='color:red;text-align: left;'>提示</h4>",
                message: "<p style='text-align: center'>存入草稿吗？</p>",
                buttons: {
                    confirm: {
                        label: '存为草稿',
                        className: 'btn-success'
                    },
                    cancel: {
                        label: '再考虑一下',
                        className: 'btn-default'
                    }
                },
                callback: function (result) {
                    if (result) {
                        $http({
                            method: 'put',
                            url: '/carrots-admin-ajax/a/u/article/' + $stateParams.id,
                            params: {
                                title: $scope.title,
                                type: $scope.type,
                                status: 1,
                                img: $scope.imgLoad,
                                url: $scope.url,
                                createAt: $scope.createAt,
                                industry: $scope.industry,
                                content: editor.txt.html()
                            },
                            headers: {
                                'Content-Type': 'Application/json'
                            }
                        }).then(function () {
                            $window.history.back();
                        });
                    }
                }
            });
        };
    }
    else {
        $scope.titleContent = "新增";
        //新增页上线
        $scope.onLineNow = function () {
            bootbox.confirm({
                title: "<h4 style='color:red;text-align: left;'>提示</h4>",
                message: "<p style='text-align: center'>确认上传吗？</p>",
                buttons: {
                    confirm: {
                        label: '上线',
                        className: 'btn-success'
                    },
                    cancel: {
                        label: '再考虑一下',
                        className: 'btn-default'
                    }
                },
                callback: function (result) {
                    if (result) {
                        $http({
                            method: 'post',
                            url: '/carrots-admin-ajax/a/u/article',
                            params: {
                                title: $scope.title,
                                type: $scope.type,
                                status: 2,
                                img: $scope.imgLoad,
                                url: $scope.url,
                                industry: $scope.industry,
                                content: editor.txt.html()
                            },
                            headers: {
                                'Content-Type': 'Application/json'
                            }
                        }).then(function successCallback() {
                            $window.history.back();

                            bootbox.alert({
                                title: "<h4 style='color:red;text-align: left;'>提示</h4>",
                                message: "<p style='text-align: center'>新增成功~</p>"
                            })
                        });
                    }
                }
            });
        };

        //新增页草稿
        $scope.draftSave = function () {
            bootbox.confirm({
                title: "<h4 style='color:red;text-align: left;'>提示</h4>",
                message: "<p style='text-align: center'>存入草稿吗？</p>",
                buttons: {
                    confirm: {
                        label: '存为草稿',
                        className: 'btn-success'
                    },
                    cancel: {
                        label: '再考虑一下',
                        className: 'btn-default'
                    }
                },
                callback: function (result) {
                    if (result) {
                        $http({
                            method: 'post',
                            url: '/carrots-admin-ajax/a/u/article',
                            params: {
                                title: $scope.title,
                                type: $scope.type,
                                status: 1,
                                img: $scope.imgLoad,
                                url: $scope.url,
                                industry: $scope.industry,
                                content: editor.txt.html()
                            },
                            headers: {
                                'Content-Type': 'Application/json'
                            }
                        }).then(function () {
                            $window.history.back();
                            bootbox.alert({
                                title: "<h4 style='color:red;text-align: left;'>提示</h4>",
                                message: "<p style='text-align: center'>新增成功~</p>"
                            })
                        });
                    }
                }
            });
        };
    }

    //取消操作
    $scope.cancel = function () {
        $window.history.back();
    };

});