using Corretaje.Api.Commons;
using Corretaje.Api.Dto;
using Corretaje.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Corretaje.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : Controller
    {
        private readonly IResponseHelper _responseHelper;

        public PaymentController(IResponseHelper responseHelper)
        {
            _responseHelper = responseHelper;
        }

        [HttpPost("Init")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> Init(EntryTrxDto entry)
        {
            var apiUrl = "https://corretajepayment.azurewebsites.net/api/Init";
            entry.UrlFinal = "https://corretajepayment.azurewebsites.net/api/Result";

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(apiUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                
                var random = new Random();

                var json = JsonConvert.SerializeObject(new EntryTrxDto {
                    Monto = entry.Monto,
                    OrdenDeCompra = random.Next(0, 1000).ToString(),
                    SessionId = random.Next(0, 1000).ToString(),
                    UrlFinal = entry.UrlFinal
                });
                var stringContent = new StringContent(json, Encoding.UTF8, "application/json");
                var response = await client.PostAsync(apiUrl, stringContent);
                if (!response.IsSuccessStatusCode) return Ok(Json(_responseHelper.ReturnOkResponse(null, "Error trx")));
                var data = await response.Content.ReadAsStringAsync();
                var res = JsonConvert.DeserializeObject<RespuestaTrxDto>(data);
                return Ok(Json(_responseHelper.ReturnOkResponse(res, "Init trx")));
            }
        }

        [HttpPost("Result")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> ResultTrx()
        {
            return await Task.FromResult(Ok(Json(_responseHelper.ReturnOkResponse(null, "Elemento Actualizado"))));
        }

        [HttpPost("End")]
        [ProducesResponseType(200, Type = typeof(ResponseDto))]
        [ProducesResponseType(500, Type = typeof(ErrorDetails))]
        public async Task<IActionResult> EndTrx()
        {
            return await Task.FromResult(Ok(Json(_responseHelper.ReturnOkResponse(null, "Elemento Actualizado"))));
        }
    }
}