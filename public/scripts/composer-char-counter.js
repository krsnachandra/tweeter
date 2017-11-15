$(function () {
  var maxChars = 140;
  $(".new-tweet textarea").on("input", function(){
    var $this = $(this);
    var charsUsed = $this.val().length;
    var remainingLetterBudget = maxChars - charsUsed;
    // var remainingLetterBudget = 140 - this.value.length;
    // var $counter = $(this).siblings('.counter');
    var $counter = $this.closest('.new-tweet').find('.counter');
    $counter.text(remainingLetterBudget);
    if(remainingLetterBudget < 0) {
      $counter.addClass("exceeded");
    } else {
      $counter.removeClass("exceeded");
    };
  });
});
