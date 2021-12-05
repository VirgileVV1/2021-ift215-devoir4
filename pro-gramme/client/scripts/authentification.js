function deconnexion() {
    console.log(window.usager.id);

    fetch("/connexion/" + window.usager.id, {
        method: 'DELETE'
    }).catch(err => {
        console.log(err)
    });
    window.usager = undefined
    //window.usager.prenom = undefined
    window.location.href = "#/connexion"
    document.getElementById('p-bvn').innerHTML = ""
}

