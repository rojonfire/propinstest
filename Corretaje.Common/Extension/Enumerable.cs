using System;
using System.Collections.Generic;
using System.Linq;

namespace Corretaje.Common.Extension
{
    public static class Enumerable
    {
        public static bool IsNullOrEmpty<T>(this IEnumerable<T> enumerable)
        {
            return enumerable == null || !enumerable.Any();
        }

        public static void AddRange<T, S>(this Dictionary<T, S> source, Dictionary<T, S> collection)
        {
            if (collection == null)
            {
                throw new ArgumentNullException("Empty collection");
            }

            foreach (var (key, value) in collection)
            {
                if (!source.ContainsKey(key))
                {
                    source.Add(key, value);
                }
            }
        }
    }
}
