$(function() {
  var total = 0;

  var tickets = [
    {
      id: 1,
      name: 'Super Early Bird Student',
      price: '20',
      humanPrice: '$20 + VAT',
      time: 'Sales end on September 1',
      quantity: 0,
      slug: 'jam5hfm5bjq'
    },
    {
      id: 2,
      name: 'Super Early Bird Standard',
      price: '100',
      humanPrice: '$100 + VAT',
      time: 'Sales end on May 30',
      quantity: 0,
      slug: 'fn4uss8b90m'
    },
  ];

  $('#order, .btn.yellow.empty').css({
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

  function isValid() {
    for(var i in tickets) {
      if(tickets[i].quantity > 0) {
        return true;
      }
    }

    return false;
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
    $('.currencies__title').css('display', 'block');
    $('#crypto-currencies').css('display', 'block');
  });

  $('.btn.yellow.empty').click(function() {
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
        summary += boughtTickets[i].name + ' x' + boughtTickets[i].quantity + ' - $' + boughtTickets[i].price * boughtTickets[i].quantity + '<br>';
      }
  
      $("#crypto-summary").loadTemplate($("#summary"),
      {
        summary: summary,
        total: total
      });
  
      apiRequest.get('http://167.99.91.136/info/' + total).then(function(response) {
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
            console.log(info);

            $('.crypto-checkout').css('display', 'block');
            $('.crypto-icon').attr('src', info[currency].icon);
            $('.crypto-amount').text(info[currency].price + ' ' + currency.toUpperCase());
            $('.crypto-fiat').text(total + ' EUR');
            $('#crypto-wallet').text(info[currency].address);
            $('.currencies').css('display', 'none');
          });
        });
      });  
    }
  });  
});