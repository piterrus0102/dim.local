/*$(document).ready(function(){
	
	$("#nav").on("click","a", function (event) {
		event.preventDefault();
		var id  = $(this).attr('href'),
		top = $(id).offset().top;
		$('body,html').animate({scrollTop: top}, 900);


		$('#header').css('transform', 'translateX(-275px)');
		$('.mob__menu').css('opacity', '1');
	});

	$(".smart-basket__min").on("click", function (event) {
		event.preventDefault();
		
	});

	$( ".smart-basket__min" ).click(function() {
	  	$('#header').css('transform', 'translateX(-275px)');
		$('.mob__menu').css('opacity', '1');
	});

	$("#nav-head").on("click","a", function (event) {
		event.preventDefault();
		var id  = $(this).attr('href'),
		top = $(id).offset().top;
		$('body,html').animate({scrollTop: top}, 900);
	});

	$('.slider').owlCarousel({
		loop:true,
		margin:0,
		nav:true,
		items:1,
		smartSpeed: 800,
		//autoplay: true,
		autoplayTimeout: 3500
	})

	$(window).scroll(function(){
		if ($(this).scrollTop() > 300) {
			$('.totop').fadeIn();
		} else {
			$('.totop').fadeOut();
		}
	});

	$('.totop').click(function(){
		$("html, body").animate({ scrollTop: 0 }, 600);
		return false;
	});

	$('.trigger').on('click', function() {
		$('.modal-wrapper').toggleClass('open');
		$('.page-wrapper').toggleClass('blur-it');
		return false;
	});
	
	$('.head').on('click', function (){
		$('.modal-wrapper').removeClass('open');
	})

	$('.mob__menu').on('click', function (){
		$('#header').css('transform', 'translateX(0)');
		$('.mob__menu').css('opacity', '0');
	})

	$('.close__menu').on('click', function (){
		$('#header').css('transform', 'translateX(-275px)');
		$('.mob__menu').css('opacity', '1');
	})

	if ($(window).width()<960) {
    	$(window).scroll(function(){
	        if ($(window).scrollTop() > $("#main").offset().top) {
	            $('.one').addClass('fixed');
	            $('.mob__menu').addClass('fixed');
	        }
	        else {
	            $('.one').removeClass('fixed');
	            $('.mob__menu').removeClass('fixed');
	        };
    	});
	}
	
});

*/

$('.smart-basket__min').on('click', function(e){
	e.preventDefault();
	$('.wrap__form').addClass('wrap__form--active');
});


$('.product__size-element:first-child').addClass('product__size-element_active');
//удалить класс с ближайшего элемента
$('.product__size-element').on('click', function(e){ 
	e.preventDefault();
	$(this).closest('.card').find('.product__size-element_active').removeClass('product__size-element_active');
	$(this).addClass('product__size-element_active');
	var cost__value = $(this).attr('data-sb-curent-price');
	$(this).closest('.card').find('.product__price-number').html(cost__value);
	console.log(cost__value);
});