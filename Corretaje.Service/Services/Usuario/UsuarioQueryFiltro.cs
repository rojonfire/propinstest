using Corretaje.Domain;
using Corretaje.Service.IServices.IUsuario;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace Corretaje.Service.Services.Usuario
{
    public class UsuarioQueryFiltro : IUsuarioQueryFiltro
    {
        public FilterDefinition<Domain.Usuario> Filtrar(int tipoCuentaInt, string referidoPor, bool soloEmbajadores)
        {
            FilterDefinition<Domain.Usuario> filter = FilterDefinition<Domain.Usuario>.Empty;

            if (tipoCuentaInt != -1)
            {
                Estados.TipoCuenta tipoCuenta = (Estados.TipoCuenta)tipoCuentaInt;
                filter &= FindByTipoCuenta(tipoCuenta);
            }

            if (referidoPor != null && referidoPor != "")
            {
                filter &= FindByReferidoPor(referidoPor);
            }

            if (soloEmbajadores)
            {
                filter &= FindByEsEmbajador(true);
            }

            return filter;
        }

        public FilterDefinition<Domain.Usuario> FindAdministradores()
        {
            return Builders<Domain.Usuario>.Filter.Where(usuario => usuario.TipoCuenta == Estados.TipoCuenta.Administrador);
        }

        public FilterDefinition<Domain.Usuario> FindByEmail(string email)
        {
            return Builders<Domain.Usuario>.Filter.Where(usuario => usuario.Email == email);
        }

        public FilterDefinition<Domain.Usuario> FindByLogin(string password, string email)
        {
            return Builders<Domain.Usuario>.Filter.Where(usuario => usuario.Password == password && usuario.Email == email);
        }

        public FilterDefinition<Domain.Usuario> FindByRut(string rut)
        {
            return Builders<Domain.Usuario>.Filter.Where(usuario => usuario.Rut == rut);
        }

        public FilterDefinition<Domain.Usuario> FindUsuarios()
        {
            return Builders<Domain.Usuario>.Filter.Where(usuario => usuario.TipoCuenta == Estados.TipoCuenta.Usuario);
        }

        public FilterDefinition<Domain.Usuario> FindUsuariosByOficio(string oficio)
        {
            return Builders<Domain.Usuario>.Filter.Where(usuario => usuario.Oficio == oficio);
        }

        public FilterDefinition<Domain.Usuario> FindUsuariosById(IEnumerable<ObjectId> usuariosId)
        {
            return Builders<Domain.Usuario>.Filter.Where(u => usuariosId.Contains(u.Id));
        }

        public FilterDefinition<Domain.Usuario> FindByTipoCuenta(Estados.TipoCuenta tipoCuenta)
        {
            return Builders<Domain.Usuario>.Filter.Where(usuario => usuario.TipoCuenta == tipoCuenta);
        }

        public FilterDefinition<Domain.Usuario> FindByEmailAndRut(string email, string rut)
        {
            return Builders<Domain.Usuario>.Filter.Where(usuario => usuario.Email == email && usuario.Rut == rut);
        }

        public FilterDefinition<Domain.Usuario> FindByEsVendedor(bool esVendedor)
        {
            return Builders<Domain.Usuario>.Filter.Where(usuario => usuario.EsVendedor == true);
        }

        public FilterDefinition<Domain.Usuario> FindByReferidoPor(string referidoPor)
        {
            return Builders<Domain.Usuario>.Filter.Where(usuario => usuario.ReferidoPor == referidoPor);
        }

        public FilterDefinition<Domain.Usuario> FindByEsEmbajador(bool esEmbajador)
        {
            return Builders<Domain.Usuario>.Filter.Where(usuario => usuario.EsEmbajador == esEmbajador);
        }

        public SortDefinition<Domain.Usuario> SortByFechaCreacion()
        {
            return Builders<Domain.Usuario>.Sort.Descending(usuario => usuario.CreatedAt);
        }
    }
}
