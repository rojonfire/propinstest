using System;
using System.Net;
using System.Threading.Tasks;
using Corretaje.Domain;
using Microsoft.ApplicationInsights;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;

namespace Corretaje.Api.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILoggerFactory _loggerFactory;
        private readonly TelemetryClient _telemetryClient;

        public ExceptionMiddleware(RequestDelegate next, ILoggerFactory loggerFactory, TelemetryClient telemetryClient)
        {
            _loggerFactory = loggerFactory;
            _next = next;
            _telemetryClient = telemetryClient;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                _telemetryClient.TrackException(ex);
                await HandleExceptionAsync(httpContext, ex);
                _telemetryClient.Flush();
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            var response = new ErrorDetails
            {
                Exception = exception.ToString(),
                Estado = 0,
                Message = "Error Interno del Servidor.",
                StatusCode = context.Response.StatusCode,
                StackTrace = exception.StackTrace
            };
            return context.Response.WriteAsync(response.ToJson());
        }
    }
}