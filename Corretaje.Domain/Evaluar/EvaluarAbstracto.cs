using Corretaje.Domain.Extension;
using Corretaje.Repository;
using MongoDB.Bson;
using System;

namespace Corretaje.Domain.Evaluar
{
    public abstract class EvaluarAbstracto : Entity
    {
        public static readonly int EvaluacionMinimoValorPermitido = 1;
        public static readonly int EvaluacionMaximoValorPermitido = 5;

        public string Comentario { get; private set; }
        public ObjectId EvaluadorId { get; private set; }

        public EvaluarAbstracto(string comentario, ObjectId evaluadorId)
        {
            Comentario = comentario;
            EvaluadorId = evaluadorId.IsValid() ? evaluadorId : throw new ArgumentException(nameof(evaluadorId));
        }

        protected bool EvaluacionTieneValorPermitido(int evaluacion) => EvaluacionMinimoValorPermitido <= evaluacion && evaluacion <= EvaluacionMaximoValorPermitido;
    }
}
