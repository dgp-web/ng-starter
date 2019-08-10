using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace app
{
    public class PlaygroundController : Controller
    {

         public PlaygroundController() {
         }

         // GET: /<controller>/
         public IActionResult Index()
         {
              return View();
         }
    }
}
