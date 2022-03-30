using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Corretaje.Api.Dto.Proper;
using MongoDB.Bson;

namespace Corretaje.Api.Dto.Usuario
{
    public class UsuarioCrearCuentaDto
    {
        public DateTime? FechaNacimiento { get; set; }

        [Required(ErrorMessage = "Los nombres son requeridos")]
        public string Nombres { get; set; }

        public string Apellidos { get; set; }

        public string Rut { get; set; }

        [Required(ErrorMessage = "El email es requerido")]
        public string Email { get; set; }

        public string Oficio { get; set; }

        public string Telefono { get; set; }

        public string InmobiliariaId { get; set; }
        
        public string UsuarioReferidoId { get; set; }
        
        public string referidoId { get; set; }
        
        public string Direccion { get; set; }
        
        public ObjectId ProperId { get; set; }
        
        public int Version { get; set; }

        public List<string> ProyectosInmobiliariosId { get; set; }

        [Required(ErrorMessage = "La contraseña es requerida")]
        public string Password { get; set; }

        public int TipoCuenta { get; set; }

        public bool EsEmbajador { get; set; }

        public DatosBancariosDto DatosBancarios { get; set; }
    }
}
