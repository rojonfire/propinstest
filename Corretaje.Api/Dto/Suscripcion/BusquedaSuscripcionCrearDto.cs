namespace Corretaje.Api.Dto.Suscripcion
{
    public class BusquedaSuscripcionCrearDto
    {
        public bool IsFirts { get; set; }

        public int Limit { get; set; }

        public int Skip { get; set; }

        public string CodPRopiedad { get; set; }

        public string Direccion { get; set; }

        public string Mail { get; set; }

        public string TipoOperacion { get; set; }

        public string TipoPropiedad { get; set; }
    }
}
