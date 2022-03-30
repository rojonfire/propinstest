﻿namespace Corretaje.Domain.Tasacion
{
    public class DatosTasacionDto
    {
        public string Comuna { get; set; }

        public string Barrio { get; set; }

        public int Precio { get; set; }

        public int SuperficieTotal { get; set; }

        public int SuperficieUtil { get; set; }

        public int Dormitorios { get; set; }

        public string TipoPropiedad { get; set; }

        public string Link { get; set; }

        public double UF_m2 { get; set; }

        public int Estacionamientos { get; set; }
    }
}
