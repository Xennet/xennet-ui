$( document ).ready(function() {
	var	currentSectionName = $('.active .navbar-link').attr('name'),
		currentSubSectionName = $('.active .' + currentSectionName + '-section-menu-link').attr('name');

	var 	sliders = {};

	$('.app-section').hide();
	$('.app-section-content').hide();

	$('#' + currentSectionName).show();
	$('#' + currentSubSectionName + '-content').show();

	
	// click on the top navbar
	$(".navbar-link").click(function() {		
		var	$current = $(".active .navbar-link"),
			currentName = $current.attr('name'),
			newName = $(this).attr('name'), 

			$currentSub = $(".active ." + currentSectionName + "-section-menu-link"),
			currentSubName = $currentSub.attr('name');

		// hide current section
		$current.parent().removeClass('active');
		$('#' + currentName).hide();

		// show the new section
		$(this).parent().addClass('active');
		$('#' + newName).show();		

		// show the currently active contents of the new section
		$('#' + $('.active .'+ newName + '-section-menu-link').attr('name') + '-content').show();

		currentSectionName = newName;
		currentSubSectionName = currentSubName;

		update(currentSectionName, currentSubSectionName);
	});

	// click on left panel menu
	$(".section-menu-link").click(function() {
		var	$current = $(".active ." + currentSectionName + "-section-menu-link"),
			currentName = $current.attr('name'),
			newName = $(this).attr('name');

		$current.parent().removeClass('active');
		$('#' + currentName + '-content').hide();

		$(this).parent().addClass('active');
		$('#' + newName + '-content').show();	

		currentSubSectionName = newName;

		update(currentSectionName, currentSubSectionName);
	});

	var load = function() {
		if (data.worker ) {
			if (!sliders.worker) { sliders.worker = {} }

			if(data.worker.newFilterRatesFixed) {
				if (!sliders.worker.newFilterRatesFixed) { sliders.worker.newFilterRatesFixed = [] }

				var	fixedRateData = data.worker.newFilterRatesFixed,
					options = {
						index: 0,
						class: 'filter-rate-slider',
						id: 'filter-rate-' + fixedRateData.name,
						name: 'filter-rate-' + fixedRateData.name,
						label: fixedRateData.name,
						type: 'slider',
						colWidth: 8
					},
					template = createTemplate(options);

					console.log(data.worker.newFilterRatesFixed);

					$('#anchor-workerFilterRateFixed').append(template);

					sliders.worker.newFilterRatesFixed.push( 
						{
							slider: $('#' + options.id) ,
							options: fixedRateData
						}
					);
			}	

			if(data.worker.newFilterRatesByBenchmark) {
				
				if (!sliders.worker.newFilterRatesByBenchmark) { sliders.worker.newFilterRatesByBenchmark = [] }

				$.each(data.worker.newFilterRatesByBenchmark, function(index, value) {
					var 	options = {
							index: index,
							class: 'filter-rate-slider',
							id: 'filter-rate-' + value.name,
							name: 'filter-rate-' + value.name,
							label: value.name,
							type: 'slider',
							colWidth: 8
						},
						template = createTemplate(options);
					

					$('#anchor-workerFilterRateByBenchmark').append(template);

					sliders.worker.newFilterRatesByBenchmark.push( 
						{
							slider: $('#' + options.id) ,
							options: value
						}
					);
				});
			}
		}

	}

	var render = function() {		

		if (sliders.worker) {
			//if (sliders.worker.newFilterRatesByBenchmark) {
			$.each(sliders.worker, function(index, subSection) {
				$.each(subSection, function(index, value) {
				 	value.slider.ionRangeSlider(value.options);
				})
			});
		}
		//$("#example_id").ionRangeSlider("update");
		//$('#filter-rate-0T')
	}

	var update = function(section, subSection) {		

		if (sliders[section] && sliders[section][subSection])  {
			$.each(sliders[section][subSection], function(index, value) {
				value.slider.ionRangeSlider("update");
			})
		}
	}

	var createTemplate = function(options) {
		var 	divClass = options.index===0 ? "ui-control-first" : "ui-control",
			template = "<div class=\"" + divClass + "\">";

		// add label
		if (options.label) {
			template += "<div class='col-md-" + (12 - options.colWidth) + " '>";
			template += "<label>" + options.label + "</label>" + "</div>\n";
		}

		// add input element
		template += "<div class='col-md-" + options.colWidth + " '>";
		template += "<input type='text' class=\"" + options.class + "\" id=\"" + options.id + "\"name=\"" + options.name + "\"value=\"\" data-min='30'/>" + "</div";

		template += "</div>";
		return template;
	}

	/******************************************************/
	/******************************************************/
	load();

	render();

	update();
});

var data = {
	worker: {
		newFilterRatesFixed: 
		{	
			'name': 'fixed',
			'from': 0,
			'to': 100,
			'min': 10,
			'max': 30,
			'unit': '$',
			type: 'double'
		},

		newFilterRatesByBenchmark: [
		{
			'name': '0T',
			'min': 0,
			'max': 100,
			'to': 10,
			'from': 30,
			'prefix': '$',
			type: 'double'
		},
		{
			'name': 'rendering',
			'min': 0,
			'max': 100,
			'from': 40,
			'to': 80,
			'prefix': '$',
			type: 'double'
		}],

		filterList: []
	}
}

// angular.module('zennetApp', [])
// 	.controller('zennetController', ['$scope', function($scope) {
// 		$scope.todos = [
// 		      {text:'learn angular', done:true},
// 		      {text:'build an angular app', done:false}];

// 		$scope.workerNewFilterRatesFixed = [
// 			{	
// 				'from': 0,
// 				'to': 100,
// 				'min': 10,
// 				'max': 30,
// 				'unit': '$'
// 			}
// 		];

// 		$scope.workerNewFilterRatesByBenchmark = [
// 			{
// 				'name': '0T',
// 				'min': 0,
// 				'max': 100,
// 				'to': 10,
// 				'from': 30,
// 				'prefix': '$'
// 			},
// 			{
// 				'name': 'Rendering',
// 				'min': 0,
// 				'max': 100,
// 				'from': 40,
// 				'to': 80,
// 				'prefix': '$'
// 			}
// 		];

// 		$.each($scope.workerNewFilterRatesByBenchmark, function(index, value) {
// 			console.log(value, $("#filter-rate-" + value.name).attr('id'));

// 			$("#filter-rate-" + value.name).ionRangeSlider({
// 				min: value.min,
// 				max: value.max,
// 				from: value.from,
// 				to: value.to,
// 				prefix: value.prefix
// 			});
// 		});
// }]);	