
function creatPoint(num){
    calpointArray=new Array(num*num).fill(0);
    //获得屏幕宽度 可实现可变换大小的svg框
    x=window.innerWidth||window.document.documentElement.clientWidth||window.document.getElementById('pointarray');
    y=window.innerHeight||window.document.documentElement.clientWidth||window.document.getElementById('pointarray');
    let numx=Math.ceil((x)/25);
    let numy=Math.ceil((y)/25);

    let arr=[]
    for(let i=1;i<num*num;i++){
        arr.push(i);
    }
    var svg=d3.select("div[id='pointarray']").append("svg")
        .attr("width",1920)
        .attr("height",1080)
        .call( // 调用缩放
            d3.zoom()
                .scaleExtent([1, 10])
                .on("zoom", zoomHandler)
        );
    d3.select("svg").append("g").attr("id","Line");
    let circleSvg = svg.append('g').attr("id","Circle");
    var circle = circleSvg.selectAll("circle").data(arr);
    var circleEnter = circle.enter().append("circle");
    circleEnter.attr("cy",function (d,i){return (Math.floor(i/100)*25+25)});
    circleEnter.attr("cx",function (d,i){return (i%100)*25+25});
    circleEnter.attr("r",2);
    circleEnter.attr("fill","rgb(200,200,200)")
    svg.selectAll("circle")
        .attr("transform",function (){return "translate(" + 0 + ")";});

    function zoomHandler() {
        var transform = d3.event.transform;

        svg.attr("transform", "translate(" +
            transform.x + "," + transform.y +
            ")scale(" + transform.k + ")");
    }
}


function drawLine(){
    let drag = d3.drag()
        .on("drag",move);
    let svg=d3.selectAll("[id=Line]");
    svg=svg.append("g").attr("id","Line"+LineCount)
        .call(drag);
    let startx=parseInt(expLineSEPoint[0])/25-1;
    let starty=parseInt(expLineSEPoint[1])/25-1;
    let endx=parseInt(expLineSEPoint[2])/25-1;
    let endy=parseInt(expLineSEPoint[3])/25-1;
    console.log(startx+" "+starty+" "+endx+" "+endy);
    findPath(startx,starty,endx,endy,100,100);
    for(let i=0;i<expLineAllPoint.length-3;i+=2){
        let x1=0,y1=0,x2=0,y2=0;
        let flagx=0,flagy=0;
        if(expLineAllPoint[i]===expLineAllPoint[i+2]){
            x1=expLineAllPoint[i];
            y1=expLineAllPoint[i+1];
            x2=expLineAllPoint[i+2];
            y2=expLineAllPoint[i+3];
            for (let j=i+2;j<expLineAllPoint.length-3;j+=2){
                if(expLineAllPoint[j]===expLineAllPoint[j+2]){
                    x2=expLineAllPoint[j+2];
                    y2=expLineAllPoint[j+3];
                }else{
                    if((x2*25+25)===startx&&(y2*25+50)===starty){
                        i=j;
                        break;
                    }else{
                        i=j-2;
                        break;
                    }
                }
            }
        }else if(expLineAllPoint[i+1]===expLineAllPoint[i+3]){
            x1=expLineAllPoint[i];
            y1=expLineAllPoint[i+1];
            x2=expLineAllPoint[i+2];
            y2=expLineAllPoint[i+3];
            for (let j=i+2;j<expLineAllPoint.length-3;j+=2){
                if(expLineAllPoint[j+1]===expLineAllPoint[j+3]){
                    x2=expLineAllPoint[j+2];
                    y2=expLineAllPoint[j+3];
                }else{
                    if((x2*25+25)===startx&&(y2*25+50)===starty){
                        i=j;
                        break;
                    }else{
                        i=j-2;
                        break;
                    }
                }
            }
        }
        console.log(x1+" "+y1+" "+x2+" "+y2);
        svg.append("line")
            .attr("x1",x1*25+25)
            .attr("y1",y1*25+25)
            .attr("x2",x2*25+25)
            .attr("y2",y2*25+25)
            .attr("style","stroke:black;stroke-width:4")
    }
    console.log(expLineAllPoint);
    console.log(expMoPoint);
    expLineAllPoint=[];
    expMoPoint=[];
    LineCount += 1;
    // svg.append("line")
    //     .attr("x1",100)
    //     .attr("x2",700)
    //     .attr("y1",600)
    //     .attr("y2",600)
    //     .attr("style","stroke:rgba(255,0,0,0.6);stroke-width:4")
    //     .call(drag);

    // let tmpx=end.father[0].x;
    // let tmpy=end.father[0].y;
    // for(let i=1;i<length(end.father);i++){
    //     let line=svg.append("line")
    //         .attr("x1",tmpx)
    //         .attr("y1",tmpy)
    //         .attr("x2",end.father[i].x)
    //         .attr("y2",end.father[i].y)
    //         .attr("style","stroke:rgba(255,0,0,0.6);stroke-width:2");
    //     tmpx=end.father[i].x;
    //     tmpy=end.father[i].y;
    // }
    function move(d){
        var x1=d3.event.x,
            y1=d3.event.y;
            d3.select(this)
                .attr("transform",function (d){
                    return "translate(" + (x1-x1%25) + "," + (y1-y1%25) + ")";
                });
    }
    //移动小bug 点击之后线路 会自动偏移固定距离，尚未查明原因。。
}

function clearPage(){
    d3.select("svg").remove();
}
