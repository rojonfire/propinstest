namespace Corretaje.Service.IServices.IPropiedad
{
    public interface IPropiedadConfiguracion
    {
        int DiasAntelacionExpiracion { get; }

        int MesesVigencia { get; }

        string AlmacenamientoConeccion { get; }

        string AdministradorEmail { get; }

        string EmailEmisor { get; set; }

        string EmailNotificarPropiedadesPorExpirarAsunto { get; }

        string PaginaPropiedad { get; }

        string EmailAsuntoPlanFastContratado { get; }

        string EmailAsuntoPropiedadSubidaPorBroker { get; }
    }
}
