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
}//:idClient

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
        element +="<td id=\"p-qte\"> <p>"+panier[i].quantite+"</p><br></td>"
        element +="</tr>"


    }
    document.getElementById('p-table-body').innerHTML = element
    console.log(panierJson.valeur) //valeur totale du panier
}