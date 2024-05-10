console.log("I found you")

var anotherids = ["#main-page", "#resume-page", "#kontak-page"]
var literate_char_animation = 0;
var literate_array_position = 0;
var text_arr = ["Backend programmer", "HPC enthusiasts", "Web developer", "pengguna GNU/Linux",
                "Freelancer", "Network engineer"]; 
var speed = 140; /* The speed/duration of the effect in milliseconds */

function typing_now() {
    if (literate_array_position < text_arr.length) {
        if (literate_char_animation < text_arr[literate_array_position].length) {
            document.getElementById("typing-animate").innerHTML += text_arr[literate_array_position].charAt(literate_char_animation);
            literate_char_animation++;
            setTimeout(typing_now, speed);
            
          } else {
              document.getElementById("typing-animate").innerHTML = ""
              literate_array_position = literate_array_position + 1
              literate_char_animation = 0
              setTimeout(typing_now, speed);
          }
    } else {
        literate_array_position = 0;
        setTimeout(typing_now, speed);
    }
    
}

function change_page(id) {
    for(let i = 0; i < anotherids.length; i++) {
        if (anotherids[i] == id) {
            $(anotherids[i]).show()
        } else {
            $(anotherids[i]).hide()
        }
    }
}