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
    if(priority == "1")
    {
        if((start == "") || (end == "") || (starttime == "00:00") || (endtime == "00:00") || starttime == endtime || text == "")
        {
            alert("Something is not correct!");
            return;
        }
    }
    if(priority == "2")
    {
        if((start == "") || (end == "") || text == ""){
            alert("Something is not correct!");
            return;
        }
    }
    if(priority == "3")
    {
        if(text == ""){
            alert("Something is not correct!");
            return; 
        }
    }
    var allVals = [];
     $('#days :checked').each(function() {
       allVals.push($(this).val());
     });
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
    const getWeekDates = () => {

        var currentDate = moment();

  var weekStart = currentDate.clone().startOf('isoWeek');
  var weekEnd = currentDate.clone().endOf('isoWeek');

  var days = [];

  for (var i = 0; i <= 6; i++) {
    days.push(moment(weekStart).add(i, 'days'));
  }
      
        return days;
      };
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
            let week = getWeekDates();
            let selectedDate;
            switch (day){
                case "Monday":
                selectedDate = week[0];
                break;
                case "Tuesday":
                selectedDate = week[1];
                break;
                case "Wednesday":
                selectedDate = week[2];
                break;
                case "Thursday":
                selectedDate = week[3];
                break;
                case "Friday":
                selectedDate = week[4];
                break;
                case "Saturday":
                selectedDate = week[5];
                break;
                case "Sunday":
                selectedDate = week[6];
                break;

            }
            firstPriority.forEach(function(el) {
                let elementEndDate = moment(el.end);
                if(el.days.includes(day) && selectedDate.isBefore(elementEndDate)){
                var $all_grid = $('<div class="row row-striped firstPriority">');
                $all_grid.append($('<div class="col-2 text-right"><h1 class="display-4"><span class="badge badge-secondary">'
                + selectedDate.date() +'</span></h1><h2>'
                + selectedDate.format('MMMM') + '</h2></div><div class="col-10"><h3 class="text-uppercase"><strong>Priority: '
                + el.priority + '</strong></h3><ul class="list-inline"><li class="list-inline-item"><i class="fa fa-calendar-o" aria-hidden="true"></i>'
                + day + '</li><li class="list-inline-item"><i class="fa fa-clock-o" aria-hidden="true"></i> '
                + el.starttime + ' - '
                + el.endtime + '</li></ul><p>'
                + el.text + '</p></div></div>'));
                $all_grid.appendTo('#' + day);
            }
            });
            secondPriority.forEach(function(el) {
                let elementEndDate = moment(el.end);
                if(el.days.includes(day) && selectedDate.isBefore(elementEndDate)){
                var $all_grid = $('<div class="row row-striped secondPriority">');
                $all_grid.append($('<div class="col-2 text-right"><h1 class="display-4"><span class="badge badge-secondary">'
                + selectedDate.date() +'</span></h1><h2>'
                + selectedDate.format('MMMM') + '</h2></div><div class="col-10"><h3 class="text-uppercase"><strong>Priority: '
                + el.priority + '</strong></h3><ul class="list-inline"><li class="list-inline-item"><i class="fa fa-calendar-o" aria-hidden="true"></i>'
                + day + '</li><li class="list-inline-item"><i class="fa fa-clock-o" aria-hidden="true"></i> '
                + "-:-" + ' - '
                + "-:-" + '</li></ul><p>'
                + el.text + '</p></div></div>'));
                $all_grid.appendTo('#' + day);
                }
            });
            thirdPriority.forEach(function(el) {
                let elementEndDate = moment(el.end);
                if(el.days.includes(day)){
                var $all_grid = $('<div class="row row-striped thirdPriority">');
                $all_grid.append($('<div class="col-2 text-right"><h1 class="display-4"><span class="badge badge-secondary">'
                + selectedDate.date() +'</span></h1><h2>'
                + selectedDate.format('MMMM') + '</h2></div><div class="col-10"><h3 class="text-uppercase"><strong>Priority: '
                + el.priority + '</strong></h3><ul class="list-inline"><li class="list-inline-item"><i class="fa fa-calendar-o" aria-hidden="true"></i>'
                + day + '</li><li class="list-inline-item"><i class="fa fa-clock-o" aria-hidden="true"></i> '
                + "-:-" + ' - '
                + "-:-" + '</li></ul><p>'
                + el.text + '</p></div></div>'));
                $all_grid.appendTo('#' + day);
                }
            });
        },
        error: function() {
            alert("Error");
        }
    });
});
