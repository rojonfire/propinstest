using Corretaje.Domain;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IUsuario
{
    public interface IUsuarioService
    {
        Task<IEnumerable<Usuario>> GetAdministradores();

        Task<IEnumerable<Usuario>> GetAll();

        Task<IEnumerable<Usuario>> GetUsuarios();

        Task<IEnumerable<Usuario>> GetUsuariosByOficio(string oficio);

        Task<ResultadoDelProceso> Validar(Usuario usuario);

        Task<ResultadoDelProceso> ValidarVendedor(Usuario usuario);

        Task<string> GetClienteId(ObjectId usuarioId);

        Task<Usuario> GetByRut(string rut);

        Task<Page<Usuario>> GetByEsVendedor(int pageSize, int page, bool esVendedor);

        Task<Page<Usuario>> GetUsuariosPaginados(int pageSize, int page, int tipoCuenta, string referidoPor, bool soloEmbajadores);

        Task<Usuario> AddAgent(Usuario user);

        Task<Usuario> AddAdministrador(Usuario usuario);

        Task<Usuario> AddUsuario(Usuario usuario);

        Task<Usuario> Get(ObjectId usuarioId);

        Task<Usuario> GetByEmail(string email);

        Task<Usuario> GetByLogin(string password, string email);

        Task<Usuario> Update(Usuario usuario);

        Task<Usuario> RestablecerContraseña(Usuario usuario, string contraseña);

        Task<Usuario> RestablecerContraseña(string password, string email);

        void Eliminar(ObjectId id);

        Task<IEnumerable<Usuario>> GetUsuariosById(IEnumerable<ObjectId> usuariosId);

        Task<IEnumerable<Usuario>> GetUsuariosByTipoCuenta(Estados.TipoCuenta tipoCuenta);

        Task<Usuario> GetUsuarioByEmailAndRut(string email, string rut);

        void SendEmailNotificacionCambioContraseña(string html, string emailDestinatario);

        void SendEmailRegistroCopiaJefeVentas(string html);

        void SendEmailVendedorReferidoCopiaJefeVentas(string html);

        void SendEmailEmbajadorReferidoCopiaJefeVentas(string html);

        void SendEmailVendedorReferido(string html, string email);
    }
}
