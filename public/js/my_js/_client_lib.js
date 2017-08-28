// JavaScript Document

var lib = function ()
{

    var test = "test_var";

    return {

        dateValue : function(){  // xxxx-xx-xx 현재일
            var now = new Date();
            var year= now.getFullYear();
            var mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);  // 달이 9월이상이면 ''+10,11,12 찍고 아니면 '0'+ 먼스찍기
            var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();
            var chan_val = year + '-' + mon + '-' + day;
            //$('#dateSearch').val(chan_val);
            //daily_search();
            return chan_val;
        },
        dateValue_add : function(addday){  // 1이오면 하루 증가, -1 이 오면 하루 차감
            var day = document.getElementById('dateSearch').value;
            var resultDay = lib.GetDateAdd(day ,addday);
            //document.getElementById('dateSearch').value = day;
            return resultDay;
        },
        GetDateAdd : function(strSDate, Days){
            var SDate_pYyyymmdd = strSDate.replace(eval("/\\" + "-" + "/g"), "");
            var SDate_yyyy = SDate_pYyyymmdd.substr(0, 4) * 1;
            var SDate_mm = SDate_pYyyymmdd.substr(4, 2) * 1;
            var SDate_dd = SDate_pYyyymmdd.substr(6, 2) * 1;
            var SDate = new Date(SDate_yyyy, SDate_mm - 1, SDate_dd);
            SDate.getDate(SDate.getDate() + Days);
            var resultDate = new Date(Date.parse(SDate) + Days * 1000 * 60 * 60 * 24);
            var day_val =  resultDate.getFullYear() + "-" + ((resultDate.getMonth() + 101) +
                "").substring(1, 3) + "-" + ((resultDate.getDate() + 100) + "").substring(1, 3);


            return day_val;
        },
        dateValue_add_month : function(addMonth){  // date type 이 월인 경우 1이오면 하루 증가, -1 이 오면 하루 차감
            var day = document.getElementById('toMonth').value;
            var resultDay = lib.GetDateAdd_month(day ,addMonth);
            //document.getElementById('dateSearch').value = day;
            return resultDay;
        },
        GetDateAdd_month : function(strSDate, Months){

            var now = new Date(strSDate);
            //alert(Months);

            var months = new Array( "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
            var new_date = now.setMonth(now.getMonth()+Months);
            var month_change = now.getFullYear()+"-"+months[now.getMonth()];

            return month_change;


        },
        Calendar : function(date){
            //alert(date);
            if( typeof( date ) !== 'undefined' ) {
                date = date.split('-');
                date[1] = date[1] - 1;
                date = new Date(date[0], date[1]);  // month라서 date[2]는 필요없음
            } else {

                var date = new Date();
            }
            var currentYear = date.getFullYear();
            //년도를 구함

            var currentMonth = date.getMonth() + 1;
            //연을 구함. 월은 0부터 시작하므로 +1, 12월은 11을 출력

            var currentDate = date.getDate();
            //오늘 일자.

            date.setDate(1);
            var currentDay = date.getDay();
            //이번달 1일의 요일은 출력. 0은 일요일 6은 토요일

            var dateString = new Array('sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat');
            var dateSting_kr = new Array('일', '월', '화', '수', '목', '금', '토');
            var lastDate = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
            if( (currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0 )
                lastDate[1] = 29;
            //각 달의 마지막 일을 계산, 윤년의 경우 년도가 4의 배수이고 100의 배수가 아닐 때 혹은 400의 배수일 때 2월달이 29일 임.

            var currentLastDate = lastDate[currentMonth-1];
            var week = Math.ceil( ( currentDay + currentLastDate ) / 7 );
            //총 몇 주인지 구함.

            if(currentMonth != 1)
                var prevDate = currentYear + '-' + ( currentMonth - 1 ) + '-' + currentDate;
            else
                var prevDate = ( currentYear - 1 ) + '-' + 12 + '-' + currentDate;
            //만약 이번달이 1월이라면 1년 전 12월로 출력.

            if(currentMonth != 12)
                var nextDate = currentYear + '-' + ( currentMonth + 1 ) + '-' + currentDate;
            else
                var nextDate = ( currentYear + 1 ) + '-' + 1 + '-' + currentDate;
            //만약 이번달이 12월이라면 1년 후 1월로 출력.


            if( currentMonth < 10 )
                var currentMonth = '0' + currentMonth;
            //10월 이하라면 앞에 0을 붙여준다.
            var calendar = '';

            var dateNum = 1 - currentDay;  // 0은 일요일 6은 토요일

            for(var i = 0; i < week; i++) {

                for(var j = 0; j < 7; j++, dateNum++) {
                    if( dateNum < 1 || dateNum    > currentLastDate ) {
                        calendar += ''; // 예외의 경우
                        continue;
                    }
                    calendar += '<div class="label_week_date ' + dateString[j] + '">'+dateNum+'<br><span class="_week">'+ dateSting_kr[j]+'</span></div>';

                }

            }

            $('#monthly_closing').empty().append(calendar);
        },
        onKeyup : function(){
            // Declare variables
            var input, filter, table, tr, td, i;
            input = document.getElementById("search_input");
            filter = input.value.toUpperCase();
            table = document.getElementById("daily_employee_list");  //search 하고자 하는 table
            tr = table.getElementsByTagName("tr");

            // Loop through all table rows, and hide those who don't match the search query
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[1];
                if (td) {
                    if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        },
        toMonth: function(){  // xxxx-xx 현재월을 찍는다.
            var now = new Date();
            var year= now.getFullYear();
            var mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);

            var month_val = year + '-' + mon ;
            //var str = '';
            //str += chan_val;

            return month_val;

        }


    };

}();



