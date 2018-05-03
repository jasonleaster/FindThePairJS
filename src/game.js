/**
    MIT License

    Copyright (c) 2017 EOF

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.

 * Author: Jason Leaster
 * Date  : 2017/11/07
 * File  : game.js
 */

const $ = require("jquery")
import Vue from 'vue';

/**
 * [Util tool function for this application]
 * @type {Object}
 */
const Util = {
    nowInMilSec: function() {
        return new Date().getTime() / 1000;
    },

    shuffle: function shuffle(array) {
        let currentIndex = array.length;
        let randomIndex = 0;
        let temporaryValue = 0;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

}

const gameContainer = new Vue({
    el: '#gameContainer',
    data: {
        totalCards      : 14,
        flipCounter     : {}, // {cardName: count}
        preCardId       : -1,
        preCardName     : null,
        flippedOverCards: 0,
        startTime       : Util.nowInMilSec(),
    },
    methods: {
        loadImages: function() {
            const IMG_PATH = "./img/";
            const IMG_NAMES = ["chicken", "cow", "dog", "fox", "monkey", "owl", "penguin", "pig", "tiger"];
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
            frontFaces.each(function(index, item) {
                let imgIdx = Math.floor(index / 2);
                $(item).css('background-image', getImgPath(imgIdx));
                $(item).attr('name', getImgName(imgIdx));
                $(item).attr('id', index);

                appCtx.flipCounter[getImgName(imgIdx)] = 0;
            });

            this.totalCards = frontFaces.length;
        },

        flipTheCard: function(cardId, cardName) {

            this.flipCounter[cardName] += 1;

            if (this.preCardName === null) {
                this.preCardId = cardId;
                this.preCardName = cardName;
            } else if (this.preCardName === cardName) {
                this.preCardId = -1;
                this.preCardName = null;

                this.flippedOverCards += 2;

                //check if game over 
                if (this.flippedOverCards >= this.totalCards) {
                    console.log("Game Over! You win the game!");

                    let costTime = Util.nowInMilSec() - this.startTime;
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
                removeFlipper(this.preCardName);

                this.flipCounter[cardName] = 0;
                this.flipCounter[this.preCardName] = 0;

                // clickFlags[cardId] = false;
                // clickFlags[this.preCardId] = false;

                this.preCardId = -1;
                this.preCardName = null;
            }

        },

        flipperHandler: function($event) {
            
            const appCtx = this;
            const HANDLER_DELAY = 1200;

            /**
             * 获取当前点击事件的对象
             */
            const item = $event.currentTarget;

            let cardId   = $(item).find('.front').attr('id');
            let cardName = $(item).find('.front').attr('name');

            if (appCtx.flipCounter[cardName] < 2) {
                $(item).addClass('flipper');

                setTimeout(function() {
                    appCtx.flipTheCard(cardId, cardName)
                }, HANDLER_DELAY);
            }
        }

    }
});

const centerCircleCtx = new Vue({
    el: '#init-msg',
    methods: {
        startGame: function() {
            $('body').addClass('ingame');
            gameContainer.loadImages();

            console.log("Game Initlization finished! Just Enjoy it :D ");
        }
    }
});