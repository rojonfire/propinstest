using Corretaje.Api.Dto.ContratacionPlan;
using Corretaje.Api.Dto.Plan;
using Corretaje.Api.Dto.Propiedad;
using Corretaje.Api.Dto.PropiedadPI;
using Corretaje.Api.Dto.ServicioAdicional;
using Corretaje.Api.Dto.ServicioBase;
using Corretaje.Domain;
using Corretaje.Domain.Agenda;
using Corretaje.Domain.PropiedadesPI;
using Corretaje.Domain.Tasacion;
using MongoDB.Bson;
using System.Collections.Generic;

namespace Corretaje.Api.Commons
{
    public interface IMapHelper
    {
        ICollection<PlanConServicioBaseFormateadoParaVistaDto> Map(IEnumerable<Plan> source);

        ICollection<ServicioBaseFormateadoParaVistaDto> Map(ICollection<ServicioBase> source);

        ICollection<ServicioBase> Map(IEnumerable<AgregarServicioBaseAPlanDto> source);

        ICollection<ServicioAdicional> Map(IEnumerable<AgregarServicioAdicionalAPlanDto> source);

        PlanConServicioBaseFormateadoParaVistaDto Map(Plan source);

        ServicioBaseFormateadoParaVistaDto Map(ServicioBase source);

        PlanDto MapPlanToPlan(Plan source);

        Plan MapAgregarPlanToPlan(AgregarPlanDto plan);

        Plan MapPlanActualizar(PlanDto plan);

        IEnumerable<ObjectId> MapToObjectId(IEnumerable<AgregarServicioAdicionalAPlanDto> collection);

        IEnumerable<ObjectId> MapToObjectId(IEnumerable<string> collection);

        Domain.Propiedad MapToPropiedad(AgregarContratacionPlanDto source);

        VisitaFotografo MapToVisitaFotografo(AgregarContratacionPlanDto contratoData, Domain.Usuario fotografo, string userId, string propiedadId);

        VisitaFotografo MapToVisitaFotografo(Domain.Propiedad propiedad, Domain.Usuario fotografo, string userId);

        IEnumerable<BloqueCliente> MapToBloqueCliente(List<string> horarioVisita, string userId, string propiedadId);

        TarjetaProp MapToTarjetaProp(Domain.Propiedad propiedad, string idTarjetaProp);

        Cliente MapUsuarioToCliente(Domain.Usuario usuario);

        PIPropiedadNatural MapPropiedadPIANatural(PropiedadPIDto propiedad);

        PIPropiedadInmobiliaria MapPropiedadPIAInmobiliaria(PropiedadPIDto propiedad);

        PIPropiedadArriendo MapPropiedadPIAArriendo(PropiedadPIDto propiedad);

        TasacionPropiedad MapPropiedadATasacion(Domain.Propiedad propiedad);

        PropiedadFastEmailDto MapPropiedadFastAMail(Domain.Propiedad propiedad, Cliente cliente);

        PropiedadSubidaBrokerEmailDto MapPropiedadSubidaPorBrokerAEmail(Domain.Propiedad propiedad, Cliente cliente, Domain.Usuario broker);
    }
}
