using Corretaje.Domain.Extension;
using MongoDB.Bson;
using System;

namespace Corretaje.Domain.Evaluar
{
    public class EvaluarProyectoInmobiliario : EvaluarAbstracto
    {
        public int EvaluacionConectividad { get; private set; }
        public int EvaluacionEquipamiento { get; private set; }
        public int EvaluacionPlusvalia { get; private set; }
        public int EvaluacionRentabilidad { get; private set; }
        public int EvaluacionTerminaciones { get; private set; }
        public string Duracion { get; private set; }
        public ObjectId ProyectoInmobiliarioId { get; private set; }

        public EvaluarProyectoInmobiliario(
            string comentario,
            int evaluacionConectividad,
            int evaluacionEquipamiento,
            int evaluacionPlusvalia,
            int evaluacionRentabilidad,
            int evaluacionTerminaciones,
            string duracion,
            ObjectId evaluadorId,
            ObjectId proyectoInmobiliarioId) : base(comentario, evaluadorId)
        {
            EvaluacionConectividad = EvaluacionTieneValorPermitido(evaluacionConectividad) ? evaluacionConectividad : throw new ArgumentOutOfRangeException(nameof(evaluacionConectividad));
            EvaluacionEquipamiento = EvaluacionTieneValorPermitido(evaluacionEquipamiento) ? evaluacionEquipamiento : throw new ArgumentOutOfRangeException(nameof(evaluacionEquipamiento));
            EvaluacionPlusvalia = EvaluacionTieneValorPermitido(evaluacionPlusvalia) ? evaluacionPlusvalia : throw new ArgumentOutOfRangeException(nameof(evaluacionPlusvalia));
            EvaluacionRentabilidad = EvaluacionTieneValorPermitido(evaluacionRentabilidad) ? evaluacionRentabilidad : throw new ArgumentOutOfRangeException(nameof(evaluacionRentabilidad));
            EvaluacionTerminaciones = EvaluacionTieneValorPermitido(evaluacionTerminaciones) ? evaluacionTerminaciones : throw new ArgumentOutOfRangeException(nameof(evaluacionTerminaciones));
            Duracion = duracion;

            ProyectoInmobiliarioId = proyectoInmobiliarioId.IsValid() ? proyectoInmobiliarioId : throw new ArgumentException(nameof(proyectoInmobiliarioId));
        }
    }
}
