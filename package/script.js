let pointonebtn=document.getElementsByClassName("ponit_one_btn");
for(item of pointonebtn){
    item.click();
}
let checkbtn=document.getElementsByClassName("check_btn");
for(item of checkbtn){
    item.click();
}
let commentbtn=document.getElementsByClassName("comment_btn");
for(item of commentbtn){
    item.click();
}

let iframes = document.getElementsByClassName("cboxElement");
for (let i = 0; i < iframes.length; i++) {
    iframes[i].addEventListener("click", () => {
        setTimeout(() => {
            let doginner = document.createElement("img");
            doginner.setAttribute("src", "../common/images/dog.gif");
            doginner.setAttribute("style", "width:83px;height:75px;object-fit:cover;object-position:100% 0;filter: grayscale(100%);");
            doginner.setAttribute("id", "inu");
            let dog = document.createElement("div");
            dog.appendChild(doginner);
            dog.setAttribute("style", "text-align:right;");
            document.querySelector("iframe").contentWindow.document.body.appendChild(dog);
            dog.addEventListener("click", () => {
                showAnswer();
            }, {
                once: true
            });
        }, 500);
    }, false);
}

function showAnswer() {

    let iframedocument = document.querySelector("iframe").contentWindow.document;

    iframedocument.getElementById("inu").setAttribute("style", "width:83px;height:75px;object-fit:cover;object-position:100% 0;");

    let blanklist = iframedocument.querySelectorAll("input[type='text']");
    let res = [];
    for (piece of blanklist) {
        piece.defaultValue = piece.getAttribute("a");
    }

    let blankselect = iframedocument.querySelectorAll("select");
    for (piece of blankselect) {
        for (item of piece.options) {
            if (item.textContent == piece.getAttribute("a")) {
                item.selected = true;
                break;
            }
        }
    }

    if (iframedocument.querySelector("h3").textContent.includes("日本語に訳しましょう")) {
        let lilist = iframedocument.querySelectorAll("li");
        let fsentences = [];
        let jsentences = [];

        for (let i = 0; i < lilist.length; i++) {
            let item = lilist[i].textContent;
            lastperiod = item.lastIndexOf(".") + 1;
            item = item.slice(0, lastperiod);
            if (!(lilist[i].querySelector("input[type='text']") === null)) {
                item = item.replace("  ", " " + lilist[i].querySelector("input[type='text']").getAttribute("a") + " ");
            }
            item = String(i + 1) + ". " + item;
            fsentences.push(item);
            fetch(`https://script.google.com/macros/s/AKfycbxI_Q-jvZS6PeFzgHhYvuUgsum5Pod1I9h-MIqVLy6QQHpmlLc/exec?text=${item}&source=fr&target=ja`,{mode:'cors'})
                .then(res => {
                    res.text().then(res => {
                        jsentences.push(res);
                    })
                });
        }

        setTimeout(() => {
            jsentences.sort();
            for (let i = 0; i < lilist.length; i++) {
                lilist[i].appendChild(document.createElement('br'));
                lilist[i].appendChild(document.createTextNode(jsentences[i]));
            }
        }, 2500);
    }
}