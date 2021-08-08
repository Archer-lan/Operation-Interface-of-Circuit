var calpointArray;
// var expLineArray=[];//存寻路算法寻找到的连线点
// var expLinePoint=[];

var expMoPoint=[];
var expLineSEPoint=[];
var expLineAllPoint=[];
var inputCode=[];
var editor;
var LineCount=1;
//标记是否实现连线
var startThis;
var lineConnecFlag=0;

function getCode(){
    let line;
    line = editor.lineCount();
    for(let i=1;i<line;i++){
        inputCode.push(editor.getLine(i));
    }
}


