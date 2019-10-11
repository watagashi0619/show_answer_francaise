chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request == "showAnswer") {
        showAnswer();
    }
}); 

function showAnswer()
{
    var iframedocument = document.querySelector("iframe").contentWindow.document;

    var blanklist = iframedocument.querySelectorAll("input[type='text']");
    var res=[];
    for(piece of blanklist){
        piece.defaultValue = piece.getAttribute("a");
    }

    var blankselect = iframedocument.querySelectorAll("select");
    for(piece of blankselect){
        for(item of piece.options){
            if(item.textContent == piece.getAttribute("a")){
                item.selected = true;
                break;
            }
        }
    }

    if(iframedocument.querySelector("h3").textContent.includes("日本語に訳しましょう")){
        var lilist = iframedocument.querySelectorAll("li");
        var fsentences=[];
        var jsentences=[];
        
        for(let i=0;i<lilist.length;i++){
            var item = lilist[i].textContent;
            lastperiod = item.lastIndexOf(".")+1;
            item = item.slice(0,lastperiod);
            if(!(lilist[0].querySelector("a")===null)){
                item = item.replace("  "," "+lilist[i].querySelector("input[type='text']").getAttribute("a")+" ");
            }
            item = String(i+1) +". "+ item;
            fsentences.push(item);
            fetch(`https://script.google.com/macros/s/AKfycbweJFfBqKUs5gGNnkV2xwTZtZPptI6ebEhcCU2_JvOmHwM2TCk/exec?text=${item}&source=fr&target=ja`)
            .then(res=>{
                res.text().then(res=>{
                    jsentences.push(res);
                })
            });
        }

        var aftertimeout = function(){
            jsentences.sort();
            for(let i=0;i<lilist.length;i++){
                lilist[i].appendChild(document.createElement('br'));
                lilist[i].appendChild(document.createTextNode(jsentences[i]));
            }
        }

        setTimeout(aftertimeout, 2500);

    }
}