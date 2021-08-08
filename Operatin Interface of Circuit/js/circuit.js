function Circuit(){
    var _this = this;
    _this.position=[];
    _this.componetAll= [];
    _this.count = 0;
    this.targetPin = null;
    this.addComponent = function (componentName,offsetX,offsetY,componentId){
        let component = new window[componentName];
        //将器件摆置的初始位置矩阵设置为1，不可达
        //器件方块区域
        for(let i=offsetY;i<=(component.height+offsetY);i+=25) {
            for (let j=offsetX;j<=(component.width+offsetX);j+=25){
                calpointArray[j/25-1+(i/25-1)*100]=1;
                this.position.push(j/25-1+(i/25-1)*100);
            }
        }

        //器件引脚区域
        for(let i=0;i<=component.pinCount;i++) {
            if (i <= component.pinDiv) {
                calpointArray[((offsetX-50)/25+((i*25+offsetY)/25)*100)]=1;
                this.position.push(((offsetX-50)/25+((i*25+offsetY)/25)*100));
            } else {
                calpointArray[((offsetX+component.width)/25+((i%(component.pinDiv+1)*25+offsetY)/25)*100)] = 1;
                this.position.push(((offsetX+component.width)/25+((i%(component.pinDiv+1)*25+offsetY)/25)*100));
            }
        }

        // 打印点阵数组
        // for (let i=0;i<calpointArray.length;i++){
        //     console.log(calpointArray[i]);
        //     if(i%100===99)
        //         console.log("</br>");
        // }

        //定义拖动
        let drag = d3.drag()
            .on("drag",move)
            //实现拖动之后 点阵数组值的变换。
            .on("end",function (){
                // for(let i=0;i<_this.position.length;i++){
                //     calpointArray[_this.position.pop()]=0;
                // }
                let k=0;
                while(1){
                    if(k>=parseInt(_this.position.length)){
                        _this.position=[];
                        break;
                    }
                    calpointArray[_this.position[k]]=0;
                    k++;
                }
                // 器件方块区域
                for(let i=offsetY+component.translateY;i<=(component.height+offsetY+component.translateY);i+=25) {
                    for (let j=offsetX+component.translateX;j<=(component.width+offsetX+component.translateX);j+=25){
                        calpointArray[j/25-1+(i/25-1)*100]=1;
                        _this.position.push(j/25-1+(i/25-1)*100);
                    }
                }
                //器件引脚区域
                for(let i=0;i<=component.pinCount;i++) {
                    if (i <= component.pinDiv) {
                        calpointArray[((offsetX+component.translateX-50)/25+((i*25+offsetY+component.translateY)/25)*100)]=1;
                        _this.position.push(((offsetX+component.translateX-50)/25+((i*25+offsetY+component.translateY)/25)*100));
                    } else {
                        calpointArray[((offsetX+component.translateX+component.width)/25+((i%(component.pinDiv+1)*25+offsetY+component.translateY)/25)*100)] = 1;
                        _this.position.push(((offsetX+component.translateX+component.width)/25+((i%(component.pinDiv+1)*25+offsetY+component.translateY)/25)*100));
                    }
                }
                // for (let i=0;i<calpointArray.length;i++){
                //     console.log(calpointArray[i]);
                //     if(i%100===99)
                //         console.log("</br>");
                // }
            })
        //以一个器件为一个<g>元素方便拖动操作
        let svg = d3.select("svg").append("g")
            .attr("id","Com"+_this.count);
        //设置器件的ID
        if(componentId == null){
            component.id = "CP" + _this.count;
        }else{
            component.id = componentId;
        }
        //绘制器件中心方块区域
        svg.append("rect")
            .attr("width",component.width)
            .attr("height",component.height)
            .attr("x",function (){
                return offsetX;
            })
            .attr("y",function () {
                return offsetY;
            })
            .attr("style","fill:white;stroke:rgb(128,0,0);stroke-width:4;opacity:1");
        //绘制器件引脚区域
        svg.selectAll("line")
            .data(component.pinNum)
            .enter()
            .append("line")
            .attr("x1",function (d,i){
                if(i<=component.pinDiv){
                    return offsetX-25;
                }else{
                    return offsetX+component.width;
                }
            })
            .attr("y1",function (d,i){
                if(i<=component.pinDiv){
                    return i*25+25+offsetY;
                }else{
                    return (i%(component.pinDiv+1))*25+25+offsetY;
                }
            })
            .attr("x2",function (d,i){
                if(i<=component.pinDiv){
                    return offsetX;
                }else{
                    return offsetX+component.width+25;
                }
            })
            .attr("y2",function (d,i){
                if(i<=component.pinDiv){
                    return i*25+25+offsetY;
                }else{
                    return (i%(component.pinDiv+1))*25+25+offsetY;
                }
            })
            .attr("style","stroke:rgba(128,0,0,1);stroke-width:4")
            .attr("id",function (d,i){
                return i;
            });
        //器件引脚添加文字描述
        svg.selectAll("text")
            .data(component.pinName)
            .enter()
            .append("text")
            .attr("fill","black")
            .attr("font-size","14px")
            .attr("font-weight","bold")
            .attr("text-anchor",function (d,i){
                if(i<=component.pinDiv){
                    return "start";
                }else{
                    return "end";
                }
            })
            .attr("x",function (d,i){
                if(i<=component.pinDiv){
                    return offsetX+5;
                }else{
                    return offsetX+component.width-5;
                }
            })
            .attr("y",function (d,i){
                if (i<=component.pinDiv){
                    return i*25+28+offsetY;
                }else{
                    return (i%(component.pinDiv+1))*25+28+offsetY;
                }
            })
            .text(function (d){return d;});
        svg.append("text")
            .attr("fill","rgba("+128+","+0+","+0+","+1+")")
            .attr("font-size","20px")
            .attr("font-weight","bold")
            .attr("x",function (d,i){
                return offsetX+5;
            })
            .attr("y",function (d,i) {
                return offsetY-5;
            })
            .text(function (d){return component.name;});

        //为器件添加拖动，选中指定id的<g>元素
        d3.select("[id=Com"+_this.count+"]").call(drag);
        _this.componetAll.push(d3.select("[id=Com"+_this.count+"]"));
        _this.count +=1;

        //为器件针脚部分填加点击连线事件
        svg.selectAll("line")
            .on("click",function () {
                d3.drag().filter();
                let x=parseInt(this.id)
                d3.select(this)
                    .attr("style","stroke:red;stroke-width:4");
                if(lineConnecFlag===0){
                    startThis=this;
                    //器件左右判定。
                    if(x<=component.pinDiv){
                        expLineSEPoint.push((parseInt($(this).attr("x1"))+component.translateX)-25);
                        expLineSEPoint.push((parseInt($(this).attr("y1"))+component.translateY));

                        expMoPoint.push((parseInt($(this).attr("y1"))+component.translateY));
                        expMoPoint.push((parseInt($(this).attr("x1"))+component.translateX));
                    }else{
                        expLineSEPoint.push((parseInt($(this).attr("x2"))+component.translateX)+25);
                        expLineSEPoint.push((parseInt($(this).attr("y2"))+component.translateY));

                        expMoPoint.push((parseInt($(this).attr("y2"))+component.translateY));
                        expMoPoint.push((parseInt($(this).attr("x2"))+component.translateX));
                    }
                    console.log(expLineSEPoint);
                    lineConnecFlag=1;
                }else if(lineConnecFlag===1){
                    if(x<=component.pinDiv){
                        expLineSEPoint.push((parseInt($(this).attr("x1"))+component.translateX)-25);
                        expLineSEPoint.push((parseInt($(this).attr("y1"))+component.translateY));

                        expMoPoint.push((parseInt($(this).attr("y1"))+component.translateY));
                        expMoPoint.push((parseInt($(this).attr("x1"))+component.translateX));
                    }else{
                        expLineSEPoint.push((parseInt($(this).attr("x2"))+component.translateX)+25);
                        expLineSEPoint.push((parseInt($(this).attr("y2"))+component.translateY));

                        expMoPoint.push((parseInt($(this).attr("y2"))+component.translateY));
                        expMoPoint.push((parseInt($(this).attr("x2"))+component.translateX));
                    }
                    console.log(expLineSEPoint);
                    if(expLineSEPoint[0]===expLineSEPoint[2]&&expLineSEPoint[1]===expLineSEPoint[3]){
                        d3.select(startThis)
                            .attr("style","stroke:rgba(128,0,0,1);stroke-width:4");
                        expLineSEPoint=[];
                    }else{
                        d3.select(startThis)
                            .attr("style","stroke:rgba(128,0,0,1);stroke-width:4");
                        d3.select(this)
                            .attr("style","stroke:rgba(128,0,0,1);stroke-width:4");
                        drawLine();
                        expLineSEPoint=[];
                    }
                    lineConnecFlag=0;
                }
            });

        //拖拽移动器件模块
        function move(){
            let x1=d3.event.x,
                y1=d3.event.y;
            d3.select(this)
                .attr("transform",function (){
                    component.translateX=(x1-x1%25)-component.width*2;
                    component.translateY=(y1-y1%25)-component.height;
                    //玄学减掉器件初始长宽，触发移动事件仍有bug偏移鼠标不在正中心
                    return "translate(" + ((x1-x1%25)-component.width*2) + "," + ((y1-y1%25)-component.height) + ")";

                });
        }
    }
}