using System.Collections.Generic;

namespace OnlineTraining.API.Hubs
{
    public static class ConnectionList
    {
        private static readonly HashSet<string> connectedIds = new HashSet<string>();

        public static HashSet<string> ConnectedIds
        {
            get => connectedIds;
            set => ConnectedIds = value;
        }
    }
}