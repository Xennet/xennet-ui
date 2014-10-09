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
						listData = data.worker.filterList,
						filterList;

					
					var	height,
						duration = 600;

					$.each(listData, function(index, value) {
						value.index = index;
					});

					filterList = new List('anchor-workerFilterList', listOptions, listData);

					$('.list-element').click(function(e) {
						var	expandClass = 'expand',
							$content = $(this).find('.list-element-content'),
							$expandBtn = $(this).find('span.glyphicon-plus'),
							$collapseBtn = $(this).find('span.glyphicon-minus');

						if ( !$(this).hasClass(expandClass)) {
							var	index = $(this).find('span.index').text();

							if (!$(this).hasClass('loaded')) {
								loadListItemContent(index, this, 'filter');
								$(this).addClass('loaded')
							}

							height = $(this).css('height');
							console.log(height);
							$(this).addClass(expandClass).animate({height: '220px'}, duration);
							$content.delay(duration).css({'display': 'inline-block'});

							// height = $content.css('height');
							// console.log(height);

							$expandBtn.hide();
							$collapseBtn.show();
						}
						else {
							$(this).removeClass(expandClass).animate({height: height}, duration);
							$content.css({'display': 'none'});
							$expandBtn.delay(duration).show();
							$collapseBtn.delay(duration).hide();
						}
					});

					$('.btn-default').click(function(e) {
						e.stopPropagation();
					})
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

		if (sliders[section] )  {
			$.each(sliders[section], function(key, subSection) {
				$.each(subSection, function(index, sliderObj) {
					sliderObj.slider.ionRangeSlider("update");
				})
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
		var	ratesTemplate = "",
			containerTemplate = "",
			template;

		template =
		  '<li class="list-element"> \
			 <div class="row-fluid list-element-header"> \
                                          <div class="col-md-1"> \
					<span class="glyphicon glyphicon-plus"></span> \
					<span class="glyphicon glyphicon-minus" style="display:none"></span> \
				</div> \
				<div class="col-md-1"> \
					<span class="index"></span> \
				</div> \
				<div class="col-md-1"> \
					<span class="name"></span> \
				</div> \
			</div> \
			<div class="row-fluid list-element-content"> \
				<div class="row-fluid content-container"> \
					<div class="col-md-6 list-element-content-rates"> \
						<div class="row"><h4>RATES</h4></div> \
					</div> \
					<div class="col-md-6 list-element-content-container"> \
						<div class="row"><h4>CONTAINER</h4></div> \
					</div> \
				</div> \
				<div class="row-fluid buttons-container"> \
					<div class="col-md-10"></div> \
					<div class="col-md-1"> \
						<button type="button" class="btn btn-default">Default</button> \
					</div> \
					<div class="col-md-1"> \
						<button type="button" class="btn btn-default">Default</button> \
					</div> \
				</div> \
			</div> \
		</li>';

		return template;
	}

	// load the list item contents (rates, container) after expanding the list item for the first time
	var loadListItemContent  = function(index, el, type) {
		var	itemData,
			$rates,
			$container,
			template,
			i;


		if(type === 'filter') {
			if (index < 0 || index >= data.worker.filterList.length) return;

			itemData = data.worker.filterList[index];

			$rates = $(el).find('.list-element-content-rates');
			$container = $(el).find('.list-element-content-container');

			// Rates templates
			$.each(itemData.rates, function(index, value) {
				template = 
					'<div class="row"> \
						<div class="col-md-2">' + value.name + '</div> \
						<div class="col-md-10">' + value.min + ' - ' + value.max + '</div> \
					</div>';
				$rates.append(template);
			})

			// Container templates
			$.each(itemData.container, function(index, value) {
				template = 
					'<div class="row"> \
					<div class="col-md-2">' + value.name + '</div>' ;

				if (value.type === 'range') {
					template += '<div class="col-md-10">' + value.min + ' - ' + value.max + '</div>';
				}
				else if (value.type === 'list') {
					template += '<div class="col-md-10">';

					for (i=0; i<value.values.length; ++i) {
						if (i > 0) { template += ', '; }
						template += value.values[i];
					}

					template += '</div>' ;
				}

				template += '</div>'

				$container.append(template);
			})
		}
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
