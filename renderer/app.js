const os = require('os');
const storage = require('electron-json-storage');
storage.setDataPath(os.tmpdir());

const { remote } = require('electron');

const admin = require('firebase-admin');
let serviceAccount = require('../google-service/digidoc-84b29-firebase-adminsdk-8qd8n-7208bf1115');
let user_roll;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

//let db = admin.firestore();

let firebaseConfig = {
    apiKey: "AIzaSyDmblg60neSQhv9Keriy5AVen1GCGtVYOo",
    authDomain: "digidoc-84b29.firebaseapp.com",
    databaseURL: "https://digidoc-84b29.firebaseio.com",
    projectId: "digidoc-84b29",
    storageBucket: "digidoc-84b29.appspot.com",
    messagingSenderId: "38305203030",
    appId: "1:38305203030:web:5d8e4f4e3c668f6e41ccf7",
    measurementId: "G-RKJ2CRFKSW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

storage.get('user-id', function(error, data) {
    if (error) throw error;
    if(data.uid)
    {
        let t = data.uid;
        console.log(t);
        admin.auth().getUser(t)
            .then(function(userRecord) {
                // See the UserRecord reference doc for the contents of userRecord.
                console.log('Successfully fetched user data:', userRecord.toJSON());
                location.replace('./userhome.html');
            })
            .catch(function(error) {
                console.log('Error fetching user data:', error);
                location.replace('main.html');
            });
    }

});

$('#email-sign-up').on('input propertychange paste', () => {
    if ($('#email-sign-up').val().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
    {
        console.log("true");
        $('#email-sign-up').removeClass('is-danger').addClass('is-success');
        $('#email_inv').removeClass('is-danger').addClass('is-success').html("Your Email is Valid...!!!");
    }
    else /*if($('#email-sign-up').val() === ' ')*/{
        $('#email-sign-up').removeClass('is-success').addClass('is-danger');
        $('#email_inv').removeClass('is-success').addClass('is-danger').html("Your Email is Invalid...!!!");
    }
});

$('#btn-login').click(() => {
    $('#add-modal').addClass('is-active');
	let email = $('#email-in').val();
	let password = $('#password-in').val();
	let login_false = false;

    f().then(r => {
        if(login_false === false)
        {
            $("#login-form").remove();
            //$('#D1').after(d1);
            storage.set('user-id',{ 'uid': firebase.auth().currentUser.uid }, function(error) {
                if (error) {
                    console.log(error);
                }
                else {
                    location.replace('./userhome.html')
                }
            });
        }
    });

    async function f(){
        await firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                login_false = true;
                alert('Wrong password.');
            } else {
                login_false = true;
                alert(errorMessage);
            }
            console.log(error);
            remote.getCurrentWindow().blur();
        });
    }


    //$('.myinput').attr('contenteditable', 'true');
    //const options = { landscape:false };
    //remote.getCurrentWebContents().print(options);
});

$('#btn-sign').click(() => {
    $('#sign-up-card-modal').addClass('is-active');
});

$('#cancel-sign-up').click(() => {
    $('#sign-up-card-modal').removeClass('is-active');
    user_roll = $('#user_roll_select').children("option:selected").val();
});

$('.delete').click(() => {
    $('#sign-up-card-modal').removeClass('is-active');
});

$('#user_roll_select').change(function () {
    user_roll = $(this).children("option:selected").val();
    alert("You have selected "+user_roll);
});
$('#sign-up-submit').click(async () => {
	let email = $('#email-sign-up').val();
	let password = $('#password-sign-up').val();
	let name = $('#name-in').val();
	let email_exist = false;

	if(user_roll === 'please select')
	{
	    alert('Please select User Roll');
    }
	else
	    {
            admin.auth().createUser({
                email: email,
                emailVerified: false,
                password: password,
                displayName: name,
                disabled: false
            })
                .then(await function(userRecord) {
                    // See the UserRecord reference doc for the contents of userRecord.
                    const uid = userRecord.uid;
                    console.log('Successfully created new user:', userRecord.uid);
                    firebase.database().ref(uid).child("Name").set(name);
                    firebase.database().ref(uid).child("User Roll").set(user_roll);
                    firebase.database().ref(uid).child("Bio").set(" ");
                    alert("Successfully created new user");
                    $('#sign-up-card-modal').removeClass('is-active');
                    remote.getCurrentWindow().reload();

                })
                .catch(() => {
                    if(email.empty)
                    {
                        alert("email address is empty")
                    }
                });
        }
});


