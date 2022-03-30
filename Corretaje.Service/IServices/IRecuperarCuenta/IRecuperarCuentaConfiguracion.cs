namespace Corretaje.Service.IServices.IRecuperarCuenta
{
    public interface IRecuperarCuentaConfiguracion
    {
        int VigenciaMinutos { get; }

        string EmailAsunto { get; }

        string EmailEmisor { get; }

        string Url { get; }
    }
}
