namespace Corretaje.Domain
{
    public static class Estados
    {
        public enum AgendarVisita
        {
            Agendada,
            Cancelada,
            Finalizada
        }

        public enum Oferta
        {
            Aceptada,
            Declinada,
            Null,
            Rechazada,
            ContratoBorrador,
            ContratoFinalizado
        }

        public enum OfertaEmision
        {
            Cliente,
            Usuario
        }

        public enum Respuesta
        {
            Error,
            Ok,
            Warning
        }

        public enum TipoDePlan
        {
            Arriendo,
            Venta
        }

        public enum RecuperarCuenta
        {
            Expirado,
            Vigente
        }

        public enum Contrato
        {
            Borrador,
            Finalizado
        }

        public enum TipoCuenta
        {
            Administrador,
            Usuario,
            Cliente,
            Fotografo,
            Anfitrion,
            Agente,
            AdminInmobiliario,
            Proper,
            Referido,
            JefeDeVentas,
            Broker
        }

        public enum Transaccion
        {
            Exitosa,
            Iniciada,
            Fallida,
            Anulada
        }

        public enum Semana
        {
            Lunes = 1,
            Martes = 2,
            Miercoles = 3,
            Jueves = 4,
            Viernes = 5,
            Sabado = 6,
            Domingo = 0
        }

        public enum TipoProyecto
        {
            Casa,
            Departamento,
            Otro,
            Oficina,
            Mixto
        }

        public enum Suscripcion
        {
            Anulada,
            Vigente
        }

        public enum ProyectoInmobiliario
        {
            EnBlanco,
            EnVerde, 
            EntregaInmediata,
            Todos
        }

        public enum TipoMoneda
        {
            UF,
            CLP
        }

        public enum EstadoPropiedad
        {
            PlanContratado,
            PropiedadPublicada,
            OfertaVigente,
            PromesaCompraventaFirmada,
            EscrituraCompraventaFirmada,
            PropiedadEntregada,
            PropiedadNoDisponible
        }

        public enum RequestStatus
        {
            Success,
            Error
        }
    }
}
