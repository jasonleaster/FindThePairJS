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

import Vue from 'vue';

import Util from "./utils/utils.js"
import FooterComponent from "./componenets/footer.vue"
import WinInfoComponent from "./componenets/win-info.vue"
import CenterCicle from "./componenets/center-circle.vue"
import Card from "./componenets/card.vue"


const gameContext = new Vue({
    el: '#gameContext',
    data: {
        flipCounter     : {}, // {cardName: count}
        preCardId       : -1,
        preCardName     : null,
        flippedOverCards: 0,
        startTime       : Util.nowInMilSec(),
        started         : false,
        totalCards      : 14,
        cards           : [], // {id : "", name: "",  image: ""}
        winInfo : {
            notShow  : true,
            costTime : 0
        },
    },
    components: {
    //  将只在父组件模板中可用
        'footer-component': FooterComponent,
        'win-info-component': WinInfoComponent,
        'center-circle': CenterCicle,
        'card': Card,
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

            for (let i = 0; i < this.totalCards; i++) {
                let imgIdx = Math.floor(i / 2);
                let card = {
                    "id": i, 
                    "name": getImgName(imgIdx), 
                    "image": getImgPath(imgIdx),
                    "flip": false
                };
                this.cards.push(card);
                this.flipCounter[getImgName(imgIdx)] = 0;
            }

            Util.shuffle(this.cards);

            this.started = true;
        },

        flipHandlerWrapper : function (cardId, cardName) {
            const HANDLER_DELAY = 1200;
            const appCtx = this;

            if (this.flipCounter[cardName] < 2) {

                this.cards.forEach(function (card) {
                    if (card.id == cardId) {
                        card.flip = true;
                    }
                });

                setTimeout(function() {
                    appCtx.flipTheCard(cardId, cardName)
                }, HANDLER_DELAY);
            }
        },

        flipTheCard: function(cardId, cardName) {
            const appCtx = this;

            debugger;
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

                    this.winInfo.notShow = false;
                    this.winInfo.costTime = (Util.nowInMilSec() - this.startTime).toFixed(2);
                }

            } else {

                /*
                    reset the cards which are flippered and 
                    not the same of front faces.
                 */
                function removeFlipper(cardName) {
                    appCtx.cards.forEach(function (card) {
                        if (card.name == cardName) {
                            card.flip = false;
                        }
                    });
                }

                removeFlipper(cardName);
                removeFlipper(this.preCardName);

                this.flipCounter[cardName] = 0;
                this.flipCounter[this.preCardName] = 0;

                this.preCardId = -1;
                this.preCardName = null;
            }
        },
    }
});