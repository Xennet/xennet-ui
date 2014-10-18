angular.module('zennetApp')
    .controller('WorkerCtrl',['$scope','$rootScope','$location','workerFactory', function ($scope, $rootScope, $location, workerFactory) {
        if($rootScope.filtersList != undefined){
            console.log($rootScope.filtersList.length);
        }

        $scope.template = "views/filters.html";
        $scope.setTemplate = function(url){
            $scope.template = url;
        }

        $scope.groups = [
            {
                title: 'Dynamic Group Header - 1',
                content: 'Dynamic Group Body - 1'
            },
            {
                title: 'Dynamic Group Header - 2',
                content: 'Dynamic Group Body - 2'
            }
        ];

        $scope.items = ['Item 1', 'Item 2', 'Item 3'];

        $scope.addItem = function() {
            var newItemNo = $scope.items.length + 1;
            $scope.items.push('Item ' + newItemNo);
        };
/************************************************************************************************************************/
$scope.descName = false;
$scope.descDate = false;
$scope.priceSlider = {
    min: 0,
    max: 3,
    ceil: 4,
    floor: 0,
    step: 1
};

        $scope.osArr = /*[{name:"win7", value:false},
         {name:"win8", value:false},
         {name:"ubuntu", value:false},
         {name:"ios7", value:false}]*/{win7: false, win8: false, ubuntu: false, ios7: false}
        $scope.classArra = {commercial:false, academic : false, government: false}
        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };


        $scope.rates = "fixed";
        $scope.plan = "Plan A";
        $scope.category = "Elevated";
        $scope.difficulty = 1;
//        $scope.nameFilter = "";
        if(!$rootScope.filtersList){
            $rootScope.filtersList = [
                {
                    id:1,
                    name: 'Filter 1',
                    createdDate : new Date(),
                    pricingPlan : "Plan A",
                    difficulty  : "10",
                    category : "Elevated",
                    enabled: true,
                    fixedRate: {
                        min : 1,
                        max : 4
                    },
                    benchMark: {
                        ot : {
                            min : 1,
                            max : 4
                        },
                        randering:{
                            min : 1,
                            max : 4
                        },
                        others:{
                            min : 1,
                            max : 4
                        }
                    },
                    ram:{
                        min : 1,
                        max : 4
                    },
                    diskSpace:{
                        min : 1,
                        max : 28
                    },
                    bandwidth:{
                        min : 1,
                        max : 10
                    },
                    cores:{
                        min : 1,
                        max : 4
                    },
                    os:[],
                    idDiff:{
                        min : 1,
                        max : 4
                    },
                    class:[],
                    address:"add1:487b:52fa"
                },
                {
                    id:2,
                    name: 'Filter 2',
                    createdDate : new Date(),
                    pricingPlan : "Plan b",
                    difficulty  : "100",
                    category : "Elevated",
                    enabled: false,
                    fixedRate: {
                        min : 1,
                        max : 4
                    },
                    benchMark: {
                        ot : {
                            min : 1,
                            max : 4
                        },
                        randering:{
                            min : 1,
                            max : 4
                        },
                        others:{
                            min : 1,
                            max : 4
                        }
                    },
                    ram:{
                        min : 1,
                        max : 4
                    },
                    diskSpace:{
                        min : 1,
                        max : 28
                    },
                    bandwidth:{
                        min : 1,
                        max : 10
                    },
                    cores:{
                        min : 1,
                        max : 4
                    },
                    os:[],
                    idDiff:{
                        min : 1,
                        max : 4
                    },
                    class:[],
                    address:"add2:497b:52fb"
                },
                {
                    id:3,
                    name: 'Filter 3',
                    createdDate : new Date(),
                    pricingPlan : "Plan b",
                    difficulty  : "100",
                    category : "Elevated",
                    enabled: true,
                    fixedRate: {
                        min : 1,
                        max : 4
                    },
                    benchMark: {
                        ot : {
                            min : 1,
                            max : 4
                        },
                        randering:{
                            min : 1,
                            max : 4
                        },
                        others:{
                            min : 1,
                            max : 4
                        }
                    },
                    ram:{
                        min : 1,
                        max : 4
                    },
                    diskSpace:{
                        min : 1,
                        max : 28
                    },
                    bandwidth:{
                        min : 1,
                        max : 10
                    },
                    cores:{
                        min : 1,
                        max : 4
                    },
                    os:['ubuntu','windows'],
                    idDiff:{
                        min : 1,
                        max : 4
                    },
                    class:[],
                    address:"add3:477b:52fa"
                }
            ];
        }


        $scope.ratesFixed = {
            min: 1,
            max: 4,
            ceil: 4,
            floor: 1,
            step: 1
        };

        $scope.Ot = [
            {
                p: 0
            }, {
                p: 3
            }, {
                p: 0
            }
        ];
        $scope.Render = [
            {
                p: 0
            }, {
                p: 3
            }, {
                p: 0
            }
        ];

        $scope.So = [ //Some Other
            {
                p: 0
            }, {
                p: 3
            }, {
                p: 0
            }
        ];

        $scope.ram = {
            min: 1,
            max: 4,
            ceil: 4,
            floor: 1,
            step: 1
        };

        $scope.Ds = {  // Disk Space
            min: 1,
            max: 28,
            ceil: 28,
            floor: 1,
            step: 1
        };

        $scope.Bw = {  // Bandwidth
            min: 1,
            max: 10,
            ceil: 10,
            floor: 1,
            step: 1
        };

        $scope.cores = {  // cores
            min: 1,
            max: 4,
            ceil: 4,
            floor: 1,
            step: 1
        };

        $scope.Id = [ //identity difficulty

            {
                p: 0
            }, {
                p: 3
            }, {
                p: 0
            }
        ];
        $scope.fil = {
            id: undefined,
            nameFilter : "",
            pricingPlan:"Plan A",
            difficulty  : 1,
            category : "Elevated",
            address : ""

        }

        $scope.save = function(){
            console.log("save success");

//            $scope.osArra = [];
//            if($scope.win7 == true){
//                $scope.osArra.push($scope.filter)
//            }
//
//            $scope.osArra = [];
//            angular.forEach($scope.osArr, function(value, key) {
//                if(value){
//                    $scope.osArra.push(key)
//                }
//
//                console.log(key);
//            });

//            $scope.arraClass = [];
//            angular.forEach($scope.classArra, function(value, key) {
//                if(value){
//                    $scope.arraClass.push(key)
//                }
//
//                console.log(key);
//            });

//             console.log($scope.plan,$scope.difficulty,$scope.category);

            $scope.filter =
            {
                id:$rootScope.filtersList[$rootScope.filtersList.length-1].id + 1,
                name: $scope.fil.nameFilter,
                createdDate : new Date(),
                pricingPlan : $scope.fil.pricingPlan,
                difficulty  : $scope.fil.difficulty,
                category : $scope.fil.category,
                enabled: true,
                fixedRate: {
                    min : $scope.ratesFixed.min,
                    max : $scope.ratesFixed.max
                },
                ram:{
                    min : $scope.ram.min,
                    max : $scope.ram.max
                },
                diskSpace:{
                    min : $scope.Ds.min,
                    max : $scope.Ds.max
                },
                bandwidth:{
                    min : $scope.Bw.min,
                    max : $scope.Bw.max
                },
                cores:{
                    min : $scope.cores.min,
                    max : $scope.cores.max
                },

                address:$scope.fil.address
            };

            console.log($scope.fil.id);

            if($scope.fil.id != undefined){
                if(validateInputs()){
                    $scope.fid = $rootScope.filtersList[$scope.fil.id].id;
                    $rootScope.filtersList[$scope.fil.id] = $scope.filter;
                    $rootScope.filtersList[$scope.fil.id].id = $scope.fid;
                }else{
                    return;
                }
            }else{
                if(validateInputs()){
                    $rootScope.filtersList.push($scope.filter)
                }else{
                    return;
                }
            }
            console.log($rootScope.filtersList);
            clearAll();

            console.log($rootScope.filtersList);
            $scope.template = "views/filtersList.html";

        }

        function validateInputs(){
            if($scope.fil.nameFilter == ""){
                alert("Filter Name Required")
                return false;
            }
            return true;
        }

        function clearAll(){
            $scope.ratesFixed = {
                min: 1,
                max: 4,
                ceil: 4,
                floor: 1,
                step: 1
            };



            $scope.ram = {
                min: 1,
                max: 4,
                ceil: 4,
                floor: 1,
                step: 1
            };

            $scope.Ds = {  // Disk Space
                min: 1,
                max: 28,
                ceil: 28,
                floor: 1,
                step: 1
            };

            $scope.Bw = {  // Bandwidth
                min: 1,
                max: 10,
                ceil: 10,
                floor: 1,
                step: 1
            };

            $scope.cores = {  // cores
                min: 1,
                max: 4,
                ceil: 4,
                floor: 1,
                step: 1
            };


            $scope.fil = {
                id: undefined,
                nameFilter : "",
                pricingPlan:"Plan A",
                difficulty  : "",
                category : "Elevated",
                address : ""

            }
        }

        $scope.restore = function(){
            console.log($scope.win7);
            clearAll();
        }
/**************************************************filter List function*************************************************/
        $scope.onEnable = function(listID){
            console.log(listID)
            if($rootScope.filtersList[listID].enabled == false){
                $rootScope.filtersList[listID].enabled = true;
            }
        }
        $scope.onDisable = function(listID){
            console.log(listID)
            if($rootScope.filtersList[listID].enabled == true){
                $rootScope.filtersList[listID].enabled = false;
            }
        }

        $scope.editFilter = function(filterID){
                console.log($rootScope.filtersList[filterID]);
                $scope.fil.id = filterID;
                $scope.fil.nameFilter = $rootScope.filtersList[filterID].name;
                $scope.rates = "benchmark"
                $scope.fil.pricingPlan = $rootScope.filtersList[filterID].pricingPlan;
                $scope.fil.difficulty = $rootScope.filtersList[filterID].difficulty;
                $scope.fil.category = $rootScope.filtersList[filterID].category;
                $scope.fil.address = $rootScope.filtersList[filterID].address;

                $scope.template = "views/filters.html";
        }

        $scope.listFilter = $rootScope.filtersList;
        $scope.searchFilter = function(searchQuery){

            if(searchQuery.length >=1){
                $rootScope.filtersList = $scope.listFilter;
                console.log(searchQuery);

                $scope.searchList = $rootScope.filtersList.filter(function(ele){
                   return ele.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;
                });
                console.log($scope.searchList);
                $rootScope.filtersList = $scope.searchList;
            }else if(searchQuery.length == 0){
                $rootScope.filtersList = $scope.listFilter;
            }


        }

        $scope.sortByName = function(){
            if($scope.descName == true){
                $rootScope.filtersList = $rootScope.filtersList.sort(function(obj1,obj2){
                    return obj1.name > obj2.name;
                });
                $scope.descName = false
            }else{
                $rootScope.filtersList = $rootScope.filtersList.sort(function(obj1,obj2){
                    return obj1.name < obj2.name;
                });
                $scope.descName = true
            }

        }

        $scope.sortByDate = function(){
            if($scope.descDate == true){
                $rootScope.filtersList = $rootScope.filtersList.sort(function(obj1,obj2){
                    return obj2.createdDate - obj1.createdDate;
                });
                $scope.descDate = false
            }else{
                $rootScope.filtersList = $rootScope.filtersList.sort(function(obj1,obj2){
                    return obj1.createdDate - obj2.createdDate;
                });
                $scope.descDate = true
            }
        }

        $scope.onEnable = function(listID,e){
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            console.log(listID)
            if($rootScope.filtersList[listID].enabled == false){
                $rootScope.filtersList[listID].enabled = true;
            }
        }
        $scope.onDisable = function(listID,e){
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            console.log(listID)
            if($rootScope.filtersList[listID].enabled == true){
                $rootScope.filtersList[listID].enabled = false;
            }
        }
        console.log($rootScope.filtersList.length);


//        $(document).ready(function(){
//           getDocHeight()
//
//        });
//
//        function getDocHeight() {
//            var D = document;
//            var ht = Math.max(
//                D.body.scrollHeight, D.documentElement.scrollHeight,
//                D.body.offsetHeight, D.documentElement.offsetHeight,
//                D.body.clientHeight, D.documentElement.clientHeight
//            );
//            $("#leftCol").css('height', ht - 62);
//        }



        $scope.leftMenuHeight = 0;
        $scope.leftMenuHeight = window.innerHeight - 200;
        $scope.leftHeight = 0;
        $scope.leftHeight = window.innerHeight -64;

        /******************************************** Benchmark *******************************************************/
        if(!$rootScope.benchmarkResult){
            $rootScope.benchmarkResult = [];
        }
        $scope.benchmarkRun = function(){
            console.log("Run Banchmark")
            workerFactory.runBenchmark().
                success(function(response) {
                    angular.forEach(response,function(value,key){
                        $scope.benchmarkResult.push(value)
                    });
                    if(! $scope.$$phase){
                        $scope.$apply();
                    }
                    console.log($scope.benchmarkResult);
//                    if(response){
//                        console.log("success");
//                    }else{
//                        console.log(response.desc)
//                    }
                });
        }

       console.log($rootScope.benchmarkResult);
    }]);




