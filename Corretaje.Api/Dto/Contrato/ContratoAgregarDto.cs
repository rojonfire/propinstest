using System;

namespace Corretaje.Api.Dto.Contrato
{
    public class ContratoAgregarDto
    {
        public DateTime FechaInicio { get; set; }
        public DateTime FechaTermino { get; set; }
        public decimal MontoGarantiaArriendo { get; set; }
        public decimal MontoUf { get; set; }
        public string IdCliente { get; set; }
        public string IdOferta { get; set; }
        public string IdPropiedad { get; set; }
        public string IdTipoContrato { get; set; }
        public string IdUsuario { get; set; }
        public string MesesPeriodoDeRenovacion { get; set; }
    }
}
