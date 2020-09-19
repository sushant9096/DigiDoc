"use strict";
const { remote } = require('electron');
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
                            const options = { landscape: 'false'};
                            remote.getCurrentWindow().webContents.print(options, (success, errorType) => {
                                if (!success) console.log(errorType)
                            })
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
    }
});

