$(document).ready(function() {
  const data = [
      {
          "user": {
              "name": "Newton",
              "avatars": "https://i.imgur.com/73hZDYK.png",
              "handle": "@SirIsaac"
          },
          "content": {
              "text": "If I have seen further it is by standing on the shoulders of giants"
          },
          "created_at": 1461116232227
      },
      {
          "user": {
              "name": "Descartes",
              "avatars": "https://i.imgur.com/nlhLi3I.png",
              "handle": "@rd"
          },
          "content": {
              "text": "Je pense, donc je suis"
          },
          "created_at": 1461113959088
      }
  ];

  const createTweetElement = function(tweetData) {
    const $tweet = $(`
        <article class="tweet">
            <header>
                <img src="${tweetData.user.avatars}" alt="Profile Image">
                <h3>${tweetData.user.name}</h3>
                <span class="handle">${tweetData.user.handle}</span>
            </header>
            <div class="tweet-content">
                <p>${tweetData.content.text}</p>
            </div>
            <footer>
                <span class="timestamp">${timeago.format(tweetData.created_at)}</span>
                <div class="icons">
                    <i class="fas fa-flag"></i>
                    <i class="fas fa-retweet"></i>
                    <i class="fas fa-heart"></i>
                </div>
            </footer>
        </article>
    `);
  
    return $tweet;
  };

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
        const $tweetElement = createTweetElement(tweet);
        $('#tweets-container').append($tweetElement);
    }
  };

  renderTweets(data);

  $('form').submit(function(event) {
      event.preventDefault();
  });
});
