using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using rowinpt.api.Models;
using rowinpt.api.ViewModels;

namespace rowinpt.api
{
    [Route("api/courses")]
    public class CourseController
    {
        private readonly RowinContext dbContext;

        public CourseController(RowinContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IEnumerable<CourseViewModel>> Get()
        {
            var courses = await dbContext.Courses.ToListAsync();
            return courses.Select(CourseViewModel.Map);
        }
    }
}
