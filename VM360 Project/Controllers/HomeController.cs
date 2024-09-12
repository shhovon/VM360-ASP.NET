using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using VM360_Project.Models;

namespace VM360_Project.Controllers
{
    public class HomeController : Controller
    {
        private readonly VM360Entities db = new VM360Entities();

        public ActionResult Index()
        {
            try
            {
                var clothingItems = db.ClothingItems.ToList();
                return View(clothingItems);
            }
            catch (Exception ex)
            {
                return new HttpStatusCodeResult(HttpStatusCode.InternalServerError);
            }
        }

        [HttpPost]
        public ActionResult UploadClothing(ClothingItem model, HttpPostedFileBase file)
        {
            if (ModelState.IsValid && file != null && file.ContentLength > 0)
            {
                var fileName = Path.GetFileName(file.FileName);
                var path = Path.Combine(Server.MapPath("~/Content/Images/"), fileName);
                file.SaveAs(path);

                model.ImagePath = "/Content/Images/" + fileName;

                db.ClothingItems.Add(model);
                db.SaveChanges();

                return Json(new { success = true, imagePath = model.ImagePath, type = model.Type });
            }

            return Json(new { success = false, message = "Upload failed" });
        }
    }
}