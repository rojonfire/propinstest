using Corretaje.Domain;
using System.Collections.Generic;

namespace Corretaje.Service.IServices.IOrdenCompra
{
    public interface IOrdenCompraSendEmail
    {
        void SendEmail(OrdenDeCompra ordenCompra, string html, IEnumerable<string> attachmentsPath);
    }
}
