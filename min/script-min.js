$(function(){$(window).scroll(function(){$(window).scrollTop()>=20?$(".navBar").addClass("scroll"):$(".navBar").removeClass("scroll")}),$(".nav__link").click(function(){$(".nav__link").removeClass("active"),$(this).addClass("active")}),$(".navBar__btn").click(function(){$(".navBar__nav").addClass("slide")}),$(".navBar__close").click(function(){$(".navBar__nav").removeClass("slide")}),$(".nav__link").click(function(){$(".navBar__nav").removeClass("slide")}),$(".btn.blue.fill").click(function(){$(".navBar__nav").removeClass("slide")}),$(".small-nav1__item").click(function(){$(".small-nav1__item").removeClass("active"),$(this).addClass("active"),$(".speakers-content").removeClass("show"),"speakers-mainLink"===this.id?$("#speakers-main").addClass("show"):"speakers-areaLink"===this.id&&$("#speakers-area").addClass("show")}),$(".small-nav2__item").click(function(){$(".small-nav2__item").removeClass("active"),$(this).addClass("active"),$(".agenda-content1").removeClass("show"),"day1-mainLink"===this.id?$("#day1-main").addClass("show"):"day1-areaLink"===this.id&&$("#day1-area").addClass("show")}),$(".small-nav3__item").click(function(){$(".small-nav3__item").removeClass("active"),$(this).addClass("active"),$(".agenda-content2").removeClass("show"),"day2-mainLink"===this.id?$("#day2-main").addClass("show"):"day2-areaLink"===this.id&&$("#day2-area").addClass("show")}),$(".speaker__more-btn").click(function(){$("#sm"+$(this).attr("target")).toggle("show")}),$("#who__list-btn").click(function(){$(".who__listExpanded").toggle("show")}),$(".pn-item").click(function(){$(".pn-item").removeClass("active"),$(this).addClass("active"),$(".slideshow").removeClass("show"),console.log(this.id),"pn-item2017"===this.id?$("#slideshow2017").addClass("show"):"pn-item2016"===this.id?$("#slideshow2016").addClass("show"):"pn-item2015"===this.id?$("#slideshow2015").addClass("show"):"pn-item2014"===this.id?$("#slideshow2014").addClass("show"):"pn-item2013"===this.id?$("#slideshow2013").addClass("show"):"pn-item2012"===this.id?$("#slideshow2012").addClass("show"):"pn-item-all"===this.id&&$("#slideshowAll").addClass("show")}),$(".agenda-nav__btn").click(function(){$(".agenda").removeClass("show"),"an-left"===$(this).attr("target")?$("#day1").addClass("show"):$("#day2").addClass("show")}),$("#codeOfConduct__link").click(function(){$("#codeOfconduct").addClass("show")}),$("#codeOfconduct__close").click(function(){$("#codeOfconduct").removeClass("show")}),$("#attendees__link").click(function(){$("#attendees").addClass("show")}),$("#attendees__close").click(function(){$("#attendees").removeClass("show")}),$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(s){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var a=$(this.hash);a=a.length?a:$("[name="+this.hash.slice(1)+"]"),a.length&&(s.preventDefault(),$("html, body").animate({scrollTop:a.offset().top},1e3,function(){var s=$(a);if(s.focus(),s.is(":focus"))return!1;s.attr("tabindex","-1"),s.focus()}))}})});