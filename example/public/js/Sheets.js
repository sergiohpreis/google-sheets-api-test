class Sheets {
    constructor(element){
        this._button;
        this._element = element;
    };

    set button(element) {
        this._button = element;
        this._button.addEventListener('click', function(){
            this.logSheetData();
        });
    };

    configureButton(obj) {
        obj.button.addEventListener('click', obj.callback);
    };

    fillSheetData(user) {
        if (user.loginStatus) {
            gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: credentials.spreadsheetId,
                range: 'Infos!A1:G'
            }).then(response => {
                const infos = response.result.values;

                let header = ''
                let body = ''

                for (let i = 0; i <= infos.length; i++) {
                    let item = infos[i];

                    if (item) {
                        if (i === 0) {
                            console.log(item);
                            header += `
                                <tr>
                                    ${item.map(item => `
                                        <th>${item}</th>
                                    `).join('')}
                                </tr>
                            `;
                        } else {
                            console.log(item);
                            body += `
                                <tr>
                                    ${item.map(item => `
                                        <td>${item}</td>
                                    `).join('')}
                                </tr>
                            `;
                        };  
                    };
                };
                
                const structure = `
                <thead>
                    ${header}
                </thead>
                <tbody>
                    ${body}
                </tbody>
                `;

                this._element.innerHTML = structure;
            });
        } else {
            alert('You must be logged to retrieve data from Sheet');
        };
    };
};