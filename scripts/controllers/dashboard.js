angular.module('zennetApp')
    .controller('DashboardCtrl', function ($scope, $location, $rootScope, $interval) {
        if($rootScope.timeStarted != undefined){
            $rootScope.dashboardSelected  = new Date();
            console.log("Time Started ======== ",$rootScope.timeStarted.getTime());
            console.log("Dashboard Selected ======== ",$rootScope.dashboardSelected);

            console.log("Deducted Time ======== ",$rootScope.dashboardSelected - $rootScope.timeStarted);
//            $scope.timeStart = $rootScope.dashboardSelected - $rootScope.timeStarted;
            $scope.timeStart = $rootScope.timeStarted.getTime();

        }
        $scope.noOfContainers = 17;
        $scope.bandwidth = 10;
        $scope.cpuUsageChart = {
            options: {
                chart: {
                    height:85,
                    type: 'solidgauge',
                    backgroundColor:'#defafd'
                },

                title: null,

                pane: {
                    center: ['50%', '80%'],
                    size: '150%',
                    startAngle: -90,
                    endAngle: 90,
                    background: {
                        backgroundColor: '#A1A1A1',
                        innerRadius: '40%',
                        outerRadius: '100%',
                        shape: 'arc',
                        borderColor: 'transparent'
                    }
                },
                tooltip:{
                    enabled:false
                },
                plotOptions: {
                    solidgauge: {
                        innerRadius: '40%',
                        dataLabels: {
                            enabled: false,
                            y: -50,
                            borderWidth: 0,
                            useHTML: true
                        }
                    }

                },
                colors: [
                    '#025575'
                ]

            },
            series: [{
                name: 'CPU Usage',
                data: [10]
            }],
            title: {
                text: '',
                y: 0
            },
            yAxis: {
                currentMin: 0,
                currentMax: 100,
                title: {
                    y: 100
                },
                /*stops: [
                 [0.1, '#DF5353'], // red
                 [0.5, '#DDDF0D'], // yellow
                 [0.9, '#55BF3B'] // green
                 ],*/
                lineWidth: 0,
                tickInterval: 100,
                tickPixelInterval: 400,
                tickWidth: 0,

                labels: {
                    enabled: true,
                    y:15
                },
                title: {
                    enabled: false
                }
            },
            loading: false
        }

        $scope.contractDropRate = {

            options: {
                chart: {
                    height:100,
                    type: 'solidgauge',
                    backgroundColor:'#eaeaea'
                },
                pane: {
                    center: ['50%', '80%'],
                    size: '150%',
                    startAngle: -90,
                    endAngle: 90,
                    background: {
                        backgroundColor: '#A1A1A1',
                        innerRadius: '40%',
                        outerRadius: '100%',
                        shape: 'arc',
                        borderColor: 'transparent'
                    }
                },
                tooltip:{
                    enabled:false
                },
                plotOptions: {
                    solidgauge: {
                        innerRadius: '40%',
                        dataLabels: {
                            enabled: false,
                            y: -50,
                            borderWidth: 0,
                            useHTML: true
                        }
                    }
                },
                colors: [
                    '#E74E49'
                ]

            },

            series: [{
                name: 'CPU Usage',
                data: [60]

                /*dataLabels: {
                 format: '<div style="text-align:center"><span style="font-size:25px;color:black">{y}</span><br/>' +
                 '<span style="font-size:12px;color:silver"></span></div>'
                 }*/
            }],
            title: {
                text: '',
                y: 0
            },
            yAxis: {
                currentMin: 0,
                currentMax: 100,
                title: {
                    y: 150
                },
                /*stops: [
                 [0.1, '#DF5353'], // red
                 [0.5, '#DDDF0D'], // yellow
                 [0.9, '#55BF3B'] // green
                 ],*/
                lineWidth: 0,
                tickInterval: 100,
                tickPixelInterval: 100,
                tickWidth: 0,

                labels: {
                    y: 15
                },
                title: {
                    enabled: false
                }
            },
            loading: false
        }

        $scope.ramUsageChart = {
            options: {
                chart: {
                    height:85,
                    type: 'solidgauge',
                    backgroundColor:'#defafd'
                },
                tooltip:{
                    enabled:false
                },
                pane: {
                    center: ['50%', '80%'],
                    size: '150%',
                    startAngle: -90,
                    endAngle: 90,
                    background: {
                        backgroundColor: '#A1A1A1',
                        innerRadius: '40%',
                        outerRadius: '100%',
                        shape: 'arc',
                        borderColor: 'transparent'
                    }
                },
                plotOptions: {
                    solidgauge: {
                        innerRadius: '40%',
                        dataLabels: {
                            enabled:false,
                            y: -50,
                            borderWidth: 0,
                            useHTML: true
                        }
                    }
                },
                colors: [
                    '#025575'
                ]

            },

            series: [{
                name: 'CPU Usage',
                data: [50]
                /*dataLabels: {
                 format: '<div style="text-align:center"><span style="font-size:25px;color:black">{y}</span><br/>' +
                 '<span style="font-size:12px;color:silver">km/h</span></div>'
                 }*/
            }],
            title: {
                text: '',
                y: 0
            },
            yAxis: {
                currentMin: 0,
                currentMax: 100,
                title: {
                    y: 100
                },
                /*stops: [
                 [0.1, '#DF5353'], // red
                 [0.5, '#DDDF0D'], // yellow
                 [0.9, '#55BF3B'] // green
                 ],*/
                lineWidth: 0,
                tickInterval: 100,
                tickPixelInterval: 400,
                tickWidth: 0,

                labels: {
                    enabled: true,
                    y:15
                },
                title: {
                    enabled: false
                }
            },
            loading: false
        }


        $scope.rateLineChart = {
            options:{
                chart: {
                    backgroundColor: '#eaeaea',
                    height:170
                },
                colors:['#025575','#69E8EF']

            },

            title: {
                text: '',
                x: -20 //center
            },
            tooltip: {
                valueSuffix: '°C'
            },
            legend: {
                enabled: false,
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{

                name: 'rate',
                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
                showInLegend:false
            }, {
                name: 'total',
                data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5],
                showInLegend:false
            }],
            xAxis:{
                lineWidth: 1,
                minorGridLineWidth: 1,
//                lineColor: 'transparent',
                labels: {
                    enabled: false
                },
                minorTickLength: 0,
                tickLength: 0
            },
            yAxis:{
                lineWidth: 0,
                minorGridLineWidth: 1,
                lineColor: 'transparent',
                labels: {
                    enabled: false
                },
                minorTickLength: 0,
                tickLength: 0
            }
        }



        var TREND_LIST = [{
            drilldown: "Trend1",
            name: "Trend1",
            visible: true,
            y: 12
        }, {
            drilldown: "Trend2",
            name: "Trend2",
            visible: true,
            y: 13
        }, {
            drilldown: "Trend3",
            name: "Trend3",
            visible: true,
            y: 25
        }, {
            drilldown: "Trend4",
            name: "Trend4",
            visible: true,
            y: 50
        }]

        var NUMBER_OF_OFFERS_BY_TREND = [{
            id: "Trend1",
            name: "Trend1",
            data: [
                ["Offer1", 50],
                ["Offer2", 30],
                ["Offer3", 20]
            ]
        }, {
            id: "Trend2",
            name: "Trend2",
            data: [
                ["Offer3", 20],
                ["Offer4", 10],
                ["Offer5", 40],
                ["Offer6", 30]
            ]
        }, {
            id: "Trend3",
            name: "Trend3",
            data: [
                ["Offer7", 70],
                ["Offer8", 30]
            ]
        }, {
            id: "Trend4",
            name: "Trend4",
            data: [
                ["Offer9", 15],
                ["Offer10", 35],
                ["Offer11", 20],
                ["Offer12", 30]
            ]
        }]


        $scope.containerClassesChart = {
            options: {
                chart: {
                    type: 'pie',
                    backgroundColor:"#eaeaea",
                    height:150
                },

                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: false,
                            distance: -50,
                            style: {
                                fontWeight: 'bold',
                                color: 'white',
                                textShadow: '0px 1px 2px black'
                            }
                        },
//                        showInLegend: true,
                        center: ['50%', '40%']
                    }
                },
                colors:['#A1A1A1','#69E8EF','#025575'],
                tooltip:{
                    enabled:false
                }

            },
            series: [{
                type: 'pie',
                name: 'Container Classes',
                innerSize: '60%',
                data: [
                    ['normal', 15],
                    ['elevated',5],
                    ['dodgy', 80]

                ]
            }],

            title: {
                text: '',
                y: 0
            }


        }

        $scope.diskUsageChart = {
            options: {
                chart: {
                    height:85,
                    type: 'solidgauge',
                    backgroundColor:'#defafd'

                },

                title: null,

                pane: {
                    center: ['50%', '85%'],
                    size: '150%',
                    startAngle: -90,
                    endAngle: 90,
                    background: {
                        backgroundColor: '#A1A1A1',
                        innerRadius: '40%',
                        outerRadius: '100%',
                        shape: 'arc',
                        borderColor: 'transparent'
                    }
                },
                tooltip:{
                    enabled:false
                },
                plotOptions: {
                    solidgauge: {
                        innerRadius: '40%',
                        dataLabels: {
                            enabled: false,
                            y: -50,
                            borderWidth: 0,
                            useHTML: true
                        }
                    }

                },
                colors: [
                    '#025575'
                ]

            },
            series: [{
                name: 'CPU Usage',
                data: [10]
            }],
            title: {
                text: '',
                y: 0
            },
            yAxis: {
                currentMin: 0,
                currentMax: 100,
                title: {
                    y: 100
                },
                lineWidth: 0,
                tickInterval: 100,
                tickPixelInterval: 400,
                tickWidth: 0,

                labels: {
                    enabled: true,
                    y:15
                },
                title: {
                    enabled: false
                }
            },
            loading: false
        }

        if($rootScope.timeStarted != undefined){
            $scope.timeStart = $rootScope.timeStarted.getTime();
            $rootScope.$broadcast('timer-start');
            $interval(setRandomData, 10000)
        }else{
            $rootScope.$broadcast('timer-stop');
            $scope.noOfContainers = 0;
            $scope.bandwidth = 0;

            $scope.containerClassesChart.series= [{
                type: 'pie',
                name: 'Container Classes',
                innerSize: '70%',
                data: [
                    ['normal', 100],
                    ['elevated',0],
                    ['dodgy', 0]

                ]
            }];

            $scope.cpuUsageChart.series = [{
                data: [0]
            }];

            $scope.ramUsageChart.series=[{
                data: [0]
            }];

            $scope.contractDropRate.series=[{
                data: [0]
            }];

            $scope.diskUsageChart.series = [{
                data: [0]
            }]
        }


        $scope.containerClasses = {
            normal: $scope.containerClassesChart.series[0].data[0][1],
            elevated:$scope.containerClassesChart.series[0].data[1][1],
            dodgy:$scope.containerClassesChart.series[0].data[2][1]
        }
        $scope.setRandomSystemData = function(){
            if($rootScope.timeStarted != undefined){
                $scope.noOfContainers = parseInt(Math.random() * 100);
                $scope.containerClassesChart.series= [{
                    type: 'pie',
                    name: 'Container Classes',
                    innerSize: '70%',
                    data: [
                        ['normal', parseInt(Math.random() * 100 +12)],
                        ['elevated',parseInt(Math.random() * 100 +5)],
                        ['dodgy', parseInt(Math.random() * 100 )]

                    ]
                }];
                $scope.containerClasses = {
                    normal: 5,
                    elevated:15,
                    dodgy:20
                }
                var sum = $scope.containerClassesChart.series[0].data[0][1] + $scope.containerClassesChart.series[0].data[1][1] + $scope.containerClassesChart.series[0].data[2][1]


                $scope.containerClasses.normal = Math.round($scope.containerClassesChart.series[0].data[0][1] * 100 / sum);
                $scope.containerClasses.elevated = Math.round($scope.containerClassesChart.series[0].data[1][1] * 100 / sum);
                $scope.containerClasses.dodgy = Math.round($scope.containerClassesChart.series[0].data[2][1] * 100 / sum);
            }

        }

        $scope.setRandomVmData = function(text){

            if($rootScope.timeStarted != undefined){
                $scope.cpuUsageChart.series = [{
                    data: [parseInt(Math.random() * 100)]
                }];

                $scope.ramUsageChart.series=[{
                    data: [parseInt(Math.random() * 100)+2]
                }];
                $scope.diskUsageChart.series = [{
                    data: [parseInt(Math.random() * 100)+5]
                }]
                $scope.bandwidth = parseInt(Math.random() * 100 +1);
            }

        }
        /*$scope.reflow = function () {
         $scope.$broadcast('highchartsng.reflow');
         };*/

        console.log($rootScope.timerRunning);


        $scope.$on('timer-stopped', function (event, data){
            console.log('Timer Stopped - data = ', data);
        });

        function setRandomData(){
            $scope.contractDropRate.series=[{
                data: [parseInt(Math.random() * 100)]
            }];
            var x = []
            var y = []
            for(var i=0;i<10;i++){
                x.push(parseInt(Math.random() * 100 +1));
                y.push(parseInt(Math.random() * 100 +10));
            }
            $scope.setRandomSystemData()
            $scope.setRandomVmData();
            $scope.rateLineChart.series = [{
                name: 'rate',
                data: x,
                showInLegend:false
            }, {
                name: 'total',
                data: y,
                showInLegend:false
            }];
        }

        $scope.selectedTime = 'all';
        $scope.getSelectedTime =function(time){
            $scope.selectedTime = time;
            setRandomData();
        }

        $scope.textCurrent = "current";
        $scope.getCurrentTime =function(text){
            $scope.textCurrent = text;
        }

        $scope.textSystemData = "current";
        $scope.getSystemData =function(text){
            $scope.textSystemData = text;
        }

    });
