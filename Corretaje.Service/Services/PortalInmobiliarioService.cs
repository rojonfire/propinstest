using Corretaje.Domain;
using Corretaje.Repository;
using Corretaje.Service.IServices;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corretaje.Service.Services
{
    public class PortalInmobiliarioService : Repository<Configuracion>, IPortalInmobiliarioService
    {
        private readonly IRepository<Configuracion> _configuracionRepository;

        public PortalInmobiliarioService(string connectionString) : base(connectionString)
        {
            _configuracionRepository = new Repository<Configuracion>(connectionString);
        }

        public async Task<string> GetComuna(string comuna)
        {
            var filter = Builders<Configuracion>.Filter.Where(config => config.Key.Equals("PortalInmobiliarioComunas"));
            var comunas = (await _configuracionRepository.SearchFor(filter)).FirstOrDefault();

            if (comunas == null) return "";
            var listComunas = JsonConvert.DeserializeObject<List<string>>(comunas.Value).ToList();
            foreach (var comun in listComunas.Where(comun => LevenshteinDistance(RemoveDiacritics(comun.ToLower()), RemoveDiacritics(comuna.ToLower())) <= 1))
            {
                return comun;
            }

            return "";
        }

        private string RemoveDiacritics(string text)
        {
            var normalizedString = text.Normalize(NormalizationForm.FormD);
            var stringBuilder = new StringBuilder();

            foreach (var c in from c in normalizedString let unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c) where unicodeCategory != UnicodeCategory.NonSpacingMark select c)
            {
                stringBuilder.Append(c);
            }

            return stringBuilder.ToString().Normalize(NormalizationForm.FormC);
        }

        private int LevenshteinDistance(string s, string t)
        {
            var n = s.Length;
            var m = t.Length;
            var d = new int[n + 1, m + 1];

            if (n == 0)
            {
                return m;
            }

            if (m == 0)
            {
                return n;
            }

            for (var i = 0; i <= n; d[i, 0] = i++)
            {
            }

            for (var j = 0; j <= m; d[0, j] = j++)
            {
            }

            for (var i = 1; i <= n; i++)
            {
                for (var j = 1; j <= m; j++)
                {
                    var cost = t[j - 1] == s[i - 1] ? 0 : 1;
                    d[i, j] = Math.Min(
                        Math.Min(d[i - 1, j] + 1, d[i, j - 1] + 1),
                        d[i - 1, j - 1] + cost);
                }
            }

            return d[n, m];
        }
    }
}
