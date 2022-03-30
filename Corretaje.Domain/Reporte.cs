using System;
using System.Collections.Generic;
using Corretaje.Domain.Evaluar;
using Corretaje.Repository;
using MongoDB.Bson.Serialization.Attributes;

namespace Corretaje.Domain
{
    public class Reporte : Entity
    {
        [BsonElement("EvaluacionesProyecto")]
        public Proyecto EvaluacionesProyecto { get; set; }

        [BsonElement("NombreProyectoInmobiliario")]
        public string NombreProyectoInmobiliario { get; set; }

        [BsonElement("NombreInmobiliaria")]
        public string NombreInmobiliaria { get; set; }

        [BsonElement("InmobiliariaId")]
        public string InmobiliariaId { get; set; }

        [BsonElement("InicioPeriodo")]
        public DateTime InicioPeriodo { get; set; }

        [BsonElement("TerminoPeriodo")]
        public DateTime TerminoPeriodo { get; set; }
    }

    public class Proyecto
    {
        [BsonElement("EvalProyectoPonderado")]
        public decimal EvalProyectoPonderado { get; set; }

        [BsonElement("EvalAgentes")]
        public List<Vendedor> EvalVendedores { get; set; }

        [BsonElement("RentabilidadPonderado")]
        public decimal RentabilidadPonderado { get; set; }

        [BsonElement("ConectividadPonderado")]
        public decimal ConectividadPonderado { get; set; }

        [BsonElement("TerminacionesPonderado")]
        public decimal TerminacionesPonderado { get; set; }

        [BsonElement("EquipamientoPonderado")]
        public decimal EquipamientoPonderado { get; set; }

        [BsonElement("Visitantes")]
        public List<Visitante>  Visitantes { get; set; }

        public List<Vendedor> VendedoresPonderado { get; set; }

        public void SetPonderadoProyecto(decimal evalPonderado) => EvalProyectoPonderado = evalPonderado;

        public void SetPondEquipamiento(decimal evalPonderado) => EquipamientoPonderado = evalPonderado;

        public void SetPondTerminaciones(decimal evalPonderado) => TerminacionesPonderado = evalPonderado;

        public void SetPondConectividad(decimal evalPonderado) => ConectividadPonderado = evalPonderado;

        public void SetPondRentabilidad(decimal evalPonderado) => RentabilidadPonderado = evalPonderado;

        public void SetPondVendedores(List<Vendedor> evalPonderado) => VendedoresPonderado = evalPonderado;
    }

    public class Visitante
    {
        [BsonElement("Nombre")]
        public string Nombre { get; set; }

        [BsonElement("Apellido")]
        public string Apellido { get; set; }

        [BsonElement("Mail")]
        public string Mail { get; set; }

        [BsonElement("Rut")]
        public string Rut { get; set; }

        [BsonElement("Telefono")]
        public string Telefono { get; set; }

        [BsonElement("FechaVisita")]
        public DateTime FechaVisita { get; set; }

        [BsonElement("DuracionVisita")]
        public string DuracionVisita { get; set; }

        [BsonElement("Equipamiento")]
        public int Equipamiento { get; set; }

        [BsonElement("Terminaciones")]
        public int Terminaciones { get; set; }

        [BsonElement("Conectividad")]
        public int Conectividad { get; set; }

        [BsonElement("Rentabilidad")]
        public int Rentabilidad { get; set; }

        [BsonElement("EvaluacionVendedor")]
        public int EvaluacionVendedor { get; set; }

        public void SetVisitante(Usuario usuario, EvaluarProyectoInmobiliario evaluarProyecto, int evaluarVendedor, DateTime fechaVisita, string duracion)
        {
            Nombre = usuario.Nombres;
            Apellido = usuario.Apellidos;
            Telefono = usuario.Telefono;
            Mail = usuario.Email;
            Rut = usuario.Rut;
            FechaVisita = fechaVisita;
            DuracionVisita = duracion;
            Equipamiento = evaluarProyecto.EvaluacionEquipamiento;
            Terminaciones = evaluarProyecto.EvaluacionTerminaciones;
            Conectividad = evaluarProyecto.EvaluacionConectividad;
            Rentabilidad = evaluarProyecto.EvaluacionRentabilidad;
            EvaluacionVendedor = evaluarVendedor;
        }
    }

    public class Vendedor
    {
        [BsonElement("Nombre")]
        public string Nombre { get; set; }

        [BsonElement("Apellido")]
        public string Apellido { get; set; }

        [BsonElement("UsuarioId")]
        public string UsuarioId { get; set; }

        [BsonElement("EvalPonderado")]
        public decimal EvalPonderado { get; set; }

        public void SetVendedor(Usuario usuario)
        {
            Nombre = usuario.Nombres;
            Apellido = usuario.Apellidos;
            UsuarioId = usuario.Id.ToString();
        }

        public void SetPonderado(decimal evalPonderado) => EvalPonderado = evalPonderado;
    }
}
