namespace Corretaje.Api.Commons.Imagen
{
    public interface IImagenHelper
    {
        bool ExisteImagen(Domain.Imagen imagen);

        byte[] GetRepresentacionEnBytes(Domain.Imagen metadatosImagen);

        void BorrarImagen(Domain.Imagen imagen);
    }
}
