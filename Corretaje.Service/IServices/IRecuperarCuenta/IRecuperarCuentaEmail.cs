namespace Corretaje.Service.IServices.IRecuperarCuenta
{
    public interface IRecuperarCuentaEmail
    {
        void SendEmail(string emailDestinatario, string recuperarCuentaLink);
    }
}
