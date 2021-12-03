


$(document).ready(() => {

    taikhoan = $('#idtk').val();
    /*loadProject(taikhoan);*/

})

const loadProject = (taikhoan)=>{

     
    $.ajax({
        url: "../Home/GetProject/" + taikhoan,
        type: 'POST',
        dataType: 'JSON',
        data: JSON.stringify({ 'taikhoan': taikhoan }),
        contentType: 'application/json;charset-utf-8',
        success: (ref) => {
            console.log(ref.status);
            if (ref.status) {
                console.log(ref.dataList);
                var a = '<a></a>';
                $.each(ref.dataList, (i, item) => {

                              
                    loadS(item.MAMH);
                   
                });
                $('#project').html(a);
            }
        },
        error: (err)=>{
            console.log(err);
        }
    })

}

const loadS = (ma) => {
   
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: "../Home/GetScreen/" + ma,
        data: JSON.stringify({ "mamh": ma }),
        contentType: 'application/json;charset-utf-8',
        success: (sc) => {
            console.log(sc.status)
            console.log(sc.dataList);
        },
        error: (err) => {
            console.log(err);
        }
    })
}

//const verryfy = () => {

//    var tk = $('#idtk').val();
//    var mk = $('#pass').val();
//    $.ajax({
        
//        type: 'POST',
//        dataType: 'JSON',
//        url: "../Home/VerifyAjax",
//        data: JSON.stringify({ "tk": tk,"mk":mk }),
//        contentType: 'application/json;charset-utf-8',
//        success: (sc) => {
//            console.log(sc.status);
//            if (sc.status) {
//                console.log(sc.status);
//                window.location.href = "Home/Project";
//                loadProject(tk);
//            } else {
//                console.log(sc.status);
//                window.location.reload();
//            }
//        },
//        error: (err) => {
//            console.log(err);
//        }
//    })
    
//}