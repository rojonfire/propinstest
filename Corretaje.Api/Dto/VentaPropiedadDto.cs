using Corretaje.Api.Dto.Proper;
using Corretaje.Api.Dto.Suscripcion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corretaje.Api.Dto
{
    public class VentaPropiedadDto
    {
        public string IdSuscripcion { get; set; }

        public string NombreSuscriptor { get; set; }

        public string IdUsuarioPropietario { get;set; }

        public string IdUsuarioBroker { get;set; }

        public DatosBancariosDto DatosBancariosBroker { get; set; }
    }
}
