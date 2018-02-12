var treshold = 800;
var burnSeq;
//var vsjeSkup = 802;
var clipboard = new Clipboard('#copyButton');

//Array of sharable links for FB stats
var ShareArray = [
	"http://graph.facebook.com/?id=http://djnd.si/zar/",
	"http://graph.facebook.com/?id=http://djnd.si/zar/?1",
	"http://graph.facebook.com/?id=http://djnd.si/zar/?2",
	"http://graph.facebook.com/?id=http://djnd.si/zar/?3",
	"http://graph.facebook.com/?id=http://djnd.si/zar/?4",
	"http://graph.facebook.com/?id=http://djnd.si/zar/?5",
	"http://graph.facebook.com/?id=http://djnd.si/zar/?6",
	"http://graph.facebook.com/?id=http://djnd.si/zar/?7",
	"http://graph.facebook.com/?id=http://djnd.si/zar/?8"
];


//Get FB shares and push to array
/////////////////////////////
// ADD TWITTER SHARES HERE///
var ShareNumberArary = [296];//110+187
/////////////////////////////
/////////////////////////////
$(document).ready(function() {
    $.each(ShareArray, function(i, val) {
        $.getJSON(val, function(fbdata) {
			ShareNumberArary.push(fbdata.share.share_count);
			//console.log(i);
			if(i+1 == ShareArray.length){
				setTimeout(sumarize, 10);
			};
        });
    });
});

//Summarize the number of pushes to the array
function sumarize(){
	var skup = ShareNumberArary.reduce(add, 0);
	function add(a, b) {
		return a + b;
	}
	vsjeSkup = parseInt(skup);
	console.log(vsjeSkup);
	document.getElementById("shareCount").innerHTML = vsjeSkup+"°C";
	setHeights();
};

window.fbAsyncInit = function() {
    FB.init({
        appId: '1015079648551952',
        xfbml: true,
        version: 'v2.5'
    });
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/sl_SI/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//Set the termometer heights and launch Gif sequence
function setHeights(){
	var TermometerContainer = document.getElementById("termometerContainer").clientHeight;
	var TermometerScale = TermometerContainer - 20;
	var TermometerStep = TermometerScale/7;
	var scaleSteps = document.getElementsByClassName("termometerStep");
	for (i=0;i<scaleSteps.length;i++){
		scaleSteps[i].style.height=TermometerStep+"px";
	};


	document.getElementById("termometerScale").style.height = TermometerScale+"px";

	var TempCurrentcount = vsjeSkup;
	var TempCurrentState = vsjeSkup/treshold;

	//Termometer progression logic -- shoot me now
	if(vsjeSkup<21){
		TempCurrentHeight = TermometerScale-((vsjeSkup/20)*TermometerStep);
		burnSeq = 1;
		console.log(1);
	}
	else if(vsjeSkup<60){
		TempCurrentHeight = TermometerScale-(TermometerStep+((vsjeSkup-20)/40)*TermometerStep);
		burnSeq = 2;
		console.log(2);
	}
	else if(vsjeSkup<151){
		TempCurrentHeight = TermometerScale-((2*TermometerStep)+((vsjeSkup-60)/90)*TermometerStep);
		burnSeq = 3;
		console.log(3);
	}
	else if(vsjeSkup<301){
		TempCurrentHeight = TermometerScale-((3*TermometerStep)+((vsjeSkup-150)/150)*TermometerStep);
		burnSeq = 4;
		console.log(4);
	}
	else if(vsjeSkup<501){
		TempCurrentHeight = TermometerScale-((4*TermometerStep)+((vsjeSkup-300)/200)*TermometerStep);
		burnSeq = 5;
		console.log(5);
	}
	else if(vsjeSkup<801){
		TempCurrentHeight = TermometerScale-((5*TermometerStep)+((vsjeSkup-500)/300)*TermometerStep);
		burnSeq = 6;
		console.log(6);
	}
	else{
		TempCurrentHeight = TermometerScale-((6*TermometerStep)+((vsjeSkup-800)/200)*TermometerStep)
		burnSeq = 7;
		console.log(7);
	}

	document.getElementById("TemperatureAmount").style.height = TempCurrentHeight+"px";
	for (i=1;i<burnSeq;i++){
		scaleSteps[7-i].style.color="#6d1216";
		scaleSteps[7-i].style.background="url(img/scaleLine2.png) no-repeat 100% 0%";
	};
	animatePahi();
};

//On share FB get current card from url
function shareFacebook(){
	var CurrentURL = window.location.href;
	FB.ui(
	 {
	  method: 'share',
	  href: CurrentURL,
	}, function(response){});
};

//On share Twitter get current card from url
function shareTwitter(){
	var CurrentURL = window.location.href;
	var tweetBase = "//twitter.com/intent/tweet";
	var title = "?text=Po TV žgečkajo Pahorja, internet pa je kresovanje vzel malo bolj resno. Pridruži se rajanju!"
	var Hashtag = "&hashtags=nazaru,zarbrezutvar"
	var win = window.open(tweetBase+title+Hashtag+"&url="+CurrentURL, '_blank');
  	win.focus();
};

//Carousel for cards and Jump to carousel
$(document).ready(function() {
    $("#carousel").owlCarousel({
        navigation: true,
        slideSpeed: 300,
        paginationSpeed: 100,
        singleItem: true
    });

    // Jump to specific slide...
    var startslide = document.location.href.split('?')[1];
    if (startslide != undefined) {
        $(".owl-carousel").owlCarousel()
        var owl = $(".owl-carousel").data('owlCarousel');
        owl.goTo(startslide - 1);
        $('html, body').animate({
            scrollTop: $("#carouselPart").offset().top
        }, 1000);
    }
});

//Tooltip quickfix
function ShowText(){
	document.getElementById("TooltipBuble").style.display = "block";
};
function HideText(){
	myVar = setTimeout(Hide, 5000);
};
function Hide(){
document.getElementById("TooltipBuble").style.display = "none";
};
