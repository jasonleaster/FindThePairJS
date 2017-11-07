/**
 * Author: Jason Leaster
 * Date  : 2017/11/07
 */



/**
 * @param  {[type]}
 * @return {[type]}
 */
function shuffle(array) {
    let currentIndex   = array.length;
    let randomIndex    = 0;
    let temporaryValue = 0;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue      = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex]  = temporaryValue;
    }

    return array;
}

App = {
    init: function () {
        this.loadImages();
        this.bindEvent();

        console.log("Game Initlization finished! Just Enjoy it :D ");
    },
    loadImages: function () {
        const IMG_PATH   = "./img/";
        const IMG_NAMES  = ["chicken", "cow", "dog", "fox", "monkey", "owl", "penguin", "pig", "tiger"];
        const IMG_SUFFIX = ".png";

        function getImgPath(index) {
            return 'url(' + IMG_PATH + IMG_NAMES[index] + IMG_SUFFIX + ')';
        }

        let frontFaces = $('.card .front');
        frontFaces = shuffle(frontFaces);

        frontFaces.each(function (index, item) {
            $(item).css('background-image', getImgPath(Math.floor(index / 2)));
        });
    },
    bindEvent: function () {
        let cards = $('.card');
        cards.each(function (index, item) {
            $(item).on('click', function() {
                $(item).addClass('flipper');
            });
        });

        let body = $('body');
        let circle = $('div.center-circle');
        circle.on('click', function () {
            body.addClass('ingame');
        });
    },
};

// Initlization the SPA
App.init();