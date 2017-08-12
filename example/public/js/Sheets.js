class Sheets {
    constructor(){
        this.valueRange;
    };

    getCatalog() {
        gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '1CkxtSqddT3HZQU9EKQWvmeKVJX_YQEqZBhNlFH_cnT4',
            range: 'Catalogo!A1:G'
        }).then(response => {
            console.log(response.result.values);
        });
    };
};