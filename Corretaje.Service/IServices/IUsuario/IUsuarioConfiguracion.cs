namespace Corretaje.Service.IServices.IUsuario
{
    public interface IUsuarioConfiguracion
    {
        string FromAddress { get; }
        string EmailAsuntoUsuarioRegistrado { get; }
        string EmailAsuntoNotificacionContraseñaCambiada { get; }
        string EmailAsuntoVendedorReferido { get; }
        string UrlBaseRegistro { get; }
        string EmailAsuntoHasSidoReferido { get; }
        string EmailAsuntoEmbajadorReferido { get; }
    }
}
