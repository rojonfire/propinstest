let user = JSON.parse(localStorage.getItem("user"));

export default function(tipoCuenta) {
  return [
    {
      title: "Home",
      htmlBefore: '<i class="material-icons">location_city</i>',
      to: "/home",
      perfiles: [0, 1, 2, 3, 4, 5, 6, 9, 10],
    },
    {
      title: tipoCuenta && tipoCuenta === 6 ? "Agentes" : "Usuarios",
      htmlBefore: '<i class="material-icons">account_box</i>',
      to: tipoCuenta && tipoCuenta === 6 ? "/agentes" : "/usuarios",
      perfiles: [0, 6, 9, 10],
    },
    {
      title: "Propiedades",
      htmlBefore: '<i class="material-icons">location_city</i>',
      to: "/propiedades",
      perfiles: [0, 9, 10],
    },
    {
      title: "Agendar Visitas Propiedad",
      htmlBefore: '<i class="material-icons">calendar_today</i>',
      to: "/calendario",
      perfiles: [0, 9, 10],
    },
    {
      title: "Inmobiliarias",
      htmlBefore: '<i class="material-icons">location_city</i>',
      to: "/inmobiliarias",
      perfiles: [0],
    },

    //escondido porque ya no se usa, si se quiere crear cliente hacerlo en USUARIO, al crear usuario se crea su entidad cliente.
    /*
    {
      title: "Clientes",
      htmlBefore: '<i class="material-icons">verified_user</i>',
      to: "/clientes",
      perfiles: [0],
    },
    */
    {
      title: "Proyectos",
      htmlBefore: '<i class="material-icons">account_box</i>',
      to: "/proyectos",
      perfiles: [0, 6],
    },
    {
      title: "Horario Fotografo",
      htmlBefore: '<i class="material-icons">photo_camera</i>',
      to: "/horafoto",
      perfiles: [0, 3],
    },
    {
      title: "Agenda Fotografo",
      htmlBefore: '<i class="material-icons">assistant_photo</i>',
      to: "/agendafoto",
      perfiles: [0, 3],
    },
    {
      title: "Tomar Tramo Anfitrión",
      htmlBefore: '<i class="material-icons">view_agenda</i>',
      to: "/horaanfi",
      perfiles: [0, 4],
    },
    {
      title: "Planes",
      htmlBefore: '<i class="material-icons">swap_calls</i>',
      to: "/planes",
      perfiles: [0],
    },
    {
      title: "Servicios",
      htmlBefore: '<i class="material-icons">assessment</i>',
      to: "/tables",
      perfiles: [0],
    },
    {
      title: "Horario Agente",
      htmlBefore: '<i class="material-icons">assessment</i>',
      to: "/liveAgenda",
      perfiles: [0, 5],
    },
    {
      title: "Agenda Live",
      htmlBefore: '<i class="material-icons">assistant_photo</i>',
      to: "/agendaLive",
      perfiles: [0, 5],
    },
    {
      title: "Datos Tasacion",
      htmlBefore: '<i class="material-icons">home_work</i>',
      to: "/datostasacion",
      perfiles: [0],
    },
    {
      title: "Personal Broker",
      htmlBefore: '<i class="material-icons">contact_mail</i>',
      to: "/suscripcion",
      perfiles: [0, 9],
    },
    {
      title: "Referir y Recursos",
      htmlBefore: '<i class="material-icons">record_voice_over</i>',
      to: "/referir",
      perfiles: [0, 10],
    },
    {
      title: "Mis Propiedades",
      htmlBefore: '<i class="material-icons">event</i>',
      to: "/mispropiedades",
      perfiles: [0, 10],
    },
    {
      title: "Vendedores (leads)",
      htmlBefore: '<i class="material-icons">event</i>',
      to: "/vendedores",
      perfiles: [0, 9],
    },
    {
      title: "Pagos",
      htmlBefore: '<i class="material-icons">monetization_on</i>',
      to: "/pagos",
      perfiles: [0],
    },
    {
      title: "Mis embajadores",
      htmlBefore: '<i class="material-icons">monetization_on</i>',
      to: "/misembajadores",
      perfiles: [10],
    },
    {
      title: "Landing Inmobiliarias",
      htmlBefore: '<i class="material-icons">monetization_on</i>',
      to: "/landinginmobiliaria",
      perfiles: [0, 9, 10],
    },
  ];
}
