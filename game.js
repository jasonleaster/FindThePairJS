/**
 * Author: Jason Leaster
 * Date  : 2017/11/07
 * File  : game.js
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
        this.flipCounter = {};
        this.preCard = null;

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

        function getImgName(index) {
            return IMG_NAMES[index];
        }

        let frontFaces = $('.card .front');
        frontFaces = shuffle(frontFaces);

        let appCtx = this;
        frontFaces.each(function (index, item) {
            let imgIdx = Math.floor(index / 2);
            $(item).css('background-image', getImgPath(imgIdx));
            $(item).attr('name', getImgName(imgIdx));

            appCtx.flipCounter[getImgName(imgIdx)] = 0;
        });
    },
    bindEvent: function () {
        const appCtx = this;

        const handler = function(curCard) {

            appCtx.flipCounter[curCard] += 1;

            if (appCtx.preCard === null) {
                appCtx.preCard = curCard;
            } else if (appCtx.preCard === curCard) {
                appCtx.preCard = null;
            } else {
                appCtx.flipCounter[curCard] = 0;
                appCtx.flipCounter[appCtx.preCard] = 0;

                $('.front[name=' + curCard + ']')
                    .parent().each(function(i, item) {

                        $(item).removeClass('flipper');
                    });

                $('.front[name=' + appCtx.preCard + ']')
                    .parent().each(function(i, item) {

                        $(item).removeClass('flipper');
                    });
                appCtx.preCard = null;
            }
        }


        let cards = $('.card');
        cards.each(function (index, item) {

            $(item).on('click', function() {
                let curCard = $(item).find('.front').attr('name');

                if (appCtx.flipCounter[curCard] < 2) {
                    
                    $(item).addClass('flipper');

                    setTimeout(function () {
                        handler(curCard)
                    }, 1200);
                }
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