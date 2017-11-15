/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function () {

  // var data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": {
  //         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
  //         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
  //         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
  //       },
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": {
  //         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
  //         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
  //         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
  //       },
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense, je suis"
  //     },
  //     "created_at": 1461113959088
  //   },
  //   {
  //     "user": {
  //       "name": "Johann von Goethe",
  //       "avatars": {
  //         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
  //         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
  //         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
  //       },
  //       "handle": "@johann49"
  //     },
  //     "content": {
  //       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
  //     },
  //     "created_at": 1461113796368
  //   }
  // ];

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

  loadTweets();

  function handleNewTweet(event) {
    event.preventDefault();
    var $form = $(this);
    // console.log($form.serialize());
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: $form.serialize(),
    })
      .done(function () {
        $form.find('textarea').val("");
        loadTweets();
      })
// should I redirect here? how?
  };

  // $form = $('.new-tweet form');

  // $form.on('submit', handleNewTweet);



});