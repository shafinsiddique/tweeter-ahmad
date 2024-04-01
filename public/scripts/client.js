$(document).ready(function() {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
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
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
        const $tweetElement = createTweetElement(tweet);
        $('#tweets-container').prepend($tweetElement); 
    }
};

  const createTweetElement = function(tweetData) {
      const $tweet = $(`
          <article class="tweet">
              <header>
                  <img src="${tweetData.user.avatars}" alt="Profile Image">
                  <h3>${$('<div>').text(tweetData.user.name).html()}</h3>
                  <span class="handle">${$('<div>').text(tweetData.user.handle).html()}</span>
              </header>
              <div class="tweet-content">
                  <p>${$('<div>').text(tweetData.content.text).html()}</p>
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
  renderTweets(data);

  
  $('form').submit(function(event) {
      event.preventDefault(); 

     
      const tweetContent = $(this).find('textarea').val().trim();

      
      const $errorMessage = $('.error-message');

      
      if (!tweetContent) {
          $errorMessage.text('Error: Tweet content cannot be empty.').show();
      } else if (tweetContent.length > 140) {
          $errorMessage.text('Error: Tweet content exceeds the maximum length of 140 characters.').show();
      } else {
          
          $errorMessage.hide();

          $.ajax({
              url: '/tweets',
              method: 'POST',
              data: $(this).serialize(),
              success: function(response) {
                  
              },
              error: function(xhr, status, error) {
                  
              }
          });
      }
  });
});
