using Corretaje.Domain.Evaluar;
using MongoDB.Bson;
using System;
using Xunit;

namespace Corretaje.UnitTest.Domain
{
    public class EvaluarProyectoInmobiliarioTest
    {
        private readonly string comentario = default;
        private int evaluacionConectividad = 1;
        private int evaluacionEquipamiento = 2;
        private int evaluacionPlusvalia = 3;
        private int evaluacionRentabilidad = 4;
        private int evaluacionTerminaciones = 5;
        private ObjectId evaluadorId = new ObjectId("5d1bbe1237e100000176c494");
        private ObjectId proyectoInmobiliarioId = new ObjectId("5d1bbe1237e100000176c494");
        

        [Fact]
        public void Create_EvaluarProyectoInmobiliario_Success()
        {
            string duracion = string.Empty;
            EvaluarProyectoInmobiliario evaluarProyectoInmobiliario = new EvaluarProyectoInmobiliario(
                comentario,
                evaluacionConectividad,
                evaluacionEquipamiento,
                evaluacionPlusvalia,
                evaluacionRentabilidad,
                evaluacionTerminaciones,
                duracion,
                evaluadorId,
                proyectoInmobiliarioId);

            Assert.NotNull(evaluarProyectoInmobiliario);
        }

        [Fact]
        public void Create_EvaluarProyectoInmobiliario_EvaluacionConectividad_ArgumentOutOfRangeException()
        {
            evaluacionConectividad = 100;

            string duracion=string.Empty;
            var exception = Assert.Throws<ArgumentOutOfRangeException>(() => new EvaluarProyectoInmobiliario(
                comentario,
                evaluacionConectividad,
                evaluacionEquipamiento,
                evaluacionPlusvalia,
                evaluacionRentabilidad,
                evaluacionTerminaciones,
                duracion,
                evaluadorId,
                proyectoInmobiliarioId));

            Assert.Equal(GetMensajeDeException(nameof(evaluacionConectividad)), exception.Message);
        }

        [Fact]
        public void Create_EvaluarProyectoInmobiliario_EvaluacionEquipamiento_ArgumentOutOfRangeException()
        {
            evaluacionEquipamiento = 100;

            string duracion=string.Empty;
            var exception = Assert.Throws<ArgumentOutOfRangeException>(() => new EvaluarProyectoInmobiliario(
                comentario,
                evaluacionConectividad,
                evaluacionEquipamiento,
                evaluacionPlusvalia,
                evaluacionRentabilidad,
                evaluacionTerminaciones,
                duracion,
                evaluadorId,
                proyectoInmobiliarioId));

            Assert.Equal(GetMensajeDeException(nameof(evaluacionEquipamiento)), exception.Message);
        }

        [Fact]
        public void Create_EvaluarProyectoInmobiliario_EvaluacionPlusvalia_ArgumentOutOfRangeException()
        {
            evaluacionPlusvalia = 100;

            string duracion=string.Empty;
            var exception = Assert.Throws<ArgumentOutOfRangeException>(() => new EvaluarProyectoInmobiliario(
                comentario,
                evaluacionConectividad,
                evaluacionEquipamiento,
                evaluacionPlusvalia,
                evaluacionRentabilidad,
                evaluacionTerminaciones,
                duracion,
                evaluadorId,
                proyectoInmobiliarioId));

            Assert.Equal(GetMensajeDeException(nameof(evaluacionPlusvalia)), exception.Message);
        }

        [Fact]
        public void Create_EvaluarProyectoInmobiliario_EvaluacionRentabilidad_ArgumentOutOfRangeException()
        {
            evaluacionRentabilidad = 100;

            string duracion=string.Empty;
            var exception = Assert.Throws<ArgumentOutOfRangeException>(() => new EvaluarProyectoInmobiliario(
                comentario,
                evaluacionConectividad,
                evaluacionEquipamiento,
                evaluacionPlusvalia,
                evaluacionRentabilidad,
                evaluacionTerminaciones,
                duracion,
                evaluadorId,
                proyectoInmobiliarioId));

            Assert.Equal(GetMensajeDeException(nameof(evaluacionRentabilidad)), exception.Message);
        }

        [Fact]
        public void Create_EvaluarProyectoInmobiliario_EvaluacionTerminaciones_ArgumentOutOfRangeException()
        {
            evaluacionTerminaciones = 100;

            string duracion=string.Empty;
            var exception = Assert.Throws<ArgumentOutOfRangeException>(() => new EvaluarProyectoInmobiliario(
                comentario,
                evaluacionConectividad,
                evaluacionEquipamiento,
                evaluacionPlusvalia,
                evaluacionRentabilidad,
                evaluacionTerminaciones,
                duracion,
                evaluadorId,
                proyectoInmobiliarioId));

            Assert.Equal(GetMensajeDeException(nameof(evaluacionTerminaciones)), exception.Message);
        }

        [Fact]
        public void Create_EvaluarProyectoInmobiliario_EvaluadorId_ArgumentException()
        {
            evaluadorId = ObjectId.Empty;

            string duracion=string.Empty;
            var exception = Assert.Throws<ArgumentException>(() => new EvaluarProyectoInmobiliario(
                comentario,
                evaluacionConectividad,
                evaluacionEquipamiento,
                evaluacionPlusvalia,
                evaluacionRentabilidad,
                evaluacionTerminaciones,
                duracion,
                evaluadorId,
                proyectoInmobiliarioId));

            Assert.Equal(nameof(evaluadorId), exception.Message);
        }

        [Fact]
        public void Create_EvaluarProyectoInmobiliario_ProyectoId_ArgumentException()
        {
            proyectoInmobiliarioId = ObjectId.Empty;

            string duracion=string.Empty;
            var exception = Assert.Throws<ArgumentException>(() => new EvaluarProyectoInmobiliario(
                comentario,
                evaluacionConectividad,
                evaluacionEquipamiento,
                evaluacionPlusvalia,
                evaluacionRentabilidad,
                evaluacionTerminaciones,
                duracion,
                evaluadorId,
                proyectoInmobiliarioId));

            Assert.Equal(nameof(proyectoInmobiliarioId), exception.Message);
        }

        private string GetMensajeDeException(string nombreParametro) => $"Specified argument was out of the range of valid values. (Parameter '{nombreParametro}')";
    }
}
