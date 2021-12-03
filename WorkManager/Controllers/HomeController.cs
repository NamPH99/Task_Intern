using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using WorkManager.Models;

namespace WorkManager.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Project()
        {
            return View();
        }

        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            Session.Clear();
            Session.RemoveAll();
            Session.Abandon();
            return RedirectToAction("Index", "Home");

        }             
        [HttpPost]
        public ActionResult Verify(FormCollection form, NGUOIDUNG nguoidung)
        {
            var id = form["idtk"];
            var pass = form["pass"];

            ViewBag.id = id;
            using (var db = new DBWM2Entities1())
            {
                var q = db.NGUOIDUNGs.Where(t => t.TENDN == id && t.MATKHAU == pass).FirstOrDefault<NGUOIDUNG>();
                
                if (q != null)
                {
                    FormsAuthentication.SetAuthCookie(q.TENDN, false);
                    Session["TDN"] = q.TENDN;
                    return RedirectToAction("getProjects", "Home");
                }
                else
                {
                    return View("Index");
                }
            }

        }


        public ActionResult getProjects( )
        {

            string taiKhoan = Session["TDN"].ToString();
            DBWM2Entities1 db = new DBWM2Entities1();                  
             return View(db.GETPROJECTS(taiKhoan));           
        }





    }
}