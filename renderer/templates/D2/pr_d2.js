"use strict";
const { remote } = require('electron');
const admin = require('firebase-admin');
let serviceAccount = require('../../../google-service/digidoc-84b29-firebase-adminsdk-8qd8n-7208bf1115');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://digidoc-84b29.firebaseio.com"
});
let db = admin.database();

let user_id;
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
            if(data.sel_format)
            {
                sel_for = data.sel_format;
                let saved_d1 = db.ref(user_id+"/saved_formats/D2");
                saved_d1.once("value", function(snapshot) {

                    console.log(snapshot);

                    $('#academicV').append(" "+snapshot.child(sel_for+"/academic_year").val());
                    $('#programV').append(" "+snapshot.child(sel_for+"/program").val());
                    $('#courseV').append(" "+snapshot.child(sel_for+"/course").val());
                    $('#course_cV').append(" "+snapshot.child(sel_for+"/course_code").val());
                    $('#semesterV').append(" "+snapshot.child(sel_for+"/semester").val());
                    $('#name_falV').append(" "+snapshot.child(sel_for+"/name_faculty").val());

                    saved_d1.child(sel_for+"/data").once("value", function(snapshot) {
                        snapshot.forEach(function (childSnapshot) {
                            let CO = childSnapshot.child("CO").val();
                            let PrO = childSnapshot.child("PrO").val();
                            let EASJP = childSnapshot.child("EASJP").val();
                            let PDF= childSnapshot.child("PDF").val();
                            let PDT = childSnapshot.child("PDT").val();
                            let AD = childSnapshot.child("AD").val();
                            let RM = childSnapshot.child("RM").val();

                            let et_vw_tbl_body =
                                "<tr>"+
                                "<td>"+childSnapshot.key+"</td>" +
                                "<td>"+CO+"</td>" +
                                "<td>"+PrO+"</td>" +
                                "<td>"+EASJP+"</td>" +
                                "<td>"+PDF+"</td>" +
                                "<td>"+PDT+"</td>" +
                                "<td>"+AD+"</td>" +
                                "<td>"+RM+"</td>" +
                                "</tr>";

                            $('#et_d1_tbl_body').append(et_vw_tbl_body);
                        })
                    }, function (errorObject) {
                        console.log("The read failed: " + errorObject.code);
                    });

                    const options = { landscape: 'false'};
                    remote.getCurrentWindow().webContents.print(options, (success, errorType) => {
                        if (!success) console.log(errorType)
                    })
                }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });
                console.log(sel_for);
            }
        });
    }

});