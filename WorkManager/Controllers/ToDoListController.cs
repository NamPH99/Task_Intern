using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WorkManager.Models;

namespace WorkManager.Controllers
{
    public class ToDoListController : Controller
    {
        // GET: ToDoList
        public ActionResult ToDo(string MAMH)
        {
            Session["MADA"] = MAMH;
            return View();
        }
      

        public JsonResult LoadAll()
        {
            using (var db = new DBWM2Entities1())
            {

                string x = (string)Session["MAMH"];
                var q = db.GetAllToDo2(x);
                return Json(new
                {
                    dataList = (from s in q select new { s.MATDL, s.NOIDUNG,s.HOTEN ,s.THOIHAN,  denhan = DateTime.Parse(s.DENHAN.ToString()).ToString("dd-MM"), ngaygiao = DateTime.Parse(s.NGAYGIAO.ToString()).ToString("dd-MM"), DENNGAY = DateTime.Parse(s.NGAYGIAO.ToString()).ToString("dd-MM"), s.GHICHU, s.TRANGTHAI }).ToList(),
                    status = true
                }, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetNhanVien()
        {
            using (var db = new DBWM2Entities1())
            {

              
                var q = db.NHANVIENs.ToList();
                return Json(new
                {
                    dataList = (from s in q select new { s.MANV,s.HOTEN }).ToList(),
                    status = true
                }, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult SearchToDo(string noidung, string manv,string ngaytre, string tungay, string denngay, string trangthai)
        {
            using (var db = new DBWM2Entities1())
            {
                string x = Session["MADA"].ToString();

                var q = db.sortToDo2(noidung, int.Parse(manv), int.Parse(ngaytre), DateTime.Parse(tungay), DateTime.Parse(denngay), int.Parse(trangthai), x);
                return Json(new
                {
                    dataList = (from s in q select new { s.MATDL, s.NOIDUNG, s.HOTEN, s.THOIHAN, denhan = DateTime.Parse(s.DENHAN.ToString()).ToString("dd-MM"), ngaygiao = DateTime.Parse(s.NGAYGIAO.ToString()).ToString("dd-MM"), DENNGAY = DateTime.Parse(s.NGAYGIAO.ToString()).ToString("dd-MM"), s.GHICHU, s.TRANGTHAI }).ToList(),
                    status = true
                }, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult InsertTodo(string noidung, string manv, string tungay, string denngay,string ghichu, string trangthai)
        {
            using (var db = new DBWM2Entities1())
            {
                try
                {
                    string x = Session["MADA"].ToString();
                    var q = db.insertToDo4(noidung, int.Parse(manv), DateTime.Parse(tungay), DateTime.Parse(denngay),ghichu, int.Parse(trangthai), x);
                    return Json(new
                    {

                        status = true
                    }, JsonRequestBehavior.AllowGet);
                }
                catch
                {
                    return Json(new
                    {

                        status = false
                    }, JsonRequestBehavior.AllowGet);

                }

            }
        }
         public JsonResult UpdateTodo(string matdl,string noidung, string manv, string tungay, string denngay,string ghichu, string trangthai)
        {
            using (var db = new DBWM2Entities1())
            {
                try
                {
                   
                    var q = db.UPDATETODO2(int.Parse(matdl),noidung, int.Parse(manv), DateTime.Parse(tungay), DateTime.Parse(denngay),ghichu, int.Parse(trangthai));
                    return Json(new
                    {

                        status = true
                    }, JsonRequestBehavior.AllowGet);
                }
                catch
                {
                    return Json(new
                    {

                        status = false
                    }, JsonRequestBehavior.AllowGet);

                }

            }
        }
        public JsonResult Deletetodo(int matdl)
        {
            using (var db = new DBWM2Entities1())
            {
                try
                {
                    var q = db.deleteTDL(matdl);
                    return Json(new
                    {

                        status = true
                    }, JsonRequestBehavior.AllowGet);
                }
                catch
                {
                    return Json(new
                    {

                        status = false
                    }, JsonRequestBehavior.AllowGet);

                }

            }
        }
    }
}