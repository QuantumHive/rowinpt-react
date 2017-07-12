using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using rowinpt.api.Models;
using rowinpt.api.ViewModels;

namespace rowinpt.api
{
    [Route("api/subscriptions")]
    public class SubscriptionController
    {
        private readonly RowinContext dbContext;

        public SubscriptionController(RowinContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IEnumerable<SubscriptionViewModel>> Get()
        {
            var subscriptions = await dbContext.Subscriptions.ToListAsync();
            return subscriptions.Select(SubscriptionViewModel.Map);
        }
    }
}
