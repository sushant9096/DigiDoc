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

                }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });
                console.log(sel_for);
            }
        });

        $('#add_new_row').click(() => {
            $('#modalAdd').modal();
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

                let ref = db.ref(user_id+"/saved_formats/D5");

                // Attach an asynchronous callback to read the data at our posts reference
                await ref.once("value", function(snapshot) {

                    let last_row_cl = snapshot.child(sel_for + "/last_row").val() + 1;
                    ref.child(sel_for+"/data/"+last_row_cl).set(
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
                    ref.child(sel_for).update({
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

            win.loadURL(`file://${__dirname}/pr_d5.html`);

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