$(function() {
  var total = 0;

  var tickets = [
    {
      id: 1,
      name: 'Super Early Bird Student',
      price: '20',
      humanPrice: '$20 + VAT',
      time: 'Sales end on September 1',
      quantity: 0
    },
    {
      id: 2,
      name: 'Super Early Bird Standard',
      price: '100',
      humanPrice: '$100 + VAT',
      time: 'Sales end on May 30',
      quantity: 0
    },
  ];

  $("#ticket-info").loadTemplate($("#template"),
  {
    name1: tickets[0].name,
    humanPrice1: tickets[0].humanPrice,
    time1: tickets[0].time,
    name2: tickets[1].name,
    humanPrice2: tickets[1].humanPrice,
    time2: tickets[1].time,
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
  });

  $('.btn.yellow.empty').click(function() {
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

        $('.currency').on('click', function() {
          const currency = $(this).attr('id');
          console.log(info);
          $('#crypto-wallet').text(info[currency].address);

        });
      });
    });
  });  
});