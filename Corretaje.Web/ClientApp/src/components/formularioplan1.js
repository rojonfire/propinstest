import React , {Component} from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  Alert,
} from "react-bootstrap";
import {Formik, Form, Field, ErrorMessage} from "formik";
import Select from "react-select";
import {Popover} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {submit} from "redux-form";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";


const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

export class DireccionPropiedad extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
      Comunas: [{}]
    };
  }
  datosPropiedad = values => {
    const { continuar} = this.props; // esto se conecta con planesUbicacion
    continuar(values);
   
  };
  render()  {
    const options = [
      {value: "Casa", label: "Casa"},
      {value: "Departamento", label: "Departamento"},
    ];

    const options2 = [
      {value: "Las Condes", label: "Las Condes"},
      {value: "Lo Barnechea", label: "Lo barnechea"},
      {value: "Vitacura", label: "Vitacura"},
      {value: "Santiago", label: "Santiago"},
      {value: "Providencia", label: "Providencia"},
      {value: "Ñuñoa", label: "Ñuñoa"},
      {value: "La Reina", label: "La Reina"},
      {value: "Peñalolen", label: "Peñalolen"},
      {value: "Macul", label: "Macul"},
      {value: "Colina", label: "Colina"},
      {value: "La Florida", label: "La Florida"},
    ];
 

    

    return (

        <Container className="">
          
          <section className={""}>
            <Formik
                initialValues={{
                  Tipo_Propiedad: "",
                  Direccion: "",
                  Numero: "",
                  Numero_depto: "",
                  Comuna: "",
                }}
                validate={validate}
                onSubmit={this.datosPropiedad}
            >
              <form>
                <div className="formulario-propiedades-planes">
                  <label className="contact-proper">Tipo de Propiedad</label>
                  <Select
                      theme={theme => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                          ...theme.colors,
                          primary25: 'lightgrey',
                          primary: 'grey',
                        },
                      })}
                      options={options}
                      className="largo-opciones-select-planes "
                  />


                </div>

                <div className="formulario-propiedades-planes">
                  <label className="contact-proper">Dirección</label>
                  <Field className="largo-opciones-select-planes2" type="" name="Direccion"/>

                  <ErrorMessage
                      name="Direccion"
                      className="contact-error"
                      component="div"
                  />
                </div>
                <Row className={"center"}>
                  <Col className={"campo-planes-pequeno"}>
                    <div className="">
                      <label className="contact-proper">Número</label>
                    </div>
                    <div><Field className="largo-estatico-peque" type="" name="Numero"/></div>

                    <ErrorMessage
                        name="Numero"
                        className="contact-error"
                        component="div"
                    />

                  </Col>
                  <Col className={"center"}>
                    <div className="">
                      <label className="contact-proper">N° Departamento</label></div>
                    <div><Field className="largo-estatico-peque" type="" name="Numero_depto"/></div>

                    <ErrorMessage
                        name="Numero_depto"
                        className="contact-error"
                        component="div"
                    />

                  </Col>
                </Row>
                <div className="formulario-propiedades-planes">
                  <label className="contact-proper">Comuna </label>
                  <Select
                      theme={theme => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                          ...theme.colors,
                          primary25: 'lightgrey',
                          primary: 'grey',
                        },
                      })}

                      className="largo-opciones-select-planes "
                      classNamePrefix=""
                      options={options2}
                      id="Comuna"
                      name={"Comuna"}

                  />
                </div>
                <Button
                    className={"center"}
                    type="submit"

                >
                  Continuar
                </Button>
              </form>
              
            </Formik>

          </section>


            <Formik>
                <Form>
                    <Row>
                        <Col>
                            <FormControlLabel
                                value="Acceso Controlado"
                                control={<Checkbox color="#00A72C" />}
                                label="Acceso Controlado"
                                labelPlacement="end"
                            />
                        </Col>
                        <Col>
                            <FormControlLabel
                                value="Sala de juegos"
                                control={<Checkbox color="#00A72C" />}
                                label="Sala de juegos"
                                labelPlacement="end"
                            />
                        </Col>
                        <Col>
                            <FormControlLabel
                                value="Sauna"
                                control={<Checkbox color="#00A72C" />}
                                label="Sauna"
                                labelPlacement="end"
                            />
                        </Col>
                        <Col>
                            <FormControlLabel
                                value="Citófono"
                                control={<Checkbox color="#00A72C" />}
                                label="Citófono"
                                labelPlacement="end"
                            />
                        </Col>
                        <Col>
                            <FormControlLabel
                                value="Sala de eventos"
                                control={<Checkbox color="#00A72C" />}
                                label="Sala de eventos"
                                labelPlacement="end"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormControlLabel
                                value="Áreas verdes"
                                control={<Checkbox color="#00A72C" />}
                                label="Áreas verdes"
                                labelPlacement="end"
                            />
                        </Col>
                        <Col>
                            <FormControlLabel
                                value="Bicicletero"
                                control={<Checkbox color="#00A72C" />}
                                label="Bicicletero"
                                labelPlacement="end"
                            />
                        </Col>
                        <Col>
                            <FormControlLabel
                                value="Juegos infantiles"
                                control={<Checkbox color="#00A72C" />}
                                label="Juegos infantiles"
                                labelPlacement="end"
                            />
                        </Col>
                        <Col>
                            <FormControlLabel
                                value="Quincho"
                                control={<Checkbox color="#00A72C" />}
                                label="Quincho"
                                labelPlacement="end"
                            />
                        </Col>
                        <Col>
                            <FormControlLabel
                                value="Estacionamiento visitas"
                                control={<Checkbox  />}
                                label="Estacionamiento visitas"
                                labelPlacement="end"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormControlLabel
                                value="Sala de cine"
                                control={<Checkbox  />}
                                label="Sala de cine"
                                labelPlacement="end"
                            />
                        </Col>
                        <Col>
                            <FormControlLabel
                                value="Ascensor"
                                control={<Checkbox  />}
                                label="Ascensor"
                                labelPlacement="end"
                            />
                        </Col>
                        <Col>
                            <FormControlLabel
                                value="Portón eléctrico"
                                control={<Checkbox  />}
                                label="Portón eléctrico"
                                labelPlacement="end"
                            />
                        </Col>
                        <Col>
                            <FormControlLabel
                                value="Piscina"
                                control={<Checkbox  />}
                                label="Piscina"
                                labelPlacement="end"
                            />
                        </Col>
                        <Col>
                            <FormControlLabel
                                value="Cámara de seguridad"
                                control={<Checkbox  />}
                                label="Cámara de seguridad"
                                labelPlacement="end"
                            />
                        </Col>
                    </Row>
                </Form>
            </Formik>
          
        </Container>
        
        
        
        
        
        


    );
  }
}


const validate = (formValues)=> {
  let errors = {};

  if (formValues.Numero === "") {
    errors.Numero = "Por favor ingrese el numero de su propiedad";
  } else if (isNaN(formValues.Numero)) {
    errors.Numero = "Por favor solo agregue numeros";
  }
  return errors;
}

export default DireccionPropiedad;



