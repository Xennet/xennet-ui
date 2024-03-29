angular.module('zennetApp').directive("slider", function($document, $timeout) {
    return {
        restrict: "E",
        scope: {
            model: "=",
            property: "@",
            step: "@"
        },
        replace: true,
        template: "<div class=\"slider-control\">\n<div class=\"slider\">\n</div>\n</div>",
        link: function(scope, element, attrs) {
            var getP, handles, i, mv, pTotal, setP, step, updatePositions, _fn, _i, _len, _ref;
            element = element.children();
            element.css('position', 'relative');
            handles = [];
            pTotal = 0;
            step = function() {
                if ((scope.step != null)) {
                    return parseFloat(scope.step);
                } else {
                    return 0;
                }
            };
            getP = function(i) {
                if (scope.property != null) {
                    return scope.model[i][scope.property];
                } else {
                    return scope.model[i];
                }
            };
            setP = function(i, p) {
                var s;
                s = step();
                if (s > 0) {
                    p = Math.round(p / s) * s;
                }
                if (scope.property != null) {
                    return scope.model[i][scope.property] = p;
                } else {
                    return scope.model[i] = p;
                }
            };
            updatePositions = function() {
                var handle, i, p, pRunningTotal, x, _i, _len, _results;
                pTotal = scope.model.reduce(function(sum, item, i) {
                    return sum + getP(i);
                }, 0);
                pRunningTotal = 0;
                _results = [];
                for (i = _i = 0, _len = handles.length; _i < _len; i = ++_i) {
                    handle = handles[i];
                    p = getP(i);
                    pRunningTotal += p;
                    x = pRunningTotal / pTotal * 100;

                        _results.push(handle.css({
                            left: x + "%",
                            top: "-" + handle.prop("clientHeight") / 2 + "px"
                        }));
                }
                return _results;
            };
            _ref = scope.model;
            _fn = function(mv, i) {
                var handle, startPleft, startPright, startX;
                if (i === scope.model.length - 1) {
                    return;
                }
                handle = angular.element('<div class="slider-handle"></div>');
                handle.css("position", "absolute");
                handles.push(handle);
                element.append(handle);
                startX = 0;
                startPleft = startPright = 0;
                return handle.on("mousedown", function(event) {
                    var mousemove, mouseup;
                    mousemove = (function(_this) {
                        return function(event) {
                            return scope.$apply(function() {
                                var dp;
                                dp = (event.screenX - startX) / element.prop("clientWidth") * pTotal;
                                if (dp < -startPleft || dp > startPright) {
                                    return;
                                }
                                setP(i, startPleft + dp);
                                setP(i + 1, startPright - dp);
                                return updatePositions();
                            });
                        };
                    })(this);
                    mouseup = function() {
                        $document.unbind("mousemove", mousemove);
                        return $document.unbind("mouseup", mouseup);
                    };
                    event.preventDefault();
                    startX = event.screenX;
                    startPleft = getP(i);
                    startPright = getP(i + 1);
                    $document.on("mousemove", mousemove);
                    return $document.on("mouseup", mouseup);
                });
            };
            for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
                mv = _ref[i];
                _fn(mv, i);
            }
            return scope.$watch("model", updatePositions, true);
        }
    };
});


