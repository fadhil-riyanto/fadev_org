console.log("I found you")

var anotherids = ["#main-page", "#resume-page", "#kontak-page", "#blog-index-page", "#blog-read-page"]
var literate_char_animation = 0;
var literate_array_position = 0;
var text_arr = ["Backend programmer", "HPC enthusiasts", "Web developer", "pengguna GNU/Linux",
                "Freelancer", "Network engineer"]; 
var speed = 140;

var global_read_filename = null;

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

function posts_get_link() {
    var value2copy = "https://www.fadev.org/?posts=" + global_read_filename;
    navigator.clipboard.writeText(value2copy);
    $("#copybtn").html("ter-copy!!")
    setTimeout(() => {
        $("#copybtn").html("copy")
    }, 1000);
    console.log("copied")
}

function read_page(file_to_load) {

    global_read_filename = file_to_load
    change_page("#blog-read-page")
    
    var md_html = "<md-block src=\"posts/" + file_to_load + ".md\">" +
                    "</md-block>";

    $("#article-body").html(md_html)
    // fetch("posts/" + file_to_load)
    //     .then(data => data.text())
    //     .then(body => {
    //         // $("md-block").html(body)
    //         console.log(body)
    //     })
}

function gen_html_article_list(title, desc, date, file){
    
    let html = 
    "<div class=\"p-1 m-2 fa_blog_lists\">" +
        "<div class=\"d-flex\">" +
            "<b>" + title + "</b>" +
            "&nbsp;~&nbsp;" +
            "<i>" + date + "</i>" +
        "</div>" +
        "<div class=\"d-flex\">" +
            "<i>" + desc + "</i>" +
            "<button type=\"button\" class=\"ms-auto btn btn-outline-info\" onclick=\"read_page('" + file + "')\">Baca</button>" +
        "</div>" +
    "</div>";

    $("#article-list").append(html)
}


function populate_article_list(data, from, to) {
    $("#article-list").empty()
    for(var i = from; i < data.length; i++) {
        if (to == "max") {
            if (i <= data.length) {
                gen_html_article_list(
                    data[i]["title"],
                    data[i]["desc"],
                    data[i]["date"],
                    data[i]["file"],
                )
            }
        } else if (i >= from && i <= to) {
            gen_html_article_list(
                data[i]["title"],
                data[i]["desc"],
                data[i]["date"],
                data[i]["file"],
            )

            console.log(data)
        }
    }
}

function load_article_lists() {
    fetch("list_articles.json")
        .then(datarecv => datarecv.json())
        .then(obj => populate_article_list(obj, 0, "max"))
}

function load_blog_from_hyperlink() {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("posts")) {
        // change page now
        change_page("#blog-read-page");
        read_page(searchParams.get("posts"))
    } else {
        typing_now()
        change_page("#main-page")
    }

}

function change_page(id) {
    for(let i = 0; i < anotherids.length; i++) {
        if (anotherids[i] == id) {

            // customfunction on load while user clicking
            if (anotherids[i] == "#blog-index-page") {
                load_article_lists()
                // console.log("executed")
            }
            $(anotherids[i]).show()
        } else {
            $(anotherids[i]).hide()
        }
    }
}
