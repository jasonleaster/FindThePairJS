/**
 * Author: Jason Leaster
 * Date  : 2017/11/07
 * File  : game.js
 */

/**
 * [Util tool function for this application]
 * @type {Object}
 */
Util = {
    nowInMilSec : function () {
        return new Date().getTime() / 1000;
    },

    shuffle: function shuffle(array) {
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

}

/**
 * [App description]
 * @type {Object}
 */
App = {
    init: function () {
        this.flipCounter = {}; // {cardName: count}
       
        this.preCardId = -1;
        this.preCardName = null;

        this.flippedOverCards = 0
        this.totalCards  = 0;

        this.loadImages();
        this.bindEvent();

        this.startTime = Util.nowInMilSec();

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
        frontFaces = Util.shuffle(frontFaces);

        let appCtx = this;
        frontFaces.each(function (index, item) {
            let imgIdx = Math.floor(index / 2);
            $(item).css('background-image', getImgPath(imgIdx));
            $(item).attr('name', getImgName(imgIdx));
            $(item).attr('id', index);

            appCtx.flipCounter[getImgName(imgIdx)] = 0;
        });

        this.totalCards = frontFaces.length;
    },

    /**
     * 1. Bind the handler of click events on cards
     * 2. Bind the handler of click events on the button for starting the game
     */
    bindEvent: function () {
        const appCtx = this;

        /* 
            try to delay the reation for waiting 
            the UI animation to be finished
        */
        const HANDLER_DELAY = 1200;

        const clickFlags = {}; // {id : boolean}
        const handler = function(cardId, cardName) {

            appCtx.flipCounter[cardName] += 1;

            if (appCtx.preCardName === null) {
                appCtx.preCardId   = cardId;
                appCtx.preCardName = cardName;
            } else if (appCtx.preCardName === cardName) {
                appCtx.preCardId   = -1;
                appCtx.preCardName = null;
                
                appCtx.flippedOverCards += 2;

                //check if game over 
                if (appCtx.flippedOverCards >= appCtx.totalCards) {
                    console.log("Game Over! You win the game!");

                    let costTime = Util.nowInMilSec() - appCtx.startTime;
                    $('.costTime').html(costTime.toFixed(2));

                    $('.win-info').css('visibility', 'visible');
                }
                
            } else {

                /*
                    reset the cards which are flippered and 
                    not the same of front faces.
                 */
                function removeFlipper(cardName) {
                    $('.front[name=' + cardName + ']')
                    .parent().each(function(i, item) {

                        $(item).removeClass('flipper');
                    });
                }

                removeFlipper(cardName);
                removeFlipper(appCtx.preCardName);

                appCtx.flipCounter[cardName] = 0;
                appCtx.flipCounter[appCtx.preCardName] = 0;

                clickFlags[cardId] = false;
                clickFlags[appCtx.preCardId] = false;

                appCtx.preCardId   = -1;
                appCtx.preCardName = null;
            }

        }

      
        const cards = $('.card');
        cards.each(function (index, item) {

            $(item).on('click', function() {

                let cardId   = $(item).find('.front').attr('id');
                let cardName = $(item).find('.front').attr('name');

                /*
                    TODO
                    BUG! FIX ME
                    
                if (clickFlags[cardId]) {
                    return;
                } else {
                    clickFlags[cardId] = true;
                } */

                if (appCtx.flipCounter[cardName] < 2) {
                    $(item).addClass('flipper');

                    setTimeout(function () {
                        handler(cardId, cardName)
                    }, HANDLER_DELAY);
                }
            });
        });

        let body   = $('body');
        let circle = $('div.center-circle');
        circle.on('click', function () {
            body.addClass('ingame');
        });
    },
};

var vueContext = new Vue({
    el: '#gameContainer',
    data: {
        totalCards: 14
    }
});

// Initlization the SPA
App.init();