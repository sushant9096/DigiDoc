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

        $('#create_d2').click(async () => {

            if (
                ($('#format_name').val()) &&
                ($('#academic_year').val()) &&
                ($('#program').val()) &&
                ($('#course').val()) &&
                ($('#course_code').val()) &&
                ($('#semester').val()) &&
                ($('#name_faculty').val())
            ) {

                temp_name = $('#format_name').val();
                let acdy = $('#academic_year').val();
                let prg = $('#program').val();
                let crse = $('#course').val();
                let crse_code = $('#course_code').val();
                let sem = $('#semester').val();
                let nam_fac = $('#name_faculty').val();
                let usersRef = db.ref(t + "/saved_formats/D2");
                await usersRef.child(temp_name).set({
                    academic_year: acdy,
                    program: prg,
                    course: crse,
                    course_code: crse_code,
                    semester: sem,
                    name_faculty: nam_fac,
                    last_row: 0
                });

                $('#compltedD2CreationModal').modal('show');
                $('#add_new_row').show();
                $('#academicV').append(" " + acdy);
                $('#programV').append(" " + prg);
                $('#courseV').append(" " + crse);
                $('#course_cV').append(" " + crse_code);
                $('#semesterV').append(" " + sem);
                $('#name_falV').append(" " + nam_fac);
                $('#create_d1_format').remove();
                $('#modalRegisterForm').modal('hide')
            } else {
                $('#modalRegisterForm').modal('hide');
                $('#impFieldModal').modal('show');
            }
        });

        $('#add_row').click(async () => {

            if(
                $('#inputCO').val() &&
                $('#inputPro').val() &&
                $('#inputEASJP').val() &&
                $('#inputPlaneDateFrom').val() &&
                $('#inputPlaneDateTo').val() &&
                $('#inputAD').val() &&
                $('#inputRem').val()
            )
            {
                let CO = $('#inputCO').val();
                let Pro = $('#inputPro').val();
                let EASJP = $('#inputEASJP').val();
                let PDF = $('#inputPlaneDateFrom').val();
                let PDT = $('#inputPlaneDateTo').val();
                let AD = $('#inputAD').val();
                let RM = $('#inputRem').val();

                console.log("data");
                console.log(temp_name);

                let ref = db.ref(t+"/saved_formats/D2");

                // Attach an asynchronous callback to read the data at our posts reference
                await ref.once("value", function(snapshot) {

                    let last_row_cl = snapshot.child(temp_name + "/last_row").val() + 1;
                    ref.child(temp_name+"/data/"+last_row_cl).set(
                        {
                            CO: CO,
                            PrO: Pro,
                            EASJP: EASJP,
                            PDF: PDF,
                            PDT: PDT,
                            AD: AD,
                            RM: RM
                        }
                    );
                    ref.child(temp_name).update({
                        "last_row": last_row_cl
                    });

                    let et_d1_tbl_body =
                        "<tr>"+
                        "<td>"+last_row_cl+"</td>" +
                        "<td>"+CO+"</td>" +
                        "<td>"+Pro+"</td>" +
                        "<td>"+EASJP+"</td>" +
                        "<td>"+PDF+"</td>" +
                        "<td>"+PDT+"</td>" +
                        "<td>"+AD+"</td>" +
                        "<td>"+RM+"</td>" +
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