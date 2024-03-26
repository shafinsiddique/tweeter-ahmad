$(document).ready(function() {
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
    const formData = $(this).serialize();

    const loadTweets = function() {
      $.ajax({
          url: 'http://localhost:8080/tweets',
          method: 'GET',
          dataType: 'json', 
          success: function(tweets) {
              console.log('Tweets loaded successfully:', tweets);
          },
          error: function(xhr, status, error) {
              console.error('Error loading tweets:', error);
          }
      });
  };

  loadTweets();
});
});
