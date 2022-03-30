using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Corretaje.Payment.TransbankPayment;

namespace Corretaje.Payment
{
    public class ComercioTransbank
    {
        public string Init(string urlResult, string urlEnd)
        {
            var webpaytrx = new TransbankPayment.WSWebpayServiceClient();
            

            
            var random = new Random();

            /** Monto de la transacción */
            decimal amount = Convert.ToDecimal("9990");

            /** Orden de compra de la tienda */
            string buyOrder = random.Next(0, 1000).ToString();

            /** (Opcional) Identificador de sesión, uso interno de comercio */
            string sessionId = random.Next(0, 1000).ToString();

            /** URL Final */
            string urlReturn = urlResult + "?action=result";

            /** URL Final */
            string urlFinal = urlEnd + "?action=end";

            List<wsTransactionDetail> trxDet = new List<wsTransactionDetail>();
            trxDet.Add(new wsTransactionDetail { amount = amount, buyOrder = buyOrder });

            /** Ejecutamos metodo initTransaction desde Libreria */
            var result = webpaytrx.initTransaction(new wsInitTransactionInput
            {
                buyOrder = buyOrder,
                commerceId = "597020000540",
                finalURL = urlFinal,
                returnURL = urlReturn,
                sessionId = sessionId,
                transactionDetails = trxDet.ToArray()
          
            });
            string message = "";
            /** Verificamos respuesta de inicio en webpay */
            if (result.token != null && result.token != "")
            {
                message = "Sesion iniciada con exito en Webpay";
            }
            else
            {
                message = "webpay no disponible";
            }
            
            return message + ";" + result.token + ";" + result.url;
        }
    }
}
