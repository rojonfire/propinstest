using Corretaje.Service.IServices.IPropiedadesPI;

namespace Corretaje.Service.Services.PropiedadesPI
{
    public class PIPropiedadConfiguracion : IPIPropiedadConfiguracion
    {
        public int SumaEstacionamientos { get; set; }
        public double FactorSuperficieInferior { get; set; }
        public double FactorSuperficieSuperior { get; set; }
    }
}