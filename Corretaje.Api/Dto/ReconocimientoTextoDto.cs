using System.Collections.Generic;

namespace Corretaje.Api.Dto
{
    public class ReconocimientoTextoDto
    {
        public string language { get; set; }
        public double textAngle { get; set; }
        public string orientation { get; set; }
        public List<RegionPalabraDto> regions { get; set; }
    }
}
