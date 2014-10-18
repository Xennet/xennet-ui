angular.module('zennetApp')
    .factory('workerFactory', ['$http','$cookieStore', function($http,$cookieStore) {

        var workerFactory = {};
        workerFactory.runBenchmark = function(){
            return $http({
                method: "get",
                url:"http://webosmotic.com/projects/zennet/test.php",
                params: {
                    cmd : 'ls'
                }
            })
        }
        return workerFactory;
    }]);

