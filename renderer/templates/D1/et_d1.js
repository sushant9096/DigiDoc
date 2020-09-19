"use strict";
const admin = require('firebase-admin');
let serviceAccount = require('../../../google-service/digidoc-84b29-firebase-adminsdk-8qd8n-7208bf1115');

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: "https://digidoc-84b29.firebaseio.com"
});

let db = admin.database();
let temp_name;
let last_row_cl = 0;

let t;
const os = require('os');
const storage = require('electron-json-storage');
storage.setDataPath(os.tmpdir());
storage.get('user-id', function(error, data) {
   if (error) throw error;
   if(data.uid)
   {
      t = data.uid;

      $('#add_new_row').hide();
      $('#add_new_row').click(() => {
         $('#modalAdd').modal();
      });

      $('#create_d1').click(async () => {

         $('#modalRegisterForm').modal('hide');
         $('#waitD3RowCreationModal').modal('show');

         if(
             ($('#format_name').val()) &&
             ($('#academic_year').val()) &&
             ($('#program').val()) &&
             ($('#course').val()) &&
             ($('#course_code').val()) &&
             ($('#semester').val()) &&
             ($('#name_faculty').val())
         )
         {

            temp_name = $('#format_name').val();
            let acdy = $('#academic_year').val();
            let prg = $('#program').val();
            let crse = $('#course').val();
            let crse_code = $('#course_code').val();
            let sem = $('#semester').val();
            let nam_fac = $('#name_faculty').val();
            let usersRef = db.ref(t+"/saved_formats/D1");
            await usersRef.child(temp_name).set({
               academic_year: acdy,
               program: prg,
               course: crse,
               course_code: crse_code,
               semester: sem,
               name_faculty: nam_fac,
               last_row: 0
            });

            $('#waitD3RowCreationModal').modal('hide');
            $('#compltedD1CreationModal').modal('show');
            $('#add_new_row').show();
            $('#academicV').append(" "+acdy);
            $('#programV').append(" "+prg);
            $('#courseV').append(" "+crse);
            $('#course_cV').append(" "+crse_code);
            $('#semesterV').append(" "+sem);
            $('#name_falV').append(" "+nam_fac);
            storage.set('sel_format',{ 'sel_format': temp_name }, function(error) {
               if (error) throw error;
            });
            location.replace('vw_d1.html');
            $('#create_d1_format').remove();
         }
         else{
            $('#modalRegisterForm').modal('hide');
            $('#impFieldModal').modal('show');
         }
      });

      $('#add_row').click(async () => {

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
            console.log(temp_name);

            let ref = db.ref(t+"/saved_formats/D1");

            // Attach an asynchronous callback to read the data at our posts reference
            await ref.once("value", function(snapshot) {

               last_row_cl = snapshot.child(temp_name+"/last_row").val() + 1;
               ref.child(temp_name+"/data/"+last_row_cl).set(
                   {
                      ch_no: ch_no,
                      CO: CO,
                      UO: UO,
                      TD: TD,
                      Plan: Plan,
                      AE: AE,
                      TMM: TMM,
                      RM: RM
                   }
               );
               ref.child(temp_name).update({
                  "last_row": last_row_cl
               });

               let et_d1_tbl_body =
                   "<tr>"+
                   "<td>"+last_row_cl+"</td>" +
                   "<td>"+ch_no+"</td>" +
                   "<td>"+CO+"</td>" +
                   "<td>"+UO+"</td>" +
                   "<td>"+TD+"</td>" +
                   "<td>"+Plan+"</td>" +
                   "<td>"+AE+"</td>" +
                   "<td>"+TMM+"</td>" +
                   "<td>"+RM+"</td>" +
                   "</tr>";

               $('#et_d1_tbl_body').append(et_d1_tbl_body);

            }, function (errorObject) {
               console.log("The read failed: " + errorObject.code);
            });
         }
      });

      $('#go_back_home').click(() => {
         location.replace('../../userhome.html');
      });
   }
});