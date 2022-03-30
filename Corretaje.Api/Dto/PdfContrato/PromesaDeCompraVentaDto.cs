using Corretaje.Domain;
using System;
using System.Globalization;

namespace Corretaje.Api.Dto.PdfContrato
{
    public class PromesaDeCompraVentaDto
    {
        public DateTime FechaEmisionContrato { get; set; }
        public ProminenteVendedoraDto ProminenteVendedora { get; set; }
        public ProminenteCompradoraDto ProminenteCompradora { get; set; }
        public PropiedadDto Propiedad { get; set; }
        public decimal Uf { get; set; } // esto se obtiene desde el contrato
        public decimal MontoMulta { get; set; } // esto se obtiene desde el contrato
        public decimal MontoCheques { get; set; } // esto se obtiene desde el contrato
        public Estados.Contrato Estado { get; set; }

        public string GetFechaContratoDeArriendo()
        {
            return $"{FechaEmisionContrato.Day} de {FechaEmisionContrato.ToString("MMMM", new CultureInfo("es-ES"))} de {FechaEmisionContrato.Year}";
        }
    }
}
