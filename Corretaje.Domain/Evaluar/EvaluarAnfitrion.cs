using MongoDB.Bson;
using System;

namespace Corretaje.Domain.Evaluar
{
    public class EvaluarAnfitrion : EvaluarAbstracto
    {
        public int Evaluacion { get; private set; }

        public string ProyectoInmobiliarioId { get; set; }

        public string AgenteId { get; set; }

        public EvaluarAnfitrion(string comentario, int evaluacion, ObjectId evaluadorId) : base(comentario, evaluadorId)
        {
            Evaluacion = EvaluacionTieneValorPermitido(evaluacion) ? evaluacion : throw new ArgumentOutOfRangeException(nameof(evaluacion));
        }
    }
}
