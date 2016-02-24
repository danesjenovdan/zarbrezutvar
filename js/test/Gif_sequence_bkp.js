'use strict';

function animatePahi() {
    var body = document.getElementsByTagName('body')[0];
    var container = document.getElementById('pahor');

    var gifs = [1, 2, 3, 4, 5, 6, 7].map(function(id) {
        return {
            path: 'img/' + id + '.gif',
            time: id === 1 ? 100 : 200
        };
    });

    var sequences = {
        1: [0,0],
		2: [0, 0, 1, 1],
		3: [0, 0, 1, 1, 2, 2],
		4: [0, 0, 1, 1, 2, 2, 3, 3],
		5: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4],
		6: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5,],
		7: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6,]
    };

    function startSequence(i) {
        var delay = 0;

        sequences[i].forEach(function(id, index) {
            var data = gifs[id];
            delay += data.time;
            showGif(data.path, delay);
        });
    }

    function showGif(path, delay) {
        var img = document.createElement('img');
        img.src = path;
        setTimeout(function() {
            container.innerHTML = '';
            container.appendChild(img);
        }, delay);
    }

    function preloadGifs() {
        var promises = [];

        gifs.forEach(function(data) {
            var promise = Q.defer();

            var img = document.createElement('img');

            img.onload = function() {
                promise.resolve();
            };
            img.src = data.path;
            promises.push(promise);
        });

        return Q.all(promises);
    }

    
    

    preloadGifs().then(function() {
        var started = false;
        setInterval(function() {
			var scrollTop = $(window).scrollTop(),
        	elementOffset = $('#pahor').offset().top,
        	winHeight = $(window).height(),
        	distance = (elementOffset - scrollTop + 250);
			if (winHeight >= distance && !started) {
                started = true;
				if (burnSeq==1){
                	startSequence(1);
				}
				else if (burnSeq==2){
                	startSequence(2);
				}
				else if (burnSeq==3){
                	startSequence(3);
				}
				else if (burnSeq==4){
                	startSequence(4);
				}
				else if (burnSeq==5){
                	startSequence(5);
				}
				else if (burnSeq==6){
                	startSequence(6);
				}
				else if (burnSeq==7){
                	startSequence(7);
				}
            };
        }, 300);
    });

};