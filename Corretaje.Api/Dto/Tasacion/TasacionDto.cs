using System.Collections.Generic;

namespace Corretaje.Api.Dto.Tasacion
{
    public class TasacionDto
    {
        public TasacionDto()
        {
            DatosGenerales = new DatosGeneralesDto();
            DetalleValorizacion = new List<DetalleValorizacionDto>();
            ReferenciaDeMercado = new ReferenciaDeMercadoDto();
            Valorizacion = new ValorizacionDto();
        }

        public DatosGeneralesDto DatosGenerales { get; set; }

        public IEnumerable<DetalleValorizacionDto> DetalleValorizacion { get; set; }

        public int SeguroIncendio { get; set; }

        public long NumeroSolicitud { get; set; }

        public ReferenciaDeMercadoDto ReferenciaDeMercado { get; set; }

        public string DescripcionPropiedad { get; set; }

        public string UsoActualEspecifico { get; set; }

        public ValorizacionDto Valorizacion { get; set; }

        public string IdUser { get; set; }

        public string Glosa { get; set; }
        public string TipoPropiedad { get; set; }
        public string EstadoPropiedad { get; set; }
    }
}
