// JavaScript Document

var daily_employee_register = function ()
{

    var test = "test_var";

    return {

        hyunjang_load : function(proc){   // 진행중인 공사만 불러온다. 1
            //공사 중인 것 만 불러온다.
            var gubun = "R";
            var iData = ['proc'];
            iData[0] = proc;

            var result = _DB_query.httpService("hyunjang_info",gubun, iData);
            var res = result[0].data[0];

            var res_num = result[0].data[0].length;


            $("#hyunjang_select").empty();
            for (var i = 0; i < res_num; i++)
            {
                var str = '';

                //var j = i+1;
                str += "<option value='"+res[i].id+"'>";
                str += res[i].hyun_jang_name

                str += "</option>";
                $("#hyunjang_select").append(str);
                //$("#bogoja").append(res[i].balju_company);
                //$("#baluju_company").append(res[i].bogoja);

            }

        },
        daily_employee_include : function(employee_id){  //일용직 근로자 클릭해서 왼쪽 table에 추가할 때

            var gubun = "individual";
            var iData = ['employee_id'];
            iData[0] = employee_id;

            var result = _DB_query.httpService("daily_employee_info",gubun, iData);
            var msg = result[0].data[0][0].msg;
            var res = result[0].data[0][0];
            var return_code = result[0].data[0][0].return_code;


            if(result_data_save.indexOf("'"+res.id+"'") == -1){

                result_data_save.push("'"+res.id+"'");
                var str = '';
                str += "<tr>";
                str += "<td>"+ "<input onClick='daily_employee_register.daily_employee_exclude()' name='checkBox' type='checkbox' checked>"+"</td>";
                str += "<td>"+ res.job +"</td>";
                str += "<td>"+ res.name +"</td>";
                str += "<td>"+ "<input type='text'>" +"</td>";
                str += "<td style='display:none;'>"+ res.id +"</td>";
                str += "</tr>";

                $('#monthly_danga').append(str);
            }else{
                alert('이미 등록됨');
            }

            /*
              var res_num = result_data.length;
              for(var i = 0; i < res_num; i++){
                  alert(result_data[i]);
              }

            */

        },
        daily_employee_exclude : function(){   // monthly_danga list 에서   checked 풀면 리스트에서 삭제: result Array에서 뺴기, delete Array 에추가
            var month = $('#toMonth').val();
            var hyunjang_id = $('#hyunjang_select').val();

            //$('#monthly_danga input[type="checkbox"]:checked').parent().parent().remove();
            var unChecked = $('#monthly_danga input[type="checkbox"]').not("input:checked");
            unChecked.parent().parent().remove();
            var unCheckedTr = unChecked.parent().parent();
            var employee_id = unCheckedTr.children().eq(4).text();
            //alert(employee_id);
            //alert(result_data_save);
            //alert(result_data_save.indexOf("'"+employee_id+"'", 0));

            var find_id = result_data_save.indexOf("'"+employee_id+"'", 0);
            if(find_id != -1){  // 있다면

                //alert(result_data_save);
                result_data_save.splice(find_id, 1);

                var find_delete_id = result_data_delete.indexOf("'"+employee_id+"'", 0);
                if(find_delete_id != -1){  // delete Array 에 있다면
                    alert("Find delete id");
                }else{// 없다면 추가
                    result_data_delete.push(employee_id);   // delete data는 id0@id1@id2@id3 형식으로 넘겨서 '' 없이 넣는다.
                    //alert(result_data_delete);


                }

                //alert(result_data_save);

            }else{
                alert("NotFind");
                //alert(result_data_save);
            }

        },
        monthly_danga_load : function(){   //  현장 선택하고 월 선택하면 해당 월의 현장에 등록된 일용직 조회
            var month = $('#toMonth').val();
            var hyunjang_id = $('#hyunjang_select').val();
            var gubun = "R";
            var iData = ['hyunjang_id','month'];
            iData[0] = hyunjang_id;
            iData[1] = month;


            var result = _DB_query.httpService("daily_employee_register_info",gubun, iData);
            var res = result[0].data[0];
            var res_num = result[0].data[0].length;

            result_data_save = [];  //monthly_danga 에 추가할 데이터
            result_data_delete = [];  // monthly_daga 에서 삭제할 데이터

            if(res  == false){
                //alert('db없음');
                alert(month+' 입력값이 없습니다.');
                // var nodata = '';
                //     nodata += "<div>";
                //     nodata += '입력 값이 없습니다.';
                //
                //     nodata += "</div>";
                // $('#monthly_danga').empty().append(nodata);
                $('#monthly_danga').empty();
            }else{
                $('#monthly_danga').empty();
                for (var i = 0; i < res_num; i++)
                {
                    result_data_save.push("'"+res[i].id+"'");
                    var str = '';
                    str += "<tr>";
                    str += "<td>"+ "<input onClick='daily_employee_register.daily_employee_exclude()' name='checkBox' type='checkbox' checked>"+"</td>";
                    str += "<td>"+ res[i].job +"</td>";
                    str += "<td>"+ res[i].name +"</td>";
                    str += "<td>"+ "<input type='text' value='"+res[i].daily_salary+"'>" +"</td>";  //TODO .toLocaleString 하면 저장할 때 , 앞에 까지 읽는다.
                    str += "<td style='display:none;'>"+ res[i].id +"</td>";
                    str += "</tr>";
                    $('#monthly_danga').append(str);
                }
            }

            //alert(result_data_save);


        },
        monthly_danga_save : function(){   // 저장 버튼: INSERT/UPDATE
            var month = $('#toMonth').val();
            var hyunjang_id = $('#hyunjang_select').val();

            if (!month){
                alert('등록할 날짜를 선택하세요');
                $('#toMonth').focus();
                return false
            }
            if(!hyunjang_id){
                alert('현장을 선택하세요');
                $('#hyunjang_select').focus();
                return false
            }

            //alert($('#monthly_danga tr').size());
            var total_num = $('#monthly_danga tr').size();
            var idGroup = '';
            var dangaGroup = '';
            for (var i = 0; i < total_num; i++) {

                var chk = $('#monthly_danga tr').eq(i).children().find('input[type="checkbox"]').is(':checked');
                var id = $('#monthly_danga tr').eq(i).children().eq(4).text();
                if (chk == true) {

                    var danga = $('table tr').eq(i+1).find('input[type="text"]').val();
                    //alert(id+"님의 단가: "+danga);
                    //TODO danga에는 i+1 을 해야 오류가 나지않는 이유는??
                    idGroup += id + "@";
                    dangaGroup += danga + "@";

                }
            }
            //alert(idGroup+"///"+dangaGroup);
            var gubun = "S";
            var iData = ['hyunjang_id','idGroup','month','dangaGroup','total_num'];
            iData[0] = hyunjang_id;
            iData[1] = idGroup;
            iData[2] = month;
            iData[3] = dangaGroup;
            iData[4] = total_num;

            var result = _DB_query.httpService("daily_employee_register_info",gubun, iData);
            var msg = result[0].data[0][0].msg;
            //var res = result[0].data[0][0];
            var return_code = result[0].data[0][0].return_code;
            if(return_code == '100'){
                //alert(msg);
                location.reload();

            }



        },
        monthly_danga_delete : function(){   // 저장 버튼   DELETE
            var month = $('#toMonth').val();
            var hyunjang_id = $('#hyunjang_select').val();



            var total_num = result_data_delete.length;
            var idGroup = '';
            for (var i = 0; i < total_num; i++) {

                var id = result_data_delete[i];
                //alert(id);
                    idGroup += id + "@";
                //alert(idGroup);


            }
            //alert(hyunjang_id+"//"+month+"//"+idGroup+"//"+total_num);

            var gubun = "D";
            var iData = ['hyunjang_id','month','employee_id'];
            iData[0] = hyunjang_id;
            iData[1] = month;
            iData[2] = idGroup;
            iData[3] = total_num;


            var result = _DB_query.httpService("daily_employee_register_info",gubun, iData);
            var msg = result[0].data[0][0].msg;
            //var res = result[0].data[0][0];
            var return_code = result[0].data[0][0].return_code;
            //alert(return_code);

            if(return_code == '100'){
                //alert(msg);
                location.reload();


              }


        },




    };

}();



