$(document).ready(function () {
  var quote;
  var author;

  function getQuote() {
    $.ajax({
      url: 'https://api.forismatic.com/api/1.0/',
      jsonp: 'jsonp',
      dataType: 'jsonp',
      data: {
        method: 'getQuote',
        lang: 'en',
        format: 'jsonp'
      },
      success: function (response) {
        //console.log(response.quoteText);
        quote = response.quoteText;
        author = response.quoteAuthor;

        $('#quote').text(quote);

        if (author) {
          $('#author').text('--' + author);
        }
        // if author empty
        else {
          $('#author').text('--Unknown ');
        }
      }
    });

  }
  // get quote on page load
  getQuote();
  // get quote on button click
  $("#getQuote").on('click', function (event) {
    event.preventDefault();
    getQuote();
  });
  // share quote on twitter
  $("#share").on('click', function (event) {
    event.preventDefault();
    if (quote.length <= 140) {
      window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(quote + ' --' + author));
    } else {
      alert('Quote exceeds character limit, fetching new quote...');
      getQuote();
    }
  });
});