let IMGID = 'aucun';

function dom() {
    console.log('livraison a domicile sélectionnée');
    delAllBorder();
    if (IMGID != 'img-dom') { //si deja selectionné on supprime la selection
        IMGID = 'img-dom';
        setBorderL();
        setBorderT();
    } else {IMGID = 'aucun';}
}
function rel() {
    console.log('livraison en point relai sélectionnée');
    delAllBorder();
    if (IMGID != 'img-rel') {
        IMGID = 'img-rel';
        setBorderR();
        setBorderT();
    } else {IMGID = 'aucun';}
}
function exp() {
    console.log('livraison express sélectionnée')
    delAllBorder();
    if (IMGID != 'img-exp') { 
        IMGID = 'img-exp';
        setBorderL();
        setBorderB();
    } else {IMGID = 'aucun';}
}
function mag() {
    console.log('livraison en magasin sélectionnée')
    delAllBorder();
    if (IMGID != 'img-mag') {
        IMGID = 'img-mag';
        setBorderR();
        setBorderB();
    } else {IMGID = 'aucun';}
}
function setBorderT() { //top
    document.getElementById(IMGID).style.borderTopColor = "black";
    document.getElementById(IMGID).style.borderTopWidth= "4px";
}
function setBorderB() { //bottom
    document.getElementById(IMGID).style.borderBottomColor = "black";
    document.getElementById(IMGID).style.borderBottomWidth= "4px";
}
function setBorderR() { //right
    document.getElementById(IMGID).style.borderRightColor = "black";
    document.getElementById(IMGID).style.borderRightWidth= "4px";
}
function setBorderL() { //left
    document.getElementById(IMGID).style.borderLeftColor = "black";
    document.getElementById(IMGID).style.borderLeftWidth= "4px";    
}
function delAllBorder() {   
    document.getElementById('img-mag').style.borderRightColor = "white";
    document.getElementById('img-mag').style.borderBottomColor = "white";
    document.getElementById('img-rel').style.borderRightColor = "white";
    document.getElementById('img-rel').style.borderTopColor = "white";
    document.getElementById('img-dom').style.borderLeftColor = "white";
    document.getElementById('img-dom').style.borderTopColor = "white";
    document.getElementById('img-exp').style.borderLeftColor = "white";
    document.getElementById('img-exp').style.borderBottomColor = "white";
}