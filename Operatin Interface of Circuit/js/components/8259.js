function Compo8259(){
    this.id;
    this.name="8259";
    this.width= 150;
    this.height = 250;
    this.pinDiv=8;
    this.pinCount=16;
    this.translateX=0;
    this.translateY=0;
    this.pinName= new Array("IR0","IR1","IR2","IR3","IR4","IR5","IR6","IR7","CAS[0..2]",
                        "D[0..7]","CS","WR","RD","A0","SP/EN","INT","INTA");
    this.pinFunction = new Array();
    this.pinNum = new Array(18,19,20,21,22,23,24,25,26,0,1,2,3,27,16,17,26);
    this.connection = new Array([],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]);
}