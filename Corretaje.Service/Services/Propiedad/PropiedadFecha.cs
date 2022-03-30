using Corretaje.Service.IServices.IPropiedad;
using System;

namespace Corretaje.Service.Services.Propiedad
{
    public class PropiedadFecha : IPropiedadFecha
    {
        private readonly IPropiedadConfiguracion _propiedadConfiguracion;

        public PropiedadFecha(IPropiedadConfiguracion propiedadConfiguracion)
        {
            _propiedadConfiguracion = propiedadConfiguracion;
        }

        public bool DebeEstablecerExpiracion(Domain.Propiedad propiedad)
        {
            return propiedad.FechaTermino == DateTime.MinValue;
        }

        public bool EstaPorExpirar(Domain.Propiedad propiedad)
        {
            return propiedad.FechaTermino.Date <= GetNotificacionExpiracion().Date;
        }

        public DateTime GetNotificacionExpiracion()
        {
            return DateTime.Now.AddDays(_propiedadConfiguracion.DiasAntelacionExpiracion);
        }

        public void SetExpiracion(Domain.Propiedad propiedad)
        {
            propiedad.FechaTermino = GetExpiracion();
        }

        private DateTime GetExpiracion()
        {
            return DateTime.Now.AddMonths(_propiedadConfiguracion.MesesVigencia);
        }
    }
}
