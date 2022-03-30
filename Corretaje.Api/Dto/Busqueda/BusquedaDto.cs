namespace Corretaje.Api.Dto.Busqueda
{
    public class BusquedaDto
    {
        public bool Amoblado { get; set; }

        public bool FiltrarAmoblado { get; set; }

        public bool Bodega { get; set; }

        public bool FiltrarBodega { get; set; }

        public bool Estacionamiento { get; set; }

        public bool FiltrarEstacionamiento { get; set; }

        public bool IsFirts { get; set; }
        
        public bool Usada { get; set; }

        public bool FiltrarUsada { get; set; }

        public double SuperficieUtilDes { get; set; }

        public double SuperficieUtilHas { get; set; }

        public double ValorDesde { get; set; }

        public double ValorHasta { get; set; }

        public int BanioDes { get; set; }

        public int BanioHas { get; set; }

        public int DormitoriosDes { get; set; }

        public int DormitoriosHas { get; set; }

        public int Limit { get; set; }

        public int Skip { get; set; }

        public string Comuna { get; set; }

        public string Lat { get; set; }

        public string Lng { get; set; }

        public string Mail { get; set; }

        public string TipoOperacion { get; set; }

        public string TipoPrecio { get; set; }

        public string TipoPropiedad { get; set; }

        public string UsuarioId { get; set; }
    }
}
