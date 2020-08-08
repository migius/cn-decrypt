
var indiciNoti = [7,13,15,0,25,6,2,1,3,9,3,0,24,0,3,3,18,2,14,18,17,0,0,13,11,8];

var alphabet = "abcdefghijklmnopqrstuvwxyz";

function CreaShiftInput(id) {
    var item;
    item= document.createElement("div");
    item.id = "shift_" + (id);
    item.classList.add("col-12");
    item.classList.add("sospetto-div" );
    item.setAttribute("onclick","selectCard('" + item.id + "')");
    var img = document.createElement("img");        
    img.src = value;
    img.classList.add("sospetto-img" );
    
    item.appendChild(img);
}

var cnDecrypto = new Vue({
    el: '#cn-decrypto',
    data: {
        encrypted: "pjh.ubcbfmftcsrkqtqzbe.pde/imruadexcobxoydkrsvzcmrnkiekpunuekurnaehradjqs",
        shifts: []
    },
    computed: {  
        decrypted: function () {if(this.shifts.length === 0) return ""; var d = ""; this.shifts.forEach(function(s){d += s.decrypted();}); return d; },
        key: function () {
            var keys = [];
            var letters = [...alphabet];
            let cnd = this;
            letters.forEach(function(letter, ind){

                if(cnd.shifts.length === 0) return ""; 
                var d = ""; 
                cnd.shifts.forEach(
                    function(s){
                        if(s.encrypted === "." || s.encrypted === "/" )
                            d += s.encrypted;
                        else
                            d += CaesarCipher(letter, parseInt(s.shift));
                    }); 
                keys.push(d); 
            });
            return keys;
        },
    }
})

function CaesarCipher(str, num) {
    var newStr = "";

    for (var i = 0; i < str.length; i++) {
        var char = str[i],
            isUpper = char === char.toUpperCase() ? true : false;

        char = char.toLowerCase();

        if (alphabet.indexOf(char) > -1) {
            var newIndex = alphabet.indexOf(char) + num;
            if(newIndex < alphabet.length) {
              isUpper ? newStr += alphabet[newIndex].toUpperCase() : newStr += alphabet[newIndex];
            } else {
              var shiftedIndex = -(alphabet.length - newIndex);
                isUpper ? newStr += alphabet[shiftedIndex].toUpperCase() : newStr += alphabet[shiftedIndex];
            }
        } else {
           newStr += char;
        }
    }
    return newStr;
}



$(document).ready(function(){
    console.log("start");

    var chars = [...cnDecrypto.encrypted];
    chars.forEach(function(char, ind){

        let s = {
            encrypted: char,
            index: ind,
            shift: ((indiciNoti.length > ind) ? indiciNoti[ind] : 0),
            decrypted: function(){ return CaesarCipher(this.encrypted, parseInt(this.shift));}
        };

        cnDecrypto.shifts.push(s);       

    });



    console.log("end"); 
})

