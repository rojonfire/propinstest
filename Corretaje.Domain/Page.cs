using System;
using System.Collections.Generic;
using System.Text;

namespace Corretaje.Domain
{
    public class Page<T> where T: class
    {
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int TotalResults { get; set; }
        public IEnumerable<T> Results { get; set; }
    }
}
