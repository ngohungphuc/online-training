using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.SignalR;

namespace OnlineTraining.API.Hubs
{
    public class OnlineHub: Hub
    {
        public Task Send(string message)
        {
            return Clients.All.InvokeAsync("testSend", message);
        }
    }
}
