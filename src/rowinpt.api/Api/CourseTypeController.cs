using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using rowinpt.api.Models;
using rowinpt.api.ViewModels;

namespace rowinpt.api
{
    [Route("api/coursetypes")]
    public class CourseTypeController
    {
        private readonly RowinContext dbContext;

        public CourseTypeController(RowinContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IEnumerable<CourseTypeViewModel>> Get()
        {
            var courseTypes = await dbContext.CourseTypes.ToListAsync();
            return courseTypes.Select(CourseTypeViewModel.Map);
        }
    }
}
