$(document).ready(() => {
    workConstroller.loadMonth();
    workConstroller.LoadTableWork();
  
    $('#selectOptionsCategory').change(function () {
        var SelectedValue = $('#selectOptionsCategory').val();
        var SelectedYear = $('#selectOptionsCategory :selected').text();
        
        var SelectedYear1 = SelectedYear.substring(10);
        console.log(SelectedYear1);
        var JSONObject = { "month": SelectedValue, "year": SelectedYear1 };
     
        var jsonData = JSON.stringify(JSONObject);
        $('#tblWeek tbody').empty();
        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            url: '../Work/LoadByMonth',
            data: jsonData,
            dataType: 'JSON',
            success: function (ref) {
                console.log(ref.dataList);
                $.each(ref.dataList, (i, item) => {


                    var rows = '<tr>'


                        + `<td><input type="checkbox" name ="cbox" id=${item.GIATRI} value=${item.Nam} class=${item.STTTUAN} /></td>`

                        + `<td>${item.GIATRI}</td>`
                        + `<td>${item.THANG}</td>`
                        + `<td>${item.NGAYBATDAU}</td>`
                        + `<td>${item.NGAYKETTHUC}</td>`
                       
                        + `<td></td>`
                        + `<td></td>`
                        + `<td></td>`
                        + `<td></td>`
                        + `<td></td>`
                        + `<td></td>`
                        + `td><a href="#"><i class="fas fa-edit"></i></a></td>`
                        + '</tr>'
                        + `<tr>`
                        + `<td></td>`
                        + `<td></td>`
                        + `<td></td>`
                        + `<td></td>`
                        + `<td></td>`

                        + `<td>${item.TENTUAN}</td>`
                        + `<td>${item.STTTUAN}</td>`
                        + `<td>${item.TUNGAY}</td>`
                        + `<td>${item.DENNGAY}</td>`
                        + `<td>${item.SOGIOLAM}</td>`


                        + `<td><input type="checkbox" checked="false" id=${item.STTTUAN} /></td>`
             /*       $(`#${item.STTTUAN}`).prop('checked', item.TINHTRANG);*/
                      /*  + `<td><button class="btn btn-success" onclick="DELETE(${item.GIATRI},${item.Nam})" >delete</button></td>`*/
                        + '</tr>'
                    $('#tblWeek tbody').append(rows);
                });

            
            },
            error: function () {
                alert("Error");
            }
        });
 
    })


})

const workConstroller = {

    loadMonth: () => {
        $.ajax({
            url: "../Work/LoadMonth1",
            type: 'GET',
            dataType: 'JSON',
            contentType: 'application/json;charset-utf-8',
            success: (ref) => {
                console.log(ref.dataList);
                if (ref.status) {
                    var options = '<option value = "-1"> Please select month </option>';
                    $.each(ref.dataList, (index, item) => {
                        options += `<option value = "${item.GIATRI}"> ${item.THANG}/ ${item.NAM} </option>`;
                    });
                    $(`${"#selectOptionsCategory"}`).html(options);
                }
            },
            error: (err) => {
                console.log(err);
            }
        })

    },
    loadMonthModal: () => {
        $.ajax({
            url: "../Work/LoadMonth",
            type: 'GET',
            dataType: 'JSON',
            contentType: 'application/json;charset-utf-8',
            success: (ref) => {
                console.log(ref.dataList);
                if (ref.status) {
                    var options;
                    var today = new Date();
                    
                    $.each(ref.dataList, (index, item) => {
                        
                        options += `<option value = "${item.Value}"> ${item.Value} </option>`;
                    });
                    var t = 'Tháng';
                    $(`${"#MonthModal"}`).html(options);
                    $(`${"#NameMonth"}`).val(t + ' ' + (today.getMonth() + 1));

                
                }
            },
            error: (err) => {
                console.log(err);
            }
        })

    },
    LoadTableWork: () => {
        $('#tblWeek tbody').empty();
        $.ajax({
            url: "../Work/LoadAll",
            type: 'GET',
            dataType: 'JSON',
            contentType: 'application/json;charset-utf-8',
            success: (ref) => {
                console.log(ref.dataList);
                if (ref.status) {
                    $.each(ref.dataList, (i, item) => {


                        var rows = '<tr>'


                            + `<td><input type="checkbox" name ="cbox" id=${item.GIATRI} value=${item.Nam} class=${item.STTTUAN} /></td>`

                            + `<td>${item.GIATRI}</td>`
                            + `<td>${item.THANG}</td>`
                            + `<td>${item.NGAYBATDAU}</td>`
                            + `<td>${item.NGAYKETTHUC}</td>`

                            + `<td></td>`
                            + `<td></td>`
                            + `<td></td>`
                            + `<td></td>`
                            + `<td></td>`
                            + `<td></td>`
                            + `td><a href="#"><i class="fas fa-edit"></i></a></td>`
                            + '</tr>'
                            + `<tr>`
                            + `<td></td>`
                            + `<td></td>`
                            + `<td></td>`
                            + `<td></td>`
                            + `<td></td>`

                            + `<td>${item.TENTUAN}</td>`
                            + `<td>${item.STTTUAN}</td>`
                            + `<td>${item.TUNGAY}</td>`
                            + `<td>${item.DENNGAY}</td>`
                            + `<td>${item.SOGIOLAM}</td>`


                            + `<td><input type="checkbox" checked=false id=${item.STTTUAN} /></td>`
                         /*   + `<td><button class="btn btn-success" onclick="DELETE(${item.GIATRI},${item.Nam})" >delete</button></td>`*/
                            + '</tr>'
                        $('#tblWeek tbody').append(rows);
                    });
                }


            },
            error: (err) => {
                console.log(err);
            }
        })
    },

    
    LoadYear: () => {
        $.ajax({
            url: "../Work/LoadYear",
            type: 'GET',
            dataType: 'JSON',
            contentType: 'application/json;charset-utf-8',
            success: (ref) => {
                console.log(ref.dataList);
                if (ref.status) {
                    $.each(ref.dataList, (i, item) => {

                        var options;
                        $.each(ref.dataList, (index, item) => {
                            console.log(item.Value)
                            options += `<option value = "${item.Value}"> ${item.Value} </option>`;
                        });
                        $(`${"#YEAR"}`).html(options);
                 
                    });
                }


            },
            error: (err) => {
                console.log(err);
            }
        })
    }
}

const ShowMoldalDialogAddWorkWeek = () => {
    
    $('#AddWorkWeek').modal();
 
    workConstroller.LoadYear();
    workConstroller.loadMonthModal();


    $('#MonthModal').change(function () {
        var SelectedValueMonth = $('#MonthModal').val();
        var SelectedValueYear = $('#YEAR').val();
        var JSONObject = { "thang": SelectedValueMonth, "nam": SelectedValueYear};
        var jsonData = JSON.stringify(JSONObject);
        $('#tblModal tbody').empty();
        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            url: '../Work/LoadModalWeek',
            data: jsonData,
            dataType: 'JSON',
            success: function (ref) {
                console.log(ref.dataList);
                $.each(ref.dataList, (i, item) => {


                    var rows = '<tr>'


                      

                        + `<td>${item.TENTUAN}</td>`
                        + `<td>${item.STTTUAN}</td>`
                        + `<td>${item.TUNGAY}</td>`
                        + `<td>${item.DENNGAY}</td>`

                        + `<td>${item.SOGIOLAM}</td>`
                      
                        + `<td><input type="checkbox" checked=${item.TINHTRANG} /></td>`
                        + '</tr>'
                        

                    $('#tblModal tbody').append(rows);
                });


            },
            error: function () {
                alert("Error");
            }
        });

    })
}


const Insert= () => {
    const months = {};
    months.giatri = $('#MonthModal').val()
    months.nam = $('#YEAR').val();
    months.thang = $('#NameMonth').val();
    months.ngaybatdau = $('#FirstDay').val();
    months.ngayketthuc = $('#LastDay').val();
    
    $.ajax({
        url: '../Work/InsertMonth',
        type: 'POST',
        dataType: 'JSON',
        data: months,
        success: (res) => {
            console.log(res.status);
            if (res.status) {
                $(`${"#selectOptionsCategory"}`).empty();
                workConstroller.loadMonth();
                alert('Add sucessful !');
            }
                else {

                alert('Add Failed !');
                }
        },
        error: (err) => {
         
            console.log(err)
        }

    });
}
const Update = () => {
    const months = {};
    months.giatri = $('#MonthModal').val()
    months.nam = $('#YEAR').val();
    months.thang = $('#NameMonth').val();
    months.ngaybatdau = $('#FirstDay').val();
    months.ngayketthuc = $('#LastDay').val();
    workConstroller.loadMonth();
    $.ajax({
        url: '../Work/UpdateMonth',
        type: 'POST',
        dataType: 'JSON',
        data: months,
        success: (res) => {
            console.log(res.status);
            if (res.status) {
                alert('Update sucessful !');
            }
            else {

                alert('Update Failed !');
            }
        },
        error: (err) => {
            alert('Update Failed !');
            console.log(err)
        }

    });
}
const DELETE = () => {
    var checkbox = document.getElementsByName('cbox');


    for (var i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked === true) {

            giatri = checkbox[i].id;
            nam = checkbox[i].value;
           
            const months = { giatri, nam };
            console.log(months);
            $.ajax({
                url: '../Work/DeleteMonth',
                type: 'POST',
                dataType: 'JSON',
                data: months,
                success: (res) => {
                    if (res.status) {

                        alert('Delete sucessful !');
                        workConstroller.LoadTableWork();
                    }
                },
                error: (err) => {
                    alert('Delete Failed !');
                    console.log(err)
                }

            });
        }
    }
}
        
    const LockPlan = () => {
        var checkbox = document.getElementsByName('cbox');

        var cbkTinhTrang = document.getElementsByClassName('cbPlan');

       
        for (var i = 0; i < checkbox.length; i++) {
            if (checkbox[i].checked === true) {

                giatri = checkbox[i].id;
                nam = checkbox[i].value
                stt = checkbox[i].className;
              
                const months = { giatri, nam, stt };
               
                console.log(months);
                $.ajax({
                    url: '../Work/LockPlan',
                    type: 'POST',
                    dataType: 'JSON',
                    data: months,
                    success: (res) => {
                        if (res.status) {

                            alert('Lock sucessful !');
                            workConstroller.LoadTableWork();
                        }
                    },
                    error: (err) => {
                        alert('Lock Failed !');
                        console.log(err)
                    }

                });
            }
        }
    
}