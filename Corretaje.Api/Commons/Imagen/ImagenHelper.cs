using System;

namespace Corretaje.Api.Commons.Imagen
{
    public class ImagenHelper : IImagenHelper
    {
        public bool ExisteImagen(Domain.Imagen imagen)
        {
            return !string.IsNullOrWhiteSpace(imagen.Value);
        }

        public byte[] GetRepresentacionEnBytes(Domain.Imagen metadatosImagen)
        {
            string imagen = GetImagen(metadatosImagen);

            return Convert.FromBase64String(imagen);
        }

        private string GetImagen(Domain.Imagen metadatosImagen)
        {
            char separadorMetadatosImagen = ',';

            int parteImagen = 1;

            return metadatosImagen.Value.Split(separadorMetadatosImagen)[parteImagen];
        }

        public void BorrarImagen(Domain.Imagen imagen)
        {
            imagen.Value = "";
        }
    }
}
