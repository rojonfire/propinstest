using MongoDB.Bson.Serialization.Attributes;
using Corretaje.Repository;

namespace Corretaje.Domain
{
    [BsonIgnoreExtraElements]
    public class Busqueda : Entity
    {
        [BsonElement("IsFirts")]
        public bool IsFirts { get; set; }
        
        [BsonElement("Usado")]
        public bool Usada { get; set; }

        [BsonElement("FiltrarUsada")]
        public bool FiltrarUsada { get; set; }

        [BsonElement("Limit")]
        public int Limit { get; set; }

        [BsonElement("Skip")]
        public int Skip { get; set; }

        [BsonElement("Comuna")]
        public string Comuna { get; set; }

        [BsonElement("Mail")]
        public string Mail { get; set; }

        [BsonElement("TipoOperacion")]
        public string TipoOperacion { get; set; }

        [BsonElement("TipoPropiedad")]
        public string TipoPropiedad { get; set; }

        [BsonElement("Amoblado")]
        public bool Amoblado { get; set; }

        [BsonElement("FiltrarAmoblado")]
        public bool FiltrarAmoblado { get; set; }

        [BsonElement("Bodega")]
        public bool Bodega { get; set; }

        [BsonElement("FiltrarBodega")]
        public bool FiltrarBodega { get; set; }

        [BsonElement("Estacionamiento")]
        public bool Estacionamiento { get; set; }

        [BsonElement("FiltrarEstacionamiento")]
        public bool FiltrarEstacionamiento { get; set; }

        [BsonElement("SuperficieUtilDes")]
        public double SuperficieUtilDes { get; set; }

        [BsonElement("SuperficieUtilHas")]
        public double SuperficieUtilHas { get; set; }

        [BsonElement("ValorDesde")]
        public double ValorDesde { get; set; }

        [BsonElement("ValorHasta")]
        public double ValorHasta { get; set; }

        [BsonElement("BanioDes")]
        public int BanioDes { get; set; }

        [BsonElement("BanioHas")]
        public int BanioHas { get; set; }

        [BsonElement("DormitoriosDes")]
        public int DormitoriosDes { get; set; }

        [BsonElement("DormitoriosHas")]
        public int DormitoriosHas { get; set; }

        [BsonElement("Lat")]
        public string Lat { get; set; }

        [BsonElement("Lng")]
        public string Lng { get; set; }

        [BsonElement("TipoPrecio")]
        public string TipoPrecio { get; set; }

        [BsonElement("UsuarioId")]
        public string UsuarioId { get; set; }

        [BsonElement("SortPrecioDesc")]
        public bool SortPrecioDesc { get; set; }

    }
}
