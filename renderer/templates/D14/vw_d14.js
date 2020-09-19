"use strict";
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

        var last_row_cl = 0;
        storage.get('sel_format', function(error, data) {
            if (error) throw error;
            if(data.sel_format && (user_id !== undefined))
            {
                sel_for = data.sel_format;
                let saved_d1 = db.ref(user_id+"/saved_formats/D14");
                saved_d1.once("value", function(snapshot) {

                    console.log(snapshot.child(sel_for+"/academic_year"));
                    $('#academicV').append(" "+snapshot.child(sel_for+"/academic_year").val());
                    $('#programV').append(" "+snapshot.child(sel_for+"/program").val());
                    $('#semV').append(" "+snapshot.child(sel_for+"/sem").val());
                    $('#dateV').append(" "+snapshot.child(sel_for+"/date").val());

                    saved_d1.child(sel_for+"/data").once("value", function(snapshot) {
                        snapshot.forEach(function (childSnapshot) {
                            let inputNoIAndCoD = childSnapshot.child("inputNoIAndCoD").val();
                            let inputDoT = childSnapshot.child("inputDoT").val();
                            let inputDoTS = childSnapshot.child("inputDoTS").val();
                            let inputOB= childSnapshot.child("inputOB").val();
                            let inputAW= childSnapshot.child("inputAW").val();
                            let inputLe= childSnapshot.child("inputLe").val();
                            let inputRe= childSnapshot.child("inputRe").val();
                            let inputTo= childSnapshot.child("inputTo").val();

                            let et_vw_tbl_body =
                                "<tr>"+
                                "<td>"+childSnapshot.key+"</td>" +
                                "<td>"+inputNoIAndCoD+"</td>" +
                                "<td>"+inputDoT+"</td>" +
                                "<td>"+inputDoTS+"</td>" +
                                "<td>"+inputOB+"</td>" +
                                "<td>"+inputAW+"</td>" +
                                "<td>"+inputLe+"</td>" +
                                "<td>"+inputRe+"</td>" +
                                "<td>"+inputTo+"</td>" +
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
                $('#inputDoT').val() &&
                $('#inputDoTS').val() &&
                $('#inputOB').val() &&
                $('#inputAW').val() &&
                $('#inputLe').val() &&
                $('#inputRe').val() &&
                $('#inputTo').val()
            )
            {
                let inputNoIAndCoD = $('#inputNoIAndCoD').val();
                let inputDoT = $('#inputDoT').val();
                let inputDoTS = $('#inputDoTS').val();
                let inputOB = $('#inputOB').val();
                let inputAW = $('#inputAW').val();
                let inputLe = $('#inputLe').val();
                let inputRe = $('#inputRe').val();
                let inputTo = $('#inputTo').val();

                console.log("data");
                console.log(sel_for);

                let ref = db.ref(user_id+"/saved_formats/D14");

                // Attach an asynchronous callback to read the data at our posts reference
                await ref.once("value", function (snapshot) {

                    let last_row_cl = snapshot.child(sel_for + "/last_row").val() + 1;
                    ref.child(sel_for + "/data/" + last_row_cl).set(
                        {
                            inputNoIAndCoD: inputNoIAndCoD,
                            inputDoT: inputDoT,
                            inputDoTS: inputDoTS,
                            inputOB: inputOB,
                            inputAW: inputAW,
                            inputLe: inputLe,
                            inputRe: inputRe,
                            inputTo: inputTo
                        }
                    );
                    ref.child(sel_for).update({
                        "last_row": last_row_cl
                    });

                    let et_d1_tbl_body =
                        "<tr>" +
                        "<td>" + last_row_cl + "</td>" +
                        "<td>" + inputNoIAndCoD + "</td>" +
                        "<td>" + inputDoT + "</td>" +
                        "<td>" + inputDoTS + "</td>" +
                        "<td>" + inputOB + "</td>" +
                        "<td>" + inputAW + "</td>" +
                        "<td>" + inputLe + "</td>" +
                        "<td>" + inputRe + "</td>" +
                        "<td>" + inputTo + "</td>" +
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
                }
            });
            /*win.on('closed', () => {
                win = null
            });*/
            // Issue Solved code

            win.loadURL(`file://${__dirname}/pr_d14.html`);

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