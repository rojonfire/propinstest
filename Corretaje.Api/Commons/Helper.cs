using System;

namespace Corretaje.Api.Commons
{
    public class Helper
    {
        public static string FormatearRut(string rut)
        {
            var cont = 0;
            if (rut.Length == 0)
            {
                return "";
            }
            rut = rut.Replace(".", "");
            rut = rut.Replace("-", "");
            var format = "-" + rut.Substring(rut.Length - 1);
            for (var i = rut.Length - 2; i >= 0; i--)
            {
                format = rut.Substring(i, 1) + format;
                cont++;
                if (cont != 3 || i == 0) continue;
                format = "." + format;
                cont = 0;
            }
            return format;
        }
        public int RutSinDigito(string rut)
        {
            rut = rut.Split("-")[0];
            rut = rut.Replace(".", "");
            return Convert.ToInt32(rut);
        }
    }
}
