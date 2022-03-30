
namespace Corretaje.Common.EMail
{
    public interface IEMailConfiguration
    {
        int PopPort { get; }
        int SmtpPort { get; }
        string Bcc { get; set; }
        string PopPassword { get; }
        string PopServer { get; }
        string PopUsername { get; }
        string SmtpPassword { get; set; }
        string SmtpServer { get; }
        string SmtpUsername { get; set; }
    }
}
