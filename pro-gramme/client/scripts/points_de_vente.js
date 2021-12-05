
function genererMagasin(data){
    let locaux = document.getElementById('canada');
    let internationaux = document.getElementById('international');

    let innerHTML = "<h2>Au Canada:</h2>";
    for(let indice in data.commerces_locaux){
        let element = data.commerces_locaux[indice];
        innerHTML += "<article>"+element.adresse+
            ", "+element.ville+", "+element.pays+
            "</article>";
    }
    locaux.innerHTML = innerHTML;

    innerHTML = "<h2>A l'étranger:</h2>";
    for(let indice in data.commerces_internationaux){
        let element = data.commerces_internationaux[indice];
        innerHTML += "<article>"+element.adresse+
            ", "+element.ville+", "+element.pays+
            "</article>";
    }
    internationaux.innerHTML = innerHTML;

}

function chargerpoints_de_vente (){
    fetch('./commerces')
        .then(commerces => {return commerces.json()})
        .then(data => genererMagasin(data) )
}