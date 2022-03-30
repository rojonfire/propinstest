using Corretaje.Domain;
using System.Collections.Generic;

namespace Corretaje.Api.Commons.Propiedad
{
    public interface IPropiedadHelper
    {
        void AsignarCoordenadasGeoEspaciales(Domain.Propiedad propiedad);

        void SetDatosCliente(Cliente cliente, Domain.Propiedad propiedad);

        void SetDatosOferta(IEnumerable<Domain.Oferta> ofertas, Domain.Propiedad propiedad, string clienteId);
    }
}
