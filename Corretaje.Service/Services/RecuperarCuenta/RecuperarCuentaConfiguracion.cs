using Corretaje.Service.IServices.IRecuperarCuenta;

namespace Corretaje.Service.Services.RecuperarCuenta
{
    public class RecuperarCuentaConfiguracion : IRecuperarCuentaConfiguracion
    {
        public int VigenciaMinutos { get; set; }

        public string EmailAsunto { get; set; }

        public string EmailEmisor { get; set; }

        public string Url { get; set; }
    }
}
