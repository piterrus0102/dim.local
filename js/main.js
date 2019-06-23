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

$('.smart-basket__min').on('click', function (e) {
    e.preventDefault();
    $('.wrap__form').addClass('wrap__form--active');
    var min_count = $('.smart-basket__min-count').text();
    $('.smart-basket__quantity-common').text('Всего товаров: ' + min_count);

    var productCost = $('smart-basket__product-item').children('.buy').attr('data-sb-product-price');
    var productItems = $('smart-basket__product-item').children('.buy').attr('data-sb-product-quantity');

    var quantity__cost = 0;
    $('.smart-basket__product-item .smart-basket__product-price-common .smart-basket__input').each(function () {
        quantity__cost += parseFloat(this.value);
    });

    $('.smart-basket__price-common').text('Общая стоимость: ' + quantity__cost + '.00 ₽');
    console.log(quantity__cost);
});


$('.product__size-element:first-child').addClass('product__size-element_active');
//удалить класс с ближайшего элемента
$('.product__size-element').on('click', function (e) {
    e.preventDefault();
    $(this).closest('.card').find('.product__size-element_active').removeClass('product__size-element_active');
    $(this).addClass('product__size-element_active');
    var cost__value = $(this).attr('data-sb-curent-price');
    var size__value = $(this).attr('data-sb-curent-size');
    $(this).closest('.card').find('.product__price-number').html(cost__value);
    $(this).closest('.card').find('.buy').attr({
        'data-sb-product-price': cost__value,
        'data-sb-product-size': size__value
    });
});


// счетчик корзины
$('.buy').on('click', function () {
    var d = $(this).closest('.card').find('.smart-basket__product-quantity-state').val();
    var basket__count = $('.smart-basket__min-count').html();
    var thisCart = $(this).closest('.card');
    var r = Number(basket__count);
    r = +r + +d;
    $('.smart-basket__min-count').html(r);
    addToCart(thisCart);
//	$(this).off('click');
});

$('.product-quantity').append('<div class="smart-basket__quantity-item"></div>');
$('.smart-basket__quantity-item').append('<div class="smart-basket__quantity-item"><button class="smart-basket__remove-item">-</button><input class="smart-basket__product-quantity-state" pattern="^[0-9]" value="1"><button class="smart-basket__add-item">+</button></div>');

$('.smart-basket__remove-item').on('click', function () {
    var s = $(this).siblings('.smart-basket__product-quantity-state').val();
    s--;
    if (s == 0) {
        s = 1;
    }
    $(this).siblings('.smart-basket__product-quantity-state').val(s);
    $(this).siblings('.smart-basket__product-quantity-state').attr('value', s);
    $(this).closest('.card').children('.buy').attr('data-sb-product-quantity', s);
});

$('.smart-basket__add-item').on('click', function () {
    var s = $(this).siblings('.smart-basket__product-quantity-state').val();
    s++;
    $(this).siblings('.smart-basket__product-quantity-state').val(s);
    $(this).siblings('.smart-basket__product-quantity-state').attr('value', s);
    $(this).closest('.card').children('.buy').attr('data-sb-product-quantity', s);
});

function addToCart(thisCart) {
    var productImg = thisCart.children('img').attr('src');
    var productName = thisCart.children('h4').text();
    var productSize = thisCart.children('.buy').attr('data-sb-product-size');
    var productID = thisCart.children('.buy').attr('data-sb-id-or-vendor-code');
    var productCost = thisCart.children('.buy').attr('data-sb-product-price');
    var productItems = thisCart.children('.buy').attr('data-sb-product-quantity');
    var productQuantity = productCost * productItems;

    $('.smart-basket__product-item:last').after('<div class="smart-basket__product-item"></div>');
    $('.smart-basket__product-item:last').append('<div class="smart-basket__product-name"><img src="' + productImg + '" width="60"><span>' + productName + '<span class="smart-basket__product-size"> Размер: ' + productSize + ' </span></span></div>');
    $('.smart-basket__product-item:last').append('<div class="smart-basket__product-id">' + productID + '<input class="smart-basket__input" type="hidden" value="' + productID + '" name="productID' + productID + '"></div>');
    $('.smart-basket__product-item:last').append('<div class="smart-basket__product-price">' + productCost + '.00<input class="smart-basket__input" type="hidden" name="' + productID + '" value="' + productCost + '"></div>');
    $('.smart-basket__product-item:last').append('<div class="smart-basket__product-quantity"></div>');
    $('.smart-basket__product-quantity:last').append('<button class="smart-basket__remove-item">-</button><input class="smart-basket__product-quantity-state" pattern="^[0-9]" value="' + productItems + '"><button class="smart-basket__add-item">+</button>');
    $('.smart-basket__product-item:last').append('<div class="smart-basket__product-price-common"><input class="smart-basket__input" name="' + productQuantity + '" value="' + productQuantity + '"></div>');
    $('.smart-basket__product-item:last').append('<button class="smart-basket__product-delete" data-sb-product-delete="001"><span class="smart-basket__delete-icon">×</span></button>');
}

$('.smart-basket__form').on('click', '.smart-basket__product-delete', function (e) {
    e.preventDefault();

    var item__val = $(this).closest('.smart-basket__form').find('.smart-basket__product-quantity .smart-basket__product-quantity-state').attr('value');

    var item__cost = $(this).closest('.smart-basket__form').find('.smart-basket__product-price-common .smart-basket__input').attr('value');

    var items__all = $(this).closest('.smart-basket__form').find('.smart-basket__result-common .smart-basket__quantity-common').text();

    var cost__quantity = $(this).closest('.smart-basket__form').find('.smart-basket__result-common .smart-basket__price-common').text();


    items__all = items__all.replace(/[^0-9]/g, '');
    cost__quantity = cost__quantity.replace(/[^0-9.]/g, '');
    cost__quantity = (0 + (+cost__quantity));

    //items__all -= items__all - item__val;
    console.log('Колличество предметов: ' + items__all);
    $(this).closest('.smart-basket__form').find('.smart-basket__result-common .smart-basket__quantity-common').text('Всего товаров: ' + items__all);
    items__all = 0;
    //console.log(typeof cost__quantity);
    //console.log(cost__quantity);
    $(this).parents('.smart-basket__product-item').remove();
})

$('.smart-basket__form').on('click', '.smart-basket__add-item', function (e) {
    e.preventDefault();
    var tmp_cost = 0;
    var txt = $(this).siblings('.smart-basket__product-quantity-state').attr('value');
    var items_cost = $(this).closest('.smart-basket__product-item').find('.smart-basket__product-price .smart-basket__input').attr('value');  //косяк
    $(this).siblings('.smart-basket__product-quantity-state').attr('value', 1 + (+txt));
    var items__val = $(this).siblings('.smart-basket__product-quantity-state').attr('value');
    tmp_cost = items_cost * items__val;
    $(this).closest('.smart-basket__product-quantity').siblings('.smart-basket__product-price-common').children('.smart-basket__input').attr('value', tmp_cost);
    var sum = 0;
    $('.smart-basket__form .smart-basket__product-quantity-state').each(function () {
        sum += parseFloat(this.value);
    });
    $('.smart-basket__quantity-common').text('Всего товаров: ' + sum);
    var all_cost = 0;
    $('.smart-basket__form .smart-basket__product-price-common .smart-basket__input').each(function () {
        all_cost += parseFloat(this.value);
//		console.log(all_cost);
    })
    $('.smart-basket__price-common').text('Общая стоимость: ' + all_cost + '.00 ₽');
});

$('.smart-basket__form').on('click', '.smart-basket__remove-item', function (e) {
    e.preventDefault();
    var tmp_cost = 0;
    var txt = $(this).siblings('.smart-basket__product-quantity-state').attr('value');
    var items_cost = $(this).closest('.smart-basket__product-item').find('.smart-basket__product-price .smart-basket__input').attr('value');  //косяк
    if (txt == 1) {
        txt = 2;
    }
    $(this).siblings('.smart-basket__product-quantity-state').attr('value', txt - 1);
    var items__val = $(this).siblings('.smart-basket__product-quantity-state').attr('value');
    tmp_cost = items_cost * items__val;
    $(this).closest('.smart-basket__product-quantity').siblings('.smart-basket__product-price-common').children('.smart-basket__input').attr('value', tmp_cost);
    var sum = 0;
    $('.smart-basket__form .smart-basket__product-quantity-state').each(function () {
        sum += parseFloat(this.value);
    });
    $('.smart-basket__quantity-common').text('Всего товаров: ' + sum);
    var all_cost = 0;
    $('.smart-basket__form .smart-basket__product-price-common .smart-basket__input').each(function () {
        all_cost += parseFloat(this.value);
//		console.log(all_cost);
    })
    $('.smart-basket__price-common').text('Общая стоимость: ' + all_cost + '.00 ₽');
});