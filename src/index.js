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
            alert("Sign in with login: " + data[0].login);
            window.location.href="calendar.html";
            console.log(data[0].login);
                   

            $(document).ready(function(data){
                var $logCal = $('<span class="login_calendar_text">');
                $logCal.appendTo('.login_calendar').text(data[0].login);
                console.log(data[0].login);
            });
        },
        error: function() {
            alert("Error");
        }
    });
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
//         console.log("elfxf");
// 		$('.block').removeClass('hidden')
// 		var num = $(this).attr('data-num');
//         $('#block'+num).addClass('hidden')
//         console.log("elfxf");
// 	});
// });

$(document).on('click', '#signin', signin);
$(document).on('click', '#signup', signup);
$(document).on('click', '#signout', signout);
