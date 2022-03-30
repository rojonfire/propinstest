using Corretaje.Api.Dto;
using Corretaje.Domain;

namespace Corretaje.Api.Commons
{
    public class ResponseHelper : IResponseHelper
    {
        private const string _mensajeOk = "Secuencia correcta";

        public virtual ResponseDto ReturnBadRequestResponse()
        {
            return new ResponseDto
            {
                Estado = Estados.Respuesta.Error,
                Mensaje = "Parámetros incorrectos"
            };
        }

        public virtual ResponseDto ReturnBadRequestResponse(string message)
        {
            return new ResponseDto
            {
                Estado = Estados.Respuesta.Error,
                Mensaje = message
            };
        }

        public virtual ResponseDto ReturnBadRequestResponseByMissingId(string parameterIdName)
        {
            return new ResponseDto
            {
                Estado = Estados.Respuesta.Error,
                Mensaje = $"Parámetro incorrecto: {parameterIdName}"
            };
        }

        public virtual ResponseDto ReturnErrorResponse(dynamic data, string mensaje)
        {
            return new ResponseDto
            {
                Estado = Estados.Respuesta.Error,
                Data = data,
                Mensaje = mensaje
            };
        }

        public virtual ResponseDto ReturnNotFoundResponse()
        {
            return new ResponseDto
            {
                Estado = Estados.Respuesta.Error,
                Mensaje = "No se han encontrado resultados para su operación"
            };
        }

        public virtual ResponseDto ReturnValidationResponse(string message)
        {
            return new ResponseDto
            {
                Estado = Estados.Respuesta.Error,
                Mensaje = message
            };
        }

        public virtual ResponseDto ReturnOkResponse(dynamic data)
        {
            return new ResponseDto
            {
                Estado = Estados.Respuesta.Ok,
                Mensaje = _mensajeOk,
                Data = data
            };
        }

        public virtual ResponseDto ReturnOkResponse(dynamic data, string mensaje)
        {
            return new ResponseDto
            {
                Estado = Estados.Respuesta.Ok,
                Data = data,
                Mensaje = mensaje
            };
        }

        public virtual ResponseDto ReturnOkResponse(dynamic data, int count, string mensaje)
        {
            return new ResponseDto
            {
                Count = count,
                Estado = Estados.Respuesta.Ok,
                Data = data,
                Mensaje = mensaje
            };
        }

        public ResponseDto ReturnWarningResponse(string mensaje)
        {
            return new ResponseDto
            {
                Estado = Estados.Respuesta.Warning,
                Mensaje = mensaje
            };
        }
    }
}
