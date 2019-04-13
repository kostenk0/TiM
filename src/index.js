import './scss/main.scss';
import $ from 'jquery';


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
            alert(data[0].login);
            //window.location.href="index.html";
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
        url: 'signup.php',
        type: 'post',
        data:{
            login:login,
            password:pass,
            email:email
           },
        success: function(data){
            alert(data);
            //window.location.href="index.html";
        },
        error: function() {
            alert("Error!!!!");
        }
    });
}

$(document).ready(function() {
	$('.btn').click(function(event) {
		$('.block').removeClass('hidden')
		var num = $(this).attr('data-num');
		$('#block'+num).addClass('hidden')
	});
});

$(document).on('click', '#signin', signin);
$(document).on('click', '#signup', signup);
