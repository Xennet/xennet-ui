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
					template = createNewUIControlTemplate(options);

					$('#anchor-workerFilterRateFixed').append(template);

					sliders.worker.newFilterRatesFixed.push( 
						{
							slider: $('#' + options.id) ,
							options: fixedRateData
						}
					);
			}	

			if(data.worker.newFilterRatesByBenchmark) {
				
				if (!sliders.worker.newFilterRatesByBenchmark) { 

					sliders.worker.newFilterRatesByBenchmark = [];
				}

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
						template = createNewUIControlTemplate(options);
					

					$('#anchor-workerFilterRateByBenchmark').append(template);

					sliders.worker.newFilterRatesByBenchmark.push( 
						{
							slider: $('#' + options.id) ,
							options: value
						}
					);
				});
			}

			if (data.worker.filterList) {
				
					var	options,
						listOptions = {
							valueNames: [ 'name', 'index' ],
							item: createListItemTemplate(options)
						},
						filterList;

					

					filterList = new List('anchor-workerFilterList', listOptions, data.worker.filterList);

					// filterList.add({
					//   name: "Gustaf Lindqvist",
					//   born: 1983
					// });								
			}
		}

	}

	var render = function() {		

		$.each(sliders, function(sectionKey, section) {
			$.each(section, function(subSectionKey, subSection) {
				$.each(subSection, function(index, value) {

					value.options.onFinish = function(obj) {
						console.log(sectionKey, subSectionKey, obj);
					}

				 	value.slider.ionRangeSlider(value.options);

				 	
				})
			});
		})		
	}

	var update = function(section, subSection) {		

		if (sliders[section] && sliders[section][subSection])  {
			$.each(sliders[section][subSection], function(index, value) {

				value.slider.ionRangeSlider("update");

				console.log('update', value.slider.ionRangeSlider("update"))
			})
		}
	}

	var createNewUIControlTemplate = function(options) {
		var 	divClass = options.index===0 ? "ui-control-first" : "ui-control",
			template = "<div class=\"" + divClass + "\">";

		// add label
		if (options.label) {
			template += "<div class='col-md-" + (12 - options.colWidth) + " '>";
			template += "<label>" + options.label + "</label>" + "</div>\n";
		}

		// add input element
		template += "<div class='col-md-" + options.colWidth + " '>";
		template += "<input type='text' class=\"" + options.class + "\" id=\"" + options.id + "\"name=\"" + options.name + "\"value=\"\">" + "</div";

		template += "</div>";
		return template;
	}

	var createListItemTemplate = function(options) {
		return  '<li><h3 class="name"></h3><p class="index"></p></li>';
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
			
			'min': 100,
			'max': 300,
			'from': 150,
			'to': 180,
			'prefix': '$',
			type: 'double'
		},

		newFilterRatesByBenchmark: [
		{	
			'name': '0T',
			min: 0,
			max: 100,
			from: 20,
			to: 70,			
			'prefix': '$',
			type: 'double'
		},
		{
			'name': 'rendering',
			'min': 100,
			'max': 1000,
			'from': 40,
			'to': 80,
			'prefix': '$',
			type: 'double'
		}],

		filterList: [
		{
			index: 1,
			name: 'aaa',
			rates: [
				{
					name: '0T',
					min: '1$',
					max: '4$'
				},
				{
					name: 'rendering',
					min: '10$',
					max: '20$'
				}
			],
			container: [
				{
					name: 'RAM',
					type: 'range',
					min: '256M',
					max: '4G'
				},
				{
					name: 'OS',
					type: 'list',
					values: ['ubuntu', 'windows 7']
				}
			]
		},
		{
			index: 2,
			name: 'bbb',
			rates: [
				{
					name: '0T',
					min: '5$',
					max: '8$'
				},
				{
					name: 'rendering',
					min: '17$',
					max: '240$'
				}
			],
			container: [
				{
					name: 'RAM',
					type: 'range',
					min: '256M',
					max: '4G'
				},
				{
					name: 'OS',
					type: 'list',
					values: ['ubuntu', 'windows 7']
				}
			]
		},
		]
	}
}
