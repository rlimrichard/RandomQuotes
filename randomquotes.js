$(document).ready(function() {
    getQuote();
    $('#new_quote').on('click', function(e) {
        e.preventDefault();
        getQuote();
    });
});

function getQuote(){
    $.ajax( {
        url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous',
        beforeSend: function (request) {
            request.setRequestHeader("X-Mashape-Key", "JejsUDXD8smshz49yDB7e8wOShfAp12axxcjsneMKt1bHKOuc8");
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.setRequestHeader("Accept", "application/json");
        },
        async: true,
        success: function(data) {
            var r = JSON.parse(data);
            html = '<i class="fa fa-quote-left"></i> ' + r.quote + ' <i class="fa fa-quote-right"></i>';

            //animate the quote when changing
            $("#quote-message").animate({
                opacity: 0
            }, 200,
              function() {
                $(this).animate({
                  opacity: 1
              }, 800);
                $('#quote-message').html(html);
              });
            $("#quote-author").animate({
                opacity: 0
            }, 200,
              function() {
                $(this).animate({
                  opacity: 1
              }, 800);
                $('#quote-author').text('- ' + r.author);
              });

            changeColor();
            socialMedia(r.quote, r.author);
        },
        cache: false
    });
}

function changeColor(){
    //#FF8000 -> orange //#1673A0 -> blue //#585A69 -> grey
    //#E70D23 -> red  //#247E2A => vert //#804619 => brown
    var colors = ['#FF8000', '#1673A0', '#585A69', '#E70D23', '#247E2A', '#804619' ];

    //pickup a random color
    var currentColor = colors[Math.floor((Math.random() * colors.length))];
    document.body.style.backgroundColor = currentColor;

    var newQuote = document.getElementById('new_quote');
    newQuote.style.backgroundColor = currentColor;

    var twitter = document.getElementById('twitter-icon');
    twitter.style.color = currentColor;

    var message = document.getElementById('quote-message');
    message.style.color = currentColor;

    var author = document.getElementById('quote-author');
    author.style.color = currentColor;
}

function socialMedia(quote, author){
    //twitter
    var link = document.getElementById('twitter');
    link.setAttribute('href', 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(quote + ' - ' + author));
}
