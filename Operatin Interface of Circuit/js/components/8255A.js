function Compo8255A(){
    this.id;
    this.name="8253A";
    this.width= 200;
    this.height = 625;
    this.pinDiv=13;
    this.pinCount=37;
    this.translateX=0;
    this.translateY=0;
    this.pinName= new Array("D0","D1","D2","D3","D4","D5","D6","D7","RD","WR","A0","A1"
        ,"CS","CLK0","GATE0","OUT0","CLK1","GATE1","OUT1","CLK2","GATE2","OUT2");
    this.pinFunction = new Array();
    this.pinNum = new Array(8,7,6,5,4,3,2,1,22,23,19,20,21,9,11,10,15,14,13,18,16,17);
    this.connection = new Array([],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]);
}