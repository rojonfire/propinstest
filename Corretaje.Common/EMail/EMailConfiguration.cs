
namespace Corretaje.Common.EMail
{
    public class EMailConfiguration : IEMailConfiguration
    {
        public int PopPort { get; set; }

        public int SmtpPort { get; set; }

        public string Bcc { get; set; }

        public string PopPassword { get; set; }

        public string PopServer { get; set; }

        public string PopUsername { get; set; }

        public string SmtpPassword { get; set; }

        public string SmtpServer { get; set; }

        public string SmtpUsername { get; set; }
    }
}
