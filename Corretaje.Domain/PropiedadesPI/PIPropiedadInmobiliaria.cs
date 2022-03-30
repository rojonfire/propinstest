namespace Corretaje.Domain.PropiedadesPI
{
    public class PIPropiedadInmobiliaria : PIPropiedad
    {
        public PIPropiedadInmobiliaria(): base() { }

        public PIPropiedadInmobiliaria(string Comuna, string Barrio, int Precio, int SuperficieTotal, int SuperficieUtil, int Dormitorios, int Banios,
            string TipoPropiedad, string Link, double UF_m2, int Estacionamientos) : base(Comuna, Barrio, Precio, SuperficieTotal, SuperficieUtil, Dormitorios, Banios,
            TipoPropiedad, Link, UF_m2, Estacionamientos) { }
    }
}
