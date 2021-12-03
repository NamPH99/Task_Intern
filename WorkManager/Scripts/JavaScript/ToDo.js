
$(document).ready(() => {

    loadToDo();
    loadNhanVien();
})

const loadToDo = () => {


    $.ajax({
        url: "../ToDoList/LoadAll",
        type: 'GET',
        dataType: 'JSON',
        contentType: 'application/json;charset-utf-8',
        success: (ref) => {
            console.log(ref.status);
            if (ref.status) {
                console.log(ref.dataList);
             
                $.each(ref.dataList, (i, item) => {


                    var rows = '<tr>'


                        + `<td><input type="checkbox" name ="cbox" id=${item.MATDL}></td>`

                        + `<td>${item.MATDL}</td>`
                        + `<td>${item.NOIDUNG}</td>`
                        + `<td>${item.HOTEN}</td>`
                        + `<td style="text-align:center" ><p style="border-radius:30px;background-color:	#FFE5B4;color:red;text-align:center;height:35px;width:40pxfloat:left">${item.THOIHAN}</p></td>`
                        + `<td>${item.denhan}</td>`

                  
                        + `<td>${item.ngaygiao}</td>`
                  
                        + `<td>${item.GHICHU}</td>`
                        + `<td><input type="checkbox" checked=${item.TRANGTHAI}/></td>`
             


                       
                        /*   + `<td><button class="btn btn-success" onclick="DELETE(${item.GIATRI},${item.Nam})" >delete</button></td>`*/
                        + '</tr>'
                    $('#tblToDo tbody').append(rows);
                });


            }
        },
        error: (err) => {
            console.log(err);
        }
    })

}

const loadNhanVien = () => {


    $.ajax({
        url: "../ToDoList/GetNhanVien",
        type: 'GET',
        dataType: 'JSON',
        contentType: 'application/json;charset-utf-8',
        success: (ref) => {
            console.log(ref.status);
            if (ref.status) {
                console.log(ref.dataList);

                $.each(ref.dataList, (i, item) => {
                    var options;
                    $.each(ref.dataList, (index, item) => {
                        console.log(item.Value)
                        options += `<option value = "${item.MANV}"> ${item.HOTEN} </option>`;
                    });
                    $(`${"#SelectNhanVien"}`).html(options);
                    $(`${"#SelectNhanVien1"}`).html(options);
                });


            }
        },
        error: (err) => {
            console.log(err);
        }
    })

}

const searchToDo = () => {     
    var noidung = $('#NoiDung').val();

    var manv = $('#SelectNhanVien :selected').val();
    var ngaytre = $('#ngaytre').val();
    var tungay = $('#tungay').val();
    var denngay = $('#denngay').val();
    var trangthai = $("input[type='radio'][name='optradio']:checked").val();

    const todo = { "noidung": noidung, "manv": manv, "ngaytre": ngaytre, "tungay": tungay, "denngay": denngay, "trangthai": trangthai };
    var jsondata = JSON.stringify(todo);
    $('#tblToDo tbody').empty();
    console.log("aa", jsondata);
    $.ajax({
        url: "../ToDoList/SearchToDo",
        type: 'POST',
        dataType: 'JSON',
        data: jsondata,
        contentType: 'application/json;charset-utf-8',
        success: (ref) => {
            console.log(ref.status);
            if (ref.status) {
                console.log(ref.dataList);
                $.each(ref.dataList, (i, item) => {


                    var rows = '<tr>'


                        + `<td><input type="checkbox" name ="cbox" id=${item.MATDL} ></td>`

                        + `<td>${item.MATDL}</td>`
                        + `<td>${item.NOIDUNG}</td>`
                        + `<td>${item.HOTEN}</td>`
                        + `<td style="text-align:center" ><p style="border-radius:30px;background-color:	#FFE5B4;color:red;text-align:center;height:35px;width:40pxfloat:left">${item.THOIHAN}</p></td>`
                        + `<td>${item.denhan}</td>`


                        + `<td>${item.ngaygiao}</td>`

                        + `<td>${item.GHICHU}</td>`
                        + `<td><input type="checkbox" checked=${item.TRANGTHAI}/></td>`




                        /*   + `<td><button class="btn btn-success" onclick="DELETE(${item.GIATRI},${item.Nam})" >delete</button></td>`*/
                        + '</tr>'
                    $('#tblToDo tbody').append(rows);
                });


            }
        },
        error: (err) => {
            console.log(err);
        }
    })

}
const insertToDo = () => {
    var noidung = $('#Noidung1').val();

    var manv = $('#SelectNhanVien1 :selected').val();

    var tungay = $('#firstday1').val();
    var denngay = $('#LastDay1').val();
    var trangthai = $("input[type='radio'][name='optradio1']:checked").val();
    var ghichu = $('#ghichu1').val();
    const todo = { "noidung": noidung, "manv": manv, "tungay": tungay, "denngay": denngay, "ghichu":ghichu,"trangthai": trangthai };
    var jsondata = JSON.stringify(todo);
    
    console.log("aa", jsondata);
    $.ajax({
        url: "../ToDoList/InsertTodo",
        type: 'POST',
        dataType: 'JSON',
        data: jsondata,
        contentType: 'application/json;charset-utf-8',
        success: (ref) => {
            console.log(ref.status);
            alert('insert sucessful');
               
        },
        error: (err) => {
            console.log(err);
        }
    })

}


const DELETE = () => {
    var checkbox = document.getElementsByName('cbox');


    for (var i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked === true) {

            MATDL = checkbox[i].id;
            const tdl = { MATDL };
            console.log(tdl);
            $.ajax({
                url: '../ToDoList/Deletetodo',
                type: 'POST',
                dataType: 'JSON',
                data: tdl,
                success: (res) => {
                    if (res.status) {

                        alert('Delete sucessful !');
                        $('#tblToDo tbody').empty();
                        loadToDo();
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

const Update = () => {
    var checkbox = document.getElementsByName('cbox');
    var noidung = $('#Noidung1').val();

    var manv = $('#SelectNhanVien1 :selected').val();

    var tungay = $('#firstday1').val();
    var denngay = $('#LastDay1').val();
    var trangthai = $("input[type='radio'][name='optradio1']:checked").val();
    var ghichu = $('#ghichu1').val();
    
    for (var i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked === true) {
            MATDL = checkbox[i].id;
            const todo = { "matdl": MATDL, "noidung": noidung, "manv": manv, "tungay": tungay, "denngay": denngay, "ghichu": ghichu, "trangthai": trangthai };
            var jsondata = JSON.stringify(todo);
            console.log(jsondata);
            $.ajax({
                url: '../ToDoList/UpdateTodo',
                type: 'POST',
                dataType: 'JSON',
                data: todo,
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
    }
}



const ShowMoldalDialogAddToDo = () => {

    $('#AddWorkToDo').modal();
}