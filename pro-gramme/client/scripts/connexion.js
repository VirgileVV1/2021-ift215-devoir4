
function connexion() {
    const formulaire = new FormData(document.getElementById('form-connexion'));
    const corps = JSON.stringify(Object.fromEntries(formulaire));
    console.log(corps)
    const init = {
        method: 'POST',
        body: corps,
        headers: {'Content-type': 'application/json; charset=UTF-8'}
    };

    fetch('/connexion', init)
        .then(reponse => {
            console.log(`recu`)
            return reponse.json();
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
        });
}

