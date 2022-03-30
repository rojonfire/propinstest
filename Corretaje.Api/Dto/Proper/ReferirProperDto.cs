using System.Collections.Generic;
using Corretaje.Domain;
using MongoDB.Bson;

namespace Corretaje.Api.Dto.Proper
{
    public class ReferirProperDto
    {
        public string Email { get; set; }
        
        public List<Domain.Propiedad> Propiedades { get; set; }
        
        public List<ProyectoInmobiliario> Proyectos { get; set; }
        
        public List<ReferidoProper> Referidos { get; set; }
        
        
        
        public string ProperId { get; set; }
        
        public bool Paso1 { get; set; }
        
        public bool Paso2 { get; set; }
        
        public bool Paso3 { get; set; }
        
        public bool Paso4 { get; set; }
        
        public ObjectId ReferidoId { get; set; } 
        
        public string NombreProper { get; set; }
        
        public string Nombres { get; set; }
        
        public string Apellido { get; set; }
        
        public List<string> Referencias { get; set; }
    }
}