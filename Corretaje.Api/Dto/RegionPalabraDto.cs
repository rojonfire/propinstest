using System.Collections.Generic;

namespace Corretaje.Api.Dto
{
    public class RegionPalabraDto
    {
        public string BoundingBox { get; set; }
        public List<LineaPalabraDto> Lines { get; set; }
    }
}
