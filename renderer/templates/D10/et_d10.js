"use strict";
let t;
const os = require('os');
const storage = require('electron-json-storage');
storage.setDataPath(os.tmpdir());
const admin = require('firebase-admin');
let serviceAccount = require('../../../google-service/digidoc-84b29-firebase-adminsdk-8qd8n-7208bf1115');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://digidoc-84b29.firebaseio.com"
});

let db = admin.database();
let temp_name;

storage.get('user-id', function(error, data) {
    if (error) throw error;
    if(data.uid)
    {
        t = data.uid;

        $('#add_new_row').hide();
        $('#create_d7').click(async () => {

            if (
                ($('#format_name').val()) &&
                ($('#academic_year').val()) &&
                ($('#program').val())
            ) {

                temp_name = $('#format_name').val();
                let acdy = $('#academic_year').val();
                let prg = $('#program').val();
                let usersRef = db.ref(t + "/saved_formats/D10");
                await usersRef.child(temp_name).set({
                    academic_year: acdy,
                    program: prg,
                    last_row: 0
                });

                $('#compltedd7CreationModal').modal('show');
                $('#add_new_row').show();
                $('#academicV').append(" " + acdy);
                $('#programV').append(" " + prg);
                $('#create_d7_format').remove();
                $('#modalRegisterForm').modal('hide');

            } else {
                $('#modalRegisterForm').modal('hide');
                $('#impFieldModal').modal('show');
            }
        });

        $('#add_row').click(async () => {

            if(
                $('#inputNoIAndCoD').val() &&
                $('#inputDoT').val() &&
                $('#inputDoTS').val() &&
                $('#inputOB').val() &&
                $('#inputOI').val() &&
                $('#inputRePPC').val()
            )
            {
                let inputNoIAndCoD = $('#inputNoIAndCoD').val();
                let inputDoT = $('#inputDoT').val();
                let inputDoTS = $('#inputDoTS').val();
                let inputOB = $('#inputOB').val();
                let inputOI = $('#inputOI').val();
                let inputRePPC = $('#inputRePPC').val();

                console.log("data");
                console.log(temp_name);

                let ref = db.ref(t+"/saved_formats/D10");

                // Attach an asynchronous callback to read the data at our posts reference
                await ref.once("value", function(snapshot) {

                    let last_row_cl = snapshot.child(temp_name + "/last_row").val() + 1;
                    ref.child(temp_name+"/data/"+last_row_cl).set(
                        {
                            inputNoIAndCoD: inputNoIAndCoD,
                            inputDoT: inputDoT,
                            inputDoTS: inputDoTS,
                            inputOB: inputOB,
                            inputOI: inputOI,
                            inputRePPC: inputRePPC
                        }
                    );
                    ref.child(temp_name).update({
                        "last_row": last_row_cl
                    });

                    let et_d1_tbl_body =
                        "<tr>"+
                        "<td>"+last_row_cl+"</td>" +
                        "<td>"+inputNoIAndCoD+"</td>" +
                        "<td>"+inputDoT+"</td>" +
                        "<td>"+inputDoTS+"</td>" +
                        "<td>"+inputOB+"</td>" +
                        "<td>"+inputOI+"</td>" +
                        "<td>"+inputRePPC+"</td>" +
                        "</tr>";

                    $('#et_d1_tbl_body').append(et_d1_tbl_body);

                }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });
            }
        });

        $('#add_new_row').click(() => {
            $('#modalAdd').modal();
        });

        $('#go_back_home').click(() => {
            location.replace('../../userhome.html');
        });
    }
});