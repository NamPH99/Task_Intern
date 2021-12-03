using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WorkManager.Controllers
{
    public class WorkManageController : Controller
    {
        // GET: WorkManage
        public ActionResult Index(String MAMH)
        {
            return View();
        }
     
    }
}