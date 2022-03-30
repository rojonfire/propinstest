using Corretaje.Api.Dto.Plan;
using Corretaje.Api.Dto.Propiedad;
using Corretaje.Domain;
using System;
using System.Collections.Generic;

namespace Corretaje.Api.Dto.OrdenCompra
{
    public class OrdenDeCompraDto
    {
        public DateTime FechaEmision { get; set; }

        public decimal PlanPrecioBaseEnUf { get; set; }

        public decimal TotalEnPesoChileno { get; set; }

        public decimal TotalEnPesoChilenoConIVA { get; set; }

        public decimal TotalEnUf { get; set; }

        public DireccionDto Direccion { get; set; }

        public Estados.TipoProyecto TipoPropiedad { get; set; }

        public ICollection<ServicioAdicionalDto> ServiciosAdicionales { get; set; }

        public PlanDto Plan { get; set; }

        public string CodigoCVC { get; set; }

        public Estados.Transaccion Estado { get; set; }

        public string Id { get; set; }

        public string NombreTitularTarjeta { get; set; }

        public string NumeroTarjeta { get; set; }

        public string UsuarioId { get; set; }

        public string TipoDePlan { get; set; }

        public string ImagenUrl { get; set; }
    }
}
