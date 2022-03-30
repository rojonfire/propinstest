using Corretaje.Api.Dto.OrdenCompra;
using System.Collections.Generic;
using Corretaje.Domain;

namespace Corretaje.Api.Commons
{
    public class UsuarioLogin
    {
        public string ClienteId { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Domicilio { get; set; }
        public string FechaNacimiento { get; set; }
        public string Pais { get; set; }
        public string Oficio { get; set; }
        public string EstadoCivil { get; set; }
        public string Mail { get; set; }
        public string Token { get; set; }
        public string userId { get; set; }
        public string Rut { get; set; }
        public string Telefono { get; set; }

        public string InmobiliariaId { get; set; }

        public bool verificaCedula { get; set; }

        public string ProperId { get; set; }

        public long Version { get; set; }

        public Estados.TipoCuenta TipoCuenta { get; set; }

        public IEnumerable<OrdenCompraUsuarioLoginDto> OrdenCompra { get; set; }

        public bool EsEmbajador { get; set; }

        public DatosBancarios DatosBancarios { get; set; }
    }
}
