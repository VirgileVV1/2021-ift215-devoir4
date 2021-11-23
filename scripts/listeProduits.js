function genererListe(data){
    console.log(data);
    let produit = document.getElementById('liste-produits-grille');

    let innerHTML = ""
    for(let indice in data){
        console.log(indice);
        let element = data[indice]
        let url = '#/produit/'+indice;

        innerHTML += "<article class=\"liste-produit-item\">" +
            "<a href="+url+"> <img src='images/no-image.jpg' alt='aucune image trouvée'></a>" +
            "<h2>"+ element.description +"</h2>" +
            "<h2>" + element.prix +"</h2>" +
            "<img src='images/caddi.png' alt='ajouter au panier'>" +
            "</article>";
    }
    produit.innerHTML = innerHTML;
}

function chargerlisteProduits (){
    fetch('./produits')
        .then(produits => {return produits.json()})
        .then(data => genererListe(data) )
}