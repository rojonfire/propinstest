using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Corretaje.Common.Excel
{
    public interface IExcelToObjectList
    {
        List<T> ReadExcelFileToObjectList<T>(string filePath) where T : new();

        MemoryStream ExportToXLSX<T>(IEnumerable<T> collection, string filePath) where T : new();
    }
}
