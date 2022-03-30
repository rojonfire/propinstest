using Corretaje.Repository;
using System;

namespace Corretaje.Domain
{
    public class ReporteQueryString : Entity
    {
        public string InmobiliariaId { get; set; }
        public DateTime InicioPeriodo { get; set; }
        public DateTime TerminoPeriodo { get; set; }
    }
}
