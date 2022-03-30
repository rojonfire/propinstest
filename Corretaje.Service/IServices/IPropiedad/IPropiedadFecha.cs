using Corretaje.Domain;
using System;

namespace Corretaje.Service.IServices.IPropiedad
{
    public interface IPropiedadFecha
    {
        bool DebeEstablecerExpiracion(Propiedad propiedad);

        bool EstaPorExpirar(Propiedad propiedad);

        DateTime GetNotificacionExpiracion();

        void SetExpiracion(Propiedad propiedad);
    }
}
