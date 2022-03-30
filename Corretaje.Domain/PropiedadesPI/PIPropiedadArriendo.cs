using MongoDB.Bson.Serialization.Attributes;

namespace Corretaje.Domain.PropiedadesPI
{
    public class PIPropiedadArriendo : PIPropiedad
    {
        public PIPropiedadArriendo() : base() { }

        [BsonElement("PrecioUF")]
        public string PrecioUF { get; set; }

        public PIPropiedadArriendo(string Comuna, string Barrio, int Precio, int SuperficieTotal, int SuperficieUtil, int Dormitorios, int Banios,
            string TipoPropiedad, string Link, double UF_m2, int Estacionamientos, string _PrecioUF) : base(Comuna, Barrio, Precio, SuperficieTotal, SuperficieUtil, Dormitorios, Banios,
            TipoPropiedad, Link, UF_m2, Estacionamientos)
        {
            PrecioUF = _PrecioUF;
        }
    }
}