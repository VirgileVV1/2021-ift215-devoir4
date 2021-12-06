
/** Determine si l'utilisateur est connecté et si c'est la cas, vérifie si c'est un administrateur */
function chargerprofil() {
    if (window.usager == undefined) {                       //pas connecté
        window.location.href = "#/connexion"
    } else if (window.usager.prenom == 'admin') {           //connecté en tant qu'admin
        console.log('Vous etes connecté en tant qu\'admin')
        afficherProfilA(window.usager)
    } else {                                                //connecté en tant que client
        getUser(window.usager)
    }
}


/**
 * Envoie un requête GET vers le serveur avec l'id du client connecté
 * @param {*} user objet js contenant les infos de la session du client 
 */
function getUser(user) {
    fetch('clients/'+user.id, {
        headers: {
          'Authorization': 'Bearer '+user.token
        }
    })
    .then(res => {
        if (res.ok) {
            return res.json()
        } else {
            throw new Error(err)
        }
    })
    .then(data => {
        afficherProfil(data)
    })
    .catch(err => {
        console.log(err)
        //throw new Error(err)
    })
}

/* Gestion de l'affichage de la page profil si l'utilisateur est un administrateur */
function afficherProfilA(user) {
    document.getElementById('table-p').style.border = "white"
    document.getElementById("btn-listeVentes").style.display = "flex"
    document.getElementById("btn-listeVentes").style.justifyContent = "flex"
    document.getElementById('msgAdmin').innerHTML = "Vous êtes administrateur"
    document.getElementById('btn-listeVentes').innerHTML = "<p> Liste des ventes </p>"

}

/* Gestion de l'affichage de la page profil si l'utilisateur est un client */
function afficherProfil(user) {
    console.log(user)
    let content = "<caption><i>Informations personnelles</i></caption> <tr>"
    content += "<th> Prénom </th>"
    content += "<td>" + user.prenom + "</td>"
    content += "</tr>"
    content += "<tr>"
    content += "<th> Nom </th>"
    content += "<td>" + user.nom + "</td>"
    content += "</tr>"
    content += "<tr>"
    content += "<th> Age </th>"
    content += "<td>" + user.age + "</td>"
    content += "</tr>"
    content += "<tr>"
    content += "<th> Courriel </th>"
    content += "<td>" + user.courriel + "</td>"
    content += "</tr>"

    document.getElementById('table-p').innerHTML = content
}