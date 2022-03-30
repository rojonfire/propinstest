using System.Collections.Generic;

namespace Corretaje.Api.Dto
{
    public class ProyectosUsuarioDto
    {
        public string InmobiliariaId { get; set; }

        public string NombreInmobiliaria { get; set; }

        public List<ProyectoAsignadoDto> Proyectos { get; set; }
    }
}
