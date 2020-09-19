const { remote } = require("electron");

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
            if(data.sel_format && (user_id !== undefined))
            {
                sel_for = data.sel_format;
                let saved_d1 = db.ref(user_id+"/saved_formats/D5");
                saved_d1.once("value", function(snapshot) {

                    console.log(snapshot.child(sel_for+"/academic_year"));
                    $('#academicV').append(" "+snapshot.child(sel_for+"/academic_year").val());
                    $('#programV').append(" "+snapshot.child(sel_for+"/program").val());
                    $('#courseV').append(" "+snapshot.child(sel_for+"/course").val());
                    $('#course_cV').append(" "+snapshot.child(sel_for+"/course_code").val());
                    $('#semesterV').append(" "+snapshot.child(sel_for+"/semester").val());
                    $('#name_falV').append(" "+snapshot.child(sel_for+"/name_faculty").val());

                    saved_d1.child(sel_for+"/data").once("value", function(snapshot) {
                        snapshot.forEach(function (childSnapshot) {
                            let inputRno = childSnapshot.child("inputRno").val();
                            let inputNOS = childSnapshot.child("inputNOS").val();
                            let inputEnrolNo = childSnapshot.child("inputEnrolNo").val();
                            let inputExSeNo= childSnapshot.child("inputExSeNo").val();
                            let inputTS1= childSnapshot.child("inputTS1").val();
                            let inputTS2= childSnapshot.child("inputTS2").val();
                            let inputAvgTS1TS2= childSnapshot.child("inputAvgTS1TS2").val();
                            let inputPGA= childSnapshot.child("inputPGA").val();
                            let inputPOP= childSnapshot.child("inputPOP").val();
                            let inputTotal= childSnapshot.child("inputTotal").val();

                            let et_vw_tbl_body =
                                "<tr>"+
                                "<td>"+childSnapshot.key+"</td>" +
                                "<td>"+inputRno+"</td>" +
                                "<td>"+inputNOS+"</td>" +
                                "<td>"+inputEnrolNo+"</td>" +
                                "<td>"+inputExSeNo+"</td>" +
                                "<td>"+inputTS1+"</td>" +
                                "<td>"+inputTS2+"</td>" +
                                "<td>"+inputAvgTS1TS2+"</td>" +
                                "<td>"+inputPGA+"</td>" +
                                "<td>"+inputPOP+"</td>" +
                                "<td>"+inputTotal+"</td>" +
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