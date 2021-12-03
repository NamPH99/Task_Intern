using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WorkManager.Models;
namespace WorkManager.Controllers
{
    public class WorkController : Controller
    {
        
        public ActionResult Work(string MAMH)
        {
            using (var db = new DBWM2Entities1())
            {
                string a = Session["TDN"].ToString();
                var q = db.NHANVIENs.Where(t => t.TENDN == a).FirstOrDefault<NHANVIEN>();
                Session["TenND"] = q.HOTEN;
                Session["MANV"] = q.MANV;

                var m = db.QL_NGUOIDUNGNHOMNGUOIDUNG.FirstOrDefault(x => x.TENDN == a);
                Session["MaNhom"] = m.MANHOM;


                var w = db.THANGs.ToList();
                ViewData["dataW"] = w;
                Session["MAMH"] = MAMH;
                return View(w.AsEnumerable());
            }
          
        }

        public ActionResult SearchWeek(int month)
        {
            using (var db = new DBWM2Entities1())
            {
  
                   
                var w = db.THANGs.Where(t=>t.GIATRI==month).ToList();
                ViewData["dataW"] = w;
                return RedirectToAction("Work", "Work");
            }
        }
        public ActionResult WorkingWeek()
        {
            using (var db = new DBWM2Entities1())
            {
                string a = Session["TDN"].ToString();
                var q = db.NHANVIENs.Where(t => t.TENDN == a).FirstOrDefault<NHANVIEN>();

                Session["TenND"] = q.HOTEN;
            }
            return View();
        }
        public JsonResult LoadMonth()
        {
            using (var db = new DBWM2Entities1())
            {
                
                var q = db.getmonth3();
                return Json(new
                {
                    dataList = (from s in q select new { s.Value }).ToList(),
                    status = true
                },JsonRequestBehavior.AllowGet) ;
            }
        }
        public JsonResult LoadMonth1()
        {
            using (var db = new DBWM2Entities1())
            {

                var q = db.getmonth2();
                return Json(new
                {
                    dataList = (from s in q select new { s.GIATRI,s.NAM ,s.THANG}).ToList(),
                    status = true
                }, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult LoadAll()
        {
            using (var db = new DBWM2Entities1())
            {

                var q = db.getWorkWeek12().ToList();
                return Json(new
                {
                    dataList = (from s in q select new { s.GIATRI,s.Nam, s.THANG, NGAYBATDAU= DateTime.Parse(s.NGAYBATDAU.ToString()).ToString("dd-MM"), NGAYKETTHUC = DateTime.Parse(s.NGAYKETTHUC.ToString()).ToString("dd-MM"), s.TENTUAN,s.STTTUAN,TUNGAY= DateTime.Parse(s.TUNGAY.ToString()).ToString("dd-MM"), DENNGAY = DateTime.Parse(s.DENNGAY.ToString()).ToString("dd-MM"), s.SOGIOLAM,s.TINHTRANG }).ToList(),
                    status = true
                }, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult LoadByMonth(int month,string year)
        {
            using (var db = new DBWM2Entities1())
            {
                try
                {
                    int years = int.Parse(year);
                    var q = db.LOADBYMONTH1(month, years).ToList();
                    return Json(new
                    {
                        dataList = (from s in q select new { s.GIATRI, s.THANG, NGAYBATDAU = DateTime.Parse(s.NGAYBATDAU.ToString()).ToString("dd-MM"), NGAYKETTHUC = DateTime.Parse(s.NGAYKETTHUC.ToString()).ToString("dd-MM"), s.TENTUAN, s.STTTUAN, TUNGAY = DateTime.Parse(s.TUNGAY.ToString()).ToString("dd-MM"), DENNGAY = DateTime.Parse(s.DENNGAY.ToString()).ToString("dd-MM"), s.SOGIOLAM, s.TINHTRANG,s.Nam }).ToList(),
                        status = true
                    }, JsonRequestBehavior.AllowGet);
                }
                catch
                {
                    var q = db.LOADBYMONTHAll1().ToList();
                    return Json(new
                    {
                        dataList = (from s in q select new { s.GIATRI, s.THANG, NGAYBATDAU = DateTime.Parse(s.NGAYBATDAU.ToString()).ToString("dd-MM"), NGAYKETTHUC = DateTime.Parse(s.NGAYKETTHUC.ToString()).ToString("dd-MM"), s.TENTUAN, s.STTTUAN, TUNGAY = DateTime.Parse(s.TUNGAY.ToString()).ToString("dd-MM"), DENNGAY = DateTime.Parse(s.DENNGAY.ToString()).ToString("dd-MM"), s.SOGIOLAM, s.TINHTRANG,s.Nam }).ToList(),
                        status = true
                    }, JsonRequestBehavior.AllowGet);
                }
            }
        }
        public JsonResult LoadWeek(int giatri)
        {
            using (var db = new DBWM2Entities1())
            {

                var q = db.TUANs.Where(t => t.GIATRI == giatri).ToList();
                return Json(new
                {
                    dataList = (from s in q select new {  s.TENTUAN, s.STTTUAN, TUNGAY= DateTime.Parse(s.TUNGAY.ToString()).ToString("dd-MM"), DENNGAY = DateTime.Parse(s.DENNGAY.ToString()).ToString("dd-MM"), s.TINHTRANG }).ToList(),
                    status = true
                }, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult LoadYear()
        {
            using (var db = new DBWM2Entities1())
            {

                var q = db.loadnam();
                return Json(new
                {
                    dataList = (from s in q select new {s.Value}).ToList(),
                    status = true
                }, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult LoadModalWeek(int thang,int nam)
        {
            using (var db = new DBWM2Entities1())
            {

                var q = db.getModalWeek(thang,nam);
                return Json(new
                {
                    dataList = (from tuan  in q select new { tuan.TENTUAN, tuan.STTTUAN, TUNGAY= DateTime.Parse(tuan.TUNGAY.ToString()).ToString("dd-MM"), DENNGAY = DateTime.Parse(tuan.DENNGAY.ToString()).ToString("dd-MM"), tuan.SOGIOLAM, tuan.TINHTRANG }).ToList(),
                    status = true
                }, JsonRequestBehavior.AllowGet);
            }
        }


        public JsonResult InsertMonth(int giatri, int nam,string thang,string ngaybatdau,string ngayketthuc)
        {
            using (var db = new DBWM2Entities1())
            {
                try
                {
                    var q = db.INSERTMONTH(giatri, nam, thang, DateTime.Parse(ngaybatdau), DateTime.Parse(ngayketthuc));
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

        public JsonResult UpdateMonth(int giatri, int nam, string thang, string ngaybatdau, string ngayketthuc)
        {
            using (var db = new DBWM2Entities1())
            {
                try
                {
                    var q = db.UPDATEMONTH(giatri, nam, thang, DateTime.Parse(ngaybatdau), DateTime.Parse(ngayketthuc));
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
        public JsonResult DeleteMonth(int giatri, int nam)
        {
            using (var db = new DBWM2Entities1())
            {
                try
                {
                    var q = db.DELETEMONTH(giatri, nam);
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
        public JsonResult LockPlan(int giatri, int nam,int stt)
        {
            using (var db = new DBWM2Entities1())
            {
                try
                {
                    var q = db.LockPlan12(giatri, nam,stt);
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