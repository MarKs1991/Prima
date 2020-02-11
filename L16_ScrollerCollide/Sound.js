"use strict";
var L16_ScrollerCollide;
(function (L16_ScrollerCollide) {
    /**
     * Handles and plays the sounds
     */
    class Sound {
        static init() {
            let audioElements = document.querySelectorAll("audio");
            for (let element of audioElements)
                Sound.sounds[element.id] = element;
        }
        static play(_id) {
            Sound.sounds[_id].play();
        }
        static playAtmo(_delay = Sound.atmoDelay) {
            Sound.play("Reflection");
            Sound.atmoBeat = (Sound.atmoBeat == 1) ? 2 : 1;
            Sound.atmoDelay = _delay;
            if (Sound.atmoDelay > 0)
                window.setTimeout(Sound.playAtmo, Sound.atmoDelay * 1000);
        }
        static breakAsteroid(_size) {
            let sound = "bangMedium";
            if (_size > 0.9)
                sound = "bangLarge";
            if (_size < 0.3)
                sound = "bangSmall";
            this.play(sound);
        }
    }
    Sound.atmoDelay = 0;
    Sound.sounds = {};
    Sound.atmoBeat = 1;
    L16_ScrollerCollide.Sound = Sound;
})(L16_ScrollerCollide || (L16_ScrollerCollide = {}));
//# sourceMappingURL=Sound.js.map