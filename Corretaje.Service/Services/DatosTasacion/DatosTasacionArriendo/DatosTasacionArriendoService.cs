using Corretaje.Common.Excel;
using Corretaje.Repository;
using Corretaje.Service.IServices.IDatosTasacion;
using Corretaje.Service.IServices.IDatosTasacion.IDatosTasacionArriendo;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.DatosTasacion.DatosTasacionArriendo
{
    public class DatosTasacionArriendoService : DatosTasacionService<Domain.Tasacion.DatosTasacionArriendo>, IDatosTasacionArriendoService
    {
        private readonly IExcelToObjectList _excelToObjectList;

        public DatosTasacionArriendoService(IRepository<Domain.Tasacion.DatosTasacionArriendo> repositoryDatosTasacionArriendo,
            IDatosTasacionQueryFiltro<Domain.Tasacion.DatosTasacionArriendo> datosTasacionArriendoQueryFiltro,
            IDatosTasacionArriendoConfiguracion datosTasacionArriendoConfiguracion,
            IExcelToObjectList excelToObjectList         
            ) : base(repositoryDatosTasacionArriendo, datosTasacionArriendoQueryFiltro, datosTasacionArriendoConfiguracion)
        {
            _excelToObjectList = excelToObjectList;
        }

        public async Task<IEnumerable<Domain.Tasacion.DatosTasacionArriendo>> UploadFile(string fileLocation)
        {
            List<Domain.Tasacion.DatosTasacionArriendo> list = _excelToObjectList.ReadExcelFileToObjectList<Domain.Tasacion.DatosTasacionArriendo>(fileLocation);
            return await AddMany(list);
        }
    }
}
