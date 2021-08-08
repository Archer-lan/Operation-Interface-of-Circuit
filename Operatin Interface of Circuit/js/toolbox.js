// 侧拉栏效果
function toolbox(){
    var _this = this;
    _this.tooltipSelect=0;
    _this.tooltipName="";

    //侧拉栏
    _this.editorFlag=0;
    _this.bottomSelect=0;
    _this.rightSelect=0;
    _this.leftSelect=0;
    $('#lefttoolbox').hide();
    $('#bottomtoolbox').hide();
    $('#righttoolbox').hide();
    $('#leftbtn').click(function (){
        $('#lefttoolbox').toggle(500);
        if(_this.leftSelect==0){
            _this.leftSelect=1;
            $('#leftbtn').animate({left:'224px'});
        }
        else{
            _this.leftSelect=0;
            $('#leftbtn').animate({left:'0px'});
        }
    })
    $('#bottombtn').click(function (){
        $('#bottomtoolbox').toggle(500);
        if(_this.bottomSelect==0){
            _this.bottomSelect=1;
            if(_this.editorFlag==0){
                editor=CodeMirror.fromTextArea(document.getElementById("code"),{
                    lineNumbers:true,
                    theme:"solarized-light",
                    height:"150px"
                });
                _this.editorFlag=1;
            }
            $('#bottombtn').animate({bottom:'200px'});
        }
        else{
            _this.bottomSelect=0;
            $('#bottombtn').animate({bottom:'0px'});
        }
    })
    $(function (){
        $('#rightbtn').click(function (){
            $('#righttoolbox').toggle(500);
            if(_this.rightSelect==0){
                _this.rightSelect=1;
                $('#rightbtn').animate({right:'214px'});
            }
            else{
                _this.rightSelect=0;
                $('#rightbtn').animate({right:'0px'});
            }
        });
    });
    // 左侧拉栏伸缩列表
    $(function (){$('#accordion').accordion({heightStyle:"content"});});
    $(function (){
        $('#accordion-resizer').resizable({
            minHeight:250,
            minWidth:150,
            resize:function (){
                $("#accordion").accordion("refresh");
            }
        });
        $('#accordion').accordion({ collapsible:true });
    });
    //器件拖拽
    $(function (){
       $("#accordion li").mousedown(function (e){
           _this.tooltipSelect = 1;
           _this.tooltipName = $(e.target).text();
       });

       $("#pointarray").mouseup(function (e){
           if(_this.tooltipSelect==1){
               lefttop = $("#toolbox").offset();
               right = lefttop.left + $("#toolbox").width();
               bottom = lefttop.top + $("#toolbox").height();
               if(!(e.pageX > lefttop.left && e.pageY < right &&e.pageY > lefttop.top && e.pageY<bottom)){
                   var cName = _this.tooltipName;
                   mycircuit.addComponent("Compo"+cName,(e.pageX-e.pageX%25),(e.pageY-e.pageY%25));
               };
           };
           _this.tooltipSelect = 0;
       });
    });
    // $(function (){
    //     $("#toolbox").draggable({ handle:"h1" });
    // });
    $(function (){
        $("#accordion li").draggable({ appendTo:"#demo",helper:"clone"});
    });

    // editor=CodeMirror.fromTextArea(document.getElementById("code"),{
    //     lineNumbers:true,
    //     value:"\n\n\n\n\n\n\n\n\n\n\n\n",
    //     theme:"solarized-light",
    //     height:"150px"
    // });
    // $(".CodeMirror-scroll").hover(function () {
    //     $(this).get(0).style.cursor = "text";
    // });
};
