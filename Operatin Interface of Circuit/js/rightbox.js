function creatTable(x,y){
    let rows=x;
    let cols=y;
    let div1=document.getElementById("rightBox1");
    let tab='<table border=1 width=220 height="100">'
    for(let i=0;i<rows;i++){
        tab +='<tr>'
        for(let j=0;j<cols;j++){
            tab +="<td style='background-color: #FFFFFF'>"+i+j+"</td>"
        }
        tab +='</tr>'
    }
    tab +='</table>';

    div1.innerHTML=tab
}
