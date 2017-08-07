const authorizeButton = document.getElementById('authorize-button');
const signoutButton = document.getElementById('signout-button');

/*
On Load, é chamado para carregar as seguintes bibliotecas:
- Auth2 Library
- API Client Library
*/
function handleClientLoad() {
    console.log('handleClientLoad');
    gapi.load('client:auth2', initClient);
};

/*
Inicializa a API Client e monitora as mudanças no 
status de sign-in
*/
function initClient() {
    console.log('initClient');
    gapi.client.init({
        discoveryDocs: google_sheets.discovery,
        clientId: google_sheets.client_id,
        scope: google_sheets.scope
    }).then(function () {
        // Monitora as mudanças no status de sign-in
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Status Inicial de Sign In
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    });
};

/*
Método que atualiza a Interface de acordo com o Status de Sign-In
- É chamado cada vez que acontece uma mudança no status de SignIn
*/
function updateSigninStatus(isSignedIn) {
    console.log('updateSigninStatus');
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'inline-block';
        SheetsApi(google_sheets.spread_id);
    } else {
        authorizeButton.style.display = 'inline-block';
        signoutButton.style.display = 'none';
    };
};

/*
Loga o usuário quando o botão de autenticação é criado
*/
function handleAuthClick(event) {
    console.log('handleAuthClick');
    gapi.auth2.getAuthInstance().signIn();
};

/*
Faz Logoff do usuário quando o botão de Sign Out é clicado
*/
function handleSignoutClick(event) {
    console.log('handleSignoutClick');
    gapi.auth2.getAuthInstance().signOut();
    document.querySelector('#infos').innerHTML = '';
};

function SheetsApi(id){
    console.log('SheetsApi');
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: id,
        range: `${google_sheets.sheets.infos}!A2:E`
    }).then(function(response) {
        var range = response.result;
        if (range.values.length > 0) {
            updateView(range.values);
        } else {
            console.log('No data found.');
        }
    }, function(response) {
        console.log('Error: ' + response.result.error.message);
    });
};

function updateView(arr) {
    console.log(arr);
    let items = arr.filter(item => item.length).map((item, index) => {
        if (item.length) {
            return `
                <tr>
                    <td>${item[0]}</td>
                    <td>${item[1]}</td>
                    <td>${item[2]}</td>
                    <td>${item[3]}</td>
                </tr>
            `;  
        };
    }).join('');
    document.querySelector('#infos').insertAdjacentHTML('afterbegin',items);
};