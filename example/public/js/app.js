function start(){
    console.log('start()')
    gapi.load('client:auth2', initAPI);  
};

function initAPI(){
    console.log('initAPI()');
    gapi.client.init({
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        clientId: credentials.clientId,
        scope: 'https://www.googleapis.com/auth/spreadsheets'
    }).then(() => {
        const user = new User({
            element: document.querySelector('#user-info'),
            googleAuth: gapi.auth2.getAuthInstance()
        });
        user.signInButton = document.querySelector('#sign-in');
        user.signOutButton = document.querySelector('#sign-out');
        user.fillUserInfos();
        
        const sheets = new Sheets(document.querySelector('#infos'));
        sheets.configureButton({
            button: document.querySelector('#get-infos'),
            callback: () => {
                return sheets.fillSheetData(user);
            }
        });
    });
};