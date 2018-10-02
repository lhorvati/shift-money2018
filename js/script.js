$(function() {

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
    
        if (scroll >= 20) {
            $(".navBar").addClass("scroll");
        } else {
            $(".navBar").removeClass("scroll");
        }
    });

    /* TOP NAVIGATION */
    $(".nav__link").click(function() {
        $(".nav__link").removeClass("active");
        $(this).addClass("active");
    });


    /* MOBILE NAVIGATION */
    $(".navBar__btn").click(function() {
        $(".navBar__nav").addClass("slide");
    });
    $(".navBar__close").click(function() {
        $(".navBar__nav").removeClass("slide");
    });
    $(".nav__link").click(function() {
        $(".navBar__nav").removeClass("slide");
    });
    $(".btn.blue.fill").click(function() {
        $(".navBar__nav").removeClass("slide");
    });





    /* SMALL NAV1 */
    $(".small-nav1__item").click(function() {
        $(".small-nav1__item").removeClass("active");
        $(this).addClass("active");

        $(".speakers-content").removeClass("show");
        if (this.id === "speakers-mainLink") {
            $("#speakers-main").addClass("show");
        } else if (this.id === "speakers-areaLink") {
            $("#speakers-area").addClass("show");
        }
    });

    /* SMALL NAV2 */
    /*$(".small-nav2__item").click(function() {
        $(".small-nav2__item").removeClass("active");
        $(this).addClass("active");

        $(".agenda-content1").removeClass("show");
        if (this.id === "day1-mainLink") {
            $("#day1-main").addClass("show");
        } else if (this.id === "day1-areaLink") {
            $("#day1-area").addClass("show");
        }
    });*/

    /* SMALL NAV3 */
    $(".small-nav3__item").click(function() {
        $(".small-nav3__item").removeClass("active");
        $(this).addClass("active");

        $(".agenda-content2").removeClass("show");
        if (this.id === "day2-mainLink") {
            $("#day2-main").addClass("show");
        } else if (this.id === "day2-areaLink") {
            $("#day2-area").addClass("show");
        }
    });



    /* SPEAKER MORE */
    $(".speaker__more-btn").click(function() {
        $("#sm" + $(this).attr('target')).toggle("show");
    });




    /* SLIDESHOW */
    $(".pn-item").click(function() {
        $(".pn-item").removeClass("active");
        $(this).addClass("active");
        
        $(".slideshow").removeClass("show");
        console.log(this.id);
        if (this.id === "pn-item2017") {
            $("#slideshow2017").addClass("show");
        } else if (this.id === "pn-item2016") {
            $("#slideshow2016").addClass("show");
        } else if (this.id === "pn-item2015") {
            $("#slideshow2015").addClass("show");
        } else if (this.id === "pn-item2014") {
            $("#slideshow2014").addClass("show");
        } else if (this.id === "pn-item2013") {
            $("#slideshow2013").addClass("show");
        } else if (this.id === "pn-item2012") {
            $("#slideshow2012").addClass("show");
        } else if (this.id === "pn-item-all") {
            $("#slideshowAll").addClass("show");
        }
    });


    /* AGENDA MOBILE NAV */
    $(".agenda-nav__btn").click(function() {
        $(".agenda").removeClass("show");
        var x = $(this).attr('target');
        if (x === "an-left") {
            $("#day1").addClass("show");
        } else {
            $("#day2").addClass("show");
        }
    });




    /* CODE OF CONDUCT OPEN/CLOSE */
    $("#codeOfConduct__link").click(function() {
        $("#codeOfconduct").addClass("show");
    });
    $("#codeOfconduct__close").click(function() {
        $("#codeOfconduct").removeClass("show");
    });


    /* ATTENDEE script */
    $("#attendees__link").click(function() {
        $("#attendees").addClass("show");
    });
    $("#attendees__close").click(function() {
        $("#attendees").removeClass("show");
    });





    /* SMOOTH SCROLL TO ANCHOR */
    // Select all links with hashes
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
    // On-page links
    if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
        && 
        location.hostname == this.hostname
    ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
            scrollTop: target.offset().top
        }, 1000, function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
            return false;
            } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
            };
        });
        }
    }
    });





});