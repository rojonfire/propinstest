using System.Collections.Generic;

namespace Corretaje.Api.Dto
{
    public class LineaPalabraDto
    {
        public string boundingBox { get; set; }
        public List<PalabraDto> words { get; set; }
    }
}
