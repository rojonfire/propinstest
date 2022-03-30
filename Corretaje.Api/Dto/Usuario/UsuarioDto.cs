using Corretaje.Domain;
using System;
using System.Collections.Generic;

namespace Corretaje.Api.Dto.Usuario
{
    public class UsuarioDto
    {
        public DateTime FechaNacimiento { get; set; }
        public Estados.TipoCuenta TipoCuenta { get; set; }
        public string Apellidos { get; set; }
        public string Direccion { get; set; }
        public string EstadoCivil { get; set; }
        public string Id { get; set; }
        public string Nombres { get; set; }
        public string Mail { get; set; }
        public string Oficio { get; set; }
        public string Rut { get; set; }
        public string Telefono { get; set; }
        public string InmobiliariaId { get; set; }
        public List<string> ProyectosInmobiliariosId { get; set; }
    }
}
