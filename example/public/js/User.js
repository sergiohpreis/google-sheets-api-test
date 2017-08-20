class User {
    constructor(obj) {
        // 'element' and 'googleAuth' are mandatories;
        if (obj.element === undefined) {
            throw new Error('Class User > Please set "element"');
        } else if (obj.googleAuth === undefined) {
            throw new Error('Class User > Please set "googleAuth"');
        };

        this._element = obj.element;
        this._googleAuth = obj.googleAuth;
        this._signInButton;
        this._signOutButton;

        // Binding the methods
        this._hideUserInfos = this._hideUserInfos.bind(this);
        this._showUserInfos = this._showUserInfos.bind(this);
        this._changeAccount = this._changeAccount.bind(this);
        this.fillUserInfos = this.fillUserInfos.bind(this);
    };

    get googleAuth () {
        return this._googleAuth;
    };

    get loginStatus(){
        return this._googleAuth.isSignedIn.get()
    };

    get googleUser () {
        return this._googleAuth.currentUser.get().getBasicProfile();
    };

    set signInButton(element) {
        this._signInButton = element;
        this._handleSignIn();
    };

    set signOutButton(element) {
        this._signOutButton = element;
        this._handleSignOut();
    };

    // Method to show User Infos on UI
    _showUserInfos() {
        const defaultClass = this._element.getAttribute('class').split(' ')[0]
        this._element.classList.add(`${defaultClass}--visible`);
    };

    // Method to hide User Infos on UI
    _hideUserInfos() {
        const defaultClass = this._element.getAttribute('class').split(' ')[0]
        this._element.classList.remove(`${defaultClass}--visible`);
    };

    // Method to handle with the SignIn button
    _handleSignIn(){
        const googleAuth = this._googleAuth;
        const fillUserInfos = this.fillUserInfos;
        const changeAccount = this._changeAccount;
        this._signInButton.addEventListener('click', function(){
            googleAuth.signIn()
                .then(() => {
                    changeAccount(gapi.auth2.getAuthInstance());
                    fillUserInfos();
                });
        });
    };

    // Method to handle with the SignOut button
    _handleSignOut(){
        const googleAuth = this._googleAuth;
        const hideUserInfos = this._hideUserInfos;
        this._signOutButton.addEventListener('click', function(){
            googleAuth.signOut()
                .then(() => {
                    hideUserInfos();
                });
        });
    };

    // Method responsible for reassign the GoogleAuth instance;
    _changeAccount(GoogleAuth){
        this._googleAuth = GoogleAuth;
    };

    updateSignStatus(callback) {
        gapi.auth2.getAuthInstance().isSignedIn.listen(callback);
    };

    // Method responsible for fill the UI with the user data
    fillUserInfos(){
        if (this.loginStatus) {  
            const name = this.googleUser.getName(),
                email = this.googleUser.getEmail(),
                imageUrl = this.googleUser.getImageUrl();
            
            const template = `
            <div class="accountBox__image">
                <img src="${imageUrl}" alt="Profile Imagem from ${name}">
            </div>
            <h3 class="accountBox__name">${name}</h3>
            <small class="accountBox__email">${email}</small>`;

            this._element.innerHTML = template;
            this._showUserInfos();
        };
    };
};