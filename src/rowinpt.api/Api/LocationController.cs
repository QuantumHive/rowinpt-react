using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using rowinpt.api.Models;
using rowinpt.api.ViewModels;

namespace rowinpt.api
{
    [Route("api/locations")]
    public class LocationController
    {
        private readonly RowinContext dbContext;

        public LocationController(RowinContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IEnumerable<LocationViewModel>> Get()
        {
            var locations = await dbContext.Locations.ToListAsync();
            return locations.Select(LocationViewModel.Map);
        }
    }
}
