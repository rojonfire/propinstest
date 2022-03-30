using Corretaje.Api.Dto;

namespace Corretaje.Api.Commons
{
    public interface IResponseHelper
    {
        ResponseDto ReturnBadRequestResponse();

        ResponseDto ReturnBadRequestResponse(string message);

        ResponseDto ReturnBadRequestResponseByMissingId(string parameterIdName);

        ResponseDto ReturnErrorResponse(dynamic data, string mensaje);

        ResponseDto ReturnNotFoundResponse();

        ResponseDto ReturnOkResponse(dynamic data);

        ResponseDto ReturnOkResponse(dynamic data, string mensaje);

        ResponseDto ReturnOkResponse(dynamic data, int count, string mensaje);

        ResponseDto ReturnValidationResponse(string message);

        ResponseDto ReturnWarningResponse(string mensaje);
    }
}