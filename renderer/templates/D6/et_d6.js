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

        let SW = ' ';
        $('#Summer').click(() => {
            SW = "Summer";
        });
        $('#Winter').click(() => {
            SW = "Winter";
        });

        $('#create_d6').click(async () => {

            if (
                ($('#format_name').val()) &&
                ($('#program').val()) &&
                ($('#semester').val()) &&
                ($('#Year').val()) &&
                (SW !== ' ')
            ) {

                temp_name = $('#format_name').val();
                let prg = $('#program').val();
                let sem = $('#semester').val();
                let Year = $('#Year').val();
                let SWD = SW + " "+Year;
                let usersRef = db.ref(t + "/saved_formats/D6");
                await usersRef.child(temp_name).set({
                    program: prg,
                    SWD: SWD,
                    semester: sem,
                    last_row: 0
                });

                $('#compltedd6CreationModal').modal('show');
                $('#add_new_row').show();
                $('#programV').append(" " + prg);
                $('#ExaminationV').append(" "+ SWD);
                $('#semesterV').append(" " + sem);
                $('#create_d6_format').remove();
                $('#modalRegisterForm').modal('hide')
            } else {
                $('#modalRegisterForm').modal('hide');
                $('#impFieldModal').modal('show');
            }
        });

        let vaild = "false";
        $('#add_row').click(async () => {

            $('#waitD6RowCreationModal').modal('show');
            if(
                $('#inputCC').val() &&
                $('#inputNOC').val() &&
                $('#inputTHESEMOL').val() &&
                $('#inputTHPAMOL').val() &&
                $('#inputTHESEMOH').val() &&
                $('#inputTHPAMOH').val() &&
                $('#inputNOSATHESE').val() &&
                $('#inputNOSATHPA').val() &&
                $('#inputNOSPTHESE').val() &&
                $('#inputNOSPPA').val() &&
                $('#inputPerPTHESE').val() &&
                $('#inputPerPPA').val() &&
                $('#inputPerSixTHESE').val() &&
                $('#inputPerSixPA').val()
            )
            {
                vaild = "true";
                let inputCC = parseInt($('#inputCC').val());
                let inputNOC = $('#inputNOC').val();
                let inputTHESEMOL = parseInt($('#inputTHESEMOL').val());
                let inputTHPAMOL = parseInt($('#inputTHPAMOL').val());
                let inputTHESEMOH = parseInt($('#inputTHESEMOH').val());
                let inputTHPAMOH = parseInt($('#inputTHPAMOH').val());
                let inputNOSATHESE = parseInt($('#inputNOSATHESE').val());
                let inputNOSATHPA = parseInt($('#inputNOSATHPA').val());
                let inputNOSPTHESE = parseInt($('#inputNOSPTHESE').val());
                let inputNOSPPA = parseInt($('#inputNOSPPA').val());
                let inputPerPTHESE = parseInt($('#inputPerPTHESE').val());
                let inputPerPPA = parseInt($('#inputPerPPA').val());
                let inputPerSixTHESE = parseInt($('#inputPerSixTHESE').val());
                let inputPerSixPA = parseInt($('#inputPerSixPA').val());

                let ref = db.ref(t+"/saved_formats/D6");

                // Attach an asynchronous callback to read the data at our posts reference
                await ref.once("value", function(snapshot) {

                    let last_row_cl = snapshot.child(temp_name + "/last_row").val() + 1;
                    ref.child(temp_name+"/data/"+last_row_cl).set(
                        {
                            inputCC: inputCC,
                            inputNOC: inputNOC,
                            inputTHESEMOL: inputTHESEMOL,
                            inputTHPAMOL: inputTHPAMOL,
                            inputTHESEMOH: inputTHESEMOH,
                            inputTHPAMOH: inputTHPAMOH,
                            inputNOSATHESE: inputNOSATHESE,
                            inputNOSATHPA: inputNOSATHPA,
                            inputNOSPTHESE: inputNOSPTHESE,
                            inputNOSPPA: inputNOSPPA,
                            inputPerPTHESE: inputPerPTHESE,
                            inputPerPPA: inputPerPPA,
                            inputPerSixTHESE: inputPerSixTHESE,
                            inputPerSixPA: inputPerSixPA
                        }
                    );
                    ref.child(temp_name).update({
                        "last_row": last_row_cl
                    });

                    let et_d1_tbl_body =
                        "<tr>"+
                        "<td class='align-middle'>"+last_row_cl+"</td>" +
                        "<td class='align-middle'>"+inputCC+"</td>" +
                        "<td class='align-middle'>"+inputNOC+"</td>" +
                        "<td>"+
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

                    $('#et_d1_tbl_body').append(et_d1_tbl_body);
                    $('#waitD6RowCreationModal').modal('hide');
                }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });
            }
            else if(vaild === "false")
            {
                $('#waitD6RowCreationModal').modal('hide');
                $('#impFieldModal').modal('show');
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