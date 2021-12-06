
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
    document.getElementById(IMGID).style.borderTopWidth= "2px";
}
function setBorderB() { //bottom
    document.getElementById(IMGID).style.borderBottomColor = "black";
    document.getElementById(IMGID).style.borderBottomWidth= "2px";
}
function setBorderR() { //right
    document.getElementById(IMGID).style.borderRightColor = "black";
    document.getElementById(IMGID).style.borderRightWidth= "2px";
}
function setBorderL() { //left
    document.getElementById(IMGID).style.borderLeftColor = "black";
    document.getElementById(IMGID).style.borderLeftWidth= "2px";    
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

function payer() {
    fetch('clients/'+window.usager.id+'/panier', {
        headers: {
            'Authorization': 'Bearer '+window.usager.token
        }
    })
    .then(response => {return response.json()})
    .then(data => paiement(data))
}

function paiement(data) {
    var token = window.usager.token
    var panier = window.usager.produits
    console.log(data.items.length)
    var panierVide = false
    try {
        if (data.items.length == 0) {
            panierVide = true
            throw new Error("Le panier est vide")
        }
    } catch (error) {
        afficherMsgErreurPanier(error);
    }
    if (!panierVide) {
        fetch("/ventes",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token

                },
                method: "POST",
                body: JSON.stringify({idClient: 1})
            })
            .then(reponse => {
                if (reponse.ok) {
                    if (panierVide) {
                        return reponse.json();
                    } else {
                        throw new Error(reponse.text)
                    }
                }

            })
            .then(res => {
                console.log(res)
            })
            .catch(erreur => {
                console.log(erreur)
            });
    }
}

function afficherMsgErreurPanier(erreur) {
   // console.log(erreur)
    //err = erreur.toString().split(': ')
    document.getElementById('erreur-i_Paiement').innerHTML = "<p> erreur: le panier est vide </p>"
}
