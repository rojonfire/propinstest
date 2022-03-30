using System.Collections.Generic;
using Corretaje.Repository;
using MongoDB.Bson.Serialization.Attributes;

namespace Corretaje.Domain
{
    //nuevos datos para tarjetaProp
    [BsonIgnoreExtraElements]
    public class TarjetaProp : Entity
    {
        [BsonElement("Banos")]
        public int Banos { get; set; }
        
        [BsonElement("CodigoPropiedad")]
        public string CodPropiedad { get; set; }

        [BsonElement("Comuna")]
        public string Comuna { get; set; }

        [BsonElement("Amoblado")] 
        public bool Amoblado { get; set; }
        
        [BsonElement("Usado")]
        public bool Usado { get; set; }
        
        [BsonElement("Bodega")]
        public int Bodega { get; set; }
        
        [BsonElement("Disponible")]
        public bool Disponible { get; set; }
        
        [BsonElement("Estacionamiento")]
        public bool Estacionamiento { get; set; }

        [BsonElement("Dormitorios")]
        public int Dormitorio { get; set; }

        [BsonElement("M2_construidos")]
        public double M2Construidos { get; set; }

        [BsonElement("M2_utiles")]
        public double M2Utiles { get; set; }
        
        [BsonElement("Nombre")]
        public string Nombre { get; set; }

        [BsonElement("Tipo")]
        public string TipoPropiedad { get; set; }
        
        [BsonElement("Valor")]
        public int Valor { get; set; }

        [BsonElement("id_proyecto")] 
        public string IdProyecto { get; set; }
        
        [BsonElement("id_usados")]
        public string IdUsados { get; set; }
        
        [BsonElement("Imagenes")]
        public List<Imagen> Imagenes { get; set; }

        [BsonElement("loc")]
        public Coodenadas Loc { get; set; }

        [BsonElement("IdPlan")]
        public string IdPlan { get; set; }

        [BsonElement("TipoMoneda")]
        public string TipoMoneda { get; set; }

        [BsonElement("TipoOperacion")]
        public string TipoOperacion { get; set; }
    }
}