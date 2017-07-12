using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using rowinpt.api.Models;
using rowinpt.api.ViewModels;

namespace rowinpt.api
{
    [Route("api/timetables")]
    public class TimetableController
    {
        private readonly RowinContext dbContext;

        public TimetableController(RowinContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IEnumerable<TimetableViewModel>> Get()
        {
            var timetables = await dbContext.Timetables.Where(t => t.Active).ToListAsync();
            var results = timetables.Select(TimetableViewModel.Map);
            return results;
        }
    }
}
