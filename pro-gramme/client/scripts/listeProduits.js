let Data;

function genererListe(data, page){
    let produit = document.getElementById('liste-produits-grille');
    Data = data;

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
                "<img src='images/caddi.png' alt='ajouter au panier' id='ajout-caddi'>" +
                "</article>";
        }
    }
    produit.innerHTML = innerHTML;

    genererPagination(data, page);
}

function chargerlisteProduits (){
    fetch('./produits')
        .then(produits => {return produits.json()})
        .then(data => genererListe(data, 1) )
}

/* Pagination */

function genererPagination(data, page){
    let pagination = document.getElementById('pagination');
    let innerHTML = ""
    let nbPage = 0;

    innerHTML += "<a href='#/listeProduits' id='btn_prev'>&laquo;</a>";
    for(let i in data){
        if(i%6 == 0){
            nbPage += 1;
            if(nbPage == page){
                innerHTML += "<a class=\"active\" href='#/listeProduits'>"+ nbPage +"</a>";
            }
            else{
                if(nbPage<page && nbPage>page-3){
                    innerHTML += "<a href='#/listeProduits'>"+ nbPage +"</a>";
                }
                else if(nbPage>page && nbPage<page+3){
                    innerHTML += "<a href='#/listeProduits'>"+ nbPage +"</a>";
                }
            }
        }

    }
    innerHTML +="<a href='#/listeProduits' id='btn_next'>&raquo;</a>";
    pagination.innerHTML = innerHTML;
}