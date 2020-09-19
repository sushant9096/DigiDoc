const admin = require('firebase-admin');
let serviceAccount = require('../google-service/digidoc-84b29-firebase-adminsdk-8qd8n-7208bf1115');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://digidoc-84b29.firebaseio.com"
});

let t;
const os = require('os');
const storage = require('electron-json-storage');
storage.setDataPath(os.tmpdir());
const fs = require('fs');
const path = os.tmpdir();

$('#logout').click(() => {
    try {
        fs.unlinkSync(path+"/user-id.json");
        location.replace('main.html');
        //file removed
    } catch(err) {
        console.error(err)
    }
});

storage.get('user-id', function(error, data) {
    if (error) throw error;
    if(data.uid)
    {
        t = data.uid;
        let db = admin.database();
        let ref = db.ref(t);

        admin.auth().getUser(t)
            .then(function(userRecord) {
                // See the UserRecord reference doc for the contents of userRecord.
                console.log('Successfully fetched user data:', userRecord.toJSON());
            })
            .catch(function(error) {
                console.log('Error fetching user data:', error);
                location.replace('main.html');
            });

        // Attach an asynchronous callback to read the data at our posts reference
        ref.on("value", function(snapshot) {
            console.log(snapshot.child('Bio').val());
            let tmp_name = snapshot.child('Name').val();
            $('#user_name').html(tmp_name);
            if(snapshot.child('Bio').val() !== null)
            {
                let tmp_bio = snapshot.child('Bio').val();
                $('#user_bio').html(tmp_bio);
            }
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    }

});
$('#sv_container').hide();
const d1_format =
    "    <div class=\"row\">\n" +
    "        <div class=\"cell has-text-weight-bold\" style='text-align: right'>D1</div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"cell columns is-centered has-text-weight-bold\">Maharashtra State Board of Technical Education</div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"cell columns is-centered has-text-weight-bold\">TEACHING PLAN(TP)</div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"cell is-left\">Academic Year:</div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"cell\">Program:</div>\n" +
    "        <div class=\"cell\">Course:</div>\n" +
    "        <div class=\"cell\">Course Code:</div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"cell\">Semester:</div>\n" +
    "        <div class=\"cell\">Name of Faculty:</div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <table border=\"1\">\n" +
    "            <thead>\n" +
    "            <tr>\n" +
    "                <th>Chapter No.(Allocated Hrs.)</th>\n" +
    "                <th>CO(Mention Only Number)</th>\n" +
    "                <th>UO(Mention Only Number)</th>\n" +
    "                <th>Title/Details</th>\n" +
    "                <th>Plan(Form - To & No. of Lectures)</th>\n" +
    "                <th>Actual Execution(From-To & No. of Lectures.)</th>\n" +
    "                <th>Teaching Method/Media</th>\n" +
    "                <th>Remarks</th>\n" +
    "            </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "            <tr id=\"1\">\n" +
    "            <td contenteditable=\"true\"></td>" +
    "            <td contenteditable=\"true\"></td>" +
    "            <td contenteditable=\"true\"></td>" +
    "            <td contenteditable=\"true\"></td>" +
    "            <td contenteditable=\"true\"></td>" +
    "            <td contenteditable=\"true\"></td>" +
    "            <td contenteditable=\"true\"></td>" +
    "            <td contenteditable=\"true\"></td>" +
    "            </tr >\n" +
    "            <td contenteditable=\"true\"></td>" +
    "            <td contenteditable=\"true\"></td>" +
    "            <td contenteditable=\"true\"></td>" +
    "            <td contenteditable=\"true\"></td>" +
    "            <td contenteditable=\"true\"></td>" +
    "            <td contenteditable=\"true\"></td>" +
    "            <td contenteditable=\"true\"></td>" +
    "            <td contenteditable=\"true\"></td>" +
    "            </tbody>\n" +
    "        </table>\n" +
    "    </div>" +
    "    <div id=\"tbl_last\" class=\"row\" style=\"padding-top: 5vh\">\n" +
    "        <div class=\"cell has-text-weight-bold\" style=\"text-align: center\">(Name & Signature of Faculty)</div>\n" +
    "        <div class=\"cell has-text-weight-bold\" style=\"text-align: center\">(Name & Signature of HOD)</div>\n" +
    "    </div>\n";

const d2_format =
    "                <div class=\"row\" style='text-align: right'>\n" +
    "                    <div class=\"cell has-text-weight-bold\">D2</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell has-text-centered has-text-weight-bold\">Maharashtra State Board of Technical Education</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell has-text-centered has-text-weight-bold\">LABORATORY ASSIGNMENT/SHEET/JOB/PROJECT ACTIVITY PLANNING(LP)</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell is-left\">Academic Year:</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell\">Program:</div>\n" +
    "                    <div class=\"cell\">Course:</div>\n" +
    "                    <div class=\"cell\">Course Code:</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell\">Semester:</div>\n" +
    "                    <div class=\"cell\">Name of Faculty:</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <table border=\"1\" style='width: calc(100%)'>\n" +
    "                        <thead aria-rowspan=\"2\">\n" +
    "                        <tr>\n" +
    "                            <th rowspan=\"2\">Sr. No</th>\n" +
    "                            <th rowspan=\"2\">CO</th>\n" +
    "                            <th rowspan=\"2\">PrO</th>\n" +
    "                            <th rowspan=\"2\">Name of Experiment/Assignment/Sheet/Job/Project Activity</th>\n" +
    "                            <th colspan=\"2\">Planned date</th>\n" +
    "                            <th rowspan=\"2\">Actual Date</th>\n" +
    "                            <th rowspan=\"2\">Remark</th>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <th>From</th>\n" +
    "                            <th>To</th>\n" +
    "                        </tr>\n" +
    "                        </thead>\n" +
    "                        <tbody>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        </tbody>\n" +
    "                    </table>\n" +
    "                </div>\n" +
    "                <div class=\"row\" style=\"padding-top: 5vh\">\n" +
    "                    <div class=\"cell has-text-weight-bold\" style=\"text-align: center\">(Name & Signature of Faculty)</div>\n" +
    "                    <div class=\"cell has-text-weight-bold\" style=\"text-align: center\">(Name & Signature of HOD)</div>\n" +
    "                </div>";

const d3_format= "" +
    "        <div class=\"row\" style=\"text-align: right\">\n" +
    "            <div class=\"cell has-text-weight-bold\">D3</div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"cell has-text-centered has-text-weight-bold\">Maharashtra State Board of Technical Education</div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"cell has-text-centered has-text-weight-bold\">PROGRESSIVE ASSESSMENT OF PRACTICALS</div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"cell is-left\">Academic Year:</div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"cell\">Program:</div>\n" +
    "            <div class=\"cell\">Course:</div>\n" +
    "            <div class=\"cell\">Course Code:</div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"cell\">Semester:</div>\n" +
    "            <div class=\"cell\">Name of Faculty:</div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <table border=\"1\">\n" +
    "                <thead>\n" +
    "                <tr>\n" +
    "                    <th rowspan=\"2\" class=\"has-text-centered\">Roll No</th>\n" +
    "                    <th rowspan=\"2\" class=\"has-text-centered\">Enrollment No</th>\n" +
    "                    <th rowspan=\"2\" class=\"has-text-centered\">Exam Seat No</th>\n" +
    "                    <th rowspan=\"2\" class=\"has-text-centered\">Name of Student</th>\n" +
    "                    <th colspan=\"10\" class=\"has-text-centered\">Experiment / JOB / Assignment / Sheet / Activity of Project </th>\n" +
    "                    <th rowspan=\"2\" class=\"has-text-centered\">Total Marks out of (10 x No of Expt.)<br>(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)</th>\n" +
    "                    <th rowspan=\"2\" class=\"has-text-centered\">PA Marks of Practical Converted According to TE Scheme<br> (Max Marks- )</th>\n" +
    "\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <th class=\"has-text-centered\">1</th>\n" +
    "                    <th class=\"has-text-centered\">2</th>\n" +
    "                    <th class=\"has-text-centered\">3</th>\n" +
    "                    <th class=\"has-text-centered\">4</th>\n" +
    "                    <th class=\"has-text-centered\">5</th>\n" +
    "                    <th class=\"has-text-centered\">6</th>\n" +
    "                    <th class=\"has-text-centered\">7</th>\n" +
    "                    <th class=\"has-text-centered\">8</th>\n" +
    "                    <th class=\"has-text-centered\">9</th>\n" +
    "                    <th class=\"has-text-centered\">10</th>\n" +
    "                </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                <tr>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </div>\n" +
    "        <div id=\"tbl_last\" class=\"row\" style=\"padding-top: 5vh\">\n" +
    "            <div class=\"cell has-text-weight-bold\" style=\"text-align: center\">(Name &amp; Signature of Faculty)</div>\n" +
    "            <div class=\"cell has-text-weight-bold\" style=\"text-align: center\">(Name &amp; Signature of HOD)</div>\n" +
    "        </div>";

const d4_format="<div class=\"row\" style=\"text-align: right\">\n" +
    "                    <div class=\"cell has-text-weight-bold\">D4</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell has-text-centered has-text-weight-bold\">Maharashtra State Board of Technical Education</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell has-text-centered has-text-weight-bold\">END SEMESTER EXAMINATION ASSESSMENT OF PRACTICAL</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell has-text-centered has-text-weight-bold\">(External/Internal)</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell is-left\">Academic Year:</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell\">Program:</div>\n" +
    "                    <div class=\"cell\">Course:</div>\n" +
    "                    <div class=\"cell\">Course Code:</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell\">Semester:</div>\n" +
    "                    <div class=\"cell\">Name of Faculty:</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell\">Marks Max:</div>\n" +
    "                    <div class=\"cell\">Marks Minimum:</div>\n" +
    "                    <div class=\"cell\">Date of Examination:</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <table border=\"1\" style=\"width: calc(100%)\">\n" +
    "                        <thead aria-rowspan=\"2\">\n" +
    "                        <tr>\n" +
    "                            <th>Enrolment No</th>\n" +
    "                            <th>Name of Student</th>\n" +
    "                            <th>Exam Seat No</th>\n" +
    "                            <th>Marks obtained in Oral / Practical Exam. As per T.E Scheme (Max Marks- )</th>\n" +
    "                        </tr>\n" +
    "                        </thead>\n" +
    "                        <tbody>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        </tbody>\n" +
    "                    </table>\n" +
    "                </div>\n" +
    "                <div class=\"row\" style=\"padding-top: 5vh\">\n" +
    "                    <div class=\"cell has-text-weight-bold\" style=\"text-align: center\">(Name &amp; Signature of Internal Examiner)</div>\n" +
    "                    <div class=\"cell has-text-weight-bold\" style=\"text-align: center\">(Name &amp; Signature of External Examiner)</div>\n" +
    "                </div>";

const d5_format =
    "<div class=\"row\">\n" +
    "            <div class=\"cell has-text-weight-bold\" style=\"text-align: right\">D5</div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"cell columns is-centered has-text-weight-bold\">Maharashtra State Board of Technical Education</div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"cell columns is-centered has-text-weight-bold\">PROGRESSIVE ASSESSMENT OF THEORY</div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"cell is-left\">Academic Year:</div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"cell\">Program:</div>\n" +
    "            <div class=\"cell\">Course:</div>\n" +
    "            <div class=\"cell\">Course Code:</div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"cell\">Semester:</div>\n" +
    "            <div class=\"cell\">Name of Faculty:</div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <table border=\"1\">\n" +
    "                <thead>\n" +
    "                <tr>\n" +
    "                    <th rowspan=\"2\" class=\"has-text-centered is-vcentered\">Roll No</th>\n" +
    "                    <th rowspan=\"2\" class=\"has-text-centered is-vcentered\">Name of Student</th>\n" +
    "                    <th colspan=\"2\" class=\"has-text-centered is-vcentered\">Course Code & Name &rarr;</th>\n" +
    "                    <th colspan=\"2\" class=\"has-text-centered is-vcentered\" contenteditable=\"true\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>\n" +
    "                    <th class=\"has-text-centered is-vcentered\">(Max 20)</th>\n" +
    "                    <th colspan=\"2\" class=\"has-text-centered is-vcentered\">Micro project<br>(out of 10)</th>\n" +
    "                    <th class=\"has-text-centered is-vcentered\">(out of 30)</th>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <th class=\"has-text-centered is-vcentered\">Enrollment No</th>\n" +
    "                    <th class=\"has-text-centered is-vcentered\">Exam Seat No</th>\n" +
    "                    <th class=\"has-text-centered is-vcentered\">TS1</th>\n" +
    "                    <th class=\"has-text-centered is-vcentered\">TS2</th>\n" +
    "                    <th class=\"has-text-centered is-vcentered\">Average of TS1 & TS2</th>\n" +
    "                    <th class=\"has-text-centered is-vcentered\">Performance in Group Activity<br>(out of 6)</th>\n" +
    "                    <th class=\"has-text-centered is-vcentered\">Individual Performance in Oral / Presentation<br>(out of 4)</th>\n" +
    "                    <th class=\"has-text-centered is-vcentered\">Total</th>\n" +
    "                </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                <tr>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </div>\n" +
    "        <div id=\"tbl_last\" class=\"row\" style=\"padding-top: 5vh\">\n" +
    "            <div class=\"cell has-text-weight-bold\" style=\"text-align: center\">(Name &amp; Signature of Faculty)</div>\n" +
    "            <div class=\"cell has-text-weight-bold\" style=\"text-align: center\">(Name &amp; Signature of HOD)</div>\n" +
    "        </div>";

const d6_format=
    "<div class=\"row\">\n" +
    "            <div class=\"cell\" style=\"text-align: right; font-weight: bold\">D6</div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"cell\" style=\"text-align: center; font-weight: bold\">Maharashtra State Board of Technical Education</div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"cell\" style=\"text-align: center; font-weight: bold\">ANALYSIS OF TERM END EXAMINATION</div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"cell\">Program:</div>\n" +
    "            <div class=\"cell\">Examination: Summer/Winter____________</div>\n" +
    "            <div class=\"cell\">Semester:</div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <table border=\"1\">\n" +
    "                <thead>\n" +
    "                <tr>\n" +
    "                    <th>Sr. No</th>\n" +
    "                    <th>Course Code</th>\n" +
    "                    <th>Name of Course</th>\n" +
    "                    <th>Passing Heads</th>\n" +
    "                    <th>Marks Obtained Lowest</th>\n" +
    "                    <th>Marks Obtained Highest</th>\n" +
    "                    <th>No. of Student appeared</th>\n" +
    "                    <th>No. of Student Passed</th>\n" +
    "                    <th>% Pass</th>\n" +
    "                    <th>% of Student above 60%</th>\n" +
    "                </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                <tr>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td>\n" +
    "                        <table class=\"table columns is-centered has-text-weight-bold\" style=\"padding-top: 4px; padding-bottom: 4px\">\n" +
    "                            <tr>\n" +
    "                                <td>TH-ESE</td>\n" +
    "                            </tr>\n" +
    "                            <tr>\n" +
    "                                <td>TH-PA</td>\n" +
    "                            </tr>\n" +
    "                        </table>\n" +
    "                    </td>\n" +
    "                    <td>\n" +
    "                        <table class=\"table columns is-centered\" style=\"padding-top: 4px; padding-bottom: 4px\">\n" +
    "                            <tr>\n" +
    "                                <td>10</td>\n" +
    "                            </tr>\n" +
    "                            <tr>\n" +
    "                                <td>10</td>\n" +
    "                            </tr>\n" +
    "                        </table>\n" +
    "                    </td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td>\n" +
    "                        <table class=\"table columns is-centered has-text-weight-bold\" style=\"padding-top: 4px; padding-bottom: 4px\">\n" +
    "                            <tr>\n" +
    "                                <td>TH-ESE</td>\n" +
    "                            </tr>\n" +
    "                            <tr>\n" +
    "                                <td>TH-PA</td>\n" +
    "                            </tr>\n" +
    "                        </table>\n" +
    "                    </td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td>\n" +
    "                        <table class=\"table columns is-centered has-text-weight-bold\" style=\"padding-top: 4px; padding-bottom: 4px\">\n" +
    "                            <tr>\n" +
    "                                <td>TH-ESE</td>\n" +
    "                            </tr>\n" +
    "                            <tr>\n" +
    "                                <td>TH-PA</td>\n" +
    "                            </tr>\n" +
    "                        </table>\n" +
    "                    </td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </div>\n" +
    "        <div class=\"row\" style=\"padding-top: 5vh\">\n" +
    "            <div class=\"cell has-text-weight-bold\" style=\"text-align: center\">(Name &amp; Signature of Academic Co-ordinator)</div>\n" +
    "            <div class=\"cell has-text-weight-bold\" style=\"text-align: center\">(Name &amp; Signature of HOD)</div>\n" +
    "        </div>";

const d7_format="<div class=\"row\">\n" +
    "                    <div class=\"cell has-text-right has-text-weight-bold\">D7</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell has-text-centered has-text-weight-bold\">Maharashtra State Board of Technical Education</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell has-text-centered has-text-weight-bold\">DETAILS OF INDUSTRIAL VISIT/VACATIONAL TRAINING</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell is-left\">Academic Year:</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell\">Program:</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <table border=\"1\" style=\"width: calc(100%)\">\n" +
    "                        <thead aria-rowspan=\"2\">\n" +
    "                        <tr>\n" +
    "                            <th>Sr. NO</th>\n" +
    "                            <th>Name of Industry & Contact Details</th>\n" +
    "                            <th>Semester</th>\n" +
    "                            <th>Course Name</th>\n" +
    "                            <th>Name of Coordinator</th>\n" +
    "                            <th>Date of Conduction of Activity</th>\n" +
    "                            <th>No. of Beneficiaries</th>\n" +
    "                            <th>Relevance to PO's & PEO's (only nos.)</th>\n" +
    "                        </tr>\n" +
    "                        </thead>\n" +
    "                        <tbody>\n" +
    "                        <tr>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                            <th contenteditable=\"true\"></th>\n" +
    "                        </tr>\n" +
    "                        </tbody>\n" +
    "                    </table>\n" +
    "                </div>\n" +
    "                <div class=\"row\" style=\"padding-top: 5vh\">\n" +
    "                    <div class=\"cell has-text-weight-bold\" style=\"text-align: center\">(Name &amp; Signature of Academic Co-ordinator)</div>\n" +
    "                    <div class=\"cell has-text-weight-bold\" style=\"text-align: center\">(Name &amp; Signature of HOD)</div>\n" +
    "                </div>";

const d8_format="<div class=\"row\">\n" +
    "                    <div class=\"cell has-text-right has-text-weight-bold\">D8</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell has-text-centered has-text-weight-bold\">Maharashtra State Board of Technical Education</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell has-text-centered has-text-weight-bold\">DETAILS OF EXPERT LECTURE</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell is-left\">Academic Year:</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell\">Program:</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <table border=\"1\" style=\"width: calc(100%)\">\n" +
    "                        <thead aria-rowspan=\"2\">\n" +
    "                        <tr>\n" +
    "                            <th>Sr. NO</th>\n" +
    "                            <th>Name of Expert & Contact Details</th>\n" +
    "                            <th>Topic</th>\n" +
    "                            <th>*Course Code & CO's Nos.</th>\n" +
    "                            <th>Semester</th>\n" +
    "                            <th>Name of Coordinator</th>\n" +
    "                            <th>Date of Conduction of Activity</th>\n" +
    "                            <th>No. of Beneficiaries</th>\n" +
    "                            <th>Relevance to PO's & PEO's (only nos.)</th>\n" +
    "                        </tr>\n" +
    "                        </thead>\n" +
    "                        <tbody>\n" +
    "<tr>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                    <td contenteditable=\"true\"></td>\n" +
    "                </tr>"+
    "                        </tbody>\n" +
    "                    </table>\n" +
    "                </div>\n" +
    "                <div class=\"row\" style=\"padding-top: 5vh\">\n" +
    "                    <div class=\"cell has-text-weight-bold\" style=\"text-align: center\">(Name &amp; Signature of Academic Co-ordinator)</div>\n" +
    "                    <div class=\"cell has-text-weight-bold\" style=\"text-align: center\">(Name &amp; Signature of HOD)</div>\n" +
    "                </div>";

const d9_format = "<div class=\"row\">\n" +
    "                    <div class=\"cell has-text-right has-text-weight-bold\">D9</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell has-text-centered has-text-weight-bold\">Maharashtra State Board of Technical Education</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell has-text-centered has-text-weight-bold\">DETAILS OF PLACEMENT</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell is-left\">Academic Year:</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell\">Program:</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <table border=\"1\" style=\"width: calc(100%)\">\n" +
    "                        <thead>\n" +
    "                        <tr>\n" +
    "                            <th>Sr. NO</th>\n" +
    "                            <th>Name of Industry & Contact Details</th>\n" +
    "                            <th>No. of Students Placed</th>\n" +
    "                            <th>Salary Offered</th>\n" +
    "                        </tr>\n" +
    "                        </thead>\n" +
    "                        <tbody>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        </tbody>\n" +
    "                    </table>\n" +
    "                </div>\n" +
    "                <div class=\"row\" style=\"padding-top: 5vh\">\n" +
    "                    <div class=\"cell has-text-weight-bold\" style=\"text-align: center\">(Name &amp; Signature of TPO)</div>\n" +
    "                    <div class=\"cell has-text-weight-bold\" style=\"text-align: center\">(Name &amp; Signature of HOD)</div>\n" +
    "                </div>";

const d10_format = "<div class=\"row\">\n" +
    "                    <div class=\"cell has-text-right has-text-weight-bold\">D10</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell has-text-centered has-text-weight-bold\">Maharashtra State Board of Technical Education</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell has-text-centered has-text-weight-bold\">DETAILS OF FACULTY / STAFF TRAINING</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell is-left\">Academic Year:</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell\">Program:</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <table border=\"1\" style=\"width: calc(100%)\">\n" +
    "                        <thead>\n" +
    "                        <tr>\n" +
    "                            <th>Sr. No</th>\n" +
    "                            <th>Name of Faculty/Staff</th>\n" +
    "                            <th>Details of Training (Industrial / Content / Updating / Soft Skill / Any Other)</th>\n" +
    "                            <th>Duration of Training (Schedule)</th>\n" +
    "                            <th>Organizing Body</th>\n" +
    "                            <th>Organizing Institute</th>\n" +
    "                            <th>Relevance with PEO's, PO's & CO with Course Code (Only nos.)</th>\n" +
    "                        </tr>\n" +
    "                        </thead>\n" +
    "                        <tbody>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        </tbody>\n" +
    "                    </table>\n" +
    "                </div>\n" +
    "                <div class=\"row\" style=\"padding-top: 5vh\">\n" +
    "                    <div class=\"cell has-text-weight-bold\" style=\"text-align: center\">(Name &amp; Signature of Academic Co-ordinator)</div>\n" +
    "                    <div class=\"cell has-text-weight-bold\" style=\"text-align: center\">(Name &amp; Signature of HOD)</div>\n" +
    "                </div>";

const d11_format = "<div class=\"row\">\n" +
    "                    <div class=\"cell has-text-right has-text-weight-bold\">D11</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell has-text-centered has-text-weight-bold\">Maharashtra State Board of Technical Education</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell has-text-centered has-text-weight-bold\">DETAILS OF RESOURCES DEVELOPMENT<br>(Laboratory / Infrastructure / Teaching Aids)</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell is-left\">Academic Year:</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell\">Program:</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <table border=\"1\" style=\"width: calc(100%)\">\n" +
    "                        <thead>\n" +
    "                        <tr>\n" +
    "                            <th>Sr. No</th>\n" +
    "                            <th>Details of Resource</th>\n" +
    "                            <th>Relevance to PEO's / PO's / CO's with Course Code (only nos.)</th>\n" +
    "                            <th>Budget Allocated</th>\n" +
    "                            <th>Budget Utilized</th>\n" +
    "                        </tr>\n" +
    "                        </thead>\n" +
    "                        <tbody>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        </tbody>\n" +
    "                    </table>\n" +
    "                </div>\n" +
    "                <div class=\"row\" style=\"padding-top: 5vh\">\n" +
    "                    <div class=\"cell has-text-weight-bold\" style=\"text-align: center\">(Name &amp; Signature of Academic Co-ordinator)</div>\n" +
    "                    <div class=\"cell has-text-weight-bold\" style=\"text-align: center\">(Name &amp; Signature of HOD)</div>\n" +
    "                </div>";

const d12_format = "<div class=\"row\">\n" +
    "                    <div class=\"cell has-text-right has-text-weight-bold\">D12</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell has-text-centered has-text-weight-bold\">Maharashtra State Board of Technical Education</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell has-text-centered has-text-weight-bold\">DETAILS OF CO-CURRICULAR ACTIVITY</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell is-left\">Academic Year:</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell\">Program:</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <table border=\"1\" style=\"width: calc(100%)\">\n" +
    "                        <thead>\n" +
    "                        <tr>\n" +
    "                            <th>Sr. No</th>\n" +
    "                            <th>Type of Activity & Details (Paper Presentation/Project/Quiz/etc.)</th>\n" +
    "                            <th>Date</th>\n" +
    "                            <th>Name of Participating</th>\n" +
    "                            <th>Organizing Body And Organizing Institute</th>\n" +
    "                            <th>Awards (Winner/Participation)</th>\n" +
    "                            <th>Level (State/National/etc.)</th>\n" +
    "                            <th>Relevance to PEO's/PO's/CO's with Course Code (only nos.)</th>\n" +
    "                        </tr>\n" +
    "                        </thead>\n" +
    "                        <tbody>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        </tbody>\n" +
    "                    </table>\n" +
    "                </div>\n" +
    "                <div class=\"row\" style=\"padding-top: 5vh\">\n" +
    "                    <div class=\"cell has-text-weight-bold\" style=\"text-align: center\">(Name &amp; Signature of Academic Co-ordinator)</div>\n" +
    "                    <div class=\"cell has-text-weight-bold\" style=\"text-align: center\">(Name &amp; Signature of HOD)</div>\n" +
    "                </div>";

const d13_format = "<div class=\"row\">\n" +
    "                    <div class=\"cell has-text-right has-text-weight-bold\">D13</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell has-text-centered has-text-weight-bold\">Maharashtra State Board of Technical Education</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell has-text-centered has-text-weight-bold\">DETAILS OF EXTRA-CURRICULAR ACTIVITY</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell is-left\">Academic Year:</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell\">Program:</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <table border=\"1\" style=\"width: calc(100%)\">\n" +
    "                        <thead>\n" +
    "                        <tr>\n" +
    "                            <th>Sr. No</th>\n" +
    "                            <th>Type of Activity & Details (Sports/Drama/Social/NSS/etc.)</th>\n" +
    "                            <th>Date</th>\n" +
    "                            <th>Name of Participating Student</th>\n" +
    "                            <th>Organizing Body And Organizing Institute</th>\n" +
    "                            <th>Awards (Winner/Participation)</th>\n" +
    "                            <th>Level (State/National/etc.)</th>\n" +
    "                            <th>Relevance to PEO's/PO's/CO's with Course Code (only nos.)</th>\n" +
    "                        </tr>\n" +
    "                        </thead>\n" +
    "                        <tbody>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        </tbody>\n" +
    "                    </table>\n" +
    "                </div>\n" +
    "                <div class=\"row\" style=\"padding-top: 5vh\">\n" +
    "                    <div class=\"cell has-text-weight-bold\" style=\"text-align: center\">(Name &amp; Signature of Academic Co-ordinator)</div>\n" +
    "                    <div class=\"cell has-text-weight-bold\" style=\"text-align: center\">(Name &amp; Signature of HOD)</div>\n" +
    "                </div>";

const d14_format = "<div class=\"row\">\n" +
    "                    <div class=\"cell has-text-right has-text-weight-bold\">D14</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell columns is-centered has-text-weight-bold\">Maharashtra State Board of Technical Education</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell columns is-centered has-text-weight-bold\">STUDENTS FEEDBACK</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell columns is-centered has-text-weight-bold\">(Head of the Department shall take the Feed Back at the End of Second Class Test)</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell\">Academic Year:</div>\n" +
    "                    <div class=\"cell\">Program:</div>\n" +
    "                    <div class=\"cell\">Semester:</div>\n" +
    "                    <div class=\"cell\">Date:</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <table border=\"1\" style=\"width: calc(100%)\">\n" +
    "                        <thead>\n" +
    "                        <tr>\n" +
    "                            <th rowspan=\"2\">Sr. No</th>\n" +
    "                            <th rowspan=\"2\">Name of Course (TH / PR)</th>\n" +
    "                            <th rowspan=\"2\">Name of Faculty</th>\n" +
    "                            <th colspan=\"5\" class=\"has-text-centered\">Each Parameter to be Assessed on the Scale of 1 to 5<br>(1 - Lowest & 5 - Highest)</th>\n" +
    "                            <th rowspan=\"2\">Total<br>(Max 25)</th>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <th>Punctuality & Discipline</th>\n" +
    "                            <th>Domain Knowledge</th>\n" +
    "                            <th>Presentation Skill & Interaction with Students</th>\n" +
    "                            <th>Ability to Resolve Difficulties</th>\n" +
    "                            <th>Effective Use of Teaching Aids</th>\n" +
    "                        </tr>\n" +
    "                        </thead>\n" +
    "                        <tbody>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        </tbody>\n" +
    "                    </table>\n" +
    "                </div>\n" +
    "                <div class=\"row\" style=\"padding-top: 8vh\">\n" +
    "                    <div class=\"cell has-text-right has-text-weight-bold\">(Name & Signature of HOD)</div>\n" +
    "                </div>";

const d15_format = "<div class=\"row\">\n" +
    "                    <div class=\"cell has-text-right has-text-weight-bold\">D15</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell columns is-centered has-text-weight-bold\">Maharashtra State Board of Technical Education</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell columns is-centered has-text-weight-bold\">Facilities Available in the Department</div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"cell\">Provide the details of the facilities & Specifications of Major / Essential Equipment's available for conduction of practical as per curriculum </div>\n" +
    "                </div>\n" +
    "                <div class=\"row\">\n" +
    "                    <table border=\"1\" style=\"width: calc(100%)\">\n" +
    "                        <thead>\n" +
    "                        <tr>\n" +
    "                            <th>Sr. No</th>\n" +
    "                            <th>Name of Laboratory</th>\n" +
    "                            <th>Semester wise Course Codes assigned to this Lab</th>\n" +
    "                            <th>Details of the Facility / Equipment Available</th>\n" +
    "                            <th>Quantity</th>\n" +
    "                            <th>Total Cost</th>\n" +
    "                        </tr>\n" +
    "                        </thead>\n" +
    "                        <tbody>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                            <td contenteditable=\"true\"></td>\n" +
    "                        </tr>\n" +
    "                        </tbody>\n" +
    "                    </table>\n" +
    "                </div>\n" +
    "                <div class=\"row\" style=\"padding-top: 8vh\">\n" +
    "                    <div class=\"cell has-text-right has-text-weight-bold\">(Name &amp; Signature of HOD)</div>\n" +
    "                </div>";

const temp_select_btn = "<button class=\"button is-info\" id=\"select_template\" >Use This Template</button>";
$('#d_format_holder').html(d1_format);
$('#d_format_holder').after(temp_select_btn);

let selected_format = 1;
$('#select_template').click(() => {
    if(selected_format === 1)
    {
        location.replace('templates/D1/et_d1.html')
    }
    else if(selected_format === 2)
    {
        location.replace('templates/D2/et_d2.html');
    }
    else if(selected_format === 3)
    {
        location.replace('templates/D3/et_d3.html');
    }
    else if(selected_format === 4)
    {
        location.replace('templates/D4/et_d4.html');
    }
    else if(selected_format === 5)
    {
        location.replace('templates/D5/et_d5.html');
    }
    else if(selected_format === 6)
    {
        location.replace('templates/D6/et_d6.html');
    }
    else if(selected_format === 7)
    {
        location.replace('templates/D7/et_d7.html');
    }
    else if(selected_format === 8)
    {
        location.replace('templates/D8/et_d8.html');
    }
    else if(selected_format === 9)
    {
        location.replace('templates/D9/et_d9.html');
    }
    else if(selected_format === 10)
    {
        location.replace('templates/D10/et_d10.html');
    }
    else if(selected_format === 11)
    {
        location.replace('templates/D11/et_d11.html');
    }
    else if(selected_format === 12)
    {
        location.replace('templates/D12/et_d12.html');
    }
    else if(selected_format === 13)
    {
        location.replace('templates/D13/et_d13.html');
    }
    else if(selected_format === 14)
    {
        location.replace('templates/D14/et_d14.html');
    }
    else if(selected_format === 15)
    {
        location.replace('templates/D15/et_d15.html');
    }
});

$('#D1').click(() => {
    selected_format = 1;
    $('.pgLi').removeClass('is-current');
    $('#D1').addClass('is-current');
    $('#d_format_holder').html(d1_format);
});

$('#D2').click(() => {
    selected_format = 2;
    $('.pgLi').removeClass('is-current');
    $('#D2').toggleClass('is-current');
    $('#d_format_holder').html(d2_format);
});

$('#D3').click(() => {
    selected_format = 3;
    $('.pgLi').removeClass('is-current');
    $('#D3').toggleClass('is-current');
    $('#d_format_holder').html(d3_format);
});

$('#D4').click(() => {
    $('.pgLi').removeClass('is-current');
    $('#D4').toggleClass('is-current');
    selected_format = 4;
    $('#d_format_holder').html(d4_format);
});

$('#D5').click(() => {
    selected_format = 5;
    $('.pgLi').removeClass('is-current');
    $('#D5').toggleClass('is-current');
    $('#d_format_holder').html(d5_format);
});

$('#D6').click(() => {
    selected_format = 6;
    $('.pgLi').removeClass('is-current');
    $('#D6').toggleClass('is-current');
    $('#d_format_holder').html(d6_format);
});

$('#D7').click(() => {
    selected_format = 7;
    $('.pgLi').removeClass('is-current');
    $('#D7').toggleClass('is-current');
    $('#d_format_holder').html(d7_format);
});

$('#D8').click(() => {
    selected_format = 8;
    $('.pgLi').removeClass('is-current');
    $('#D8').toggleClass('is-current');
    $('#d_format_holder').html(d8_format);
});

$('#D9').click(() => {
    selected_format = 9;
    $('.pgLi').removeClass('is-current');
    $('#D9').toggleClass('is-current');
    $('#d_format_holder').html(d9_format);
});

$('#D10').click(() => {
    selected_format = 10;
    $('.pgLi').removeClass('is-current');
    $('#D10').toggleClass('is-current');
    $('#d_format_holder').html(d10_format);
});

$('#D11').click(() => {
    selected_format = 11;
    $('.pgLi').removeClass('is-current');
    $('#D11').toggleClass('is-current');
    $('#d_format_holder').html(d11_format);
});

$('#D12').click(() => {
    selected_format = 12;
    $('.pgLi').removeClass('is-current');
    $('#D12').toggleClass('is-current');
    $('#d_format_holder').html(d12_format);
});

$('#D13').click(() => {
    selected_format = 13;
    $('.pgLi').removeClass('is-current');
    $('#D13').toggleClass('is-current');
    $('#d_format_holder').html(d13_format);
});

$('#D14').click(() => {
    selected_format = 14;
    $('.pgLi').removeClass('is-current');
    $('#D14').toggleClass('is-current');
    $('#d_format_holder').html(d14_format);
});

$('#D15').click(() => {
    selected_format = 15;
    $('.pgLi').removeClass('is-current');
    $('#D15').toggleClass('is-current');
    $('#d_format_holder').html(d15_format);
});

$('#av_template').click(() => {

    $('#av_template').addClass('is-active');
    $('#av_container').show();
    $('#sv_container').hide();
    $('#d1_holder').html(d1_format);
    $('#sv_template').removeClass('is-active');
});

$('#sv_template').click(() => {

    $('#sv_template').addClass('is-active');
    $('#av_container').hide();
    $('#sv_container').show();
    $('#av_template').removeClass('is-active');
});

let sv_selected_format;
let selected_fr_btn;

$('#SVD1').click(() => {
    sv_selected_format = 1;
    $('.svLi').removeClass('is-current');
    $('#SVD1').addClass('is-current');
    $('#SVD_format_holder').html("<select class=\"container\" id=\"SVD_format_ch\">\n" +
        "                        <option value=\"none\">Select your saved template</option>\n" +
        "                    </select>");
    let db = admin.database();
    let sv_d1ref = db.ref(t+"/saved_formats/D1");
    let sv_d1_list = new Array();
    sv_d1ref.once('value', function(snapshot) {
        let cn = 0;
        snapshot.forEach(function(childSnapshot) {
            sv_d1_list[cn] = childSnapshot.key;
            let tmp = "<option class='sc_click'" + " value=" + sv_d1_list[cn] + ">" + sv_d1_list[cn] + "</option>";
            $('#SVD_format_ch').append(`<option value="${sv_d1_list[cn]}">${sv_d1_list[cn]}</option>`);
            cn++;
        });
    });

    $('#SVD_format_ch').change(function () {
        selected_fr_btn = $(this).children("option:selected").val();
        const os = require('os');
        const storage = require('electron-json-storage');
        storage.setDataPath(os.tmpdir());
        storage.set('sel_format',{ 'sel_format': selected_fr_btn }, function(error) {
            if (error) throw error;
        });
        location.replace('templates/D1/vw_d1.html');
        console.log(selected_fr_btn);
    });
    //$('#SVD_format_holder').html(d1_format);
});

$('#SVD2').click(() => {
    sv_selected_format = 2;
    $('.svLi').removeClass('is-current');
    $('#SVD2').addClass('is-current');
    $('#SVD_format_holder').html("<select class=\"container\" id=\"SVD_format_ch\">\n" +
        "                        <option value=\"none\">Select your saved template</option>\n" +
        "                    </select>");
    let db = admin.database();
    let sv_d1ref = db.ref(t+"/saved_formats/D2");
    let sv_d1_list = new Array();
    sv_d1ref.once('value', function(snapshot) {
        let cn = 0;
        snapshot.forEach(function(childSnapshot) {
            sv_d1_list[cn] = childSnapshot.key;
            let tmp = "<option class='sc_click'" + "value=" + sv_d1_list[cn] + ">" + sv_d1_list[cn] + "</option>";
            $('#SVD_format_ch').append(`<option value="${sv_d1_list[cn]}">${sv_d1_list[cn]}</option>`);
            cn++;
        });
    });

    $('#SVD_format_ch').change(function () {
        selected_fr_btn = $(this).children("option:selected").val();
        const os = require('os');
        const storage = require('electron-json-storage');
        storage.setDataPath(os.tmpdir());
        storage.set('sel_format',{ 'sel_format': selected_fr_btn }, function(error) {
            if (error) throw error;
        });
        location.replace('templates/D2/vw_d2.html');
        console.log(selected_fr_btn);
    });
    //$('#SVD_format_holder').html(d2_format);
});

$('#SVD3').click(() => {
    $('.svLi').removeClass('is-current');
    $('#SVD3').toggleClass('is-current');
    sv_selected_format = 3;
    $('#SVD_format_holder').html("<select class=\"container\" id=\"SVD_format_ch\">\n" +
        "                        <option value=\"none\">Select your saved template</option>\n" +
        "                    </select>");
    let db = admin.database();
    let sv_d1ref = db.ref(t+"/saved_formats/D3");
    let sv_d1_list = new Array();
    sv_d1ref.once('value', function(snapshot) {
        let cn = 0;
        snapshot.forEach(function(childSnapshot) {
            sv_d1_list[cn] = childSnapshot.key;
            let tmp = "<option class='sc_click'" + "value=" + sv_d1_list[cn] + ">" + sv_d1_list[cn] + "</option>";
            $('#SVD_format_ch').append(`<option value="${sv_d1_list[cn]}">${sv_d1_list[cn]}</option>`);
            cn++;
        });
    });

    $('#SVD_format_ch').change(function () {
        selected_fr_btn = $(this).children("option:selected").val();
        const os = require('os');
        const storage = require('electron-json-storage');
        storage.setDataPath(os.tmpdir());
        storage.set('sel_format',{ 'sel_format': selected_fr_btn }, function(error) {
            if (error) throw error;
        });
        location.replace('templates/D3/vw_d3.html');
        console.log(selected_fr_btn);
    });
});

$('#SVD4').click(() => {
    $('.svLi').removeClass('is-current');
    $('#SVD4').toggleClass('is-current');
    sv_selected_format = 4;
    $('#SVD_format_holder').html("<select class=\"container\" id=\"SVD_format_ch\">\n" +
        "                        <option value=\"none\">Select your saved template</option>\n" +
        "                    </select>");
    let db = admin.database();
    let sv_d1ref = db.ref(t+"/saved_formats/D4");
    let sv_d1_list = new Array();
    sv_d1ref.once('value', function(snapshot) {
        let cn = 0;
        snapshot.forEach(function(childSnapshot) {
            sv_d1_list[cn] = childSnapshot.key;
            let tmp = "<option class='sc_click'" + "value=" + sv_d1_list[cn] + ">" + sv_d1_list[cn] + "</option>";
            $('#SVD_format_ch').append(`<option value="${sv_d1_list[cn]}">${sv_d1_list[cn]}</option>`);
            cn++;
        });
    });

    $('#SVD_format_ch').change(function () {
        selected_fr_btn = $(this).children("option:selected").val();
        const os = require('os');
        const storage = require('electron-json-storage');
        storage.setDataPath(os.tmpdir());
        storage.set('sel_format',{ 'sel_format': selected_fr_btn }, function(error) {
            if (error) throw error;
        });
        location.replace('templates/D4/vw_d4.html');
        console.log(selected_fr_btn);
    });
    //$('#SVD_format_holder').html(d4_format);
});

$('#SVD5').click(() => {
    sv_selected_format = 5;
    $('.svLi').removeClass('is-current');
    $('#SVD5').toggleClass('is-current');
    $('#SVD_format_holder').html("<select class=\"container\" id=\"SVD_format_ch\">\n" +
        "                        <option value=\"none\">Select your saved template</option>\n" +
        "                    </select>");
    let db = admin.database();
    let sv_d1ref = db.ref(t+"/saved_formats/D5");
    let sv_d1_list = new Array();
    sv_d1ref.once('value', function(snapshot) {
        let cn = 0;
        snapshot.forEach(function(childSnapshot) {
            sv_d1_list[cn] = childSnapshot.key;
            let tmp = "<option class='sc_click'" + "value=" + sv_d1_list[cn] + ">" + sv_d1_list[cn] + "</option>";
            $('#SVD_format_ch').append(`<option value="${sv_d1_list[cn]}">${sv_d1_list[cn]}</option>`);
            cn++;
        });
    });

    $('#SVD_format_ch').change(function () {
        selected_fr_btn = $(this).children("option:selected").val();
        const os = require('os');
        const storage = require('electron-json-storage');
        storage.setDataPath(os.tmpdir());
        storage.set('sel_format',{ 'sel_format': selected_fr_btn }, function(error) {
            if (error) throw error;
        });
        location.replace('templates/D5/vw_d5.html');
        console.log(selected_fr_btn);
    });
});

$('#SVD6').click(() => {
    sv_selected_format = 6;
    $('.svLi').removeClass('is-current');
    $('#SVD6').toggleClass('is-current');
    $('#SVD_format_holder').html("<select class=\"container\" id=\"SVD_format_ch\">\n" +
        "                        <option value=\"none\">Select your saved template</option>\n" +
        "                    </select>");
    let db = admin.database();
    let sv_d1ref = db.ref(t+"/saved_formats/D6");
    let sv_d1_list = new Array();
    sv_d1ref.once('value', function(snapshot) {
        let cn = 0;
        snapshot.forEach(function(childSnapshot) {
            sv_d1_list[cn] = childSnapshot.key;
            let tmp = "<option class='sc_click'" + "value=" + sv_d1_list[cn] + ">" + sv_d1_list[cn] + "</option>";
            $('#SVD_format_ch').append(`<option value="${sv_d1_list[cn]}">${sv_d1_list[cn]}</option>`);
            cn++;
        });
    });

    $('#SVD_format_ch').change(function () {
        selected_fr_btn = $(this).children("option:selected").val();
        const os = require('os');
        const storage = require('electron-json-storage');
        storage.setDataPath(os.tmpdir());
        storage.set('sel_format',{ 'sel_format': selected_fr_btn }, function(error) {
            if (error) throw error;
        });
        location.replace('templates/D6/vw_d6.html');
        console.log(selected_fr_btn);
    });
});

$('#SVD7').click(() => {
    sv_selected_format = 7;
    $('.svLi').removeClass('is-current');
    $('#SVD7').toggleClass('is-current');
    $('#SVD_format_holder').html("<select class=\"container\" id=\"SVD_format_ch\">\n" +
        "                        <option value=\"none\">Select your saved template</option>\n" +
        "                    </select>");
    let db = admin.database();
    let sv_d1ref = db.ref(t+"/saved_formats/D7");
    let sv_d1_list = new Array();
    sv_d1ref.once('value', function(snapshot) {
        let cn = 0;
        snapshot.forEach(function(childSnapshot) {
            sv_d1_list[cn] = childSnapshot.key;
            let tmp = "<option class='sc_click'" + "value=" + sv_d1_list[cn] + ">" + sv_d1_list[cn] + "</option>";
            $('#SVD_format_ch').append(`<option value="${sv_d1_list[cn]}">${sv_d1_list[cn]}</option>`);
            cn++;
        });
    });

    $('#SVD_format_ch').change(function () {
        selected_fr_btn = $(this).children("option:selected").val();
        const os = require('os');
        const storage = require('electron-json-storage');
        storage.setDataPath(os.tmpdir());
        storage.set('sel_format',{ 'sel_format': selected_fr_btn }, function(error) {
            if (error) throw error;
        });
        location.replace('templates/D7/vw_d7.html');
        console.log(selected_fr_btn);
    });
    //$('#SVD_format_holder').html(d7_format);
});

$('#SVD8').click(() => {
    sv_selected_format = 8;
    $('.svLi').removeClass('is-current');
    $('#SVD8').toggleClass('is-current');
    $('#SVD_format_holder').html("<select class=\"container\" id=\"SVD_format_ch\">\n" +
        "                        <option value=\"none\">Select your saved template</option>\n" +
        "                    </select>");
    let db = admin.database();
    let sv_d1ref = db.ref(t+"/saved_formats/D8");
    let sv_d1_list = new Array();
    sv_d1ref.once('value', function(snapshot) {
        let cn = 0;
        snapshot.forEach(function(childSnapshot) {
            sv_d1_list[cn] = childSnapshot.key;
            let tmp = "<option class='sc_click'" + "value=" + sv_d1_list[cn] + ">" + sv_d1_list[cn] + "</option>";
            $('#SVD_format_ch').append(`<option value="${sv_d1_list[cn]}">${sv_d1_list[cn]}</option>`);
            cn++;
        });
    });

    $('#SVD_format_ch').change(function () {
        selected_fr_btn = $(this).children("option:selected").val();
        const os = require('os');
        const storage = require('electron-json-storage');
        storage.setDataPath(os.tmpdir());
        storage.set('sel_format',{ 'sel_format': selected_fr_btn }, function(error) {
            if (error) throw error;
        });
        location.replace('templates/D8/vw_d8.html');
        console.log(selected_fr_btn);
    });
    //$('#SVD_format_holder').html(d8_format);
});

$('#SVD9').click(() => {
    sv_selected_format = 9;
    $('.svLi').removeClass('is-current');
    $('#SVD9').toggleClass('is-current');
    $('#SVD_format_holder').html("<select class=\"container\" id=\"SVD_format_ch\">\n" +
        "                        <option value=\"none\">Select your saved template</option>\n" +
        "                    </select>");
    let db = admin.database();
    let sv_d1ref = db.ref(t+"/saved_formats/D9");
    let sv_d1_list = new Array();
    sv_d1ref.once('value', function(snapshot) {
        let cn = 0;
        snapshot.forEach(function(childSnapshot) {
            sv_d1_list[cn] = childSnapshot.key;
            let tmp = "<option class='sc_click'" + "value=" + sv_d1_list[cn] + ">" + sv_d1_list[cn] + "</option>";
            $('#SVD_format_ch').append(`<option value="${sv_d1_list[cn]}">${sv_d1_list[cn]}</option>`);
            cn++;
        });
    });

    $('#SVD_format_ch').change(function () {
        selected_fr_btn = $(this).children("option:selected").val();
        const os = require('os');
        const storage = require('electron-json-storage');
        storage.setDataPath(os.tmpdir());
        storage.set('sel_format',{ 'sel_format': selected_fr_btn }, function(error) {
            if (error) throw error;
        });
        location.replace('templates/D9/vw_d9.html');
        console.log(selected_fr_btn);
    });
    //$('#SVD_format_holder').html(d9_format);
});

$('#SVD10').click(() => {
    sv_selected_format = 10;
    $('.svLi').removeClass('is-current');
    $('#SVD10').toggleClass('is-current');
    $('#SVD_format_holder').html("<select class=\"container\" id=\"SVD_format_ch\">\n" +
        "                        <option value=\"none\">Select your saved template</option>\n" +
        "                    </select>");
    let db = admin.database();
    let sv_d1ref = db.ref(t+"/saved_formats/D10");
    let sv_d1_list = new Array();
    sv_d1ref.once('value', function(snapshot) {
        let cn = 0;
        snapshot.forEach(function(childSnapshot) {
            sv_d1_list[cn] = childSnapshot.key;
            let tmp = "<option class='sc_click'" + "value=" + sv_d1_list[cn] + ">" + sv_d1_list[cn] + "</option>";
            $('#SVD_format_ch').append(`<option value="${sv_d1_list[cn]}">${sv_d1_list[cn]}</option>`);
            cn++;
        });
    });

    $('#SVD_format_ch').change(function () {
        selected_fr_btn = $(this).children("option:selected").val();
        const os = require('os');
        const storage = require('electron-json-storage');
        storage.setDataPath(os.tmpdir());
        storage.set('sel_format',{ 'sel_format': selected_fr_btn }, function(error) {
            if (error) throw error;
        });
        location.replace('templates/D10/vw_d10.html');
        console.log(selected_fr_btn);
    });
    //$('#SVD_format_holder').html(d10_format);
});

$('#SVD11').click(() => {
    sv_selected_format = 11;
    $('.svLi').removeClass('is-current');
    $('#SVD11').toggleClass('is-current');
    $('#SVD_format_holder').html("<select class=\"container\" id=\"SVD_format_ch\">\n" +
        "                        <option value=\"none\">Select your saved template</option>\n" +
        "                    </select>");
    let db = admin.database();
    let sv_d1ref = db.ref(t+"/saved_formats/D11");
    let sv_d1_list = new Array();
    sv_d1ref.once('value', function(snapshot) {
        let cn = 0;
        snapshot.forEach(function(childSnapshot) {
            sv_d1_list[cn] = childSnapshot.key;
            let tmp = "<option class='sc_click'" + "value=" + sv_d1_list[cn] + ">" + sv_d1_list[cn] + "</option>";
            $('#SVD_format_ch').append(`<option value="${sv_d1_list[cn]}">${sv_d1_list[cn]}</option>`);
            cn++;
        });
    });

    $('#SVD_format_ch').change(function () {
        selected_fr_btn = $(this).children("option:selected").val();
        const os = require('os');
        const storage = require('electron-json-storage');
        storage.setDataPath(os.tmpdir());
        storage.set('sel_format',{ 'sel_format': selected_fr_btn }, function(error) {
            if (error) throw error;
        });
        location.replace('templates/D11/vw_d11.html');
        console.log(selected_fr_btn);
    });
    //$('#SVD_format_holder').html(d11_format);
});

$('#SVD12').click(() => {
    sv_selected_format = 12;
    $('.svLi').removeClass('is-current');
    $('#SVD12').toggleClass('is-current');
    $('#SVD_format_holder').html("<select class=\"container\" id=\"SVD_format_ch\">\n" +
        "                        <option value=\"none\">Select your saved template</option>\n" +
        "                    </select>");
    let db = admin.database();
    let sv_d1ref = db.ref(t+"/saved_formats/D12");
    let sv_d1_list = new Array();
    sv_d1ref.once('value', function(snapshot) {
        let cn = 0;
        snapshot.forEach(function(childSnapshot) {
            sv_d1_list[cn] = childSnapshot.key;
            let tmp = "<option class='sc_click'" + "value=" + sv_d1_list[cn] + ">" + sv_d1_list[cn] + "</option>";
            $('#SVD_format_ch').append(`<option value="${sv_d1_list[cn]}">${sv_d1_list[cn]}</option>`);
            cn++;
        });
    });

    $('#SVD_format_ch').change(function () {
        selected_fr_btn = $(this).children("option:selected").val();
        const os = require('os');
        const storage = require('electron-json-storage');
        storage.setDataPath(os.tmpdir());
        storage.set('sel_format',{ 'sel_format': selected_fr_btn }, function(error) {
            if (error) throw error;
        });
        location.replace('templates/D12/vw_d12.html');
        console.log(selected_fr_btn);
    });
    //$('#SVD_format_holder').html(d12_format);
});

$('#SVD13').click(() => {
    sv_selected_format = 13;
    $('.svLi').removeClass('is-current');
    $('#SVD13').toggleClass('is-current');
    $('#SVD_format_holder').html("<select class=\"container\" id=\"SVD_format_ch\">\n" +
        "                        <option value=\"none\">Select your saved template</option>\n" +
        "                    </select>");
    let db = admin.database();
    let sv_d1ref = db.ref(t+"/saved_formats/D13");
    let sv_d1_list = new Array();
    sv_d1ref.once('value', function(snapshot) {
        let cn = 0;
        snapshot.forEach(function(childSnapshot) {
            sv_d1_list[cn] = childSnapshot.key;
            let tmp = "<option class='sc_click'" + "value=" + sv_d1_list[cn] + ">" + sv_d1_list[cn] + "</option>";
            $('#SVD_format_ch').append(`<option value="${sv_d1_list[cn]}">${sv_d1_list[cn]}</option>`);
            cn++;
        });
    });

    $('#SVD_format_ch').change(function () {
        selected_fr_btn = $(this).children("option:selected").val();
        const os = require('os');
        const storage = require('electron-json-storage');
        storage.setDataPath(os.tmpdir());
        storage.set('sel_format',{ 'sel_format': selected_fr_btn }, function(error) {
            if (error) throw error;
        });
        location.replace('templates/D13/vw_d13.html');
        console.log(selected_fr_btn);
    });
    //$('#SVD_format_holder').html(d13_format);
});

$('#SVD14').click(() => {
    sv_selected_format = 14;
    $('.svLi').removeClass('is-current');
    $('#SVD14').toggleClass('is-current');
    $('#SVD_format_holder').html("<select class=\"container\" id=\"SVD_format_ch\">\n" +
        "                        <option value=\"none\">Select your saved template</option>\n" +
        "                    </select>");
    let db = admin.database();
    let sv_d1ref = db.ref(t+"/saved_formats/D14");
    let sv_d1_list = new Array();
    sv_d1ref.once('value', function(snapshot) {
        let cn = 0;
        snapshot.forEach(function(childSnapshot) {
            sv_d1_list[cn] = childSnapshot.key;
            let tmp = "<option class='sc_click'" + "value=" + sv_d1_list[cn] + ">" + sv_d1_list[cn] + "</option>";
            $('#SVD_format_ch').append(`<option value="${sv_d1_list[cn]}">${sv_d1_list[cn]}</option>`);
            cn++;
        });
    });

    $('#SVD_format_ch').change(function () {
        selected_fr_btn = $(this).children("option:selected").val();
        const os = require('os');
        const storage = require('electron-json-storage');
        storage.setDataPath(os.tmpdir());
        storage.set('sel_format',{ 'sel_format': selected_fr_btn }, function(error) {
            if (error) throw error;
        });
        location.replace('templates/D14/vw_d14.html');
        console.log(selected_fr_btn);
    });
    //$('#SVD_format_holder').html(d14_format);
});

$('#SVD15').click(() => {
    sv_selected_format = 15;
    $('.svLi').removeClass('is-current');
    $('#SVD15').toggleClass('is-current');
    $('#SVD_format_holder').html("<select class=\"container\" id=\"SVD_format_ch\">\n" +
        "                        <option value=\"none\">Select your saved template</option>\n" +
        "                    </select>");
    let db = admin.database();
    let sv_d1ref = db.ref(t+"/saved_formats/D15");
    let sv_d1_list = new Array();
    sv_d1ref.once('value', function(snapshot) {
        let cn = 0;
        snapshot.forEach(function(childSnapshot) {
            sv_d1_list[cn] = childSnapshot.key;
            let tmp = "<option class='sc_click'" + "value=" + sv_d1_list[cn] + ">" + sv_d1_list[cn] + "</option>";
            $('#SVD_format_ch').append(`<option value="${sv_d1_list[cn]}">${sv_d1_list[cn]}</option>`);
            cn++;
        });
    });

    $('#SVD_format_ch').change(function () {
        selected_fr_btn = $(this).children("option:selected").val();
        const os = require('os');
        const storage = require('electron-json-storage');
        storage.setDataPath(os.tmpdir());
        storage.set('sel_format',{ 'sel_format': selected_fr_btn }, function(error) {
            if (error) throw error;
        });
        location.replace('templates/D15/vw_d15.html');
        console.log(selected_fr_btn);
    });
    //$('#SVD_format_holder').html(d15_format);
});