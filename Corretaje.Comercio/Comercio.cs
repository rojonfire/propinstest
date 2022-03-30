using System;
using Transbank.Webpay;

namespace Corretaje.Comercio
{
    public class Comercio
    {
        public string Pagar()
        {
            var configuration = new Configuration();
            configuration.Environment = "INTEGRACION";
            configuration.CommerceCode = "597020000540";


            var trx = new Webpay(Configuration.ForTestingWebpayPlusNormal()).NormalTransaction;
            
            return "Correcto";
        }
    }
}
