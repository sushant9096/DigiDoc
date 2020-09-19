const { remote } = require('electron');
const storage = require('electron-json-storage');
const os = require('os');
storage.setDataPath(os.tmpdir());

const admin = require('firebase-admin');
let serviceAccount = require('../../../google-service/digidoc-84b29-firebase-adminsdk-8qd8n-7208bf1115');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://digidoc-84b29.firebaseio.com"
});
let db = admin.database();

let user_id;
let sel_for;
storage.get('user-id', function(error, data) {
    if (error) {
        throw error;
    }
    else{

        a();

        async function a() {
            await b();
        }

        function b()
        {
            user_id = data.uid;
            console.log(user_id);
            storage.get('sel_format', function(error, data) {
                if (error) {
                    throw error;
                }
                else {
                    a();
                    async function a(){
                        await b();
                    }

                    function b() {
                        sel_for = data.sel_format;
                        let saved_d1 = db.ref(user_id+"/saved_formats/D1");
                        saved_d1.once("value", function (snapshot) {

                            $('#academicV').append(" " + snapshot.child(sel_for + "/academic_year").val());
                            $('#programV').append(" " + snapshot.child(sel_for + "/program").val());
                            $('#courseV').append(" " + snapshot.child(sel_for + "/course").val());
                            $('#course_cV').append(" " + snapshot.child(sel_for + "/course_code").val());
                            $('#semesterV').append(" " + snapshot.child(sel_for + "/semester").val());
                            $('#name_falV').append(" " + snapshot.child(sel_for + "/name_faculty").val());

                        }, function (errorObject) {
                            console.log("The read failed: " + errorObject.code);
                        }).then(r =>{
                            console.log(r);
                        });

                        var cn_row = 1;
                        let cn_subrow = 1;
                        saved_d1.child(sel_for + "/data").once("value", function (snapshot) {

                            snapshot.forEach(function (childSnapshot) {
                                console.log("in a");
                                let ch_no = childSnapshot.child("ch_no").val();
                                let CO = childSnapshot.child("CO").val();
                                let UO = childSnapshot.child("UO").val();
                                let Plan = childSnapshot.child("Plan").val();
                                let AE = childSnapshot.child("AE").val();
                                let TMM = childSnapshot.child("TMM").val();
                                let RM = childSnapshot.child("RM").val();

                                let et_vw_tbl_body =
                                    "<tr id=" + cn_row + ">" +
                                    "<td class='align-middle'>" + childSnapshot.key + "</td>" +
                                    "<td class='align-middle'>" + ch_no + "</td>" +
                                    "<td class='align-middle'>" + CO + "</td>" +
                                    "<td class='align-middle'>" + UO + "</td>" +
                                    "<td><table class='sub_rows'><tbody></tbody></table></td>" +
                                    "<td class='align-middle'>" + Plan + "</td>" +
                                    "<td class='align-middle'>" + AE + "</td>" +
                                    "<td class='align-middle'>" + TMM + "</td>" +
                                    "<td class='align-middle'>" + RM + "</td>" +
                                    "</tr>";

                                $('#et_d1_tbl_body').append(et_vw_tbl_body);

                                let ref = db.ref(user_id + "/saved_formats/D1");
                                console.log(cn_row);
                                ref.child(sel_for + "/data/" + cn_row + "/TD/TDs").once("value", function (snapshot) {
                                    console.log(snapshot.val());
                                    snapshot.forEach(function (childSnapshot) {
                                        console.log(childSnapshot.child("TD").val());
                                        $("#et_d1_tbl_body").find("#"+cn_row+" .sub_rows").append("<tr><td>" + childSnapshot.child("TD").val() + "</td></tr>");
                                        cn_subrow++;
                                    });
                                    cn_subrow = 1;
                                    $("#et_d1_tbl_body").find("#"+(cn_row)+" .sub_rows").append("<tr class='float-right sb'>"+"<td "+"id="+(cn_row)+"_"+" class='badge badge-success'>+</td></tr>");
                                    $("#et_d1_tbl_body").on("click", ".badge" , function () {

                                        $("#modalTDAdd").modal();
                                        //$(".badge").before("<tr class='text-center'><td class='badge badge-success'>test</td></tr>");
                                        var se = $(this).attr('id');
                                        console.log(se.charAt(0));
                                        TD_adder(se.charAt(0));
                                    })
                                });
                                cn_row++;
                            });

                            const options = { landscape: 'false'};
                            remote.getCurrentWindow().webContents.print(options, (success, errorType) => {
                                if (!success) console.log(errorType)
                            })
                        }, function (errorObject) {
                            console.log("The read failed: " + errorObject.code);
                        });
                    }
                }
            });
        }
    }

});