function clicMenuGauche(lien){
    lien.style.color = "#F00";
    lien.innerText += " cliqué!"
}

function afficherMsgErreur(erreur) {
    console.log(erreur)
    err = erreur.toString().split(': ')
    document.getElementById('erreur-i').innerHTML = "<p> erreur : le champs \""+err[1]+"\" ne peut pas être vide </p>"
}