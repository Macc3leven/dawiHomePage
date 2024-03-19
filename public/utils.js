/* ToolKit is stateless and doesnt know anything about the dom, it just 
has open functions for anything */
class ToolKit {
    constructor() {
        this.typeSpeed = 150;
    }

    reject(_bool, msg) {
        if(_bool) throw new Error(msg)
    }
    
    confirm(_bool, msg) {
        if(!_bool) throw new Error(msg)
    }
      
    findIndexOf(_array = [], _type) {
        return _array.findIndex(el => (el.type == _type));
    }

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    unType(element) {
        return new Promise(resolve => {

            var currentVal = element.innerText;
            const currentCharacters = currentVal.split('');
        
            currentCharacters.forEach((char, index) => {
                setTimeout(() => {
                    currentVal = currentVal.slice(0, (currentVal.length - 1));
                    element.innerText = currentVal;
                    if (currentVal.length < 1) resolve();
                }, this.typeSpeed * index);
            });
        }) 
    }
    
    async typeOut(element, newValue="") {
        await this.unType(element);
        var safeVale = newValue.replace(/ /g, "-");

        // Clear existing text
        element.innerText = ''; 

         // Split string into individual characters
        const characters = safeVale.split('');
        characters.forEach((char, index) => {
            setTimeout(() => {
                const safe = char == "-" ? '\u00A0' : char;

                // Append one character at a time
                element.innerText += safe;
            }, 100 * index);
        });
    }

    activateFullScreen() { //use: <button id="fullscreen-button">Go Fullscreen</button>
        const fullscreenButton = document.getElementById('fullscreen-button');

        fullscreenButton.addEventListener('click', () => {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) { // Firefox
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
                document.documentElement.msRequestFullscreen();
            }
        });
    }

    getComponent(name, callback) {
        const elemLocation = `./COMPONENTS/${name}.html`;

        fetch(elemLocation)
        .then(response => response.text())
        .then(html => callback(String(html)))
    }

    confirm(trueValue, msg) {
        if (!trueValue) throw new Error(String(msg));
    }

    //takes an object of {x,y,z} and parses it.
    parsible(ob, y, z) {
        if (typeof ob === "object") {
            const obj = { x: Number(ob.x), y: Number(ob.y), z: Number(ob.z) };
            return obj;

        } else return {x: Number(ob), y: Number(y), z: Number(z)}
        
    }
}



export default ToolKit;