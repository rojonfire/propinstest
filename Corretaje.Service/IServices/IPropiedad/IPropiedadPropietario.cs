namespace Corretaje.Service.IServices.IPropiedad
{
    public interface IPropiedadPropietario
    {
        bool CambioPropietario(Domain.Propiedad propiedadDb, Domain.Propiedad propiedadActualizada);

        void HandleCambioPropietario(Domain.Propiedad propiedad);
    }
}
