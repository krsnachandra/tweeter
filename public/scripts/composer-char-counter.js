$(function () {
  $(".new-tweet textarea").keyup(function(){
    var remainingLetterBudget = 140 - $(this).val().length;
    // var remainingLetterBudget = 140 - this.value.length;
    var $counter = $(this).siblings('.counter');
    $counter.text(remainingLetterBudget);
    if(remainingLetterBudget < 0) {
      $counter.addClass("exceeded");
    } else {
      $counter.removeClass("exceeded");
    };
  });
});
