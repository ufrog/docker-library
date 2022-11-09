(function(ng, jq, undefined) {'use strict';
    ng.module('genApp', ['ngAnimate', 'ngSanitize'])
        /** 定义全局配置 */
        .config(['$httpProvider', '$controllerProvider', function($httpProvider, $controllerProvider) {
            $httpProvider.defaults.headers.post = {'Content-Type': 'application/x-www-form-urlencoded'};
            $controllerProvider.allowGlobals();
        }])

        /** 全局控制器 */
        .controller('genCtrl', ['$scope', '$http', function($scope, $http) {
            ng.extend($scope, {
                // 初始化
                init: function() {
                    $scope.mStatus = {};
                },

                // 阻止事件冒泡
                stop: function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                },

                // 状态判断或设置
                status: function(name, status) {
                    if (ng.isArray(status)) {
                        return (jq.inArray($scope.mStatus[name], status) >= 0);
                    } else {
                        $scope.mStatus[name] = status;
                    }
                },

                // 判断数据是否为空
                empty: function(data) {
                    if (ng.isUndefined(data) || data === null) return true;
                    if (ng.isArray(data) && data.length === 0) return true;
                    if (ng.isString(data) && data === '') return true;
                    return false;
                },

                // 时间戳
                timestamp: function(date) {
                    return (ng.isDate(date) ? date: new Date()).valueOf();
                },

                // 判断数组
                inArray: function(data, array, key) {
                    var name = key || 'id', offset = -1;
                    ng.forEach(array, function(val, idx) {
                        if ((ng.isObject(val) && val[name] === data[name]) || val === data) {
                            offset = idx;
                        }
                    });
                    return offset;
                },

                // 更新数组数据
                updateFromArray: function(data, array, key) {
                    var idx = this.inArray(data, array, key);
                    if (idx >= 0) array.splice(idx, 1, data);
                },

                // 移除数组数据
                removeFromArray: function(data, array, key) {
                    var datas = ng.isArray(data) ? data : [data], _this = this;
                    ng.forEach(datas, function(val) {
                        var idx = _this.inArray(val, array, key);
                        if (idx >= 0) array.splice(idx, 1);
                    });
                },

                // 删除属性
                deleteProps: function(data, keys) {
                    if (!ng.isArray(keys)) delete data[keys];
                    ng.forEach(keys, function(val) {
                        delete data[val];
                    });
                }
            }).init();
        }])

        /** 切换开关指令 */
        .directive('toggleSwitch', function() {
            return {
                restrict: 'E',
                scope: {
                    bind: '=',
                    vTrue: '@true',
                    vFalse: '@false',
                    vDefault: '@'
                },
                replace: true,
                template: '<i class="fa fa-2x" ng-class="checkClass()" ng-click="toggle()"></i>',
                link: function($scope) {
                    ng.extend($scope, {
                        // 初始化
                        init: function() {
                            if (ng.isUndefined($scope.vTrue)) $scope.vTrue = true;
                            if (ng.isUndefined($scope.vFalse)) $scope.vFalse = false;
                            if (ng.isUndefined($scope.vDefault)) $scope.vDefault = $scope.vFalse;
                            if (ng.isUndefined($scope.bind)) $scope.bind = $scope.vDefault;
                            $scope.$icon = {trueIcon: 'fa-toggle-on text-success', falseIcon: 'fa-toggle-off text-danger'};
                        },

                        // 判断样式
                        checkClass: function() {
                            if ($scope.bind === $scope.vTrue) return $scope.$icon.trueIcon;
                            else if ($scope.bind === $scope.vFalse) return $scope.$icon.falseIcon;
                            else return $scope.$icon.falseIcon;
                        },

                        // 切换
                        toggle: function() {
                            if ($scope.bind === $scope.vTrue) $scope.bind = $scope.vFalse;
                            else if ($scope.bind === $scope.vFalse) $scope.bind = $scope.vTrue;
                            else $scope.bind = $scope.vTrue;
                        }
                    }).init();
                }
            };
        })

        /** 空过滤器<br>若内容为空则显示默认值 */
        .filter('empty', function() {
            return function(input, defaultValue) {
                if (ng.isUndefined(input) || input === null) return defaultValue;
                if (ng.isArray(input) && input.length === 0) return defaultValue;
                if (ng.isString(input) && input === '') return defaultValue;
                return input;
            }
        });
})(angular, jQuery);