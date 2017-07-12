using rowinpt.api.Models;

namespace rowinpt.api.ViewModels
{
    public class LocationViewModel
    {
        public int Id { get; set; }
        public string Location { get; set; }
        public string Address { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }

        public static LocationViewModel Map(Location location)
        {
            return new LocationViewModel
            {
                Id = location.Id,
                Location = location.Name,
                Address = location.Address,
                PostalCode = location.PostalCode,
                City = location.City,
            };
        }
    }
}
