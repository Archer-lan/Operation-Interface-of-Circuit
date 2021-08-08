function Compo80x86(){
    this.id;
    this.name="80x86";
    this.width= 225;
    this.height = 275;
    this.pinDiv=9;
    this.pinCount=18;
    this.translateX=0;
    this.translateY=0;
    this.pinName= new Array("RESET","READY","INTA/QSA","INTR","HOLD/GT1","HLDA/GT0","TEST","NMI",
        "MN/MX","CLK","AD[0..15]","A[16..19]","ALE/QS0","BHE","DT/R/S1","DEN/S2","RD","WR/LOCK","M/IO/S0");
    this.pinFunction = new Array();
    this.pinNum = new Array(21,22,24,18,31,30,23,17,33,19," "," ",25,34,27,26,32,29,28);
    this.connection = new Array([],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]);
}