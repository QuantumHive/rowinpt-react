using Microsoft.AspNetCore.Mvc;

namespace rowinpt.api.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
