const admin = require('firebase-admin');
let serviceAccount = require('../../../google-service/digidoc-84b29-firebase-adminsdk-8qd8n-7208bf1115');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://digidoc-84b29.firebaseio.com"
});
let db = admin.database();

var user_id;
let sel_for;
const os = require('os');
const storage = require('electron-json-storage');
storage.setDataPath(os.tmpdir());
storage.get('user-id', function(error, data) {
    if (error) throw error;
    if(data.uid)
    {
        user_id = data.uid;
        console.log(user_id);

        storage.get('sel_format', function(error, data) {
            if (error) throw error;
            if(data.sel_format && (user_id !== undefined))
            {
                sel_for = data.sel_format;
                let saved_d1 = db.ref(user_id+"/saved_formats/D8");
                saved_d1.once("value", function(snapshot) {

                    console.log(snapshot.child(sel_for+"/academic_year"));
                    $('#academicV').append(" "+snapshot.child(sel_for+"/academic_year").val());
                    $('#programV').append(" "+snapshot.child(sel_for+"/program").val());

                    saved_d1.child(sel_for+"/data").once("value", function(snapshot) {
                        snapshot.forEach(function (childSnapshot) {
                            let inputNoIAndCoD = childSnapshot.child("inputNoIAndCoD").val();
                            let inputSem = childSnapshot.child("inputSem").val();
                            let inputCouN = childSnapshot.child("inputCouN").val();
                            let inputNoCordi= childSnapshot.child("inputNoCordi").val();
                            let inputDoConductOAct= childSnapshot.child("inputDoConductOAct").val();
                            let inputNoOfBenf= childSnapshot.child("inputNoOfBenf").val();
                            let inputRelToPosAndPe= childSnapshot.child("inputRelToPosAndPe").val();

                            let et_vw_tbl_body =
                                "<tr>"+
                                "<td>"+childSnapshot.key+"</td>" +
                                "<td>"+inputNoIAndCoD+"</td>" +
                                "<td>"+inputSem+"</td>" +
                                "<td>"+inputCouN+"</td>" +
                                "<td>"+inputNoCordi+"</td>" +
                                "<td>"+inputDoConductOAct+"</td>" +
                                "<td>"+inputNoOfBenf+"</td>" +
                                "<td>"+inputRelToPosAndPe+"</td>" +
                                "</tr>";

                            $('#et_d1_tbl_body').append(et_vw_tbl_body);
                        })
                    }, function (errorObject) {
                        console.log("The read failed: " + errorObject.code);
                    });

                }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });
                console.log(sel_for);
            }
        });

        $('#add_new_row').click(() => {
            $('#modalAdd').modal();
        });

        $('#add_row').click(async () => {

            if(
                $('#inputNoIAndCoD').val() &&
                $('#inputSem').val() &&
                $('#inputCouN').val() &&
                $('#inputNoCordi').val() &&
                $('#inputDoConductOAct').val() &&
                $('#inputNoOfBenf').val() &&
                $('#inputRelToPosAndPe').val()
            )
            {
                let inputNoIAndCoD = $('#inputNoIAndCoD').val();
                let inputSem = $('#inputSem').val();
                let inputCouN = $('#inputCouN').val();
                let inputNoCordi = $('#inputNoCordi').val();
                let inputDoConductOAct = $('#inputDoConductOAct').val();
                let inputNoOfBenf = $('#inputNoOfBenf').val();
                let inputRelToPosAndPe = $('#inputRelToPosAndPe').val();

                console.log("data");
                console.log(sel_for);

                let ref = db.ref(user_id+"/saved_formats/D8");

                // Attach an asynchronous callback to read the data at our posts reference
                await ref.once("value", function(snapshot) {

                    let last_row_cl = snapshot.child(sel_for + "/last_row").val() + 1;
                    ref.child(sel_for+"/data/"+last_row_cl).set(
                        {
                            inputNoIAndCoD: inputNoIAndCoD,
                            inputSem: inputSem,
                            inputCouN: inputCouN,
                            inputNoCordi: inputNoCordi,
                            inputDoConductOAct: inputDoConductOAct,
                            inputNoOfBenf: inputNoOfBenf,
                            inputRelToPosAndPe: inputRelToPosAndPe
                        }
                    );
                    ref.child(sel_for).update({
                        "last_row": last_row_cl
                    });

                    let et_d1_tbl_body =
                        "<tr>"+
                        "<td>"+last_row_cl+"</td>" +
                        "<td>"+inputNoIAndCoD+"</td>" +
                        "<td>"+inputSem+"</td>" +
                        "<td>"+inputCouN+"</td>" +
                        "<td>"+inputNoCordi+"</td>" +
                        "<td>"+inputDoConductOAct+"</td>" +
                        "<td>"+inputNoOfBenf+"</td>" +
                        "<td>"+inputRelToPosAndPe+"</td>" +
                        "</tr>";

                    $('#et_d1_tbl_body').append(et_d1_tbl_body);

                }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });
            }
        });

        $('#print_preview').click(() => {

            const { BrowserWindow } = require('electron').remote;

            let win = new BrowserWindow({
                width: 1024,
                height: 600,
                autoHideMenuBar: true,
                webPreferences: {
                    nodeIntegration: true,
                    webSecurity: false
                },
                webSecurity: false
            });
            /*win.on('closed', () => {
                win = null
            });*/
            // Issue Solved code

            win.loadURL(`file://${__dirname}/pr_d8.html`);

            /*remote.getCurrentWindow().webContents.printToPDF({}).then(data => {

            }).catch(error => {
                console.log(error)
            })*/
        });


        $('#go_back_home').click(() => {
            location.replace('../../userhome.html');
        });
    }
});