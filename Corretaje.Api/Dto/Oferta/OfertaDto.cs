using Corretaje.Domain;
using System.Collections.Generic;

namespace Corretaje.Api.Dto.Oferta
{
    public class OfertaDto : OfertaBaseDto
    {
        public decimal MontoDeOferta { get; set; }

        public decimal MontoDePublicacion { get; set; }

        public decimal MontoMinimo { get; set; }

        public Estados.Oferta Estado { get; set; }

        public Estados.OfertaEmision EmitidoPor { get; set; }

        public int Evaluacion { get; set; }

        public List<MensajeOfertaDto> Mensajes { get; set; }

        public string Descripcion { get; set; }

        public string Id { get; set; }

        public string OfertadorNombre { get; set; }

        public string OfertadorRut { get; set; }

        public string PropiedadComuna { get; set; }

        public string PropiedadGlosa { get; set; }

        public string PropiedadOperacion { get; set; }
        public string UrlContraOferta { get; set; }

        public string UrlReOfertar { get; set; }

        public string FechaOferta { get; set; }
        public string FechaVencimiento { get; set; }
    }
}
