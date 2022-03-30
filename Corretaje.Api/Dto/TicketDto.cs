using System;

namespace Corretaje.Api.Dto
{
    public class TicketDto
    {
        public DateTime? FechaDeRespuesta { get; set; }

        public string AdministradorId { get; set; }
        
        public string Nombre { get; set; }
        
        public string Apellido { get; set; }

        public string Asunto { get; set; }
        
        public string Empresa { get; set; }

        public string EMail { get; set; }

        public string Estado { get; set; }

        public string Id { get; set; }

        public string Pregunta { get; set; }

        public string Respuesta { get; set; }

        public string Telefono { get; set; }

        public string UsuarioId { get; set; }

    }
}
