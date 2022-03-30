using Corretaje.Domain;
using System;
using System.Globalization;

namespace Corretaje.Api.Dto.PdfContrato
{
    public class ContratoDeArrendamientoDto
    {
        public ArrendadorDto Arrendador { get; set; }

        public ArrendatarioDto Arrendatario { get; set; }

        public CodeudorSolidarioDto CodeudorSolidario { get; set; }

        public CuentaCorrienteDto CuentaCorriente { get; set; }

        public DateTime FechaEmisionContrato { get; set; }

        public decimal MontoGarantiaDeArriendo { get; set; }

        public decimal RentaMontoUf { get; set; }

        public PlazosDto Plazos { get; set; }

        public PropiedadDto Propiedad { get; set; }

        public Estados.Contrato Estado { get; set; }

        public string GetFechaContratoDeArriendo()
        {
            return $"{FechaEmisionContrato.Day} de {FechaEmisionContrato.ToString("MMMM", new CultureInfo("es-ES"))} de {FechaEmisionContrato.Year}";
        }
    }
}
