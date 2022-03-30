using System.Collections.Generic;

namespace Corretaje.Common.EMail
{
    public class EMail
    {
        public EMail()
        {
            ToAddresses = new List<string>();
            AttachmentsPath = new List<string>();
            AttachmentsByte = new List<Archivo>();
        }

        public List<string> AttachmentsPath { get; set; }
        public List<Archivo> AttachmentsByte { get; set; }
        public List<string> ToAddresses { get; set; }
        public string Content { get; set; }
        public string FromAddress { get; set; }
        public string Subject { get; set; }
    }

    public class Archivo
    {
        public string FileName { get; set; }

        public byte[] Data { get; set; }
    }
}
