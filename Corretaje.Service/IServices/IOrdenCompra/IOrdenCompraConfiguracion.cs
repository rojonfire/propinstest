namespace Corretaje.Service.IServices.IOrdenCompra
{
    public interface IOrdenCompraConfiguracion
    {
        string EMailAdmin { get; }

        string EMailSubject { get; }

        string FromAddress { get; }
    }
}
