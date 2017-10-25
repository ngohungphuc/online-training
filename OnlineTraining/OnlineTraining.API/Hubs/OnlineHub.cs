using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace OnlineTraining.API.Hubs
{
    public class OnlineHub : Hub
    {
        public Task Send(string message)
        {
            return Clients.All.InvokeAsync("testSend", message);
        }

        public Task GetTotalAccountConnect()
        {
            return Clients.All.InvokeAsync("TotalClientConnect", ConnectionList.ConnectedIds.Count);
        }

        public override Task OnConnectedAsync()
        {
            ConnectionList.ConnectedIds.Add(Context.ConnectionId);
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            ConnectionList.ConnectedIds.Remove(Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }
    }
}