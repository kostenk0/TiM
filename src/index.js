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
            //$('#block2').hide();
            sessionStorage.setItem(10, data[0].login);
            alert("Sign in with login: " + data[0].login);
            window.location.href="calendar.html";
        },
        error: function() {
            alert("Error");
        }
    });
}

window.onload = function() {
    document.getElementById("log").innerHTML= sessionStorage.getItem(10);
    calcCurrentMonday();
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

function signout(){
    window.location.href="index.html"
}

function add(){
    var start = $("#input_start").val();
    var end = $("#input_end").val();
    var priority = $("#select").val();
    var text = $("#message").val();
    var starttime = $("#startTime").val();
    var endtime = $("#endTime").val();
    var allVals = [];
     $('#days :checked').each(function() {
       allVals.push($(this).val());
     });
    console.log(allVals);
    $.ajax({
        url: 'add.php',
        type: 'post',
        data:{
            start:start,
            end:end,
            priority:priority,
            text:text,
            login:sessionStorage.getItem(10),
            isDone:0,
            starttime:starttime,
            endtime:endtime,
            days:allVals
           },
        success: function(data){
            alert(data);
        },
        error: function() {
            alert("Error");
        }
    });
}

function calcCurrentMonday(){
    var d = new Date();

    var month = d.getMonth()+1;
    var day = d.getDate();

    var output = d.getFullYear() + '/' +
        (month<10 ? '0' : '') + month + '/' +
        (day<10 ? '0' : '') + day;
    
    sessionStorage.setItem(20, output);
}

$(document).ready(function() {
	$('.btn').click(function(event) {
		$('.block').removeClass('hidden');
		var num = $(this).attr('data-num');
		$('#block'+num).addClass('hidden');
	});
});

function clear(){
    $('#Monday').empty();
    $('#Tuesday').empty();
    $('#Wednesday').empty();
    $('#Thursday').empty();
    $('#Friday').empty();
    $('#Saturday').empty();
    $('#Sunday').empty();
}

$(document).on('click', '#signin', signin);
$(document).on('click', '#signup', signup);
$(document).on('click', '#signout', signout);
$(document).on('click', '#add', add);
$(document).on('click', '#calendar_header', function(){
    clear();
    $('#calendar').show();
})
$(document).on('click', '.day', function(){
    clear();
    let day = $(this).html();
    var temp = sessionStorage.getItem(20);
    let currentDate = new Date();
    currentDate.setFullYear(temp[0],(temp[1] - 1 ),temp[2]);
    $.ajax({
        url: 'get.php',
        type: 'post',
        data:{
            login:sessionStorage.getItem(10)
           },
        success: function(data){
            $('#calendar').hide();
            let firstPriority = [];
            let secondPriority = [];
            let thirdPriority = [];
            data.forEach(function (position){
                switch(position.priority){
                    case "1":
                    firstPriority.push(position);
                    break;
                    case "2":
                    secondPriority.push(position);
                    break;
                    case "3":
                    thirdPriority.push(position);
                    break;
                }
            });
            firstPriority.forEach(function(el) {
                var date = new Date();
                date.setFullYear(el.end[0],(el.end[1] - 1 ),el.end[2]);
                alert("first");
                if(el.days.contains(day)){
                var $all_grid = $('<div>');
                $all_grid.append($('<span Date of start: >'+(position.starttime)+'</span>'));
                $all_grid.append($('<span Date of end: >'+(position.endtime)+'</span>'));
                $all_grid.append($('<div class="">').text(position.text));
                $all_grid.append($('<div class="">').text(position.priority));
                $all_grid.append($('<div class="">').text(position.isdone));
                $all_grid.appendTo('#' + day);
                }
            });
            secondPriority.forEach(function(el) {
                alert("second");
                if(el.days.contains(day)){
                var $all_grid = $('<div>');
                $all_grid.append($('<span Date of start: >'+(position.starttime)+'</span>'));
                $all_grid.append($('<span Date of end: >'+(position.endtime)+'</span>'));
                $all_grid.append($('<div class="">').text(position.text));
                $all_grid.append($('<div class="">').text(position.priority));
                $all_grid.append($('<div class="">').text(position.isdone));
                $all_grid.appendTo('#' + day);
                }
            });
            thirdPriority.forEach(function(el) {
                alert("third");
                if(el.days.contains(day)){
                var $all_grid = $('<div>');
                $all_grid.append($('<span Date of start: >'+(position.starttime)+'</span>'));
                $all_grid.append($('<span Date of end: >'+(position.endtime)+'</span>'));
                $all_grid.append($('<div class="">').text(position.text));
                $all_grid.append($('<div class="">').text(position.priority));
                $all_grid.append($('<div class="">').text(position.isdone));
                $all_grid.appendTo('#' + day);
                }
            });
        },
        error: function() {
            alert("Error");
        }
    });
});
