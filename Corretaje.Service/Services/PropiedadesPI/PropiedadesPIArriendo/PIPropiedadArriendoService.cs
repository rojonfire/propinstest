using Corretaje.Common.Excel;
using Corretaje.Domain.PropiedadesPI;
using Corretaje.Repository;
using Corretaje.Service.IServices.IPropiedadesPI;
using Corretaje.Service.IServices.IPropiedadesPI.IPropiedadesPIArriendo;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.PropiedadesPI.PropiedadesPIArriendo
{
    public class PIPropiedadArriendoService : PIPropiedadService<PIPropiedadArriendo>, IPIPropiedadArriendoService
    {
        private readonly IExcelToObjectList _excelToObjectList;

        public PIPropiedadArriendoService(IExcelToObjectList excelToObjectList,
            IPIPropiedadQueryFiltro<PIPropiedadArriendo> propiedadQueryFiltro,
            IRepository<PIPropiedadArriendo> repositoryPropiedadArriendo,
            IPIPropiedadArriendoConfiguracion pIPropiedadArriendoConfiguracion
            ) : base(repositoryPropiedadArriendo, propiedadQueryFiltro, pIPropiedadArriendoConfiguracion)
        {
            _excelToObjectList = excelToObjectList;
        }

        public async Task<IEnumerable<PIPropiedadArriendo>> UploadFile(string fileLocation)
        {
            var list = _excelToObjectList.ReadExcelFileToObjectList<PIPropiedadArriendo>(fileLocation);
            return await AddMany(list);
        }

    }

}
