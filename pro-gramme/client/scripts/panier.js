function chargerpanier() {
    console.log('appel de la méthode chargerPanier')

    verifUser();
}

function verifUser() {
    if (window.usager == undefined) {
        console.log('l\'utilisateur n\'est pas connecté');    
    } else {
        console.log('l\'utilisateur est connecté jusqu\'au');    
        console.log(window.usager.expire);
        getPanier(window.usager)
    }
}

function getPanier(user) {

    fetch('clients/'+user.id+'/panier', {
        headers: {
          'Authorization': 'Bearer '+user.token
        }
    })
    .then(res => {
        console.log(res)
        console.log(res.body)
        if (res.ok) {
            return res.json()
        } else {
            throw new Error(err)
        }
    })
    .then(data => {
        afficherPanier(data)
    })
    .catch(err => {
        console.log(err)
        //throw new Error(err)
    })
}

function afficherPanier(panierJson) {
    console.log('affichage du panier...')
    console.table(panierJson)
    const panier = panierJson.items

    let element = ""
    for (let i = 0; i< panier.length; i++) {
        element +="<tr>"
        element +="<th id=\"p-nom\"> <p><b>"+panier[i].nomProduit+"</b></p><br> </th>"
        element +="<td id=\"p-desc\"> <p>"+panier[i].descriptionProduit+"</p><br> </td>"
        element +="<td id=\"p-prix\"> <p>"+panier[i].prix+"$</p><br></td>"
        element +="<td id=\"p-qte\"> <p class=\"lp-qte\">"+panier[i].quantite+"</p>"
        element += "<button onclick=\"ajouterQte("+panier[i].idProduit+")\" class=\"btn-modifQte\">+</button>"
        element += "<button onclick=\"soustraireQte("+panier[i].idProduit+")\" class=\"btn-modifQte\">-</button></td>"
        element +="</tr>"
    }
    document.getElementById("div-affichagePrix").innerHTML = "<p>Prix total : "+ panierJson.valeur+"$</p>"
    document.getElementById('p-table-body').innerHTML = element
    console.log(panierJson.valeur) //valeur totale du panier
}

/** enleve les produits du panier de l'utilisateur */
function annulerPanier() {
    console.log('Le bouton pour vider le panier n\'est pas encore implémenté')
}

/** ajoute une quantite a l'item qui dont on passe l'id en param de la fct */
function ajouterQte(idItem) {
    const init = {
        method: 'PUT',
        body: JSON.stringify({quantite:1}),
        headers: {'Content-type': 'application/json; charset=UTF-8', 'Authorization': 'Bearer '+window.usager.token}
    };
    console.log('ajout au produit' + idItem)
    fetch('/clients/'+window.usager.id+'/panier/'+idItem, init)
    .then( reponse => {
        if (reponse.ok) {
            return reponse.json()
        } else {
           console.log(reponse.text())
        }
    })
    .then( data => {chargerpanier()})
    .catch(erreur => console.log(erreur))
}

/** 
 * soustrait une quantite a l'item qui dont on passe l'id en param de la fct 
 * si le quantité est de 1 alors le produit est supprimé du panier
*/
function soustraireQte(idItem) {
    fetch('/clients/'+window.usager.id+'/panier/'+idItem, {
        headers: {'Authorization': 'Bearer '+window.usager.token}
    })
    .then( reponse => {
        if (reponse.ok) {
            return reponse.json()
        } else {
            throw new Error(reponse.statusText)
        }
    }).
    then(data => {
        soustraireQte2(data, idItem)
    })
}

function soustraireQte2(item, idItem) {
    if (item.quantite == 1) {
        console.log('quantite = 1')
        const init = {
            method: 'DELETE',
            body: JSON.stringify({quantite:-1}),
            headers: {'Content-type': 'application/json; charset=UTF-8', 'Authorization': 'Bearer '+window.usager.token}
        };
        fetch('/clients/'+window.usager.id+'/panier/'+idItem, init)
        .then( json => {chargerpanier()})

    } else {

        console.log('quantite != 1')
        const init = {
            method: 'PUT',
            body: JSON.stringify({quantite:-1}),
            headers: {'Content-type': 'application/json; charset=UTF-8', 'Authorization': 'Bearer '+window.usager.token}
        };
        fetch('/clients/'+window.usager.id+'/panier/'+idItem, init)
        .then( reponse => {
            if (reponse.ok) {
                return reponse.json()
            } else {
                throw new Error(reponse.statusText)
            }
        })
        .then( data => {chargerpanier()})
        .catch(erreur => console.log(erreur))

    }
}



