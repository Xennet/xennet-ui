$( document ).ready(function() {
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

			
		$current.parent().removeClass('active');
		$('#' + currentName).hide();

		$(this).parent().addClass('active');
		$('#' + newName).show();		
	});

	$(".section-menu-link").click(function() {
		var	$current = $(".active .section-menu-link"),
			currentName = $current.attr('name'),
			newName = $(this).attr('name');

		$current.parent().removeClass('active');
		$('#' + currentName + '-content').hide();

		$(this).parent().addClass('active');
		$('#' + newName + '-content').show();	
	});
});