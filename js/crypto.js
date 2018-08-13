$(function() {
  var total = 0;
  
  var tickets = [
    {
      id: 1,
      name: 'Super Early Bird Student',
      price: '20',
      humanPrice: '20€ + VAT',
      time: 'Sales end on September 1',
      quantity: 0,
      slug: 'jam5hfm5bjq'
    },
    {
      id: 2,
      name: 'Super Early Bird Standard',
      price: '100',
      humanPrice: '100€ + VAT',
      time: 'Sales end on May 30',
      quantity: 0,
      slug: 'fn4uss8b90m'
    },
  ];
  
  $('#complete').click(function() {
    window.close();
  });

  if(window.location.href.includes('/#/crypto-checkout')) {
    var first = getParameterByName('1');
    var second = getParameterByName('2');

    var firstTicket = tickets[0];
    var secondTicket = tickets[1];

    firstTicket.quantity = first;
    secondTicket.quantity = second;

    tickets[0] = firstTicket;
    tickets[1] = secondTicket;

    if(isValid()) {
      for (var i in tickets) {
        total += tickets[i].price * tickets[i].quantity
      }
  
      $('body').addClass('crypto-payment');
  
      var boughtTickets = tickets.filter(ticket => ticket.quantity > 0);
      var summary = '';
      var total = 0;
  
      for(var i in boughtTickets) {
        total += boughtTickets[i].quantity * boughtTickets[i].price;
        summary += boughtTickets[i].name + ' x' + boughtTickets[i].quantity + ' - ' + boughtTickets[i].price * boughtTickets[i].quantity + '€' + '<br>';
      }
  
      $("#crypto-summary").loadTemplate($("#summary"),
      {
        summary: summary,
        total: total + '€'
      });
  
      apiRequest.get('https://crypto-payment.shiftconf.co/info/' + total).then(function(response) {
        response.json().then(function(info) {
          $("#crypto-currencies").loadTemplate($("#currencies"),
          {
            'ltc-price': info.ltc.price,
            'btc-price': info.btc.price,
            'bch-price': info.bch.price,
            'eth-price': info.eth.price,
          });
          
          $('.ltc-icon').attr('src', info.ltc.icon);
          $('.btc-icon').attr('src', info.btc.icon);
          $('.bch-icon').attr('src', info.bch.icon);
          $('.eth-icon').attr('src', info.eth.icon);

          $('.currency').on('click', function() {
            const currency = $(this).attr('id');
            const email = $('#email').val();
            const order = tickets[0].name + ' x' + tickets[0].quantity + ', ' + tickets[1].name + ' x' + tickets[1].quantity;

            $('.currencies').css('display', 'none');    
            $('.lds-ring').css('display', 'table');

            console.warn(order, info[currency].price);

            setTimeout(function() {
              apiRequest.post('https://crypto-payment.shiftconf.co/payment/' + currency, { email, order, total: info[currency].price + ' ' + currency.toUpperCase() }).then(function(response) {
                response.json().then(function(data) {
                  $('.lds-ring').css('display', 'none');
                  $('.crypto-qr').attr('src', 'https://chart.googleapis.com/chart?chl=' + data.address + '&chs=200x200&cht=qr&chld=H%7C0');
                  $('.crypto-checkout').css('display', 'block');
                  $('.crypto-icon').attr('src', info[currency].icon);
                  $('.crypto-amount').text(info[currency].price + ' ' + currency.toUpperCase());
                  $('.crypto-fiat').text(total + ' EUR');
                  $('#crypto-wallet').text(data.address);
                });
              });
            }, 1000);
          });
        });
      });  
    }
  }


  $('#order, .btn.yellow.empty').css({
    'opacity': '0.3',
    'cursor': 'default',
    'pointer-events': 'none'
  });

  $('#crypto-checkout').css({
    'opacity': '0.3',
    'cursor': 'default',
    'pointer-events': 'none'
  });

  $("#ticket-info").loadTemplate($("#template"),
  {
    name1: tickets[0].name,
    humanPrice1: tickets[0].humanPrice,
    time1: tickets[0].time,
    name2: tickets[1].name,
    humanPrice2: tickets[1].humanPrice,
    time2: tickets[1].time,
  });

  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  } 

  function isValid() {
    for(var i in tickets) {
      if(tickets[i].quantity > 0) {
        return true;
      }
    }

    return false;
  }

  function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test( $email );
  }

  function constructQueryString() {
    var query = '';

    for(var i in tickets) {
      if(tickets[i].quantity > 0) {
        query += tickets[i].slug;

        query += ',';
      }
    }

    query += '?';

    for(var i in tickets) {
      if(tickets[i].quantity > 0) {
        query += tickets[i].slug + '=' + tickets[i].quantity;

        query += '&';
      }
    }

    return query;
  }

  $('#order').click(function() {
    if(isValid()) {
      var queryString = constructQueryString();
    
      window.open('https://ti.to/shift-conference/shift-money-2018/with/' + queryString);  
    }
  });

  $('#email').on('keyup change keydown', function() {
    if(validateEmail($('#email').val()) && $('#email').val().length > 0) {
      $('#crypto-checkout').css({
        'opacity': '1',
        'cursor': 'pointer',
        'pointer-events': 'auto'
      });
    } else {
      $('#crypto-checkout').css({
        'opacity': '0.3',
        'cursor': 'default',
        'pointer-events': 'none'
      });
    }
  });

  $('select').change(function() {
    var id = $(this).attr('id');
    var quantity = $(this).val();
    var ticket = tickets.find(ticket => ticket.id === id);

    for (var i in tickets) {
      if (tickets[i].id == id) {
         tickets[i].quantity = quantity;
         break;
      }
    }

    if(isValid()) {
      $('#order, .btn.yellow.empty').css({
        'opacity': '1',
        'cursor': 'pointer',
        'pointer-events': 'auto'
      });
    } else {
      $('#order, .btn.yellow.empty').css({
        'opacity': '0.3',
        'cursor': 'default',
        'pointer-events': 'none'
      });
    }
  });

  $('#crypto-checkout').click(function(e) {
    e.preventDefault();
    $('.crypto__title, .summary__title, #crypto-summary, .form__title, form').css('display', 'none');
    $('.lds-ring').css('display', 'table');

    setTimeout(function() {
      $('.lds-ring').css('display', 'none');
      $('.currencies__title').css('display', 'block');
      $('#crypto-currencies').css('display', 'block');  
    }, 500)
  });

  $('.btn.yellow.empty').click(function() {
    window.open('http://money.shiftconf.co/#/crypto-checkout?1=' + tickets[0].quantity + '&2=' + tickets[1].quantity);
  });  
});