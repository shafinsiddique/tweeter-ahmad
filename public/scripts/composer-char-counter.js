$(document).ready(function() {
  $('.new-tweet textarea').on('input', function() {
      let textarea = this;
      let inputValue = textarea.value;
      let inputLength = inputValue.length;
      let charactersLeft = 140 - inputLength;

      console.log('Characters left:', charactersLeft);

      let counter = $('.new-tweet .counter');
      counter.text(charactersLeft);

      if (charactersLeft < 0) {
          counter.addClass('invalid'); 
      } else {
          counter.removeClass('invalid'); 
      }
  });
});
