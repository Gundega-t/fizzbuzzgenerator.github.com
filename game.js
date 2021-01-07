window.console = window.console || function(t) {};

if (document.location.search.match(/type=embed/gi)) {
    window.parent.postMessage("resize", "*");
  }
var score,
	time,
	timer,
	number,
	attempts,
	matched,
	canclick = 0;
($score = $("#score > span")),
	($time = $("#time > span")),
	($number = $("#number")),
	($answers = $(".answer")),
	($fizz = $("#fizz")),
	($buzz = $("#buzz"));

$("#start").on("click", function() {
	init();
});
$("#restart").on("click", function() {
	$("#gameover").hide();
	init();
});

$answers.on("click", function() {
	if (time < 1) return;
	if (!canclick) return;
	canclick = 0;
	attempts++;
	var correct;
	$(this).addClass("answered");
	var modulo = $(this).data("modulo");
	if (number % 15 === 0) correct = 15;
	else if (number % 5 === 0) correct = 5;
	else if (number % 3 === 0) correct = 3;
	else correct = 0;
	if (correct === Number(modulo)) {
		score++;
		$(this).addClass("correct");
		matched++;
	} else {
		score--;
		$(this).addClass("incorrect");
	}
	$(this)
		.siblings('.answer[data-modulo="' + correct + '"]')
		.addClass("correct");
	$score.html(score);
	setTimeout(nextnumber, 500);
});
function init() {
	$('body').addClass("started");
	(score = 0), (time = 30), (attempts = 0),	(matched = 0), (canclick = 1);
	$score.html(score);
	$time.html(time);
	clearInterval(timer);
	timer = setInterval(update, 1000);
	newnumber();
}
function update() {
	time--;
	$time.html(time);
	if (time === 0) {
		gameover();
	}
}
function newnumber() {
	$answers.removeClass("answered correct incorrect");
	number = Math.floor(Math.random() * 1000);
	$number.html(number);
}
function nextnumber() {
	canclick = 1;
	newnumber();
}
function gameover() {
	clearInterval(timer);
	$('body').removeClass("started");
	$number.html("???");
	$("#gameover > h2").removeClass("correct incorrect");
	var precision = Math.floor(matched * 100 / attempts);
  var positivescore = score;
	if(score < 1){positivescore = 1}
	var finalscore = Math.floor(positivescore * precision * attempts / (attempts-matched+1));
	var congrat;
	if (finalscore < 0) {
		congrat = "looser!";
		$("#gameover > h2").addClass("incorrect");
	}
	if (finalscore > 0) {
		congrat = "not too bad!";
		$("#gameover > h2").addClass("correct");
	}
	if (finalscore > 100) {
		congrat = "nice!";
	}
	if (finalscore > 1000) {
		congrat = "great!";
	}
	if (finalscore > 10000) {
		congrat = "amazing!";
	}
	if (finalscore > 100000) {
		congrat = "WOW!!! are you a robot?";
	}
	$("#gameover").show();
	$("#gameover > h2").html(congrat);
	$("#gameover > .score span").html(score);
	$("#gameover > .attempts span").html(attempts);
	$("#gameover > .matched span").html(matched);
	$("#gameover > .precision span").html(precision + "%");
	$("#gameover > .finalscore span").html(finalscore);
}