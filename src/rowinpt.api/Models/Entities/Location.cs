using System.Collections.Generic;

namespace rowinpt.api.Models
{
    public class Location
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }

        public List<Timetable> Timetables { get; set; }
    }
}
