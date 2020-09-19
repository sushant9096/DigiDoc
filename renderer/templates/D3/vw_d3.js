const admin = require('firebase-admin');
let serviceAccount = require('../../../google-service/digidoc-84b29-firebase-adminsdk-8qd8n-7208bf1115');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://digidoc-84b29.firebaseio.com"
});
let db = admin.database();

let user_id;
let sel_for = "";
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
            if(data.sel_format && sel_for !== undefined)
            {
                sel_for = data.sel_format;
                let saved_d1 = db.ref(user_id+"/saved_formats/D3");
                saved_d1.once("value", function(snapshot) {

                    $('#academicV').append(" "+snapshot.child(sel_for+"/academic_year").val());
                    $('#programV').append(" "+snapshot.child(sel_for+"/program").val());
                    $('#courseV').append(" "+snapshot.child(sel_for+"/course").val());
                    $('#course_cV').append(" "+snapshot.child(sel_for+"/course_code").val());
                    $('#semesterV').append(" "+snapshot.child(sel_for+"/semester").val());
                    $('#name_falV').append(" "+snapshot.child(sel_for+"/name_faculty").val());

                    let t_pr = 0;
                    t_pr = snapshot.child(sel_for + "/total_pr").val();
                    let t_pr_col = "";
                    $('#Pr_Col').attr('colspan',t_pr);
                    for(let i = 0; i < t_pr; i++)
                    {
                        t_pr_col = t_pr_col + "<th class='text-center align-middle'>"+(i+1)+"</th>";
                    }
                    $('#Pr_Col_tr').html(" ");
                    $('#Pr_Col_tr').append(t_pr_col);

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

                    saved_d1.child(sel_for+"/data").once("value",function(snapshot) {
                        snapshot.forEach(function (childSnapshot) {
                            console.log(childSnapshot);
                            let inputRollNo = childSnapshot.child('inputRollNo').val();
                            let inputEnrollmentNo = childSnapshot.child('inputEnrollmentNo').val();
                            let inputExamSeatNo = childSnapshot.child('inputExamSeatNo').val();
                            let inputNameofStudent = childSnapshot.child('inputNameofStudent').val();
                            let Pr_container = "";
                            let inputTM = childSnapshot.child('inputTM').val();
                            let inputPAM = childSnapshot.child('inputPAM').val();

                            snapshot.child(childSnapshot.key+"/Pr/Prs").forEach(function(childSnapshot) {
                                Pr_container += ("<td>"+childSnapshot.child("pr").val()+"</td>");
                            });

                            let et_vw_tbl_body =
                                "<tr>"+
                                "<td>"+childSnapshot.key+"</td>" +
                                "<td>"+inputRollNo+"</td>" +
                                "<td>"+inputEnrollmentNo+"</td>" +
                                "<td>"+inputExamSeatNo+"</td>" +
                                "<td>"+inputNameofStudent+"</td>" +
                                Pr_container+
                                "<td>"+inputTM+"</td>" +
                                "<td>"+inputPAM+"</td>" +
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

        let last_row_cl;
        let fill_count;
        let tmp_cn;
        $('#add_row').click(async () => {

            let ref = db.ref(user_id+"/saved_formats/D3");
            fill_count = 0;
            tmp_cn = 0;

            // Attach an asynchronous callback to read the data at our posts reference
            await ref.once("value", function(snapshot) {
                tmp_cn = snapshot.child(sel_for + "/total_pr").val();

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

                let ref = db.ref(user_id+"/saved_formats/D3");
                console.log(tmp_cn);

                // Attach an asynchronous callback to read the data at our posts reference
                await ref.once("value", function (snapshot) {

                    let last_row_cl = snapshot.child(sel_for + "/last_row").val() + 1;
                    ref.child(sel_for + "/data/" + last_row_cl).set(
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
                        ref.child(sel_for + "/data/" + last_row_cl +"/Pr/Prs/"+(i+1)).set(
                            {
                                pr: $('#input_pr_'+(i+1)).val()
                            }
                        );

                        ref.child(sel_for + "/data/" + last_row_cl +"/Pr").update(
                            {
                                last_pr: (i+1)
                            }
                        );

                        Pr_container += "<td>"+$('#input_pr_'+(i+1)).val()+"</td>";
                    }

                    ref.child(sel_for).update({
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

        $('#print_preview').click(() => {

            const { BrowserWindow } = require('electron').remote;

            let win = new BrowserWindow({
                width: 1024,
                height: 600,
                autoHideMenuBar: true,
                webPreferences: {
                    nodeIntegration: true,
                    webSecurity: false
                },
                webSecurity: false
            });
            /*win.on('closed', () => {
                win = null
            });*/
            // Issue Solved code

            win.loadURL(`file://${__dirname}/pr_d3.html`);

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