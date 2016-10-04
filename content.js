$(window).load(function(){
	$('head').append('<style>'+
		'@keyframes wiggle-0{0%{transform:rotate(.5deg);}50%{transform:rotate(-.5deg);}100%{transform:rotate(.5deg);}}' +
		'@keyframes wiggle-1{0%{transform:rotate(1deg);}50%{transform:rotate(-1deg);}100%{transform:rotate(1deg);}}' +
		'@keyframes wiggle-2{0%{transform:rotate(1.5deg);}50%{transform:rotate(-1.5deg);}100%{transform:rotate(1.5deg);}}' +
		'@keyframes wiggle-3{0%{transform:rotate(2.25deg);}50%{transform:rotate(-2.25deg);}100%{transform:rotate(2.25deg);}}' +
		'@keyframes wiggle-4{0%{transform:rotate(3deg);}50%{transform:rotate(-3deg);}100%{transform:rotate(3deg);}}' +
		'@keyframes wiggle-5{0%{transform:rotate(4deg);}50%{transform:rotate(-4deg);}100%{transform:rotate(4deg);}}' +

		'.wiggle-0{animation:wiggle-0 .3s infinite;}'+
		'.wiggle-1{animation:wiggle-1 .3s infinite;}'+
		'.wiggle-2{animation:wiggle-2 .3s infinite;}'+
		'.wiggle-3{animation:wiggle-3 .3s infinite;}'+
		'.wiggle-4{animation:wiggle-4 .3s infinite;}'+
		'.wiggle-5{animation:wiggle-5 .3s infinite;}'+
		
		'img[class*="wiggle-"] {transition:all 1s linear;}'+

	'</style>');

	var hillContainer = $('.candidate.dem');
	var hillImg = hillContainer.find("img");

	hillContainer.css('overflow', 'hidden');
	hillImg.css('margin-left', "3px");


	function wiggleOn(p) {
		hillImg.addClass("wiggle-"+p);
	};

	function wiggleOff(p){
		hillImg.removeClass("wiggle-"+p);
	};

	function getStateCode(e){
		var classes = e.attr("class");
		classes = classes.split(" ")
		classes.splice(classes.indexOf("state"), 1);
		var code = classes.toString();
		return code;
	};

	function getModel() {
		var hash = window.location.hash;
		var model = "";
		if (hash == "#plus") {
			model = "plus";
		} else if (hash == "#now") {
			model = "now";
		} else{
			model = "polls"
		}

		return model;
	}

	function main(){
		if ( $('.tab-presidency').hasClass("tab-is-active") == true ) {
			var model = getModel();
			var states = window.race['summary'];
			var probs = {}
			for (var i = 0 ; i <= states.length - 1; i++) {
				var s = states[i];
				var prob = s.sentences[model].probability;
				prob = Math.round(prob / 10) * 10;
				prob = prob - 50;
				prob = prob.toString().charAt(0);
				probs[s.state] = prob;
				if (s.sentences[model].party == "D") {

					$('path.state.'+s.state).on("mouseenter.shimmy", function () {
					        var code = getStateCode($(this));
							wiggleOn(probs[code]);
					});

					$('path.state.'+s.state).on("mouseleave.shimmy", function () {
							var code = getStateCode($(this));
							wiggleOff(probs[code]);
					});
				};
			};
		}
	};

	//when user switches models, unbind old events then re-run
	$(".model-select").click(function() {
		$('path.state').off( ".shimmy" );
		main();
	});

	//get shimmying
	main();

});

