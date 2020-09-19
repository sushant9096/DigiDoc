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

        $('#create_d3').click(async () => {
            if(
                ($('#format_name').val()) &&
                ($('#academic_year').val()) &&
                ($('#program').val()) &&
                ($('#course').val()) &&
                ($('#course_code').val()) &&
                ($('#semester').val()) &&
                ($('#name_faculty').val()) &&
                ($('#total_pr').val())
            )
            {
                let t_pr = $('#total_pr').val();
                let t_pr_col = "";
                $('#Pr_Col').attr('colspan',t_pr);
                for(let i = 0; i < t_pr; i++)
                {
                    t_pr_col = t_pr_col + "<th class='text-center align-middle'>"+(i+1)+"</th>";
                }
                $('#Pr_Col_tr').html(" ");
                $('#Pr_Col_tr').append(t_pr_col);
                $('#modalRegisterForm').modal('hide');
                temp_name = $('#format_name').val();
                let acdy = $('#academic_year').val();
                let prg = $('#program').val();
                let crse = $('#course').val();
                let crse_code = $('#course_code').val();
                let sem = $('#semester').val();
                let nam_fac = $('#name_faculty').val();
                let usersRef = db.ref(t + "/saved_formats/D3");
                await usersRef.child(temp_name).set({
                    academic_year: acdy,
                    program: prg,
                    course: crse,
                    course_code: crse_code,
                    semester: sem,
                    name_faculty: nam_fac,
                    total_pr: t_pr,
                    last_row: 0
                });

                $('#compltedD3CreationModal').modal('show');
                $('#academicV').append(" " + acdy);
                $('#programV').append(" " + prg);
                $('#courseV').append(" " + crse);
                $('#course_cV').append(" " + crse_code);
                $('#semesterV').append(" " + sem);
                $('#name_falV').append(" " + nam_fac);
                $('#create_d3_format').remove();
                for(let i = 0; i < t_pr; i++)
                {
                    let dyn_field = "" +
                        "<div class=\"md-form mb-5\">\n" +
                        "   <label data-error=\"wrong\" data-success=\"right\">"+"Practical "+(i+1)+"</label>\n" +
                        "   <input class=\"form-control\""+" id="+('input_pr_'+(i+1))+" type=\"number\">\n" +
                        "</div>";
                    $('#d3_row_create_body').append(dyn_field);
                }
                let aft_dyn = "" +
                    "<div class=\"md-form mb-5\">\n" +
                    "                            <label data-error=\"wrong\" data-success=\"right\">Total Marks out of (10 x No of Expt.)</label>\n" +
                    "                            <input class=\"form-control\" id=\"inputTM\" type=\"text\">\n" +
                    "                        </div>\n" +
                    "                        <div class=\"md-form mb-5\">\n" +
                    "                            <label data-error=\"wrong\" data-success=\"right\">PA Marks of Practical Converted According to TE Scheme</label>\n" +
                    "                            <input class=\"form-control\" id=\"inputPAM\" type=\"text\">\n" +
                    "                        </div>";

                $('#d3_row_create_body').append(aft_dyn);
                $('#add_new_row').show();
            }
            else {
                $('#modalRegisterForm').modal('hide');
                $('#impFieldModal').modal('show');
            }
        });

        $('#add_new_row').click(() => {
            $('#modalAdd').modal();
        });

        let fill_count;
        let tmp_cn;
        $('#add_row').click(async () => {

            let ref = db.ref(t+"/saved_formats/D3");
            fill_count = 0;
            tmp_cn = 0;

            // Attach an asynchronous callback to read the data at our posts reference
            await ref.once("value", function(snapshot) {
                tmp_cn = snapshot.child(temp_name + "/total_pr").val();

            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });

            for(let i = 0; i < tmp_cn; i++)
            {
                if($('#input_pr_'+(i+1)).val())
                {
                    fill_count += 1;
                    console.log(fill_count)
                }
            }

            console.log(fill_count);

            if(
                $('#inputRollNo').val() &&
                $('#inputEnrollmentNo').val() &&
                $('#inputExamSeatNo').val() &&
                $('#inputNameofStudent').val() &&
                $('#inputTM').val() &&
                $('#inputPAM').val()
            )
            {
                let inputRollNo = $('#inputRollNo').val();
                let inputEnrollmentNo = $('#inputEnrollmentNo').val();
                let inputExamSeatNo = $('#inputExamSeatNo').val();
                let inputNameofStudent = $('#inputNameofStudent').val();
                let Pr_container = "";
                let inputTM = $('#inputTM').val();
                let inputPAM = $('#inputPAM').val();

                let ref = db.ref(t+"/saved_formats/D3");
                console.log(tmp_cn);

                // Attach an asynchronous callback to read the data at our posts reference
                await ref.once("value", function (snapshot) {

                    let last_row_cl = snapshot.child(temp_name + "/last_row").val() + 1;
                    ref.child(temp_name + "/data/" + last_row_cl).set(
                        {
                            inputRollNo: inputRollNo,
                            inputEnrollmentNo: inputEnrollmentNo,
                            inputExamSeatNo: inputExamSeatNo,
                            inputNameofStudent: inputNameofStudent,
                            Pr: {
                                last_pr: 0
                            },
                            inputTM: inputTM,
                            inputPAM: inputPAM
                        }
                    );

                    for(let i = 0; i < tmp_cn; i++)
                    {
                        ref.child(temp_name + "/data/" + last_row_cl +"/Pr/Prs/"+(i+1)).set(
                            {
                                pr: $('#input_pr_'+(i+1)).val()
                            }
                        );

                        ref.child(temp_name + "/data/" + last_row_cl +"/Pr").update(
                            {
                                last_pr: (i+1)
                            }
                        );

                        Pr_container += "<td>"+$('#input_pr_'+(i+1)).val()+"</td>";
                    }

                    ref.child(temp_name).update({
                        "last_row": last_row_cl
                    });

                    let et_d1_tbl_body =
                        "<tr>" +
                        "<td>"+last_row_cl+"</td>"+
                        "<td>"+ $('#inputRollNo').val() +"</td>"+
                        "<td>"+ $('#inputEnrollmentNo').val() +"</td>"+
                        "<td>"+ $('#inputExamSeatNo').val() +"</td>"+
                        "<td>"+ $('#inputNameofStudent').val() +"</td>"+
                        Pr_container+
                        "<td>"+inputTM+"</td>" +
                        "<td>"+inputPAM+"</td>" +
                        "</tr>";

                    $('#et_d1_tbl_body').append(et_d1_tbl_body);

                }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });
                $('#modalAdd').modal('hide');
            }
        });

        $('#go_back_home').click(() => {
            location.replace('../../userhome.html');
        });
    }

});