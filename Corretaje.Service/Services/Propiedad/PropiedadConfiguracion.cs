using Corretaje.Service.IServices.IPropiedad;

namespace Corretaje.Service.Services.Propiedad
{
    public class PropiedadConfiguracion : IPropiedadConfiguracion
    {
        public int DiasAntelacionExpiracion { get; set; }

        public int MesesVigencia { get; set; }

        public string AlmacenamientoConeccion { get; set; }

        public string AdministradorEmail { get; set; }

        public string EmailEmisor { get; set; }

        public string EmailNotificarPropiedadesPorExpirarAsunto { get; set; }

        public string PaginaPropiedad { get; set; }

        public string EmailAsuntoPlanFastContratado { get; set; }

        public string EmailAsuntoPropiedadSubidaPorBroker { get; set; }
    }
}
