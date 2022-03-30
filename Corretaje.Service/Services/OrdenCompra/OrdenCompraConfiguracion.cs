using Corretaje.Service.IServices.IOrdenCompra;

namespace Corretaje.Service.Services.OrdenCompra
{
    public class OrdenCompraConfiguracion : IOrdenCompraConfiguracion
    {
        public string EMailAdmin { get; set; }

        public string EMailSubject { get; set; }

        public string FromAddress { get; set; }
    }
}
