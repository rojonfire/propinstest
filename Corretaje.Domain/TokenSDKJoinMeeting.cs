using System;
using System.Security.Cryptography;
using System.Text;

namespace Corretaje.Domain
{
    public class TokenSDKJoinMeeting
    {
        private static readonly char[] Padding = { '=' };

        public static string Generate(string key, string meetingNumber, string role, string secret, DateTime connectionDateTime)
        {
            string timestamp = ToTimestamp(connectionDateTime).ToString();
            string message = $"{key}{meetingNumber}{timestamp}{role}";
            var encoding = new ASCIIEncoding();
            byte[] keyByte = encoding.GetBytes(secret);
            byte[] messageBytesTest = encoding.GetBytes(message);
            string msgHashPreHmac = Convert.ToBase64String(messageBytesTest);
            byte[] messageBytes = encoding.GetBytes(msgHashPreHmac);
            using (var hmacsha256 = new HMACSHA256(keyByte))
            {
                byte[] hashmessage = hmacsha256.ComputeHash(messageBytes);
                string msgHash = Convert.ToBase64String(hashmessage);
                string token = $"{key}.{meetingNumber}.{timestamp}.{role}.{msgHash}";
                var tokenBytes = Encoding.UTF8.GetBytes(token);
                return Convert.ToBase64String(tokenBytes).TrimEnd(Padding);
            }
        }

        private static long ToTimestamp(DateTime value)
        {
            long epoch = (value.Ticks - 621355968000000000) / 10000;
            return epoch;
        }
    }
}
