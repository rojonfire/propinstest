using System;
using System.Collections.Generic;
using System.Linq;
using Corretaje.Common.Extension;
using Corretaje.Domain;
using MongoDB.Driver.GeoJsonObjectModel;

namespace Corretaje.Api.Commons.Propiedad
{
    public class PropiedadHelper : IPropiedadHelper
    {
        public void AsignarCoordenadasGeoEspaciales(Domain.Propiedad propiedad)
        {
            propiedad.Location = new GeoJsonPoint<GeoJson2DGeographicCoordinates>(new GeoJson2DGeographicCoordinates(propiedad.Loc.x, propiedad.Loc.x));
        }

        public void SetDatosCliente(Cliente cliente, Domain.Propiedad propiedad)
        {
            propiedad.NombreCliente = $"{cliente?.Nombres} {cliente?.Apellidos}";

            propiedad.RutCliente = cliente?.Rut;
        }

        public void SetDatosOferta(IEnumerable<Domain.Oferta> ofertas, Domain.Propiedad propiedad, string clienteId)
        {
            propiedad.PuedeSerOfertada = propiedad.IdCliente != clienteId && (ofertas.IsNullOrEmpty() || ofertas.All(oferta => oferta.Estado == Estados.Oferta.Declinada));

            if (propiedad.PuedeSerOfertada)
            {
                return;
            }

            var ofertaVigente = ofertas.FirstOrDefault(oferta => oferta.Estado == Estados.Oferta.Null || oferta.Estado == Estados.Oferta.Rechazada);

            if (ofertaVigente?.CreatedAt != null) propiedad.FechaOferta = (DateTime)ofertaVigente?.CreatedAt;
        }
    }
}
