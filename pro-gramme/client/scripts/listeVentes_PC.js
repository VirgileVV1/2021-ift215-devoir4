
/* recue: 'reçue', prepare: 'préparée', en_route: 'en route', livree: 'livrée'} */

function chargerlisteVentes() {

    if (window.usager == undefined) {
        redirectionConnexion()
    } else if (window.usager.role != 'admin') {
        redirectionConnexion()
    } else {
        getVentes()
    }
    
}


function getVentes() {
    fetch('ventes', {
        headers: {
          'Authorization': 'Bearer '+window.usager.token
        }
    }).then(reponse => {
        return reponse.json()
    }).then(data => {
        console.log(data)
        trierVentes(data)
    })
}

var PREPARATION = []
var LIVRAISON = []
var RECUE = []
var LIVREE = []

function trierVentes(ventes) {
    for (i in ventes) {
        if (ventes[i].status == "prepare") {
            PREPARATION.push(ventes[i])
        } else if (ventes[i].status == "reçue") {
            RECUE.push(ventes[i])
        } else if (ventes[i].status == "en_route") {
            LIVRAISON.push(ventes[i])
        } else if (ventes[i].status == "livree") {
            LIVREE.push(ventes[i])
        }
    }
}


/**
 * Affichage des ventes qui viennent d'etre effectuer par le client
 */
 function recue() {
    console.log(RECUE)
    let contenu = ""
    for (i in RECUE) {
        contenu += "<div class=\"element\"> <div class=\"texte\"> <p> Numéro client : "+RECUE[i].idClient +"</p>  "
        contenu += " <p> Montant total : "+RECUE[i].montant +" </p> "
        contenu += " <p> Status de la commande : "+RECUE[i].status +" </p>"
        contenu += "<p> Produits commandés : </p>"
        for (j in RECUE[i].produits) {
            let p= RECUE[i].produits[j]
            contenu += "&emsp;"+ p.nomProduit
            contenu += "&emsp; "+ p.prix +"$ "
            contenu += "&emsp;x"+ p.quantite +"<br>"

        }

        contenu += "<p></p></div>"
        contenu += "<div class=\"div-etapeSuiv\"> <button class=\"btn-etapeSuiv\"> Etape suivante >> </button></div></div>"
    }
    document.getElementById('contenu-livraison').innerHTML = ""
    document.getElementById('contenu-preparation').innerHTML = ""
    document.getElementById('contenu-livree').innerHTML = ""

    document.getElementById('contenu-recue').innerHTML = contenu
}

/**
 * Affichage des ventes en cours de préparation
 */
function preparation() {
    console.log(PREPARATION)
    let contenu = ""

    for (i in PREPARATION) {
        contenu += "<div class=\"element\"> <div class=\"texte\"> <p> Numéro client : "+PREPARATION[i].idClient +"</p>  "
        contenu += " <p> Montant total : "+PREPARATION[i].montant +" </p> "
        contenu += " <p> Status de la commande : "+PREPARATION[i].status +" </p>"
        contenu += "<p> Produits commandés : </p>"
        for (j in PREPARATION[i].produits) {
            let p= PREPARATION[i].produits[j]
            contenu += "&emsp;"+ p.nomProduit
            contenu += "&emsp; "+ p.prix +"$ "
            contenu += "&emsp;x"+ p.quantite +"<br>"

        }

        contenu += "<p></p></div>"
        contenu += "<div class=\"div-etapeSuiv\"> <button class=\"btn-etapeSuiv\"> Etape suivante >> </button></div></div>"
    }

    document.getElementById('contenu-livraison').innerHTML = ""
    document.getElementById('contenu-recue').innerHTML = ""
    document.getElementById('contenu-livree').innerHTML = ""

    document.getElementById('contenu-preparation').innerHTML = contenu
}

/**
 * Affichage des ventes en cours de livraison
 */
function livraison() {
    fetch('/statusCommande')
    .then(reponse=> {
        return reponse.json()
    })
    .then(data => {
        console.log(data)
    })
    /* recue: 'reçue', prepare: 'préparée', en_route: 'en route', livree: 'livrée'} */
    console.log(LIVRAISON)
    let contenu = ""

    for (i in LIVRAISON) {
        contenu += "<div class=\"element\"> <div class=\"texte\"> <p> Numéro client : "+LIVRAISON[i].idClient +"</p>  "
        contenu += " <p> Montant total : "+LIVRAISON[i].montant +" </p> "
        contenu += " <p> Status de la commande : "+LIVRAISON[i].status +" </p>"
        contenu += "<p> Produits commandés : </p>"
        for (j in LIVRAISON[i].produits) {
            let p= LIVRAISON[i].produits[j]
            contenu += "&emsp;"+ p.nomProduit
            contenu += "&emsp; "+ p.prix +"$ "
            contenu += "&emsp;x"+ p.quantite +"<br>"

        }

        contenu += "<p></p></div>"
        contenu += "<div class=\"div-etapeSuiv\"> <button class=\"btn-etapeSuiv\"> Etape suivante >> </button></div></div>"
    }

    document.getElementById('contenu-preparation').innerHTML = ""
    document.getElementById('contenu-recue').innerHTML = ""
    document.getElementById('contenu-livree').innerHTML = ""

    document.getElementById('contenu-livraison').innerHTML = contenu
}


/**
 * Affichage des ventes en cours de livraison
 */
 function livree() {

    console.log(LIVREE)
    let contenu = ""

    for (i in LIVREE) {
        contenu += "<div class=\"element\"> <div class=\"texte\"> <p> Numéro client : "+LIVREE[i].idClient +"</p>  "
        contenu += " <p> Montant total : "+LIVREE[i].montant +" </p> "
        contenu += " <p> Status de la commande : "+LIVREE[i].status +" </p>"
        contenu += "<p> Produits commandés : </p>"
        for (j in LIVREE[i].produits) {
            let p= LIVREE[i].produits[j]
            contenu += "&emsp;"+ p.nomProduit
            contenu += "&emsp; "+ p.prix +"$ "
            contenu += "&emsp;x"+ p.quantite +"<br>"

        }

        contenu += "<p></p></div>"
        contenu += "<div class=\"div-etapeSuiv\"> <button class=\"btn-etapeSuiv\"> Etape suivante >> </button></div></div>"
    }

    document.getElementById('contenu-preparation').innerHTML = ""
    document.getElementById('contenu-recue').innerHTML = ""
    document.getElementById('contenu-livraison').innerHTML = ""

    document.getElementById('contenu-livree').innerHTML = contenu
}