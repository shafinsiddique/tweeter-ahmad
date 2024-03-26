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
                  <span class="timestamp" title="${new Date(tweetData.created_at)}">${timeago.format(tweetData.created_at)}</span>
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

  const loadTweets = function() {
      $.ajax({
          url: '/tweets', 
          method: 'GET',
          dataType: 'json',
          success: function(tweets) {
              renderTweets(tweets); 
          },
          error: function(xhr, status, error) {
              console.error('Error loading tweets:', error);
          }
      });
  };

  loadTweets();

  $('form').submit(function(event) {
      event.preventDefault();

      const tweetContent = $(this).find('textarea').val().trim();

      if (!tweetContent) {
          alert('Error: Tweet content cannot be empty.'); 
      } else if (tweetContent.length > 140) {
          alert('Error: Tweet content exceeds the maximum length of 140 characters.'); 
      } else {
          $.ajax({
              url: '/tweets',
              method: 'POST',
              data: $(this).serialize(), 
              success: function(response) {
                  console.log('Tweet successfully posted:', response);
              },
              error: function(xhr, status, error) {
                  console.error('Error posting tweet:', error);
              }
          });
      }
  });
});
