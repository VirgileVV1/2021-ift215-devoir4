let id;

// technique pour outrepasser navigation.js à cause du /:id
function clickHandler() {
    setTimeout( function() { charger(); }, 250 );
}

function charger(){
    let url = window.location.href
    id = url.substring(url.lastIndexOf('/') + 1);
    console.log(id);
    console.log(url);

    fetch('./produits/'+id)
        .then(produits => {return produits.json()})
        .then(data => genererProduit(data) )
}

function genererProduit(data){
    //description
    let produit = document.getElementById('information');
    let innerHTML = "";
    innerHTML += "<fieldset class='info'>"+
        "<h2>Information sur le produit</h2>"+
        "<p>"+data.description+"</p>"+
        "</fieldset>";
    produit.innerHTML = innerHTML;

    //produit
    produit = document.getElementById('produit');
    innerHTML = "";
    innerHTML += "<div class='prod'>"+
        "<h2>"+data.nom+"</h2>"+
        "<img src='images/no-image.jpg' alt='aucune image trouvée' id='image-produit-grand'>"+
        "</div>"
    produit.innerHTML = innerHTML;
}

function ajouterCom(){
    alert("Les commentaires ne sont pas implémentés sur le serveur.")
}