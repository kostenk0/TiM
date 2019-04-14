import './scss/main.scss';
import $ from 'jquery';

console.log('Hello!');

window.jQuery = $;
window.$ = $;


function signin(){
    var login = $("#signin_login").val();
    var pass = $("#signin_password").val();
    $.ajax({
        url: 'signin.php',
        type: 'post',
        data:{
            login:login,
            password:pass
           },
        success: function(data){
            //$('#block2').hide();
            sessionStorage.setItem(10, data[0].login);
            alert("Sign in with login: " + data[0].login);
            window.location.href="calendar.html";
<<<<<<< HEAD
            console.log(data[0].login);
                   

            $(document).ready(function(data){
                var $logCal = $('<span class="login_calendar_text">');
                $logCal.appendTo('.login_calendar').text(data[0].login);
                console.log(data[0].login);
            });
=======
>>>>>>> ee1546f7de3ba62ab90d50cbb48cd6571666f0d2
        },
        error: function() {
            alert("Error");
        }
    });
}

window.onload = function() {
    document.getElementById("log").innerHTML= sessionStorage.getItem(10);
}

function signup(){
    var login = $("#signup_login").val();
    var pass = $("#signup_password").val();
    var email = $("#signup_email").val();
    $.ajax({
        // dataType: 'json',
        url: 'signup.php',
        type: 'post',
        data:{
            login:login,
            password:pass,
            email:email
           },
        success: function(data){
            console.log(login);
            alert(data);
            // window.location.href="index.html";
            console.log(login);
        },
        error: function(data) {
            alert(data);
        }
    });
}

function signout(){
    window.location.href="index.html"
}

// $(document).ready(function() {
// 	$('.btn').click(function(event) {
<<<<<<< HEAD
//         console.log("elfxf");
// 		$('.block').removeClass('hidden')
// 		var num = $(this).attr('data-num');
//         $('#block'+num).addClass('hidden')
//         console.log("elfxf");
=======
// 		$('.block').removeClass('hidden');
// 		var num = $(this).attr('data-num');
// 		$('#block'+num).addClass('hidden');
>>>>>>> ee1546f7de3ba62ab90d50cbb48cd6571666f0d2
// 	});
// });

$(document).on('click', '#signin', signin);
$(document).on('click', '#signup', signup);
$(document).on('click', '#signout', signout);
$(document).on('click', '#add', getData);

function getData(){
    // var start = $( "#input_start" ).datepicker( "getDate" );
    // var end = $("input_end").val();
    // var priority = $("select").val();
    var task = $getElementById("message1").value;;
    alert(task);
}
