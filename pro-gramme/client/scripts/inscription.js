function sinscrire() {

    const formulaire = new FormData(document.getElementById('form-inscription'));
    const corps = JSON.stringify(Object.fromEntries(formulaire));
    const init = {
        method: 'POST',
        body: corps,
        headers: {'Content-type': 'application/json; charset=UTF-8'}
    };
    requestOk = true
    corps_json = JSON.parse(corps)
    try {
        if (corps_json.prenom == "") {
            throw new Error("Le champ prénom ne peut pas être vide")
        }
        if (corps_json.nom == "") {
            throw new Error("Le champ nom ne peut pas être vide")
        }
        if (corps_json.age == "") {
            throw new Error("Le champ âge ne peut pas être vide")
        }
        if (corps_json.courriel == "") {
            throw new Error("Le champ adresse éléctronique ne peut pas être vide")
        }
        if (corps_json.mdp == "") {
            throw new Error("Le champ mot de passe ne peut pas être vide")
        }
        if (corps_json.adresse == "") {
            throw new Error("Le champ adresse ne peut pas être vide")
        }if (corps_json.pays == "") {
            throw new Error("Le champ pays ne peut pas être vide")
        }
    }
    catch (error) {
        requestOk = false
        afficherMsgErreur(error);
    }
    if (requestOk) {
        fetch('/clients', init)
            .then(reponse => {
                if (reponse.ok) {
                    return reponse.json();
                } else {

                    if (reponse.status == 400) {
                        throw new Error("L'utilisateur existe déjà" );
                    } else {
                        throw new Error(reponse.statusText)
                    }
                    //console.log(response.text().then());
                    return reponse.text();
                }
            })
            .then(json => {
                if (typeof json === 'object' && json !== null) {
                    console.log('Reussi');
                    afficherMessage('Inscription réussie!', 'positif');
                } else {
                    console.log(json);
                    afficherMessage(`Erreur: ${json}`, 'negatif');
                    // document.getElementById('erreur-i').innerHTML = "<p> ERROR </p>";

                }
            })
            .catch(err => {
                console.log(err);
                afficherMsgErreur(err);

            });
    }

}

/**
 * Fonction qui initie le lancement des fonctions de ce script. Appelée par "chargerSousContenu" dans navigation.js.
 * Remplace le DOMContentLoaded qui est lancé bien avant que le contenu associé à ce script ne soit dans l'écran.
 * @returns {Promise<void>}
 */
async function chargerinscription () {
    const btnInscription = document.getElementById('btn-sinscrire');
    btnInscription.addEventListener('click', sinscrire);
};

function afficherMsgErreurInscr(erreur) {
    console.log(erreur)
    err = erreur.toString().split(': ')
    document.getElementById('erreur-i').innerHTML = "<p> erreur: le champ \""+err[1]+"\" ne peut pas être vide </p>"

}
