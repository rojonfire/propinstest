namespace Corretaje.Service.IServices.IJWT
{
    public interface IJWTService
    {
        string GenerateSDK(string key, string meetingNumber, string role, string secret, string timestamp);
        string GenerateAPI(string key, string meetingNumber, string role, string secret, string timestamp);
    }
}
