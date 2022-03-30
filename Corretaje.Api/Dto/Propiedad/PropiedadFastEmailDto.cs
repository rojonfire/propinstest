using System;
using System.Collections.Generic;
namespace Corretaje.Api.Dto.Propiedad
{
    public class PropiedadFastEmailDto
    {
        public string CodigoPropiedad { get; set; }

        public string Comuna { get; set; }

        public string Barrio { get; set; }

        public string NombreCalle { get; set; }

        public int Numero { get; set; }

        public int NumeroDepartamento { get; set; }

        public string TipoPropiedad { get; set; }

        public DateTime FechaContratacion { get; set; }
        
        public string NombreCliente { get; set; }

        public string RutCliente { get; set; }

        public string TelefonoCliente { get; set; }

        public string EmailCliente { get; set; }

    }
}
