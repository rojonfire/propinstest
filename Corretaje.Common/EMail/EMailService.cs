using MailKit.Net.Smtp;
using MimeKit;
using System.Linq;

namespace Corretaje.Common.EMail
{
    public class EMailService : IEMailService
    {
        private const bool Ssl = false;
        private const string Xoauth2 = "XOAUTH2";
        private readonly IEMailConfiguration _eMailConfiguration;

        public EMailService(IEMailConfiguration eMailConfiguration)
        {
            this._eMailConfiguration = eMailConfiguration;
        }

        public void Send(EMail eMail)
        {
            var bcc = new MailboxAddress(_eMailConfiguration.Bcc);
            var fromAddress = new MailboxAddress(eMail.FromAddress);
            var toAddresses = eMail.ToAddresses.Select(address => new MailboxAddress(address));
            var message = new MimeMessage();

            message.Bcc.Add(bcc);
            message.From.Add(fromAddress);
            message.To.AddRange(toAddresses);
            message.Subject = eMail.Subject;

            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = eMail.Content
            };

            foreach (var attachmentPath in eMail.AttachmentsPath)
            {
                bodyBuilder.Attachments.Add(attachmentPath);
            }

            foreach (var attachmentByte in eMail.AttachmentsByte )
            {
                bodyBuilder.Attachments.Add(attachmentByte.FileName, attachmentByte.Data);
            }

            message.Body = bodyBuilder.ToMessageBody();


            using (var eMailClient = new SmtpClient())
            {
                eMailClient.AuthenticationMechanisms.Remove(Xoauth2);

                try
                {
                    eMailClient.Connect(_eMailConfiguration.SmtpServer, _eMailConfiguration.SmtpPort, Ssl);
                    eMailClient.Authenticate(_eMailConfiguration.SmtpUsername, _eMailConfiguration.SmtpPassword);
                    eMailClient.Send(message);
                }
                catch (System.Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    eMailClient.Disconnect(true);
                }
            }
        }
    }
}
