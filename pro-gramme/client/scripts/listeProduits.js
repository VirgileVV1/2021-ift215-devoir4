let Data;
let CurrentPage

function genererListe(data, page){
    let produit = document.getElementById('liste-produits-grille');
    Data = data;
    CurrentPage = page;

    let innerHTML = ""
    for(let indice in data){
        // on cherche les articles de la page
        if(indice >= 5*(page-1) && indice <= page*5){
            let element = data[indice]
            let url = '#/produit/'+indice;

            innerHTML += "<article class=\"liste-produit-item\">" +
                "<a href="+url+"> <img src='images/no-image.jpg' alt='aucune image trouvée' id='image-produit'></a>" +
                "<h2>"+ element.nom +"</h2>" +
                "<h3>"+ element.description +"</h3>" +
                "<h3 id='prix'>" + element.prix +"</h3>" +
                "<img src='images/caddi.png' alt='ajouter au panier' id='ajout-caddi' onclick='ajoutCaddi("+indice+")'>" +
                "</article>";
        }
    }
    produit.innerHTML = innerHTML;

    genererPagination(data, page);
    document.getElementById('btn_prev').addEventListener("click", prev);
    document.getElementById('btn_next').addEventListener("click", next);
}

function chargerlisteProduits (){
    fetch('./produits')
        .then(produits => {return produits.json()})
        .then(data => genererListe(data, 1) )
}

// à faire quand connexion/inscription fini
function ajoutCaddi(indice){
    // savoir si le client est connecter

    let corps = {
        "idProduit": indice,
        "quantite": 1
    }
    const init = {
        method: 'POST',
        body: corps,
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    };
    fetch('/clients/'+window.usager.idClient+'/panier', init)
        .then(reponse => {
            return reponse.json();
        })
        .then(json => {
            const token = json.token;
            console.log(token);
        });
}

/* Pagination */

function genererPagination(data, page){
    let pagination = document.getElementById('pagination');
    let innerHTML = ""
    let nbPage = 0;

    innerHTML += "<button id='btn_prev'>&laquo;</button>";
    for(let i in data){
        if(i%6 == 0){
            nbPage += 1;
            if(nbPage == page){
                innerHTML += "<button class=\"active\">"+ nbPage +"</button>";
            }
            else{
                if(nbPage<page && nbPage>page-3){
                    innerHTML += "<button onclick='Page("+nbPage+")' id='page'>"+ nbPage +"</button>";
                }
                else if(nbPage>page && nbPage<page+3){
                    innerHTML += "<button onclick='Page("+nbPage+")' id='page'>"+ nbPage +"</button>";
                }
            }
        }

    }
    innerHTML +="<button id='btn_next'>&raquo;</button>";
    pagination.innerHTML = innerHTML;
}

function prev(){
    genererListe(Data, CurrentPage-1);
}
function next(){
    genererListe(Data, CurrentPage+1);
}
function Page(nbPage){
    genererListe(Data, nbPage);
}