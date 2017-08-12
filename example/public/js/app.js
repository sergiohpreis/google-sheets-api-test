function start(){
    console.log('start()')
    gapi.load('client:auth2', initAPI);  
};

function initAPI(){
    console.log('initAPI()');
    gapi.client.init({
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        clientId: '1038072830929-2g8mc3tl5kbl0eer33fttma91cca3d03.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/spreadsheets'
    }).then(() => {
        const user = new User({
            element: document.querySelector('#user-info'),
            googleAuth: gapi.auth2.getAuthInstance()
        });
        user.signInButton = document.querySelector('#sign-in');
        user.signOutButton = document.querySelector('#sign-out');
        user.fillUserInfos();
    });
};