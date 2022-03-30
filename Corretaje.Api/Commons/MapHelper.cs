using Corretaje.Api.Dto;
using Corretaje.Api.Dto.ContratacionPlan;
using Corretaje.Api.Dto.Plan;
using Corretaje.Api.Dto.Propiedad;
using Corretaje.Api.Dto.PropiedadPI;
using Corretaje.Api.Dto.ServicioAdicional;
using Corretaje.Api.Dto.ServicioBase;
using Corretaje.Domain;
using Corretaje.Domain.Agenda;
using Corretaje.Domain.PropiedadesPI;
using MongoDB.Bson;
using System;
using System.Collections.Generic;

namespace Corretaje.Api.Commons
{
    public class MapHelper : IMapHelper
    {
        public ICollection<PlanConServicioBaseFormateadoParaVistaDto> Map(IEnumerable<Plan> source)
        {
            var result = new List<PlanConServicioBaseFormateadoParaVistaDto>();

            foreach (var item in source)
            {
                result.Add(new PlanConServicioBaseFormateadoParaVistaDto()
                {
                    Id = item.Id.ToString(),
                    Nombre = item.Nombre
                });
            }

            return result;
        }

        public ICollection<ServicioBase> Map(IEnumerable<AgregarServicioBaseAPlanDto> source)
        {
            var result = new List<ServicioBase>();

            foreach (var item in source)
            {
                result.Add(new ServicioBase()
                {
                    Id = new ObjectId(item.Id),
                    Nombre = item.Nombre
                });
            }

            return result;
        }

        public ICollection<ServicioAdicional> Map(IEnumerable<AgregarServicioAdicionalAPlanDto> source)
        {
            var result = new List<ServicioAdicional>();

            foreach (var item in source)
            {
                result.Add(new ServicioAdicional()
                {
                    Id = new ObjectId(item.Id)
                });
            }

            return result;
        }


        public ICollection<ServicioBaseFormateadoParaVistaDto> Map(ICollection<ServicioBase> source)
        {
            var result = new List<ServicioBaseFormateadoParaVistaDto>();

            foreach (var item in source)
            {
                result.Add(new ServicioBaseFormateadoParaVistaDto()
                {
                    Id = item.Id.ToString(),
                    Nombre = item.Nombre
                });
            }

            return result;
        }

        public PlanConServicioBaseFormateadoParaVistaDto Map(Plan source)
        {
            return new PlanConServicioBaseFormateadoParaVistaDto()
            {
                Nombre = source.Nombre,
                ServiciosBase = Map(source.ServiciosBase)
            };
        }

        public ServicioBaseFormateadoParaVistaDto Map(ServicioBase source)
        {
            return new ServicioBaseFormateadoParaVistaDto()
            {
                Id = source.Id.ToString(),
                Nombre = source.Nombre
            };
        }

        public PlanDto MapPlanToPlan(Plan source)
        {
            var plan = new PlanDto()
            {
                Id = source.Id.ToString(),
                Nombre = source.Nombre,
                Precio = source.Precio,
                PrecioString = source.PrecioString,
                Descuento = source.Descuento,
                TextoDescuento = source.TextoDescuento,
                Fast = source.Fast,
                EsVenta = source.EsVenta
            };

            foreach (var servicioBase in source.ServiciosBase)
            {
                plan.ServiciosBase.Add(new ServicioBaseDto()
                {
                    Id = servicioBase.Id.ToString(),
                    Nombre = servicioBase.Nombre
                });
            }

            return plan;
        }

        public Plan MapAgregarPlanToPlan(AgregarPlanDto source)
        {
            var plan = new Plan()
            {
                Descripcion = source.Descripcion,
                Nombre = source.Nombre,
                Precio = source.Precio,
                PrecioString = source.Precio.ToString(),
                Descuento = source.Descuento,
                TextoDescuento = source.TextoDescuento,
                Fast = source.Fast,
                EsVenta = source.EsVenta
            };

            if (source.ServiciosBase != null && source.ServiciosBase.Count > 0)
            {
                foreach (var servicioBase in source.ServiciosBase)
                {
                    plan.ServiciosBase.Add(new ServicioBase()
                    {
                        Id = new ObjectId(servicioBase.Id),
                        Nombre = servicioBase.Nombre
                    });
                }
            }


            if (source.ServiciosAdicionales != null && source.ServiciosAdicionales.Count > 0)
            {
                foreach (var servicioAdicional in source.ServiciosAdicionales)
                {
                    plan.ServiciosAdicionales.Add(new ServicioAdicional()
                    {
                        Id = new ObjectId(servicioAdicional.Id)
                    });
                }
            }


            return plan;
        }

        public Plan MapPlanActualizar(PlanDto plan)
        {
            var planParaAgregar = new Plan()
            {
                Id = new ObjectId(plan.Id),
                Nombre = plan.Nombre,
                Precio = plan.Precio,
                PrecioString = plan.PrecioString,
                Fast = plan.Fast,
                Descuento = plan.Descuento,
                TextoDescuento = plan.TextoDescuento,
                EsVenta = plan.EsVenta,
                ServiciosBase = new List<ServicioBase>(),
                ServiciosAdicionales = new List<ServicioAdicional>()
            };


            if (plan.ServiciosBase != null && plan.ServiciosBase.Count > 0)
            {
                foreach (var servicioBase in plan.ServiciosBase)
                {
                    planParaAgregar.ServiciosBase.Add(MapServicioBase(servicioBase));
                }
            }

            if (plan.ServiciosAdicionales != null && plan.ServiciosAdicionales.Count > 0)
            {
                foreach (var servicioAdicional in plan.ServiciosAdicionales)
                {
                    planParaAgregar.ServiciosAdicionales.Add(MapServicioAdicional(servicioAdicional));
                }
            }


            return planParaAgregar;
        }

        private ServicioBase MapServicioBase(ServicioBaseDto servicioBase)
        {
            return new ServicioBase()
            {
                Id = new ObjectId(servicioBase.Id),
                Nombre = servicioBase.Nombre
            };
        }

        private ServicioAdicional MapServicioAdicional(ServicioAdicionalDto servicioAdicional)
        {
            return new ServicioAdicional()
            {
                Id = new ObjectId(servicioAdicional.Id),
                Nombre = servicioAdicional.Nombre,
                ExcluidoCalculoPrecioOrdenCompra = servicioAdicional.Excluido,
                Imagen = servicioAdicional.Imagen,
                ImagenUrl = servicioAdicional.ImagenUrl,
                Precio = servicioAdicional.Precio,
                Subtitulo = servicioAdicional.Subtitulo,
                TipoMoneda = servicioAdicional.TipoMoneda


            };
        }

        public IEnumerable<ObjectId> MapToObjectId (IEnumerable<AgregarServicioAdicionalAPlanDto> collection)
        {
            List<ObjectId> idCollection = new List<ObjectId>();

            foreach (var item in collection)
            {
                idCollection.Add(ObjectId.Parse(item.Id));
            }

            return idCollection;
        }

        public IEnumerable<ObjectId> MapToObjectId(IEnumerable<string> collection)
        {
            List<ObjectId> idCollection = new List<ObjectId>();

            foreach (var item in collection)
            {
                idCollection.Add(ObjectId.Parse(item));
            }

            return idCollection;
        }

        public Domain.Propiedad MapToPropiedad(AgregarContratacionPlanDto source)
        {
            DateTime fechaVisitaFotografo = DateTime.Now.AddDays(1);
            if (source.FechaVisitaFotografoString != null && !source.FechaVisitaFotografoString.Contains("T") && source.FechaVisitaFotografoString.Contains("-"))
            {
                string[] partesFecha = source.FechaVisitaFotografoString.Split("-");
                int anio = int.Parse(partesFecha[0]);
                int mes = int.Parse(partesFecha[1]);
                int dia = int.Parse(partesFecha[2]);
                fechaVisitaFotografo = new DateTime(anio, mes, dia);
            }

            return new Domain.Propiedad()
            {
                IdCliente = source.IdUsuario,
                TipoPropiedad = source.TipoProyecto.ToString(),
                DireccionReferencial = source.Direccion,
                NombreCalle = source.Direccion,
                Numero = source.Numero,
                NumeroDepartamento = source.NumeroDepartamento,
                Comuna = source.Comuna,
                Barrio = source.Barrio,
                Valor = source.Valor,
                TipoPrecio = source.TipoMoneda.ToString(),
                FechaVisitaFotografo = fechaVisitaFotografo,
                HoraVisitaFotografo = source.HoraVisitaFotografo,
                HorarioVisitas = source.HorarioVisitas,
                PropCar = new PropiedadCaracteristicas()
                {
                    SalaDeEstar = source.CaracteristicasAdicionales.SalaDeEstar,
                    Calefaccion = source.CaracteristicasAdicionales.TipoCalefaccion,
                    Alarma = source.CaracteristicasAdicionales.Alarma,
                    Escritorio = source.CaracteristicasAdicionales.Escritorio,
                    Logia = source.CaracteristicasAdicionales.Logia,
                    PortonAut = source.CaracteristicasAdicionales.PortonAutomatico,
                    CocinaAmo = source.CaracteristicasAdicionales.CocinaAmoblada
                },
                CarCom = new PropiedadCarCom()
                {
                    AccesoControlado = source.CaracteristicasComunidad.AccesoControlado,
                    EstVisita = source.CaracteristicasComunidad.EstacionamientoVisitas,
                    PortonElec = source.CaracteristicasComunidad.PortonElectrico,
                    SalonDeJuegos = source.CaracteristicasComunidad.SalaDeJuegos,
                    AreasVerdes = source.CaracteristicasComunidad.AreasVerdes,
                    Quincho = source.CaracteristicasComunidad.Quincho,
                    Sauna = source.CaracteristicasComunidad.Sauna,
                    CamaraSeguridad = source.CaracteristicasComunidad.CamaraSeguridad,
                    Bicicletros = source.CaracteristicasComunidad.Bicicletero,
                    SalaDeCine = source.CaracteristicasComunidad.SalaDeCine,
                    Citofono = source.CaracteristicasComunidad.Citofono,
                    JuegosInf = source.CaracteristicasComunidad.JuegosInfantiles,
                    Piscina = source.CaracteristicasComunidad.Piscina,
                    SalaDeEventos = source.CaracteristicasComunidad.SalaDeEventos
                },
                AnioConstruccion = source.CaracteristicasPropiedad.AnioConstruccion,
                Orientacion = source.CaracteristicasPropiedad.Orientacion,
                SuperficieUtil = source.CaracteristicasPropiedad.MetrosUtiles,
                SuperficieTotales = source.CaracteristicasPropiedad.MetrosTotales,
                Dormitorios = source.CaracteristicasPropiedad.NumeroDormitorios,
                Banio = source.CaracteristicasPropiedad.NumeroBanios,
                GastosComunes = source.CaracteristicasPropiedad.GastosComunes,
                Contribuciones = source.CaracteristicasPropiedad.Contribuciones,
                BanioServicio = source.CaracteristicasPropiedad.BanioServicio,
                TieneBodega = source.CaracteristicasPropiedad.Bodega
            };
        }

        public VisitaFotografo MapToVisitaFotografo(AgregarContratacionPlanDto contratoData, Domain.Usuario fotografo, string userId, string propiedadId)
        {
            DateTime fechaVisitaFotografo = DateTime.Now.AddDays(1);
            if (!contratoData.FechaVisitaFotografoString.Contains("T") && contratoData.FechaVisitaFotografoString.Contains("-"))
            {
                string[] partesFecha = contratoData.FechaVisitaFotografoString.Split("-");
                int anio = int.Parse(partesFecha[0]);
                int mes = int.Parse(partesFecha[1]);
                int dia = int.Parse(partesFecha[2]);
                fechaVisitaFotografo = new DateTime(anio, mes, dia);
            }

            return new VisitaFotografo()
            {
                Apellidos = fotografo.Apellidos,
                ClienteId = userId,
                Direccion = String.Format("{0}, {1}", contratoData.Direccion, contratoData.Comuna),
                Rut = fotografo.Rut,
                Email = fotografo.Email,
                FotografoId = fotografo.Id.ToString(),
                Telefono = fotografo.Telefono,
                Fecha = fechaVisitaFotografo,
                Dia = (Estados.Semana)fechaVisitaFotografo.DayOfWeek,
                Tramo = contratoData.HoraVisitaFotografo,
                Nombre = fotografo.Nombres,
                PropiedadId = propiedadId
            };
        }

        public VisitaFotografo MapToVisitaFotografo(Domain.Propiedad propiedad, Domain.Usuario fotografo, string userId)
        {
            return new VisitaFotografo()
            {
                Apellidos = fotografo.Apellidos,
                ClienteId = userId,
                Direccion = propiedad.TipoPropiedad.ToLower() == "casa" ? String.Format("{0} {1}, {2}", propiedad.NombreCalle, propiedad.Numero, propiedad.Comuna) : String.Format("{0} {1} departamento {2}, {3}", propiedad.NombreCalle, propiedad.Numero, propiedad.NumeroDepartamento, propiedad.Comuna),
                Rut = fotografo.Rut,
                Email = fotografo.Email,
                FotografoId = fotografo.Id.ToString(),
                Telefono = fotografo.Telefono,
                Fecha = propiedad.FechaVisitaFotografo,
                Dia = (Estados.Semana)propiedad.FechaVisitaFotografo.DayOfWeek,
                Tramo = propiedad.HoraVisitaFotografo,
                Nombre = fotografo.Nombres,
                PropiedadId = propiedad.Id.ToString()
            };
        }

        public IEnumerable<BloqueCliente> MapToBloqueCliente(List<string> horarioVisita, string userId, string propiedadId)
        {
            List<BloqueCliente> bloques = new List<BloqueCliente>();
            foreach(string h in horarioVisita)
            {
                string[] bloque = h.Split(";");
                string hora = bloque[0];
                int dia = int.Parse(bloque[1]);
                bloques.Add(new BloqueCliente()
                {
                    ClienteId = userId,
                    Dia = (Estados.Semana)dia,
                    Tramo = hora,
                    PropiedadId = propiedadId
                });
                
            };

            return bloques;
        }

        public TarjetaProp MapToTarjetaProp(Domain.Propiedad propiedad, string idTarjetaProp = null)
        {
            TarjetaProp tarjetaProp = new TarjetaProp();
            tarjetaProp.Amoblado = propiedad.Amoblado;
            tarjetaProp.Banos = propiedad.Banio;
            tarjetaProp.Bodega = propiedad.Bodega;
            tarjetaProp.CodPropiedad = propiedad.CodigoPropiedad;
            tarjetaProp.Comuna = propiedad.Comuna;
            tarjetaProp.Dormitorio = propiedad.Dormitorios;
            tarjetaProp.Estacionamiento = propiedad.Estacionamiento;
            tarjetaProp.Imagenes = propiedad.Imagenes;
            tarjetaProp.M2Construidos = propiedad.SuperficieTotales;
            tarjetaProp.M2Utiles = propiedad.SuperficieUtil;
            tarjetaProp.TipoPropiedad = propiedad.TipoPropiedad;
            tarjetaProp.Metadata = propiedad.Metadata;
            tarjetaProp.Valor = int.Parse(propiedad.Valor.ToString());
            tarjetaProp.Disponible = propiedad.Disponible;
            tarjetaProp.IdUsados = propiedad.Id.ToString();
            tarjetaProp.Usado = true;
            tarjetaProp.Loc = propiedad.Loc;
            tarjetaProp.TipoMoneda = propiedad.TipoPrecio;
            if (propiedad.PlanContratado != null)
            {
                tarjetaProp.IdPlan = propiedad.PlanContratado.Id.ToString();
                tarjetaProp.TipoOperacion = propiedad.PlanContratado.EsVenta ? "venta" : "arriendo";
            }
            if (idTarjetaProp != null)
            {
                tarjetaProp.Id = new ObjectId(idTarjetaProp);
            }
            return tarjetaProp;
        }

        public Cliente MapUsuarioToCliente(Domain.Usuario usuario)
        {
            return new Cliente()
            {
                Apellidos = usuario.Apellidos,
                Direccion = usuario.Direccion,
                EstadoCivil = usuario.EstadoCivil,
                FechaNacimiento = usuario.FechaNacimiento,
                Mail = usuario.Email,
                Nombres = usuario.Nombres,
                Oficio = usuario.Oficio,
                Password = usuario.Password,
                Rut = usuario.Rut,
                Telefono = usuario.Telefono
            };
        }

        public PIPropiedadNatural MapPropiedadPIANatural(PropiedadPIDto propiedad)
        {
            return new PIPropiedadNatural()
            {
                Banios = propiedad.Banios,
                Barrio = propiedad.Barrio,
                Comuna = propiedad.Comuna,
                Dormitorios = propiedad.Dormitorios,
                Estacionamientos = propiedad.Estacionamientos,
                Precio = propiedad.Precio,
                Link = propiedad.Link,
                SuperficieTotal = propiedad.SuperficieTotal,
                SuperficieUtil = propiedad.SuperficieUtil,
                TipoPropiedad = propiedad.TipoPropiedad,
                UF_m2 = propiedad.UF_m2
            };
        }

        public PIPropiedadInmobiliaria MapPropiedadPIAInmobiliaria(PropiedadPIDto propiedad)
        {
            return new PIPropiedadInmobiliaria()
            {
                Banios = propiedad.Banios,
                Barrio = propiedad.Barrio,
                Comuna = propiedad.Comuna,
                Dormitorios = propiedad.Dormitorios,
                Estacionamientos = propiedad.Estacionamientos,
                Precio = propiedad.Precio,
                Link = propiedad.Link,
                SuperficieTotal = propiedad.SuperficieTotal,
                SuperficieUtil = propiedad.SuperficieUtil,
                TipoPropiedad = propiedad.TipoPropiedad,
                UF_m2 = propiedad.UF_m2
            };
        }

        public PIPropiedadArriendo MapPropiedadPIAArriendo(PropiedadPIDto propiedad)
        {
            return new PIPropiedadArriendo()
            {
                Banios = propiedad.Banios,
                Barrio = propiedad.Barrio,
                Comuna = propiedad.Comuna,
                Dormitorios = propiedad.Dormitorios,
                Estacionamientos = propiedad.Estacionamientos,
                Precio = propiedad.Precio,
                Link = propiedad.Link,
                SuperficieTotal = propiedad.SuperficieTotal,
                SuperficieUtil = propiedad.SuperficieUtil,
                TipoPropiedad = propiedad.TipoPropiedad,
                UF_m2 = propiedad.UF_m2
            };
        }

        public Domain.Tasacion.TasacionPropiedad MapPropiedadATasacion(Domain.Propiedad propiedad)
        {
            return new Domain.Tasacion.TasacionPropiedad
            {
                Comuna = propiedad.Comuna,
                MetrosTotales = Convert.ToInt32(propiedad.SuperficieTotales),
                MetrosUtiles = Convert.ToInt32(propiedad.SuperficieUtil),
                NumeroDormitorios = propiedad.Dormitorios,
                NumeroEstacionamientos = propiedad.CantEstacionamiento,
                Sector = propiedad.Barrio,
                TipoVivienda = propiedad.TipoPropiedad
            };
        }

        public PropiedadFastEmailDto MapPropiedadFastAMail(Domain.Propiedad propiedad, Domain.Cliente cliente)
        {
            return new PropiedadFastEmailDto
            {
                NombreCalle = propiedad.NombreCalle,
                Numero = propiedad.Numero,
                NumeroDepartamento = propiedad.NumeroDepartamento,
                Comuna = propiedad.Comuna,
                Barrio = propiedad.Barrio,
                TipoPropiedad = propiedad.TipoPropiedad,
                CodigoPropiedad = propiedad.CodigoPropiedad,
                FechaContratacion = propiedad.CreatedAt,
                NombreCliente = $"{cliente.Nombres} {cliente.Apellidos}",
                RutCliente = cliente.Rut,
                EmailCliente = cliente.Mail,
                TelefonoCliente = cliente.Telefono
            };
        }

        public PropiedadSubidaBrokerEmailDto MapPropiedadSubidaPorBrokerAEmail(Domain.Propiedad propiedad, Cliente cliente, Domain.Usuario broker)
        {
            return new PropiedadSubidaBrokerEmailDto
            {
                Direccion = propiedad.TipoPropiedad.ToLower() == "departamento" 
                    ? $"{propiedad.NombreCalle} {propiedad.Numero} departamento {propiedad.NumeroDepartamento}"
                    : $"{propiedad.NombreCalle} {propiedad.Numero}",
                Comuna = propiedad.Comuna,
                Barrio = propiedad.Barrio,
                TipoPropiedad = propiedad.TipoPropiedad,
                FechaSubida = propiedad.CreatedAt.ToString(),
                NombreCliente = $"{cliente.Nombres} {cliente.Apellidos}",
                RutCliente = cliente.Rut,
                EmailCliente = cliente.Mail,
                NombreBroker = $"{broker.Nombres} {broker.Apellidos}"
            };
        }
    }
}
