"use strict";
const {remote} = require('electron');

const admin = require('firebase-admin');
let serviceAccount = require('../../../google-service/digidoc-84b29-firebase-adminsdk-8qd8n-7208bf1115');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://digidoc-84b29.firebaseio.com"
});
let db = admin.database();

let user_id = 'none';
let sel_for = 'none';
const os = require('os');
const storage = require('electron-json-storage');
storage.setDataPath(os.tmpdir());
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
                        }, function (errorObject) {
                            console.log("The read failed: " + errorObject.code);
                        });


                        function TD_adder(se)
                        {
                            $('#add_TD_row').click(() => {

                                if($('#inputTD_row').val())
                                {
                                    let lst_sub_row = 0;
                                    let ref = db.ref(user_id + "/saved_formats/D1");
                                    ref.child(sel_for + "/data/" + se.charAt(0) + "/TD").once("value", function (snapshot) {
                                        console.log(snapshot.child("last_subrow").val());
                                        lst_sub_row = snapshot.child("last_subrow").val();
                                        ref.child(sel_for + "/data/" + se.charAt(0) + "/TD/TDs/"+(lst_sub_row+1)).set(
                                            {
                                                TD: $('#inputTD_row').val()
                                            });

                                        ref.child(sel_for + "/data/" + se.charAt(0) + "/TD").update({
                                            last_subrow: (lst_sub_row+1)
                                        });

                                        remote.getCurrentWindow().reload();
                                    });
                                }
                            });
                        }

                        $('#add_new_row').click(() => {
                            $('#modalAdd').modal();
                        });

                        $('#add_row').click(() => {

                            $('#waitD6RowCreationModal').modal('show');

                            if(
                                $('#input_ch_no').val() &&
                                $('#inputCO').val() &&
                                $('#inputUO').val() &&
                                $('#inputTD').val() &&
                                $('#inputPlane').val() &&
                                $('#inputAE').val() &&
                                $('#inputTMM').val() &&
                                $('#inputRM').val()
                            )
                            {
                                let ch_no = $('#input_ch_no').val();
                                let CO = $('#inputCO').val();
                                let UO = $('#inputUO').val();
                                let TD= $('#inputTD').val();
                                let Plan = $('#inputPlane').val();
                                let AE = $('#inputAE').val();
                                let TMM = $('#inputTMM').val();
                                let RM = $('#inputRM').val();
                                console.log("data");

                                let ref = db.ref(user_id+"/saved_formats/D1");

                                // Attach an asynchronous callback to read the data at our posts reference
                                ref.once("value", function(snapshot) {

                                    let last_row_cl = snapshot.child(sel_for + "/last_row").val() + 1;
                                    ref.child(sel_for+"/data/"+last_row_cl).set(
                                        {
                                            ch_no: ch_no,
                                            CO: CO,
                                            UO: UO,
                                            TD: {
                                                TDs: {
                                                    1: {
                                                        TD: TD
                                                    }
                                                },
                                                last_subrow: 1
                                            },
                                            Plan: Plan,
                                            AE: AE,
                                            TMM: TMM,
                                            RM: RM
                                        }
                                    );
                                    ref.child(sel_for).update({
                                        "last_row": last_row_cl
                                    });

                                    let et_d1_tbl_body =
                                        "<tr>"+
                                        "<td class='align-middle'>"+last_row_cl+"</td>" +
                                        "<td class='align-middle'>"+ch_no+"</td>" +
                                        "<td class='align-middle'>"+CO+"</td>" +
                                        "<td><table class='sub_rows'><tbody>"+"<tr>"+TD+"</tr>"+"</tbody></table></td>" +
                                        "<td class='align-middle'>"+Plan+"</td>" +
                                        "<td class='align-middle'>"+AE+"</td>" +
                                        "<td class='align-middle'>"+TMM+"</td>" +
                                        "<td class='align-middle'>"+RM+"</td>" +
                                        "</tr>";

                                    $('#et_d1_tbl_body').append(et_d1_tbl_body);
                                    $('#compltedRowCreationModal').modal(true);
                                    remote.getCurrentWindow().reload();

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

                            win.loadURL(`file://${__dirname}/pr_d1.html`);

                            /*remote.getCurrentWindow().webContents.printToPDF({}).then(data => {

                            }).catch(error => {
                                console.log(error)
                            })*/
                        });

                        $('#go_back_home').click(() => {
                            location.replace('../../userhome.html');
                        });
                    }
                }
            });
        }
    }

});