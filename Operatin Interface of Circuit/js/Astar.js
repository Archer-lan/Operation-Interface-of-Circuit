function Node(){
    this.pFather=null;
    this.G;
    this.F;
    this.H;
    this.x;
    this.y;
}
function OpenList(){
    this.next=null;
    this.node=new Node();
}

function Pabs(x){
    return x<0?(-x):x;
}
function Pdistant(x1,y1,x2,y2){
    return (Pabs(x1-x2)+Pabs(y1-y2));
}
function Padd(myList,addNode){
    // let tmp = new OpenList();
    let tmp = myList;
    while(tmp.next!=null){
        tmp=tmp.next;
    }
    tmp.next=addNode;
    addNode.next=null;
}
function listBrowse(myList,tmpX,tmpY){
    while(myList.next!=null){
        if((myList.next.node.x===tmpX)&&(myList.next.node.y===tmpY)){
            return myList.next;
        }
        myList=myList.next;
    }
    return null;
}

function judgeNodeExist(myList,x,y){
    while(myList.next!=null){
        if((myList.next.node.x===x)&&(myList.next.node.y===y)){
            return 0;
        }
        myList = myList.next;
    }
    return 1;
}

function Pdelete(myList,tmpX,tmpY){
    while(myList.next!=null){
        if((myList.next.node.x===tmpX)&&(myList.next.node.y===tmpY)){
            let tmp = new OpenList();
            tmp=myList.next;
            if(myList.next.next!=null){
                myList.next=myList.next.next;
                tmp.next=null;
            }else{
                myList.next=null;
                tmp.next=null;
            }
            return tmp;
        }
        myList=myList.next;
    }
    return null;
}

function findMinF(myList){
    let tmpf = myList.next.node.F;
    // let tmp = new OpenList();
    let tmp = myList.next;
    while(myList.next!=null){
        if(tmpf>myList.next.node.F){
            tmpf=myList.next.node.F;
            tmp=myList.next;
        }
        myList=myList.next;
    }
    return tmp;
}
//用来核查Astar是否正确。。
function printList(myList){
    while(myList.next!=null){
        console.log(myList.next.node.x+" "+myList.next.node.y+" "+myList.next.node.F);
        myList=myList.next;
    }
}

function printFather(myList){
    while(myList.node.pFather!=null){
        console.log(myList.node.pFather.node.x+" "+myList.node.pFather.node.y);
        expLineAllPoint.push(myList.node.pFather.node.x);
        expLineAllPoint.push(myList.node.pFather.node.y);
        myList = myList.node.pFather;
    }
    // console.log("trank end");
}

function findPath(startX,startY,endX,endY,maxX,maxY){
    console.log(calpointArray);
    // calpointArray[(startX+(startY-1)*100)]=2;
    // calpointArray[(endX+(endY-1)*100)]=3;
    let Op = new OpenList();
    Op.next=null;
    let Pc = new OpenList();
    Pc.next=null;

    let start=new OpenList();
    start.next=null;
    let end= new OpenList();
    end.next=null;

    start.node.pFather=null;
    start.node.x=startX;
    start.node.y=startY;
    start.node.G = 0;
    start.node.H = (Pabs(endX-startX)+Pabs(endY-startY));
    start.node.F = start.node.G + start.node.H;

    end.node.pFather = null;
    end.node.x = endX;
    end.node.y = endY;

    Padd(Op,start);
    let x=[-1,0,1,0];
    let y=[0,-1,0,1];
    let i,cir=1;
    while(cir){
        // printList(Op);
        let Current=new OpenList();
        Current = findMinF(Op);
        let p=new OpenList();
        p = Pdelete(Op,Current.node.x,Current.node.y);
        Padd(Pc,p);
        // console.log("core is"+p.node.x+" "+p.node.y);
        // console.log("now,the open list is follow")
        // printList(Op);
        for(i=0;i<4;i++){
            if((p.node.x+x[i]<=0)||(p.node.x+x[i]>=maxX-1)||(p.node.y+y[i]<=0)||(p.node.y+y[i]>=maxY-1)){
                continue;
            }
            if(judgeNodeExist(Op,p.node.x+x[i],p.node.y+y[i])){
                if(1===calpointArray[p.node.x+x[i]+((p.node.y+y[i]))*100]){
                    continue;
                }
                else if (!(judgeNodeExist(Pc,p.node.x+x[i],p.node.y+y[i]))){
                    continue;
                }
                else if (((p.node.x+x[i])===endX)&&((p.node.y+y[i])===endY)){
                    end.node.pFather=p;
                    cir = 0;
                    break;
                }
                else {
                    let tmp = new OpenList();
                    tmp.next=null;
                    tmp.node.pFather=p;
                    tmp.node.x=p.node.x+x[i];
                    tmp.node.y=p.node.y+y[i];
                    tmp.node.G=Pdistant(tmp.node.x,tmp.node.y,startX,startY);
                    tmp.node.H=(Pabs(endX-tmp.node.x)+Pabs(endY-tmp.node.y));
                    tmp.node.F=tmp.node.G + tmp.node.H;
                    Padd(Op,tmp);
                    // printList(Op);
                }
            }
            else{
                let tmp = new OpenList();
                tmp = listBrowse(Op,p.node.x+x[i],p.node.y+y[i]);
                let currentG = p.node.G + Pdistant(tmp.node.x,tmp.node.y,p.node.x,p.node.y);
                let pastG = tmp.node.G;
                if(currentG<pastG){
                    tmp.node.pFather=p;
                    tmp.node.G=currentG;
                    tmp.node.F=tmp.node.G+tmp.node.H;
                }
            }
        }
        if (cir===0){
            break;
        }
    }
    // let m=expMoPoint.pop()/25;
    // let n=expMoPoint.pop()/25;
    expLineAllPoint.push(expMoPoint.pop()/25-1);
    expLineAllPoint.push(expMoPoint.pop()/25-1);
    expLineAllPoint.push(endX);
    expLineAllPoint.push(endY);
    printFather(end);
    expLineAllPoint.push(expMoPoint.pop()/25-1);
    expLineAllPoint.push(expMoPoint.pop()/25-1);
}