const { remote } = require('electron');
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
                                Pr_container += ("<td class='font-weight-normal'>"+childSnapshot.child("pr").val()+"</td>");
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

        $('#print_preview').click(() => {

            const { BrowserWindow } = require('electron').remote;

            let win = new BrowserWindow({
                width: 1024,
                height: 600,
                autoHideMenuBar: true,
                webPreferences: {
                    nodeIntegration: true,
                    webSecurity: false
                }
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
    }
});