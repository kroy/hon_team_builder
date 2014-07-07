/*
	Logic for the Smells Like Fail Heroes of Newerth team builder.

	@author kroy
	TODO: Add Forms for notes/strategies
		Allow for the parsing of comments through url params
		Add items
		Add alternate heroes
		Potentially make hero boxes drag and drop
		Add clear and clear all buttons
	
*/

$(function(){

	$('#hero-board').on('click', 'img.hero-icon', function(e){
		$(this).trigger('mouseleave'); //This is bad
		var $image = $(this).clone(true);
		var heroId = parseInt($image.attr('data-hero-id'));//need to actually rebuild the full hash to prevent tampering
		if (heroId == 207){
			alert('No, Markus');
		}
		else {
			var $targetDiv = $('div.unselected').first();
			var playerNum = parseInt($targetDiv.attr('data-player-num'));
			if ($targetDiv.length > 0){
				if(isNaN(heroId))
					heroId = 0;
				hero_array[playerNum] = heroId;
				//adder = heroId * Math.pow(1000, playerNum);
				//hash = '' + (parseInt(hash) + adder);
				//window.location.hash=hash;
				// $(this).replaceWith('<img id="hero-' + heroId + '" src="img/empty_legion.jpg">');
				$(this).remove();
				$targetDiv.children('div.player-hero-icon').append($image);
				$targetDiv.removeClass('unselected').addClass('selected');
			}
		}
	});

	$('#hero-board, .player-selection').on('mouseenter mouseleave', 'img.hero-icon', function(e){
		var $targetDiv = $('#'+$(this).attr('id') + '-description');
		if(e.type == 'mouseenter'){
			$targetDiv.show();
		}
		else
			$targetDiv.hide();
	});

	$('.player-selection').on('dblclick', 'img', function(e){
		$(this).trigger('mouseleave'); //This is bad
		var $parentDiv = $(this).parents('.player-selection');
		var $image = $(this).clone(true);
		var playerNum = parseInt($parentDiv.attr('data-player-num'));
		hero_array[playerNum] = 0;
		$('.hero-box').filter('.hero-' + $image.attr('data-hero-id')).append($image);
		//$(this).replaceWith('<p class="select-prompt">Select A Hero</p>');
		$(this).remove();
		$parentDiv.removeClass('selected').addClass('unselected');
	});

	$('.clear-selection').on('click', function(e){
		$(this).parent().siblings('.player-hero-icon').children('img').trigger('dblclick');
	});

	$('#show-instructions').on('click', function(e){
		$('div#instructions').toggle();
	});

	$('#clear-all').on('click', function(e){
		$('.selected .player-hero-icon img').trigger('dblclick');
	});

	$('#generate-url').on('click', function(e){
		//var str = $.param({heroIds: hero_array});
		str = buildHash(hero_array)
		$('#url').text(str);
		hash = str;
		window.location.hash=hash;
	});

	var buildHash = function(arry){
		return arry.join('+');
	};

	var parseHash = function(hash){
		heroes = hash.substring(1).split('+');
		$.each(heroes, function(i, hero){
			if(isNaN(parseInt(hero))){
				//do nothing
			}
			else{
				$('#hero-'+hero).trigger('click');
			}
			});
	}

	var hash = window.location.hash;
	var hero_array = [0, 0, 0, 0, 0];
	if(!hash){
		hash='0+0+0+0+0';
		//alert(hash);
	}
	else{
		//alert(hash.substring(1));
		parseHash(hash);
	}
});