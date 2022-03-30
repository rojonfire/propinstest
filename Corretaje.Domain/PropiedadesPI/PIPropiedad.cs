using Corretaje.Repository;
using MongoDB.Bson.Serialization.Attributes;
namespace Corretaje.Domain.PropiedadesPI
{
    [BsonIgnoreExtraElements]
    public class PIPropiedad : Entity
    {
        public PIPropiedad() { }

        [BsonElement("Comuna")]
        public string Comuna { get; set; }

        [BsonElement("Barrio")]
        public string Barrio { get; set; }

        [BsonElement("Precio")]
        public int Precio { get; set; }

        [BsonElement("SuperficieTotal")]
        public int SuperficieTotal { get; set; }

        [BsonElement("SuperficieUtil")]
        public int SuperficieUtil { get; set; }

        [BsonElement("Dormitorios")]
        public int Dormitorios { get; set; }

        [BsonElement("Banios")]
        public int Banios { get; set; }

        [BsonElement("TipoPropiedad")]
        public string TipoPropiedad { get; set; }

        [BsonElement("Link")]
        public string Link { get; set; }

        [BsonElement("UF_m2")]
        public double UF_m2 { get; set; }

        [BsonElement("Estacionamientos")]
        public int Estacionamientos { get; set; }

        public PIPropiedad(string _Comuna, string _Barrio, int _Precio, int _SuperficieTotal, int _SuperficieUtil, int _Dormitorios, int _Banios,
            string _TipoPropiedad, string _Link, double _UF_m2, int _Estacionamientos)
        {
            Comuna = _Comuna;
            Barrio = _Barrio;
            Precio = _Precio;
            SuperficieTotal = _SuperficieTotal;
            SuperficieUtil = _SuperficieUtil;
            Dormitorios = _Dormitorios;
            Banios = _Banios;
            TipoPropiedad = _TipoPropiedad;
            Link = _Link;
            UF_m2 = _UF_m2;
            Estacionamientos = _Estacionamientos;
        }
    }
}
