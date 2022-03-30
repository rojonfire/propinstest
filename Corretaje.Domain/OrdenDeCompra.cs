using Corretaje.Repository;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace Corretaje.Domain
{
    public class OrdenDeCompra : Entity
    {
        [BsonElement("FechaEmision")]
        public DateTime FechaEmision { get; set; }

        [BsonElement("PlanPrecioBaseUf")]
        public decimal PlanPrecioBaseEnUf { get; set; }

        [BsonElement("TotalEnPesoChileno")]
        public decimal TotalEnPesoChileno { get; set; }

        [BsonElement("TotalEnPesoChilenoConIVA")]
        public decimal TotalEnPesoChilenoConIva { get; set; }

        [BsonElement("TotalUf")]
        public decimal TotalEnUf { get; set; }

        [BsonElement("Direccion")]
        public Direccion Direccion { get; set; }

        [BsonElement("TipoPropiedad")]
        public Estados.TipoProyecto TipoPropiedad { get; set; }

        [BsonElement("Estado")]
        public Estados.Transaccion Estado { get; set; }

        [BsonElement("ServiciosAdicionales")]
        public List<ServicioAdicional> ServiciosAdicionales { get; set; }

        [BsonElement("CodigoComercio")]
        public string CodigoComercio { get; set; }

        [BsonElement("CodigoCVC")]
        public string CodigoCvc { get; set; }

        [BsonElement("CodigoVerificacion")]
        public string CodigoVerificacion { get; set; }

        [BsonElement("NombreTitularTarjeta")]
        public string NombreTitularTarjeta { get; set; }

        [BsonElement("NumeroTarjeta")]
        public string NumeroTarjeta { get; set; }

        [BsonElement("PlanId")]
        public string PlanId { get; set; }

        [BsonElement("Plan")]
        public Plan Plan { get; set; }

        [BsonElement("UsuarioId")]
        public string UsuarioId { get; set; }

        [BsonElement("TipoDePlan")]
        public string TipoDePlan { get; set; }

        [BsonElement("ValidoHasta")]
        public string ValidoHasta { get; set; }

        [BsonElement("NotaCredito")]
        public NotaCredito NotaCredito { get; set; }

        [BsonElement("OrdenCompraAnuladaId")]
        public string OrdenCompraAnuladaId { get; set; }

        public OrdenDeCompra ShallowCopy()
        {
            return (OrdenDeCompra)MemberwiseClone();
        }

    }
}
