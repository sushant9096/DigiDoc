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

        storage.get('sel_format', function(error, data) {
            if (error) throw error;
            if(data.sel_format && (user_id !== undefined))
            {
                sel_for = data.sel_format;
                let saved_d1 = db.ref(user_id+"/saved_formats/D6");
                saved_d1.once("value", function(snapshot) {

                    console.log(snapshot.child(sel_for+"/academic_year"));
                    $('#programV').append(" "+snapshot.child(sel_for+"/program").val());
                    $('#ExaminationV').append(" "+snapshot.child(sel_for+"/SWD").val());
                    $('#semesterV').append(" "+snapshot.child(sel_for+"/semester").val());

                    saved_d1.child(sel_for+"/data").once("value", function(snapshot) {
                        snapshot.forEach(function (childSnapshot) {
                            let inputCC = childSnapshot.child("inputCC").val();
                            let inputNOC = childSnapshot.child("inputNOC").val();
                            let inputTHESEMOL = childSnapshot.child("inputTHESEMOL").val();
                            let inputTHPAMOL= childSnapshot.child("inputTHPAMOL").val();
                            let inputTHESEMOH= childSnapshot.child("inputTHESEMOH").val();
                            let inputTHPAMOH= childSnapshot.child("inputTHPAMOH").val();
                            let inputNOSATHESE= childSnapshot.child("inputNOSATHESE").val();
                            let inputNOSATHPA= childSnapshot.child("inputNOSATHPA").val();
                            let inputNOSPTHESE= childSnapshot.child("inputNOSPTHESE").val();
                            let inputNOSPPA= childSnapshot.child("inputNOSPPA").val();
                            let inputPerPTHESE= childSnapshot.child("inputPerPTHESE").val();
                            let inputPerPPA= childSnapshot.child("inputPerPPA").val();
                            let inputPerSixTHESE= childSnapshot.child("inputPerSixTHESE").val();
                            let inputPerSixPA= childSnapshot.child("inputPerSixPA").val();

                            let et_vw_tbl_body =
                                "<tr>"+
                                "<td class='align-middle'>"+childSnapshot.key+"</td>" +
                                "<td class='align-middle'>"+inputCC+"</td>" +
                                "<td class='align-middle'>"+inputNOC+"</td>" +
                                "<td class='align-middle'>"+
                                "<table style=\"margin:auto; width:100%\">\n" +
                                "                            <tbody><tr>\n" +
                                "                                <td class='align-middle'>TH-ESE</td>\n" +
                                "                            </tr>\n" +
                                "                            <tr>\n" +
                                "                                <td class='align-middle'>TH-PA</td>\n" +
                                "                            </tr>\n" +
                                "                        </tbody></table>"+
                                "</td>" +
                                "<td class='align-items-center align-middle'>"+
                                "<table style=\"margin:auto; width:100%\">" +
                                "<tbody>" +
                                "<tr>"+
                                "<td>"+inputTHESEMOL+"</td>"+
                                "</tr>"+
                                "<tr>"+
                                "<td>"+inputTHPAMOL+"</td>"+
                                "</tr>"+
                                "</tbody>" +
                                "</table>"+
                                "</td>" +
                                "<td class='align-items-center align-middle'>"+
                                "<table style=\"margin:auto; width:100%\">" +
                                "<tbody>" +
                                "<tr>"+
                                "<td>"+inputTHESEMOH+"</td>"+
                                "</tr>"+
                                "<tr>"+
                                "<td>"+inputTHPAMOH+"</td>"+
                                "</tr>"+
                                "</tbody>" +
                                "</table>"+
                                "</td>" +
                                "<td class='align-items-center align-middle'>"+
                                "<table style=\"margin:auto; width:100%\">" +
                                "<tbody>" +
                                "<tr>"+
                                "<td>"+inputNOSATHESE+"</td>"+
                                "</tr>"+
                                "<tr>"+
                                "<td>"+inputNOSATHPA+"</td>"+
                                "</tr>"+
                                "</tbody>" +
                                "</table>"+
                                "</td>" +
                                "<td class='align-items-center align-middle'>"+
                                "<table style=\"margin:auto; width:100%\">" +
                                "<tbody>" +
                                "<tr>"+
                                "<td>"+inputNOSPTHESE+"</td>"+
                                "</tr>"+
                                "<tr>"+
                                "<td>"+inputNOSPPA+"</td>"+
                                "</tr>"+
                                "</tbody>" +
                                "</table>"+
                                "</td>" +
                                "<td class='align-items-center align-middle'>"+
                                "<table style=\"margin:auto; width:100%\">" +
                                "<tbody>" +
                                "<tr>"+
                                "<td>"+inputPerPTHESE+"</td>"+
                                "</tr>"+
                                "<tr>"+
                                "<td>"+inputPerPPA+"</td>"+
                                "</tr>"+
                                "</tbody>" +
                                "</table>"+
                                "</td>" +
                                "<td class='align-items-center align-middle'>"+
                                "<table style=\"margin:auto; width:100%\">" +
                                "<tbody>" +
                                "<tr>"+
                                "<td>"+inputPerSixTHESE+"</td>"+
                                "</tr>"+
                                "<tr>"+
                                "<td>"+inputPerSixPA+"</td>"+
                                "</tr>"+
                                "</tbody>" +
                                "</table>"+
                                "</td>" +
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