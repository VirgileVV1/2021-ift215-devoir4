
function connexion() {
    const formulaire = new FormData(document.getElementById('form-connexion'));
    const corps = JSON.stringify(Object.fromEntries(formulaire));
    const init = {
        method: 'POST',
        body: corps,
        headers: {'Content-type': 'application/json; charset=UTF-8'}
    };

    requestOk = true
    corps_json = JSON.parse(corps)
    try {
        if (corps_json.courriel == "")  {
            throw new Error("adresse électronique")
        } else if (corps_json.mdp == "") {
            throw new Error("mot de passe")
        } 
    } catch (error) {
        requestOk = false
        afficherMsgErreur(error);
    }

    if (requestOk) {
        document.getElementById('erreur-i').innerHTML = ""
        fetch('/connexion', init)
        .then(reponse => {
            if (reponse.ok) {
                return reponse.json();
            } else {
                //le serveur n'a pas pu traité la req
                if (reponse.status == 400) {
                    throw new Error('utilisateur introuvable')
                } else {
                    throw new Error(reponse.statusText)
                }
            }
        })
        .then(json => {
            const expire = new Date();
            expire.setHours(expire.getHours() + 2);
            window.usager = {
                id: json.idClient,
                role: json.role,
                token: json.token,
                expire: expire
            };
            console.log(window.usager)
        })
        .catch ( erreur => {
            console.log(erreur)
            err = erreur.toString().split(': ')
            document.getElementById('erreur-i').innerHTML = "<p> erreur: \""+err[1]+"\" </p>"

        });
    }

}

function afficherMsgErreur(erreur) {
    console.log(erreur)
    err = erreur.toString().split(': ')
    document.getElementById('erreur-i').innerHTML = "<p> erreur: le champ \""+err[1]+"\" ne peut pas être vide </p>"
}