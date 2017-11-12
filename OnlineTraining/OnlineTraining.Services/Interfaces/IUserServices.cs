namespace OnlineTraining.Services.Interfaces
{
    public interface IUserServices
    {
        bool Authentication(string username, string password);
        string GetUserIdByName(string username);
    }
}