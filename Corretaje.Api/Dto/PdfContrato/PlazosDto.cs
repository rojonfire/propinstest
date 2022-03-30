using System;
using System.Globalization;

namespace Corretaje.Api.Dto.PdfContrato
{
    public class PlazosDto
    {
        // obtener esto desde contrato
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public int MesesPeriodoDeRenovacion { get; set; }

        public string GetFechaDeInicio()
        {
            return GetFecha(FechaInicio);
        }

        public string GetFechaDeFin()
        {
            return GetFecha(FechaFin);
        }

        private string GetFecha(DateTime fecha)
        {
            return $"{fecha.Day} de {fecha.ToString("MMMM", new CultureInfo("es-ES"))} de {fecha.Year}";
        }
    }
}
