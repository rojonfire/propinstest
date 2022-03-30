using Corretaje.Domain;

namespace Corretaje.Api.Dto
{
    public class InmobiliariaDto : EntityDto
    {
        public string Direccion { get; set; }
        public Imagen Logo { get; set; }
        public string  UrlInmobiliaria { get; set; }
        public string Mail { get; set; }
        public string Nombre { get; set; }
        public string Rut { get; set; }
        public string Telefono { get; set; }
        public string HtmlbuttonLink { get; set; }
        public string DatosSalaVenta { get; set; }
        public string ImgLogoUrl { get; set; }
    }
}
