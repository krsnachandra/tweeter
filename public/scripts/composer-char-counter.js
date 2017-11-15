$(function () {

  var maxChars = 140;

  var countChars = function displayCharacterCountInCounter() {
    var $this = $(this);
    var charsUsed = $this.val().length;
    var remainingLetterBudget = maxChars - charsUsed;
    var $counter = $this.closest('.new-tweet').find('.counter');
    $counter.text(remainingLetterBudget);
    if (remainingLetterBudget < 0) {
      $counter.addClass("exceeded");
    } else {
      $counter.removeClass("exceeded");
    }
  };

  $(".new-tweet textarea").on("input", countChars);

});
