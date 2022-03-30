using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corretaje.Api.Dto.Agenda
{
    public class VisitaFotografoResponseDto
    {

        public string FotografoId { get; set; }
        public DateTime Fecha { get; set; }
        public string Tramo { get; set; }

        public string Dia { get; set; }
    }
}
