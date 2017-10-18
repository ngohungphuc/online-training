using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineTraining.Entities.Auth
{
    public class ResponseData
    {
        public string Code { get; set; }
        public string Message { get; set; }
        public object Data { get; set; }
    }
}
