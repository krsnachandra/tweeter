/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function () {

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  function createTweetElement(tweet) {
    var formattedTweet = `<article id="tweet">
            <header>
              <img src=${tweet.user.avatars.regular} alt=${escape(tweet.user.name)}></img>
              <h2>${escape(tweet.user.name)}</h3>
              <p>${escape(tweet.user.handle)}</p>
            </header>
            <div>${escape(tweet.content.text)}</div>
            <footer>
              <time>${tweet.created_at}</time>
              <img src="../images/hover.png" alt="hover"></img>
            </footer>
          </article>`;

    return formattedTweet;
  };

  function renderTweets(tweets) {
    var $tweetFeed = $("#tweet-feed").empty();
    for(var tweet of tweets) {
      $tweetFeed.prepend(createTweetElement(tweet));
    }
    return $tweetFeed;
  };

  function loadTweets() {
    $.ajax({
      method: `GET`,
      url: `/tweets`,
    })
      .done(function (tweets) {
        renderTweets(tweets);
      })
  }



  function handleNewTweet(event) {
    event.preventDefault();
    var $form = $(this);
    var tweet = $form.find('textarea').val();
    if (Array.from(tweet).length === 0) {
      alert("You can't tweet that!");
      return;
    }
    if (Array.from(tweet).length > 140) {
      alert("Keep it under 140 characters!");
      return;
    }
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: $form.serialize(),
    })
      .done(function () {
        $form.find('textarea').val("");
        $form.closest('.new-tweet').find('.counter').text('140');
        loadTweets();
      })
  };

  function toggleComposeTweet() {
    $(`.new-tweet`).toggle();
  }

  $('.new-tweet form').on('submit', handleNewTweet);
  $('.compose').on('click', toggleComposeTweet);
  loadTweets();

});