$(function() {
  function subscribe(subscribeData) {
    return apiRequest.post('https://crypto-payment.shiftconf.co/subscribe', subscribeData);
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
        $('.newsletterBox').removeClass('hide');
        $('.newsletterText').addClass('hide');
        $('#emailSubscription').css('display', 'none');
        $('.newsletter__text').css('display', 'none');
        $('#subscribe').css('display', 'none');
      });
    }
  })
});