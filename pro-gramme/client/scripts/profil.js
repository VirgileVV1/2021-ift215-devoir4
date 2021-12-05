function chargerprofil() {
    if (window.usager == undefined) {
        window.location.href = "#/connexion"
    } else {
        getUser(window.usager)

    }
}

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