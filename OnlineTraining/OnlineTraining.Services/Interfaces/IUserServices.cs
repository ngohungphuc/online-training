namespace OnlineTraining.Services.Interfaces
{
    public interface IUserServices
    {
        bool Authentication(string username, string password);
    }
}