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
        $('#create_d5').click(async () => {

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
                let usersRef = db.ref(t + "/saved_formats/D5");
                await usersRef.child(temp_name).set({
                    academic_year: acdy,
                    program: prg,
                    course: crse,
                    course_code: crse_code,
                    semester: sem,
                    name_faculty: nam_fac,
                    last_row: 0
                });

                $('#compltedd5CreationModal').modal('show');
                $('#add_new_row').show();
                $('#academicV').append(" " + acdy);
                $('#programV').append(" " + prg);
                $('#courseV').append(" " + crse);
                $('#course_cV').append(" " + crse_code);
                $('#semesterV').append(" " + sem);
                $('#name_falV').append(" " + nam_fac);
                $('#create_d5_format').remove();
                $('#modalRegisterForm').modal('hide')
            } else {
                $('#modalRegisterForm').modal('hide');
                $('#impFieldModal').modal('show');
            }
        });

        let TS2TS = 0;
        let avg = 0;
        $('#inputTS1').change(() => {
            TS2TS += parseInt($('#inputTS1').val());
        });
        $('#inputTS2').change(() => {
            TS2TS += parseInt($('#inputTS2').val());
            avg = TS2TS / 2;
            $('#inputAvgTS1TS2').val(avg);
        });
        let Tot = 0;
        $('#inputPGA').change(() => {
            Tot += parseInt($('#inputPGA').val());
            console.log("tot1"+Tot);
        });
        $('#inputPOP').change(() => {
            let tmp = avg + Tot + parseInt($('#inputPOP').val());
            console.log(tmp);
            $('#inputTotal').val(tmp);
        });

        $('#add_row').click(async () => {

            if(
                $('#inputRno').val() &&
                $('#inputNOS').val() &&
                $('#inputEnrolNo').val() &&
                $('#inputExSeNo').val() &&
                $('#inputTS1').val() &&
                $('#inputTS2').val() &&
                $('#inputPGA').val() &&
                $('#inputPOP').val()
            )
            {
                let inputRno = parseInt($('#inputRno').val());
                let inputNOS = $('#inputNOS').val();
                let inputEnrolNo = parseInt($('#inputEnrolNo').val());
                let inputExSeNo = parseInt($('#inputExSeNo').val());
                let inputTS1 = parseInt($('#inputTS1').val());
                let inputTS2 = parseInt($('#inputTS2').val());
                let inputPGA = parseInt($('#inputPGA').val());
                let inputPOP = parseInt($('#inputPOP').val());

                let ref = db.ref(t+"/saved_formats/D5");

                // Attach an asynchronous callback to read the data at our posts reference
                await ref.once("value", function(snapshot) {

                    let last_row_cl = snapshot.child(temp_name + "/last_row").val() + 1;
                    ref.child(temp_name+"/data/"+last_row_cl).set(
                        {
                            inputRno: inputRno,
                            inputNOS: inputNOS,
                            inputEnrolNo: inputEnrolNo,
                            inputExSeNo: inputExSeNo,
                            inputTS1: inputTS1,
                            inputTS2: inputTS2,
                            inputAvgTS1TS2: ((inputTS1+inputTS2)/2),
                            inputPGA: inputPGA,
                            inputPOP: inputPOP,
                            inputTotal: (((inputTS1+inputTS2)/2)+inputPGA+inputPOP)
                        }
                    );
                    ref.child(temp_name).update({
                        "last_row": last_row_cl
                    });

                    let et_d1_tbl_body =
                        "<tr>"+
                        "<td>"+last_row_cl+"</td>" +
                        "<td>"+inputRno+"</td>" +
                        "<td>"+inputNOS+"</td>" +
                        "<td>"+inputEnrolNo+"</td>" +
                        "<td>"+inputExSeNo+"</td>" +
                        "<td>"+inputTS1+"</td>" +
                        "<td>"+inputTS2+"</td>" +
                        "<td>"+((inputTS1+inputTS2)/2)+"</td>" +
                        "<td>"+inputPGA+"</td>" +
                        "<td>"+inputPOP+"</td>" +
                        "<td>"+(((inputTS1+inputTS2)/2)+inputPGA+inputPOP)+"</td>" +
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