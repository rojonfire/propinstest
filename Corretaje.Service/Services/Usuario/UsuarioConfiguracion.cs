using Corretaje.Service.IServices.IUsuario;

namespace Corretaje.Service.Services.Usuario
{
    public class UsuarioConfiguracion : IUsuarioConfiguracion
    {
        public string FromAddress { get; set; }
        public string EmailAsuntoUsuarioRegistrado { get; set; }
        public string EmailAsuntoNotificacionContraseñaCambiada { get; set; }
        public string EmailAsuntoVendedorReferido { get; set; }
        public string UrlBaseRegistro { get; set; }
        public string EmailAsuntoHasSidoReferido { get; set; }
        public string EmailAsuntoEmbajadorReferido { get; set; }
    }
}
