using System.Collections.Generic;

namespace Corretaje.Api.Dto.Tasacion.Request
{
    public class Bien
    {
        public string Tipo { get; set; }
        public string Antiguedad { get; set; }
        public Direccion Direccion { get; set; }
        public List<RolSII> RolSII { get; set; }
        public int MetrosCuadrados { get; set; }
        public int Bodegas { get; set; }
        public int Estacionamientos { get; set; }
        public int Dormitorios { get; set; }
        public int Banhos { get; set; }
    }
}
