

// JavaScript Document

var print = function ()
{

    var test = "test_var";

    return {

        nomu_pdf : function(){

            var p = window.parent.parent;

            alert('노무비 내역서');
            p._showPage();
            var img = new Image();
            img.addEventListener('load', function() {
                var doc = new jsPDF({
                    orientation: 'landscape',
                    unit: 'mm',
                    format: 'a4-horizontal'

                });
                //doc.setPage(2);
                //doc.addPage(500, 270);  //w,h

                //doc.internal.getNumberOfPages(2);
                doc.addImage(img, 'png', 0, 0, 298, 210);  //  x,y,w,h,

                doc.addFont('HMKMMAG.TTF', 'MagicR', 'normal', 'Identity-H');
                doc.addFont('HMKMRHD.TTF', 'HeadlineR', 'normal', 'Identity-H');
                doc.addFont('msgothic.ttf', 'MsGothic', 'normal', 'Identity-H');
                doc.addFont('gothic.ttf', 'LiLing', 'normal', 'Identity-H');
                doc.addFont('HARLOWSI.TTF', 'WMLWQI+HarlowSolid', 'normal', 'WinAnsiEncoding');
                doc.addFont('ITCBLKAD.TTF','a','normal','WinAnsiEncoding');
                doc.addFont('BOD_PSTC.TTF','b','normal','WinAnsiEncoding');
                doc.addFont('GADUGI.TTF', 'GADUGI', 'normal', 'WinAnsiEncoding');

                //doc.setDefaultFonts(0, 'Times');    //English default
                //doc.setDefaultFonts(1, 'normal');    //Korean default
                //doc.setDefaultFonts(3, 'LiLing');         //Chinese default
               // doc.setDefaultFonts(2, 'MsGothic');        //Japanese default

                //var name = $('#kongsu_table_body').children().children().eq(2).text();
                //var job = $('#kongsu_table_body').children().children().eq(3).text();

                var total_row = $('#kongsu_table_body tr').length;  //table의 총 row 수

                //var hyunjang = $('#hyunjang_select').text();
                var balju_company = $('#balju_company').text();
                var bogoja = $('#bogoja').text();
                var hyun_jang_name = $('#hyun_jang_name').text();
                var date = $('#toMonth').val();


                //alert(hyun_jang_name);

                doc.setFont('HeadlineR');        // set font

                doc.setTextColor(0,0,0);
                doc.setCharSpace(1);


                doc.setFontSize(6);
                doc.drawText(33,11,[balju_company]);
                doc.drawText(33,15,[hyun_jang_name]);
                doc.drawText(33,20,[hyun_jang_name]);
                doc.drawText(95,16,[date]);


                /*sum 을 구하는 배열*/
                var sum_total_kongsu =[];
                var sum_danga = [];
                var sum_total_income = [];
                var sum_gab_tax = [];
                var sum_jumin_tax = [];
                var sum_employ_tax = [];
                var sum_med_tax = [];
                var sum_pension = [];
                var sum_tax_total = [];
                var sum_closing_money = [];





                for(var i=0; i<total_row; i++){

                    var tr = $('#kongsu_table_body tr').eq(i);
                    var index = tr.children().eq(1).text();
                    var name = tr.children().eq(2).text();
                    var job = tr.children().eq(3).text();
                    var jumin = tr.children().eq(4).find('div').eq(0).text();
                    var address = tr.children().eq(4).find('div').eq(1).text();



                    var kongsu = tr.children().eq(5).find('div');
                    //alert(kongsu.length);
                    var kongsuLeg = kongsu.length;

                    var total_kongsu = tr.children().eq(6).text();
                    var danga = tr.children().eq(7).text();
                    var total_income = tr.children().eq(8).text(); //노무비 총액
                    var gab_tax = tr.children().eq(9).text(); //갑근세
                    var jumin_tax = tr.children().eq(10).text(); //주민세
                    var employ_tax = tr.children().eq(11).text(); //고용보험
                    var med_tax = tr.children().eq(12).text(); //의료보험
                    var pension = tr.children().eq(13).text(); //국민연금
                    var tax_total = tr.children().eq(14).text(); // 공제합계
                    var closing_money = tr.children().eq(15).text();  //차감된 지급액

                    sum_total_kongsu.push(parseInt(total_kongsu));
                    sum_danga.push(danga);
                    sum_total_income.push(total_income);
                    sum_gab_tax.push(gab_tax);
                    sum_jumin_tax.push(jumin_tax);
                    sum_employ_tax.push(employ_tax);
                    sum_med_tax.push(med_tax);
                    sum_pension.push(pension);
                    sum_tax_total.push(tax_total);
                    sum_closing_money.push(closing_money);
                    /* document에 출력 */
                    doc.setFont('HeadlineR');        // set font
                    doc.setTextColor(0,0,0);
                    doc.setCharSpace(1);

                    doc.setFontSize(6);
                    doc.drawText(7,(39+(11*i))-(1.4*i),[index]);
                    doc.drawText(13,(39+(11*i))-(1.4*i),[job]);

                    doc.setFontSize(7);
                    doc.drawText(20,(39+(11*i))-(1.4*i),[name]);

                    doc.setFontSize(6);
                    doc.setCharSpace(0);
                    doc.drawText(31,(41+(11*i))-(1.4*i),[address]);

                    doc.setFont('MsGothic');
                    doc.setFontSize(10);
                    doc.setCharSpace(0);

                    doc.drawText(32,(37+(11*i))-(1.4*i),[jumin]);


                    for(var k=0; k<31; k++){
                        if(k<15){
                            doc.drawText(
                                60+(k*6)+(k*0.5)   //x position
                                ,(36+(11*i))-(1.3*i)  //y position
                                ,[kongsu.eq(k).text()]
                            );
                        }else{
                            doc.drawText(
                                60+((k-15)*6)+((k-15)*0.5) //x position
                                ,(41+(11*i))-(1.3*i)  //y position
                                ,[kongsu.eq(k).text()]
                            );
                        }
                    }/* text 값 잘못 찍으면 오류난다.*/
                    doc.setFontSize(8);
                    doc.drawText(165,(38+(11*i))-(1.4*i),[total_kongsu]);
                    doc.drawText(173,(38+(11*i))-(1.4*i),[danga]);
                    doc.drawText(186,(38+(11*i))-(1.4*i),[total_income]);
                    doc.drawText(203,(38+(11*i))-(1.4*i),[gab_tax]);
                    doc.drawText(215,(38+(11*i))-(1.4*i),[jumin_tax]);
                    doc.drawText(225,(38+(11*i))-(1.4*i),[employ_tax]);
                    doc.drawText(238,(38+(11*i))-(1.4*i),[med_tax]);
                    doc.drawText(251,(38+(11*i))-(1.4*i),[pension]);
                    doc.drawText(262,(38+(11*i))-(1.4*i),[tax_total]);
                    doc.drawText(274,(38+(11*i))-(1.4*i),[closing_money]);



                }
                //alert(sum_closing_money);
                var res_closing_money = 0;
                for (var i = 0; i < sum_closing_money.length; i++)
                {
                    res_closing_money += sum_closing_money[i];
                    //alert(res_closing_money);


                }
               // alert(res_closing_money);
                /*toLocaleString을 변환시켜줘야한다. */



                doc.save('dailyMeber_payList.pdf');
                p._hidePage();

            });
            img.src = '../../docs/dailyMemberMedical.png';





        },
        work_pdf : function(){
            
            //TODO  전체명수를 7로 나눠서, 몇번 실행할지를 구한다음.
            //TODO 7명만 1,2,3 page 찍고 다음 8번재 사람부터 1,2,3 페이지찍고 다음 종료한 사람으로부터 7명
            var p = window.parent.parent;

            alert('근로 내역서');
            p._showPage();

            var img = new Image();
            var img2 = new Image();
            var img3 = new Image();

            img.src = '../../docs/job-1.png';
            img2.src = '../../docs/job-2.png';
            img3.src = '../../docs/job-3.png';

            img3.addEventListener('load', function() {

                var doc = new jsPDF({
                    orientation: 'landscape',
                    unit: 'mm',
                    format: 'a4-horizontal'

                });
                doc.addImage(img, 'png', 0, 0, 298, 210);  //  x,y,w,h,
                doc.addFont('HMKMMAG.TTF', 'MagicR', 'normal', 'Identity-H');
                doc.addFont('HMKMRHD.TTF', 'HeadlineR', 'normal', 'Identity-H');
                doc.addFont('msgothic.ttf', 'MsGothic', 'normal', 'Identity-H');



                var total_row = $('#kongsu_table_body tr').length;  //table의 총 row 수
                var balju_company = $('#balju_company').text();
                var bogoja = $('#bogoja').text();
                var hyun_jang_name = $('#hyun_jang_name').text();
                var date_val = $('#toMonth').val();
                var date = date_val.split("-");
                var company_name = $('#company_name').text();
                var company_address = $('#company_address').text();
                var company_phone = $('#company_phone').text();
                var president = $('#president').text();
                var Today = new Date();
                var currentYear = Today.getFullYear();  //년도를 구함
                var currentMonth = Today.getMonth() + 1; //연을 구함. 월은 0부터 시작하므로 +1, 12월은 11을 출력
                var currentDate = Today.getDate();  //오늘 일자.
                var h = 0;


                for(var i=0; i<total_row; i++)
                {
                    /*8칸이니까 8칸 씩 높이값 초기화, 8칸 다채워지면 addPage한다. */
                    if(i % 8 == 0){ h = 0;}
                    if(i % 8 == 1){ h = 1;}
                    if(i % 8 == 2){ h = 2;}
                    if(i % 8 == 3){ h = 3;}
                    if(i % 8 == 4){ h = 4;}
                    if(i % 8 == 5){ h = 5;}
                    if(i % 8 == 6){ h = 6;}
                    if(i % 8 == 7){ h = 7;}

                    if(i>0){
                        if(i % 8 == 0)
                        {  //i= 0,1,2,3,4,5,6,7,
                            // 0 % 7 = 7
                            doc.addPage();
                            doc.addImage(img, 'png', 0, 0, 298, 210);  //  x,y,w,h,

                        }
                    }






                    var tr = $('#kongsu_table_body tr').eq(i);
                    var index = tr.children().eq(1).text();
                    var name = tr.children().eq(2).text();
                    var job = tr.children().eq(3).text();
                    var jumin_val = tr.children().eq(4).find('div').eq(0).text().split("-");
                    var jumin1 = jumin_val[0];
                    var jumin2 = jumin_val[1];
                    var address = tr.children().eq(4).find('div').eq(1).text();
                    var total_income = tr.children().eq(8).text(); //노무비 총액
                    var kongsu = tr.children().eq(5).find('div');



                    // k=0 첫페이지일 때 i=0,1,2,3,4,5,6

                    doc.setFont('HeadlineR');        // set font
                    doc.setTextColor(0,0,0);
                    doc.setCharSpace(1);
                    doc.setFontSize(9);
                    doc.drawText(145,20.5,[date[0]]);
                    doc.drawText(165,20.5,[date[1]]);
                    doc.drawText(100,43.5,[company_name]);
                    doc.drawText(200,43.5,[hyun_jang_name]);
                    doc.drawText(100,52.5,[company_address]);
                    doc.setFontSize(8);
                    doc.drawText(257,55,[company_phone]);
                    doc.setFontSize(6);



                    /* document에 출력 */
                    doc.setFont('HeadlineR');        // set font
                    doc.setTextColor(0,0,0);
                    doc.setCharSpace(1);
                    doc.setFontSize(7);
                    doc.drawText(18,(83+(11*h))-(1.4*h),[name]);
                    doc.drawText(69,(83+(11*h))-(1.4*h),[address]);
                    doc.drawText(125,(83+(11*h))-(1.4*h),[job]);
                    doc.drawText(95,166,[company_name]);


                    /*숫자를 찍는 Font*/
                    doc.setFont('MsGothic');
                    doc.setFontSize(10);
                    doc.setCharSpace(0);
                    doc.drawText(34,(84+(11*h))-(1.4*h),[jumin1]);
                    doc.drawText(48,(84+(11*h))-(1.4*h),[jumin2]);
                    //doc.drawText(110,(83+(11*i))-(1.4*i),[phone]);


                    doc.setCharSpace(-1);
                    doc.setFontSize(9);
                    /*근로일수, 일 평균 근로시간*/
                    var total_kongsu = [];
                    var average_kongsu = [];

                    for(var k=0; k<31; k++){
                        if(kongsu.eq(k).text()>0){
                            total_kongsu.push(kongsu.eq(k).text());
                            //average_kongsu.push(kongsu.eq(k).text());
                        }

                        if(k<15){
                            doc.drawText(
                                138+(k*3)+(k*1.8)   //x position
                                ,(81.5+(11*h))-(1.4*h)  //y position
                                ,[kongsu.eq(k).text()]
                            );
                        }else{
                            doc.drawText(
                                138+((k-15)*3)+((k-15)*1.8) //x position
                                ,(86.5+(11*h))-(1.4*h)  //y position
                                ,[kongsu.eq(k).text()]
                            );
                        }
                    }/* text 값 잘못 찍으면 오류난다.*/

                    var work_day2 = '';
                    var work_day = total_kongsu.length;
                    work_day2 += work_day;

                    doc.setCharSpace(0);
                    doc.setFontSize(10);
                    doc.drawText(215,(84.5+(11*h))-(1.4*h),[work_day2]);
                    doc.drawText(230,(84.5+(11*h))-(1.4*h),["8"]);
                    doc.drawText(245,(84.5+(11*h))-(1.4*h),[total_income]);

                    var year = '';
                    var month = '';
                    var day = '';

                    year += currentYear;
                    month += currentMonth;
                    day += currentDate;

                    doc.drawText(127, 166, [year]);
                    doc.drawText(143, 166, [month]);
                    doc.drawText(155, 166, [day]);

                }
                 //doc.addPage();
                 //doc.addImage(img2, 'png', 0, 0, 298, 210);  //  x,y,w,h,
                 //doc.addPage();
                 //doc.addImage(img3, 'png', 0, 0, 298, 210);  //  x,y,w,h,
                 doc.save('job-1.pdf');
                p._hidePage();
            });










        },
        payment_pdf : function(){
            var p = window.parent.parent;
            alert('급여 지급');
            p._showPage();
            var img = new Image();
            img.addEventListener('load', function() {
                var doc = new jsPDF({
                    orientation: 'landscape',
                    unit: 'mm',
                    format: 'a4-horizontal'

                });
                //doc.setPage(2);
                //doc.addPage(500, 270);  //w,h

                //doc.internal.getNumberOfPages(2);
                doc.addImage(img, 'png', 1, 1, 298, 210);  //  x,y,w,h,

                doc.addFont('HMKMMAG.TTF', 'MagicR', 'normal', 'Identity-H');
                doc.addFont('HMKMRHD.TTF', 'HeadlineR', 'normal', 'Identity-H');
                doc.addFont('msgothic.ttf', 'MsGothic', 'normal', 'Identity-H');
                doc.addFont('gothic.ttf', 'LiLing', 'normal', 'Identity-H');
                doc.addFont('HARLOWSI.TTF', 'WMLWQI+HarlowSolid', 'normal', 'WinAnsiEncoding');
                doc.addFont('ITCBLKAD.TTF','a','normal','WinAnsiEncoding');
                doc.addFont('BOD_PSTC.TTF','b','normal','WinAnsiEncoding');
                doc.addFont('GADUGI.TTF', 'GADUGI', 'normal', 'WinAnsiEncoding');





                //doc.setDefaultFonts(0, 'Times');    //English default
                doc.setDefaultFonts(1, 'MsGothic');    //Korean default
                //doc.setDefaultFonts(3, 'LiLing');         //Chinese default
                //doc.setDefaultFonts(2, 'MsGothic');        //Japanese default

                //var name = $('#kongsu_table_body').children().children().eq(2).text();
                //var job = $('#kongsu_table_body').children().children().eq(3).text();

                var total_row = $('#nomu_table_body tr').length;  //table의 총 row 수

                for(var i=0; i<total_row; i++){

                    var tr = $('#nomu_table_body tr').eq(i);
                    var index = tr.children().eq(1).text();
                    var name = tr.children().eq(2).text();
                    var job = tr.children().eq(3).text();
                    var jumin = tr.children().eq(4).text();
                    var kongsu = tr.children().eq(8).text();
                    var danga = tr.children().eq(9).text();
                    var total_income = tr.children().eq(10).text(); //노무비 총액
                    var gab_tax = tr.children().eq(11).text(); //갑근세
                    var jumin_tax = tr.children().eq(12).text(); //주민세
                    var employ_tax = tr.children().eq(13).text(); //고용보험
                    var med_tax = tr.children().eq(14).text(); //의료보험
                    var pension = tr.children().eq(15).text(); //국민연금
                    var tax_total = tr.children().eq(16).text(); // 공제합계
                    var closing_money = tr.children().eq(17).text();  //차감된 지급액
                    var bank = tr.children().eq(5).children().val(); //은행
                    var bank_owner = tr.children().eq(6).children().val(); //은행주
                    var account = tr.children().eq(7).children().val(); //계좌번호

                    var cal_tax = parseInt(jumin_tax)+parseInt(gab_tax);
                    //alert(cal_tax);
                    //alert(bank);
                    //alert(total_income);

                    doc.setFont('HeadlineR');        // set font

                    doc.setTextColor(0,0,0);
                    doc.setCharSpace(1);


                    doc.setFontSize(6);
                    //doc.drawText(12,(36+(11*i))-(1.4*i),[index]);
                    doc.drawText(17,(36+(11*i))-(1.4*i),[job]);

                    doc.setFontSize(7);
                    doc.drawText(24,(36+(11*i))-(1.4*i),[name]);


                    doc.setCharSpace(0);
                    doc.setFont('MsGothic');
                    doc.setFontSize(10);
                    doc.drawText(36,(35+(11*i))-(1.4*i),[jumin]);
                    doc.setFontSize(9);
                    doc.drawText(67,(35+(11*i))-(1.4*i),[kongsu]);
                    doc.drawText(78,(35+(11*i))-(1.4*i),[danga]);
                    doc.setFontSize(9);
                    doc.drawText(93,(35+(11*i))-(1.4*i),[total_income]);
                    doc.drawText(112,(35+(11*i))-(1.4*i),[gab_tax]);
                    doc.drawText(128,(35+(11*i))-(1.4*i),[jumin_tax]);
                    doc.drawText(144,(35+(11*i))-(1.4*i),[employ_tax]);
                    //doc.drawText(160,(35+(11*i))-(1.4*i),[med_tax]);
                    //doc.drawText(176,(35+(11*i))-(1.4*i),[pension]);



                    doc.setFont('HeadlineR');        //
                    doc.setFontSize(7);

                    doc.drawText(192,(35+(11*i))-(1.4*i),[bank]);
                    doc.drawText(209,(35+(11*i))-(1.4*i),[bank_owner]);
                    doc.setFont('MsGothic');
                    doc.setFontSize(10);
                    doc.drawText(230,(35+(11*i))-(1.4*i),[account]);


                }
                doc.save('dailyMeber_payList.pdf');
                p._hidePage();

            });
            img.src = '../../docs/dailyMember_payList.png';





        },






    };

}();



