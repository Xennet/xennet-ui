$( document ).ready(function() {
	var currentSectionName;

	$('.app-section').hide();
	$('.app-section-content').hide();

	$('#' + $('.active .navbar-link').attr('name')).show();
	$('#' + $('.active .section-menu-link').attr('name') + '-content').show();

	

	$("#example_id").ionRangeSlider({
	    min: 0,
	    max: 5000,
	    type: 'double',
	    prefix: "",
	    maxPostfix: "+",
	    prettify: false,
	    hasGrid: true,
	    gridMargin: 7
	});

	$(".navbar-link").click(function() {		
		var	$current = $(".active .navbar-link"),
			currentName = $current.attr('name'),
			newName = $(this).attr('name');
	
		// hide current section
		$current.parent().removeClass('active');
		$('#' + currentName).hide();

		// show the new section
		$(this).parent().addClass('active');
		$('#' + newName).show();		

		// show the currently active contents of the new section
		$('#' + $('.active .'+ newName + '-section-menu-link').attr('name') + '-content').show();

		currentSectionName = newName;
	});

	$(".section-menu-link").click(function() {
		var	$current = $(".active ." + currentSectionName + "-section-menu-link"),
			currentName = $current.attr('name'),
			newName = $(this).attr('name');

		console.log(currentSectionName, currentName, newName);

		$current.parent().removeClass('active');
		$('#' + currentName + '-content').hide();

		$(this).parent().addClass('active');
		$('#' + newName + '-content').show();	
	});
});