$(function() {
  function subscribe(subscribeData) {
    return apiRequest.post('http://167.99.91.136/subscribe', subscribeData);
  }

  function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test( $email );
  }

  $('#newsletter-form').submit(function(e) {
    e.preventDefault();

    if(validateEmail($('#emailSubscription').val()) && $('#emailSubscription').val().length > 0) {
      const subscribeData = {
        email_address: $('#emailSubscription').val(),
        status: 'subscribed'
      }
  
      subscribe(subscribeData).then(function(response) {
        $('.newsletterText').text('Thank you for subscribing!');
        $('#emailSubscription').css('display', 'none');
        $('.newsletter__text').css('display', 'none');
        $('#subscribe').css('display', 'none');
      });
    }
  })
});