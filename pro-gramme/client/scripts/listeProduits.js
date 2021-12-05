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
                "<a onclick='clickHandler()' href="+url+"> <img src='images/no-image.jpg' alt='aucune image trouvée' id='image-produit'>" +
                "<h2>"+ element.nom +"</h2></a>" +
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

    // rendre visible/invisible le bloc de recherche
    const btnRecherche = document.getElementById('btnRecherche');
    btnRecherche.addEventListener('click', function() {
        const blocRecherche = document.getElementById('bloc-recherche');
        blocRecherche.classList.toggle('cache');
    });
}

function chargerlisteProduits (){
    fetch('./produits')
        .then(produits => {return produits.json()})
        .then(data => genererListe(data, 1) )
}

function ajoutCaddi(indice){
    if(usager) {
        const corps = { 'idProduit': indice, 'quantite': 1 };
        console.log(corps);
        const init = {
            method: 'POST',
            body: JSON.stringify(corps),
            headers: {'Content-type': 'application/json; charset=UTF-8',
                        'Authorization': 'Bearer '+window.usager.token
                    }
        };
  
        let input = 'clients/' + usager.id + '/panier';
        fetch(input, init)
            .then(reponse => {
                return reponse.json();
            })
            .then(json => {
                const token = json.token;
                console.log(token);
            })
            .catch(function(err) {
                console.error(err)
            });
    } else {
        console.log("pas connecter");
        alert("Veuillez vous connecter avant d'ajouter un produit au panier.")
    }
}

// obtenir les éléments de la recherche
function rechercheBtn(){
    const formulaire = new FormData(document.getElementById('formualireRecherche'));
    const corps = JSON.stringify(Object.fromEntries(formulaire));

    // remplacer les espaces par %20
    let corps_json = JSON.parse(corps)
    corps_json.textRecherche = corps_json.textRecherche.replace(/ /g,"%20");
    console.log(corps_json);

    let url = '/produits';
    if(corps_json.textRecherche != ""){
        url = url + '?nom=' + corps_json.textRecherche;
    }
    else if(corps_json.categorie != ""){
        let nb;
        if(corps_json.categorie == "Nutritif"){
            nb=1;
        }
        else if(corps_json.categorie == "Equipement sportif"){
            nb=2;
        }
        else if(corps_json.categorie == "Programme"){
            nb=3;
        }
        url = url + '?categorie=' + nb;
    }

    fetch(url)
        .then(produits => {return produits.json()})
        .then(data => genererListe(data, 1) )
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