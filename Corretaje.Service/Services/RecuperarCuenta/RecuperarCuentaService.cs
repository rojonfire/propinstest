using Corretaje.Domain;
using Corretaje.Repository;
using Corretaje.Service.IServices;
using Corretaje.Service.IServices.IRecuperarCuenta;
using Corretaje.Service.IServices.IUsuario;
using MongoDB.Bson;
using System.Linq;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.RecuperarCuenta
{
    public class RecuperarCuentaService : IRecuperarCuentaService
    {
        private readonly IRecuperarCuentaEmail _recuperarCuentaEmail;
        private readonly IRecuperarCuentaEstado _recuperarCuentaEstado;
        private readonly IRecuperarCuentaExpiracion _recuperarCuentaExpiracion;
        private readonly IRecuperarCuentaLink _recuperarCuentaLink;
        private readonly IRecuperarCuentaQueryFiltro _recuperarCuentaQueryFiltro;
        private readonly IRecuperarCuentaGuid _recuperarCuentaGuid;
        private readonly IRepository<Domain.RecuperarCuenta> _recuperarCuentaRepository;
        private readonly IRespuestaDelServicio _respuestaDelServicio;
        private readonly IUsuarioService _usuarioService;

        public RecuperarCuentaService(IRecuperarCuentaEmail recuperarCuentaEmail, IRecuperarCuentaEstado recuperarCuentaEstado, IRecuperarCuentaExpiracion recuperarCuentaExpiracion, IRecuperarCuentaLink recuperarCuentaLink, IRecuperarCuentaQueryFiltro recuperarCuentaQueryFiltro, IRecuperarCuentaGuid recuperarCuentaGuid, IRepository<Domain.RecuperarCuenta> recuperarCuentaRepository, IRespuestaDelServicio respuestaDelServicio, IUsuarioService usuarioService)
        {
            _recuperarCuentaEmail = recuperarCuentaEmail;
            _recuperarCuentaEstado = recuperarCuentaEstado;
            _recuperarCuentaExpiracion = recuperarCuentaExpiracion;
            _recuperarCuentaLink = recuperarCuentaLink;
            _recuperarCuentaQueryFiltro = recuperarCuentaQueryFiltro;
            _recuperarCuentaGuid = recuperarCuentaGuid;
            _recuperarCuentaRepository = recuperarCuentaRepository;
            _respuestaDelServicio = respuestaDelServicio;
            _usuarioService = usuarioService;
        }

        public async Task<ResultadoDelProceso> Validar(Domain.RecuperarCuenta recuperarCuenta)
        {
            if (string.IsNullOrWhiteSpace(recuperarCuenta.UsuarioEmail))
            {
                return _respuestaDelServicio.RetornarValidacion(null, "Debe ingresar el correo");
            }

            var usuario = await _usuarioService.GetByEmail(recuperarCuenta.UsuarioEmail);

            if (usuario == null)
            {
                return _respuestaDelServicio.RetornarValidacion(null, "El correo ingresado no está asociado a una cuenta");
            }

            return _respuestaDelServicio.RetornarOk(null, null);
        }

        public async Task<Domain.RecuperarCuenta> Actualizar(Domain.RecuperarCuenta recuperarCuenta)
        {
            return await _recuperarCuentaRepository.Update(recuperarCuenta);
        }

        public async Task<Domain.RecuperarCuenta> Add(Domain.RecuperarCuenta recuperarCuenta)
        {
            _recuperarCuentaEstado.SetEstadoVigente(recuperarCuenta);

            _recuperarCuentaGuid.GenerarGuid(recuperarCuenta);

            _recuperarCuentaLink.SetLink(recuperarCuenta);

            return await _recuperarCuentaRepository.Insert(recuperarCuenta);
        }

        public async Task<Domain.RecuperarCuenta> Expirar(ObjectId id)
        {
            var recuperarCuenta = await _recuperarCuentaRepository.Get(id);

            return await Expirar(recuperarCuenta);
        }

        public async Task<Domain.RecuperarCuenta> Expirar(Domain.RecuperarCuenta recuperarCuenta)
        {
            _recuperarCuentaEstado.SetEstadoExpirado(recuperarCuenta);

            return await Actualizar(recuperarCuenta);
        }

        public async Task<Domain.RecuperarCuenta> GetByGuid(string guid)
        {
            var recuperarCuentas = await _recuperarCuentaRepository.SearchFor(_recuperarCuentaQueryFiltro.GetByGuid(guid));

            var recuperarCuenta = recuperarCuentas.FirstOrDefault();

            if (_recuperarCuentaExpiracion.EstaTiempoExpirado(recuperarCuenta))
            {
                await Expirar(recuperarCuenta);
            }

            return recuperarCuenta;
        }

        public async void Delete(ObjectId id)
        {
            await _recuperarCuentaRepository.Delete(id);
        }

        public void SendMail(Domain.RecuperarCuenta recuperarCuenta, string mailHtml)
        {
            _recuperarCuentaEmail.SendEmail(recuperarCuenta.UsuarioEmail, mailHtml);
        }
    }
}
