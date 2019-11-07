using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace app
{
    public class HomeController : Controller
    {
         private readonly AppSettings settings;

         public HomeController(IOptions<AppSettings> settings) {
             this.settings = settings.Value;
         }

         // GET: /<controller>/
         public IActionResult Index()
         {
              return View(settings);
         }
    }
}
