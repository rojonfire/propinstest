using Corretaje.Api.Dto.PdfContrato;
using Corretaje.Domain;
using System;

namespace Corretaje.Api.Commons
{
    public class ContratoHelper : IContratoHelper
    {
        public ContratoDeArrendamientoDto GetContratoDeArrendamiento(Cliente arrendador, Contrato contrato, Domain.Propiedad propiedad, Domain.Usuario arrendatario)
        {
            return new ContratoDeArrendamientoDto()
            {
                Arrendador = new ArrendadorDto()
                {
                    CedulaIdentidad = arrendador.Rut,
                    CorreoElectronico = arrendador.Mail,
                    Domicilio = new DireccionDto()
                    {
                        Comuna = "",
                        NombreCalle = "",
                        NumeroCalle = "",
                        NumeroDepartamento = ""
                    },
                    EstadoCivil = arrendador.EstadoCivil,
                    Nacionalidad = "",
                    Nombre = $"{arrendador.Nombres} {arrendador.Apellidos}"
                },
                Arrendatario = new ArrendatarioDto()
                {
                    CedulaIdentidad = arrendatario.Rut,
                    CorreoElectronico = arrendatario.Email,
                    Domicilio = new DireccionDto()
                    {
                        Comuna = "",
                        NombreCalle = "",
                        NumeroCalle = "",
                        NumeroDepartamento = ""
                    },
                    EstadoCivil = arrendatario.EstadoCivil,
                    Nacionalidad = "",
                    Nombre = $"{arrendatario.Nombres} {arrendatario.Apellidos}"
                },
                CodeudorSolidario = new CodeudorSolidarioDto()
                {
                    CedulaIdentidad = "",
                    CorreoElectronico = "",
                    Domicilio = new DireccionDto()
                    {
                        Comuna = "",
                        NombreCalle = "",
                        NumeroCalle = "",
                        NumeroDepartamento = ""
                    },
                    EstadoCivil = "",
                    Nacionalidad = "",
                    Nombre = ""
                },
                CuentaCorriente = new CuentaCorrienteDto()
                {
                    BancoNombre = "",
                    Numero = "",
                    TitularCedulaIdentidad = "",
                    TitularCorreoElectronico = "",
                    TitularNombre = ""
                },
                FechaEmisionContrato = DateTime.Now,
                MontoGarantiaDeArriendo = contrato.MontoGarantiaArriendo,
                Plazos = new PlazosDto()
                {
                    FechaFin = DateTime.Now,
                    FechaInicio = DateTime.Now,
                    MesesPeriodoDeRenovacion = 1
                },
                Propiedad = new PropiedadDto()
                {
                    CantidadDeBodegas = 1,
                    CantidadDeEstacionamientos = 1,
                    Direccion = new DireccionDto()
                    {
                        NombreCalle = propiedad.DireccionReferencial
                    },
                    ForjasNombre = "",
                    ForjasNumero = "",
                    PropiedadAñoRegistro = 1,
                    Rol = "",
                },
                RentaMontoUf = contrato.MontoUf,
                Estado = contrato.Estado
            };
        }

        public PromesaDeCompraVentaDto GetPromesaDeCompraVenta(Cliente vendedor, Contrato contrato, Domain.Propiedad propiedad, Domain.Usuario comprador)
        {
            return new PromesaDeCompraVentaDto()
            {
                ProminenteCompradora = new ProminenteCompradoraDto()
                {
                    CedulaIdentidad = comprador.Rut,
                    CorreoElectronico = comprador.Email,
                    Domicilio = new DireccionDto()
                    {
                        Comuna = "",
                        NombreCalle = "",
                        NumeroCalle = "",
                        NumeroDepartamento = ""
                    },
                    EstadoCivil = comprador.EstadoCivil,
                    Nacionalidad = "",
                    Nombre = $"{comprador.Nombres} {comprador.Apellidos}",
                    ProfesionOficio = comprador.Oficio
                },
                ProminenteVendedora = new ProminenteVendedoraDto()
                {
                    CedulaIdentidad = vendedor.Rut,
                    CorreoElectronico = vendedor.Mail,
                    Domicilio = new DireccionDto()
                    {
                        Comuna = "",
                        NombreCalle = "",
                        NumeroCalle = "",
                        NumeroDepartamento = ""
                    },
                    EstadoCivil = vendedor.EstadoCivil,
                    Nacionalidad = "",
                    Nombre = $"{vendedor.Nombres} {vendedor.Apellidos}",
                    ProfesionOficio = vendedor.Oficio
                },
                Propiedad = new PropiedadDto()
                {
                    Direccion = new DireccionDto()
                    {

                    }
                },
                Estado = contrato.Estado
            };
        }

        public string GetContratoArrendamientoTemplateName(Contrato contrato)
        {
            const string ContratoArrendamientoBorradorTemplateName = "ContratoArrendamientoBorrador";
            const string ContratoArrendamientoFinalizadoTemplateName = "ContratoArrendamientoFinalizado";

            if (contrato.Estado == Estados.Contrato.Borrador)
            {
                return ContratoArrendamientoBorradorTemplateName;
            }

            return ContratoArrendamientoFinalizadoTemplateName;
        }

        public string GetPromesaDeCompraVentaTemplateName(Contrato contrato)
        {
            const string ContratoPromesaCompraVentaBorradorTemplateName = "PromesaCompraVentaBorrador";
            const string ContratoPromesaCompraVentaFinalizadoTemplateName = "PromesaCompraVentaFinalizado";

            if (contrato.Estado == Estados.Contrato.Borrador)
            {
                return ContratoPromesaCompraVentaBorradorTemplateName;
            }

            return ContratoPromesaCompraVentaFinalizadoTemplateName;
        }
    }
}
