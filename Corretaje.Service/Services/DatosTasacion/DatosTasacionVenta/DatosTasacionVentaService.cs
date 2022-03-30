using Corretaje.Common.Excel;
using Corretaje.Repository;
using Corretaje.Service.IServices.IDatosTasacion;
using Corretaje.Service.IServices.IDatosTasacion.IDatosTasacionVenta;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.DatosTasacion.DatosTasacionVenta
{
    public class DatosTasacionVentaService : DatosTasacionService<Domain.Tasacion.DatosTasacionVenta>, IDatosTasacionVentaService
    {
        private readonly IExcelToObjectList _excelToObjectList;

        public DatosTasacionVentaService(IRepository<Domain.Tasacion.DatosTasacionVenta> repositoryDatosTasacionVenta,
            IDatosTasacionQueryFiltro<Domain.Tasacion.DatosTasacionVenta> datosTasacionVentaQueryFiltro,
            IDatosTasacionVentaConfiguracion datosTasacionVentaConfiguracion,
            IExcelToObjectList excelToObjectList            
            ) : base(repositoryDatosTasacionVenta, datosTasacionVentaQueryFiltro, datosTasacionVentaConfiguracion)
        {
            _excelToObjectList = excelToObjectList;
        }

        public async Task<IEnumerable<Domain.Tasacion.DatosTasacionVenta>> UploadFile(string fileLocation)
        {
            List<Domain.Tasacion.DatosTasacionVenta> list = _excelToObjectList.ReadExcelFileToObjectList<Domain.Tasacion.DatosTasacionVenta>(fileLocation);
            return await AddMany(list);
        }
    }
}
