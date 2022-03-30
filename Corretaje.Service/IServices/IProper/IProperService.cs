using System.Collections.Generic;
using System.Threading.Tasks;
using Corretaje.Domain;
using Corretaje.Repository;
using MongoDB.Bson;

namespace Corretaje.Service.IServices.IProper
{
    public interface IProperService
    {
        Task<Propers> AddProper(Propers proper);

        Task<ResultadoDelProceso> Validar(Propers proper);

        Task<Propers> GetByEmail(string email);

        Task<Propers> Get(ObjectId properId);

        ReferidoProper GetReferidoByEmail(string mail, Propers proper);

        Task<Propers> AgregarReferido(ObjectId properId, ReferidoProper referidoProper);

        Task<Propers> GetByLogin(string password, string email);

        Task<Propers> ActualizarPasoReferido(Referidos referido);

        Task<Propers> Update(Propers proper);

        Task<Propers> ReferirProps(string properId, string mail, List<string> referencias);

        void Delete(ObjectId id);

        // Task<Referidos> Referir(List<string> props,Referidos referido);
    }
}