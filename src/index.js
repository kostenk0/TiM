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






$( '#calendar' ).calendario();

;( function( $, window, undefined ) {
	
	'use strict';

	$.Calendario = function( options, element ) {
		
		this.$el = $( element );
		this._init( options );
		
	};

	// the options
	$.Calendario.defaults = {
		/*
		you can also pass:
		month : initialize calendar with this month (1-12). Default is today.
		year : initialize calendar with this year. Default is today.
		caldata : initial data/content for the calendar.
		caldata format:
		{
			'MM-DD-YYYY' : 'HTML Content',
			'MM-DD-YYYY' : 'HTML Content',
			'MM-DD-YYYY' : 'HTML Content'
			...
		}
		*/
		weeks : [ 'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота' ],
		weekabbrs : [ 'Вс', 'Пон', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб' ],
		months : [ 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ],
		monthabbrs : [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
		// choose between values in options.weeks or options.weekabbrs
		displayWeekAbbr : false,
		// choose between values in options.months or options.monthabbrs
		displayMonthAbbr : false,
		// left most day in the calendar
		// 0 - Sunday, 1 - Monday, ... , 6 - Saturday
		startIn : 1,
		onDayClick : function( $el, $content, dateProperties ) { return false; }
	};

	$.Calendario.prototype = {

		_init : function( options ) {
			
			// options
			this.options = $.extend( true, {}, $.Calendario.defaults, options );

			this.today = new Date();
			this.month = ( isNaN( this.options.month ) || this.options.month == null) ? this.today.getMonth() : this.options.month - 1;
			this.year = ( isNaN( this.options.year ) || this.options.year == null) ? this.today.getFullYear() : this.options.year;
			this.caldata = this.options.caldata || {};
			this._generateTemplate();
			this._initEvents();

		},
		_initEvents : function() {

			var self = this;

			this.$el.on( 'click.calendario', 'div.fc-row > div', function() {

				var $cell = $( this ),
					idx = $cell.index(),
					$content = $cell.children( 'div' ),
					dateProp = {
						day : $cell.children( 'span.fc-date' ).text(),
						month : self.month + 1,
						monthname : self.options.displayMonthAbbr ? self.options.monthabbrs[ self.month ] : self.options.months[ self.month ],
						year : self.year,
						weekday : idx + self.options.startIn,
						weekdayname : self.options.weeks[ idx + self.options.startIn ]
					};

				if( dateProp.day ) {
					self.options.onDayClick( $cell, $content, dateProp );
				}

			} );

		},
		// Calendar logic based on http://jszen.blogspot.pt/2007/03/how-to-build-simple-calendar-with.html
		_generateTemplate : function( callback ) {

			var head = this._getHead(),
				body = this._getBody(),
				rowClass;

			switch( this.rowTotal ) {
				case 4 : rowClass = 'fc-four-rows'; break;
				case 5 : rowClass = 'fc-five-rows'; break;
				case 6 : rowClass = 'fc-six-rows'; break;
			}

			this.$cal = $( '<div class="fc-calendar ' + rowClass + '">' ).append( head, body );

			this.$el.find( 'div.fc-calendar' ).remove().end().append( this.$cal );

			if( callback ) { callback.call(); }

		},
		_getHead : function() {

			var html = '<div class="fc-head">';
		
			for ( var i = 0; i <= 6; i++ ) {

				var pos = i + this.options.startIn,
					j = pos > 6 ? pos - 6 - 1 : pos;

				html += '<div>';
				html += this.options.displayWeekAbbr ? this.options.weekabbrs[ j ] : this.options.weeks[ j ];
				html += '</div>';

			}

			html += '</div>';

			return html;

		},
		_getBody : function() {

			var d = new Date( this.year, this.month + 1, 0 ),
				// number of days in the month
				monthLength = d.getDate(),
				firstDay = new Date( this.year, this.month, 1 );

			// day of the week
			this.startingDay = firstDay.getDay();

			var html = '<div class="fc-body"><div class="fc-row">',
				// fill in the days
				day = 1;

			// this loop is for weeks (rows)
			for ( var i = 0; i < 7; i++ ) {

				// this loop is for weekdays (cells)
				for ( var j = 0; j <= 6; j++ ) {

					var pos = this.startingDay - this.options.startIn,
						p = pos < 0 ? 6 + pos + 1 : pos,
						inner = '',
						today = this.month === this.today.getMonth() && this.year === this.today.getFullYear() && day === this.today.getDate(),
						content = '';
					
					if ( day <= monthLength && ( i > 0 || j >= p ) ) {

						inner += '<span class="fc-date">' + day + '</span><span class="fc-weekday">' + this.options.weekabbrs[ j + this.options.startIn > 6 ? j + this.options.startIn - 6 - 1 : j + this.options.startIn ] + '</span>';

						// this day is:
						var strdate = ( this.month + 1 < 10 ? '0' + ( this.month + 1 ) : this.month + 1 ) + '-' + ( day < 10 ? '0' + day : day ) + '-' + this.year,
							dayData = this.caldata[ strdate ];

						if( dayData ) {
							content = dayData;
						}

						if( content !== '' ) {
							inner += '<div>' + content + '</div>';
						}

						++day;

					}
					else {
						today = false;
					}

					var cellClasses = today ? 'fc-today ' : '';
					if( content !== '' ) {
						cellClasses += 'fc-content';
					}

					html += cellClasses !== '' ? '<div class="' + cellClasses + '">' : '<div>';
					html += inner;
					html += '</div>';

				}

				// stop making rows if we've run out of days
				if (day > monthLength) {
					this.rowTotal = i + 1;
					break;
				} 
				else {
					html += '</div><div class="fc-row">';
				}

			}
			html += '</div></div>';

			return html;

		},
		// based on http://stackoverflow.com/a/8390325/989439
		_isValidDate : function( date ) {

			date = date.replace(/-/gi,'');
			var month = parseInt( date.substring( 0, 2 ), 10 ),
				day = parseInt( date.substring( 2, 4 ), 10 ),
				year = parseInt( date.substring( 4, 8 ), 10 );

			if( ( month < 1 ) || ( month > 12 ) ) {
				return false;
			}
			else if( ( day < 1 ) || ( day > 31 ) )  {
				return false;
			}
			else if( ( ( month == 4 ) || ( month == 6 ) || ( month == 9 ) || ( month == 11 ) ) && ( day > 30 ) )  {
				return false;
			}
			else if( ( month == 2 ) && ( ( ( year % 400 ) == 0) || ( ( year % 4 ) == 0 ) ) && ( ( year % 100 ) != 0 ) && ( day > 29 ) )  {
				return false;
			}
			else if( ( month == 2 ) && ( ( year % 100 ) == 0 ) && ( day > 29 ) )  {
				return false;
			}

			return {
				day : day,
				month : month,
				year : year
			};

		},
		_move : function( period, dir, callback ) {

			if( dir === 'previous' ) {
				
				if( period === 'month' ) {
					this.year = this.month > 0 ? this.year : --this.year;
					this.month = this.month > 0 ? --this.month : 11;
				}
				else if( period === 'year' ) {
					this.year = --this.year;
				}

			}
			else if( dir === 'next' ) {

				if( period === 'month' ) {
					this.year = this.month < 11 ? this.year : ++this.year;
					this.month = this.month < 11 ? ++this.month : 0;
				}
				else if( period === 'year' ) {
					this.year = ++this.year;
				}

			}

			this._generateTemplate( callback );

		},
		/************************* 
		******PUBLIC METHODS *****
		**************************/
		getYear : function() {
			return this.year;
		},
		getMonth : function() {
			return this.month + 1;
		},
		getMonthName : function() {
			return this.options.displayMonthAbbr ? this.options.monthabbrs[ this.month ] : this.options.months[ this.month ];
		},
		// gets the cell's content div associated to a day of the current displayed month
		// day : 1 - [28||29||30||31]
		getCell : function( day ) {

			var row = Math.floor( ( day + this.startingDay - this.options.startIn ) / 7 ),
				pos = day + this.startingDay - this.options.startIn - ( row * 7 ) - 1;

			return this.$cal.find( 'div.fc-body' ).children( 'div.fc-row' ).eq( row ).children( 'div' ).eq( pos ).children( 'div' );

		},
		setData : function( caldata ) {

			caldata = caldata || {};
			$.extend( this.caldata, caldata );
			this._generateTemplate();

		},
		// goes to today's month/year
		gotoNow : function( callback ) {

			this.month = this.today.getMonth();
			this.year = this.today.getFullYear();
			this._generateTemplate( callback );

		},
		// goes to month/year
		goto : function( month, year, callback ) {

			this.month = month;
			this.year = year;
			this._generateTemplate( callback );

		},
		gotoPreviousMonth : function( callback ) {
			this._move( 'month', 'previous', callback );
		},
		gotoPreviousYear : function( callback ) {
			this._move( 'year', 'previous', callback );
		},
		gotoNextMonth : function( callback ) {
			this._move( 'month', 'next', callback );
		},
		gotoNextYear : function( callback ) {
			this._move( 'year', 'next', callback );
		}

	};
	
	var logError = function( message ) {

		if ( window.console ) {

			window.console.error( message );
		
		}

	};
	
	$.fn.calendario = function( options ) {

		var instance = $.data( this, 'calendario' );
		
		if ( typeof options === 'string' ) {
			
			var args = Array.prototype.slice.call( arguments, 1 );
			
			this.each(function() {
			
				if ( !instance ) {

					logError( "cannot call methods on calendario prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				
				}
				
				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {

					logError( "no such method '" + options + "' for calendario instance" );
					return;
				
				}
				
				instance[ options ].apply( instance, args );
			
			});
		
		} 
		else {
		
			this.each(function() {
				
				if ( instance ) {

					instance._init();
				
				}
				else {

					instance = $.data( this, 'calendario', new $.Calendario( options, this ) );
				
				}

			});
		
		}
		
		return instance;
		
	};
	
} )( jQuery, window );