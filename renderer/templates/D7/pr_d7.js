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
                let saved_d1 = db.ref(user_id+"/saved_formats/D7");
                saved_d1.once("value", function(snapshot) {

                    $('#academicV').append(" "+snapshot.child(sel_for+"/academic_year").val());
                    $('#programV').append(" "+snapshot.child(sel_for+"/program").val());

                    saved_d1.child(sel_for+"/data").once("value", function(snapshot) {
                        snapshot.forEach(function (childSnapshot) {
                            let inputNoIAndCoD = childSnapshot.child("inputNoIAndCoD").val();
                            let inputSem = childSnapshot.child("inputSem").val();
                            let inputCouN = childSnapshot.child("inputCouN").val();
                            let inputNoCordi= childSnapshot.child("inputNoCordi").val();
                            let inputDoConductOAct= childSnapshot.child("inputDoConductOAct").val();
                            let inputNoOfBenf= childSnapshot.child("inputNoOfBenf").val();
                            let inputRelToPosAndPe= childSnapshot.child("inputRelToPosAndPe").val();

                            let et_vw_tbl_body =
                                "<tr>"+
                                "<td>"+childSnapshot.key+"</td>" +
                                "<td>"+inputNoIAndCoD+"</td>" +
                                "<td>"+inputSem+"</td>" +
                                "<td>"+inputCouN+"</td>" +
                                "<td>"+inputNoCordi+"</td>" +
                                "<td>"+inputDoConductOAct+"</td>" +
                                "<td>"+inputNoOfBenf+"</td>" +
                                "<td>"+inputRelToPosAndPe+"</td>" +
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