using System;
using System.Collections.Generic;

namespace rowinpt.api.ViewModels
{
    public class WorkViewModel
    {
        public string Location { get; set; }
        public string Start { get; set; }
        public string End { get; set; }
        public string Course { get; set; }
        public string Moderator { get; set; }
        public List<string> RegisteredUsers { get; set; }
        public string Date { get; set; }
    }
}
