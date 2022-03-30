using Corretaje.Domain;
using System;

namespace Corretaje.Api.Dto.Agenda
{
    public class CitaUsuarioDto
    {
        public string AgenteId { get; set; }

        public string ProyectoId { get; set; }

        public string UsuarioId { get; set; }

        public DateTime Fecha { get; set; }

        public Estados.Semana Dia { get; set; }

        public string Tramo { get; set; }
    }
}