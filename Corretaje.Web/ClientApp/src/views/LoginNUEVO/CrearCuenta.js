import React from "react";
import {connect} from "react-redux";
import {Row, Navbar, Col, Container,Card} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {Formik, Form, Field, ErrorMessage} from "formik";
import ReCAPTCHA from "react-google-recaptcha";
import {creaCuenta} from "../../action";
import icon from "../../utils/images";
import utils from "../../utils/utilsFunc";
import sweetalert from "sweetalert";
import KEYS from "../../utils/keys";

class CrearCuenta extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            captchaToken: null,
            submitted: false,
            acceptTerms: false,
        };
    }

    componentDidUpdate() {
        const {userAccount, goToStep} = this.props;
        const {submitted} = this.state;

        if (submitted) {
            if (userAccount && userAccount.estado === 1) {
                sweetalert({
                    title: "Cuenta creada con éxito",
                    icon: "success",
                    dangerMode: false,
                });
                goToStep(1);
            } else if (userAccount && userAccount.estado === 0) {
                sweetalert({
                    title: "Ups!",
                    text: userAccount.mensaje,
                    icon: "warning",
                    dangerMode: true,
                });
            } else if (!userAccount) {
                sweetalert({
                    title: "Ups!",
                    text: "Ha ocurrido un error inesperado",
                    icon: "warning",
                    dangerMode: true,
                });
            }
        }
    }

    handleCaptcha = (captchaToken) => {
        this.setState({captchaToken});
    };

    handleTerms = () => {
        this.setState({acceptTerms: !this.state.acceptTerms});
    };

    handleRut = (value) => {
        return utils.formatRut(value);
    };

    onSubmit(values, opts) {
        const {dispatch} = this.props;

        this.setState({submitted: true}, () => {
            const rut = values.rut.replace(/\./g, "").replace(/-/g, "");
            const data = {
                nombres: values.nombres,
                apellidos: values.apellidos,
                rut: rut,
                mail: values.mail,
                telefono: values.telefono,
                password: values.password,
                tipoCuenta: 1,
            };
            dispatch(creaCuenta(data));
            opts.resetForm({
                nombres: "",
                apellidos: "",
                rut: "",
                mail: "",
                telefono: "",
                password: "",
                passwordConfirm: "",
            });
        });
    }

    render() {
        const {text, title, goToStep} = this.props;
        const {captchaToken, acceptTerms} = this.state;

        return (
            <Container fluid={true}>
                <div id="login" className="cont-login cont-100vh">
                    <div className="izquierda"><LinkContainer to={"/"}>
                        <Navbar.Brand>
                            <img className="nav-global" src={icon.logoColorGris} alt=":p"/>
                        </Navbar.Brand>
                    </LinkContainer></div>
                    <div className="cont-info">
                        
                        <div className="title-section">
                            <span className="h4 text-primary">{title}</span>
                        </div>
                        <p>{text}</p>
                        <span>
              ¿Ya tienes una cuenta?{" "}
                            <a onClick={() => goToStep(1)} className="text-primary">
                Iniciar sesión
              </a>
            </span>
                    </div>
                    <Row>
                        <Col md="12"/>
                    </Row>
                    <Formik
                        initialValues={{
                            nombres: "",
                            apellidos: "",
                            rut: "",
                            mail: "",
                            telefono: "",
                            password: "",
                            passwordConfirm: "",
                        }}
                        validate={validate}
                        onSubmit={(e, opts) => this.onSubmit(e, opts)}
                    >
                        {({isSubmitting, setFieldValue}) => (
                            <Form>
                                <Card>
                                <Row>
                                    <Col></Col>
                                    <Col className="widthcol">
                                        <div className="form-group-proper cajaynombre">
                                            <div className="izquierda"><label className="contact-proper2">Nombres </label></div>
                                            <div className="input-group">
                                                <Field className="reginorma " type="" name="nombres"/>
                                            </div>
                                            <ErrorMessage
                                                name="nombres"
                                                className="contact-error"
                                                component="div"
                                            />
                                        </div>
                                        <div className="form-group-proper cajaynombre">
                                            <div className="izquierda"><label className="contact-proper2">Apellidos </label></div>
                                            <div className="input-group">
                                                <Field
                                                    className="reginorma "
                                                    type=""
                                                    name="apellidos"
                                                />
                                            </div>
                                            <ErrorMessage
                                                name="apellidos"
                                                className="contact-error"
                                                component="div"
                                            />
                                        </div>

                                        <div className="form-group-proper cajaynombre">
                                            <div className="izquierda"><label className="contact-proper2">   Correo Electrónico* </label></div>
                                               
                                            <div className="input-group">
                                                
                                                <Field
                                                    className="reginorma "
                                                    type=""
                                                    name="mail"
                                                    placeholder="nombre@ejemplo.com"
                                                />
                                            </div>
                                            <ErrorMessage
                                                name="mail"
                                                className="contact-error"
                                                component="div"
                                            />
                                        </div>
                                        <div className="form-group-proper cajaynombre">
                                            <div className="izquierda"><label className="contact-proper2">Celular*</label></div>
                                            <div className="input-group">
                                               
                                                <Field
                                                    className="reginorma "
                                                    type=""
                                                    name="telefono"
                                                    placeholder="569988776655"
                                                    maxLength="12"
                                                />
                                            </div>
                                            <ErrorMessage
                                                name="telefono"
                                                className="contact-error"
                                                component="div"
                                            />
                                        </div>
                                        <div className="form-group-proper form-check terminos">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="terminos"
                                                onChange={this.handleTerms}
                                            />
                                            <label className="izquierda" htmlFor="terminos">
                                                Aceptar{" "}
                                                <a className="text-primary" href="/terminosycondiciones">
                                                    términos y condiciones
                                                </a>
                                            </label>
                                        </div>
                                    </Col>
                                    <Col className="widthcol2">
                                        <div className="form-group-proper cajaynombre">
                                            <div className="izquierda"><label className="contact-proper2">Rut*</label></div>
                                            <div className="input-group">
                                                
                                                <Field
                                                    className="reginorma "
                                                    type=""
                                                    name="rut"
                                                    placeholder="17777555-4"
                                                    onChange={(e) =>
                                                        setFieldValue("rut", this.handleRut(e.target.value))
                                                    }
                                                />
                                            </div>
                                            <ErrorMessage
                                                name="rut"
                                                className="contact-error"
                                                component="div"
                                            />
                                        </div>

                                        <div className="form-group-proper cajaynombre">
                                            <div className="izquierda"><label className="contact-proper2">Contraseña</label></div>
                                            <div className="input-group">
                                                
                                                <Field
                                                    className="reginorma "
                                                    type="password"
                                                    name="password"
                                                />
                                            </div>
                                            <ErrorMessage
                                                name="password"
                                                className="contact-error"
                                                component="div"
                                            />
                                        </div>
                                        <div className="form-group-proper cajaynombre">
                                            <div className="izquierda"><label className="contact-proper2">Confirmar contraseña</label></div>
                                            <div className="input-group">
                                              
                                                <Field
                                                    className="reginorma "
                                                    type="password"
                                                    name="passwordConfirm"
                                                />
                                            </div>

                                            <ErrorMessage
                                                name="passwordConfirm"
                                                className="contact-error"
                                                component="div"
                                            />
                                        </div>
                                        <div id="form-group">
                                            <ReCAPTCHA
                                                className="center captcha feo"
                                                sitekey={KEYS.GOOGLE_RECAPTCHA_API_KEY}
                                                onChange={this.handleCaptcha}
                                                size="normal"
                                            />
                                        </div>

                                        
                                        
                                    </Col>
                                    <Col></Col>
                                </Row>
                                  
                                    <Row className="center text-center">
                                        <Col md="12">
                                            <button
                                                className="btn btn-primary btn-margin5 btn-center largoboton"
                                                type="submit"
                                                disabled={isSubmitting || !acceptTerms}
                                            >
                                                {isSubmitting ? "Enviando..." : "Registrarme"}
                                            </button>
                                        </Col>
                                    </Row>
                                </Card>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Container>
        );
    }
}

const validate = (formValues) => {
    let errors = {};

    if (formValues.nombres === "") {
        errors.nombres = "Por favor ingrese sus nombres";
    }
    if (formValues.apellidos === "") {
        errors.apellidos = "Por favor ingrese sus apellidos";
    }

    if (utils.checkRut(formValues.rut)) {
        errors.rut = utils.checkRut(formValues.rut);
    }
    if (formValues.mail === "") {
        errors.mail = "Por favor ingrese su correo electrónico";
    }
    if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues.mail) &&
        formValues.mail !== ""
    ) {
        errors.mail = "Correo electrónico no valido";
    }
    if (formValues.telefono === "") {
        errors.telefono = "Por favor ingrese su Telefono";
    } else if (isNaN(formValues.telefono)) {
        errors.telefono = "Por favor solo agregue numeros";
    }
    if (formValues.passwordConfirm === "") {
        errors.passwordConfirm = "Por favor ingrese nuevamente su contraseña";
    }
    if (formValues.password === "") {
        errors.password = "Por favor ingrese una contraseña";
    }
    if (
        formValues.password !== "" &&
        formValues.passwordConfirm !== "" &&
        formValues.passwordConfirm !== formValues.password
    ) {
        errors.passwordConfirm = "La contraseña no coincide";
    }

    return errors;
};

const mapStateToProps = (state) => {
    const {app} = state;
    return {userAccount: app.userAccount};
};

const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => {
        dispatch(action);
    },
});

CrearCuenta = connect(mapStateToProps, mapDispatchToProps)(CrearCuenta);

export default CrearCuenta;
