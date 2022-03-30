using Corretaje.Domain.Evaluar;
using MongoDB.Bson;
using System;
using Xunit;

namespace Corretaje.UnitTest.Domain
{
    public class EvaluarAnfitrionTest
    {
        private readonly string comentario = "";
        private int evaluacion = 1;
        private ObjectId evaluadorId = new ObjectId("5d1bbe1237e100000176c494");

        [Fact]
        public void Create_EvaluarProyectoInmobiliario_Success()
        {
            evaluacion = 4;

            EvaluarAnfitrion evaluarAnfitrion = new EvaluarAnfitrion(comentario, evaluacion, evaluadorId);

            Assert.NotNull(evaluarAnfitrion);
        }

        [Fact]
        public void Create_EvaluarProyectoInmobiliario_Evaluacion_ArgumentOutOfRangeException()
        {
            evaluacion = 100;

            var exception = Assert.Throws<ArgumentOutOfRangeException>(() => new EvaluarAnfitrion(comentario, evaluacion, evaluadorId));

            Assert.Equal(GetMensajeDeException(nameof(evaluacion)), exception.Message);
        }

        [Fact]
        public void Create_EvaluarProyectoInmobiliario_EvaluadorId_ArgumentException()
        {
            evaluadorId = ObjectId.Empty;

            var exception = Assert.Throws<ArgumentException>(() => new EvaluarAnfitrion(comentario, evaluacion, evaluadorId));

            Assert.Equal(nameof(evaluadorId), exception.Message);
        }

        private string GetMensajeDeException(string nombreParametro) => $"Specified argument was out of the range of valid values. (Parameter '{nombreParametro}')";
    }
}
