using MongoDB.Bson.Serialization.Attributes;
using Corretaje.Repository;
using System;

namespace Corretaje.Domain
{
    [BsonIgnoreExtraElements]
    public class Inmobiliaria : Entity
    {
        [BsonElement("Direccion")]
        public string Direccion { get; set; }

        [BsonElement("Logo")]
        public Imagen Logo { get; set; }

        [BsonElement("ImgLogoUrl")]
        public string ImgLogoUrl { get; set; }
        
        [BsonElement("UrlInmobiliaria")]
        public string UrlInmobiliaria { get; set; }

        [BsonElement("ImageContainerName")]
        public string ImageContainerName { get; set; }

        [BsonElement("Mail")]
        public string Mail { get; set; }

        [BsonElement("Nombre")]
        public string Nombre { get; set; }

        [BsonElement("Rut")]
        public string Rut { get; set; }

        [BsonElement("Telefono")]
        public string Telefono { get; set; }

        [BsonElement("HtmlbuttonLink")]
        public string HtmlbuttonLink { get; set; }

        public void SetHtmlbuttonLink(string htmlbuttonLink) => HtmlbuttonLink = htmlbuttonLink;

        public void Update(Inmobiliaria update)
        {
            ImgLogoUrl = update.ImgLogoUrl;
            Logo = update.Logo;
            Nombre = update.Nombre;
            UrlInmobiliaria = update.UrlInmobiliaria;
            Rut = update.Rut;
            Direccion = update.Direccion;
            Telefono = update.Telefono;
            Mail = update.Mail;
            HtmlbuttonLink = update.HtmlbuttonLink;
        }

        public string GenerateImageContainerName()
        {
            ImageContainerName = Guid.NewGuid().ToString();
            return ImageContainerName;
        }

    }
}
