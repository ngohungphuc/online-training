using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineTraining.Entities.Entities
{
    public class User: BaseEntity
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }
}
