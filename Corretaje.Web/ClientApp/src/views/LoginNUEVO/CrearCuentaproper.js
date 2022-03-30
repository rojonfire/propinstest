import React from "react";
import {connect} from "react-redux";
import {Row, Navbar, Col, Container} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import api from "../../api"
import {Formik, Form, Field, ErrorMessage} from "formik";
import Select from "react-select";
import {login, setLoading} from "../../action";
import icon from "../../utils/images";
import utils from "../../utils/utilsFunc";
import sweetalert from "sweetalert";

class CrearCuentaproper extends React.Component {
    constructor(props) {
        super(props);
        const {dispatch} = this.props;
        this.state = {
            captchaToken: null,
            submitted: false,
            acceptTerms: false,
            MedioPago: null,
            TipoCuenta: null,
            Banco: null,
        };
        dispatch(setLoading(false));
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
            } else if (userAccount.mail === userAccount.mail) {
                sweetalert({
                    title: "Ups!",
                    text: "Este mail ya existe",
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

    CambioPago = (MedioPago) => {
        this.setState({MedioPago}, () =>
            console.log(`Option selected: `, this.state.MedioPago)
        );
    };
    CambioBanco = (Banco) => {
        this.setState({Banco}, () =>
            console.log(`Option selected: `, this.state.Banco)
        );
    };

    CambioCuenta = (TipoCuenta) => {
        this.setState({TipoCuenta}, () =>
            console.log(`Option selected: `, this.state.TipoCuenta)
        );
    };

    onSubmit = async (values) => {
        const {dispatch,} = this.props;
        dispatch(setLoading(true));
        // console.log(values);
        let MedioPago = this.state.MedioPago.value;
        let Banco = this.state.Banco.value;
        let TipoCuenta = this.state.TipoCuenta.value;
        let DatosBancarios = {
            MedioPago: MedioPago,
            Banco: Banco,
            TipoCuenta: TipoCuenta,
        };

        await this.setState({submitted: true}, async () => {
            const rut = values.rut.replace(/\./g, "");
            const data = {
                nombres: values.nombres,
                apellidos: values.apellidos,
                rut: rut,
                DatosBancarios: DatosBancarios,
                NumeroCuenta: values.NumeroCuenta,
                Email: values.mail,
                telefono: values.telefono,
                password: values.password,
                Edad: values.Edad,
                Direccion: values.Direccion,
            };

            await api.apiPostCreaProper(data)
        })
        const userLogin = {
            email: values.mail,
            password: values.password
        }
        await setTimeout(() => dispatch(login(userLogin)), 5000)


    }

    render() {
        const {text, title, goToStep} = this.props;
        console.log(this.props)
        const {captchaToken, acceptTerms} = this.state;
        const {MedioPago, Banco, TipoCuenta} = this.state;
        const options = [
            {value: "Banco Santander", label: "Banco Santander"},
            {value: "Scotiabank Azul", label: "Scotiabank Azul"},
            {value: "Banco BICE", label: "Banco BICE"},
            {value: "Banco Internacional", label: "Banco Internacional"},
            {value: "Banco Itaú", label: "Banco Itaú"},
            {value: "Banco de Chile / Edwards-Citi", label: "Banco de Chile / Edwards-Citi"},
            {value: "Corpbanca", label: "Corpbanca"},
            {value: "Banco Crédito e Inversiones", label: "Banco Crédito e Inversiones"},
            {value: "Banco Estado", label: "Banco Estado"},
            {value: "Banco Falabella", label: "Banco Falabella"},
            {value: "Banco Security", label: "Banco Security"},
            {value: "Scotiabank", label: "Scotiabank"},
            {value: "Rabobank", label: "Rabobank"},
            {value: "HSBC Bank", label: "HSBC Bank"},
            {value: "Banco Ripley", label: "Banco Ripley"},
            {value: "Banco Paris", label: "Banco Paris"},
            {value: "Banco Consorcio", label: "Banco Consorcio"},
            {value: "Coopeuch", label: "Coopeuch"},
            {value: "Prepago Los Heroes", label: "Prepago Los Heroes"},
            {value: "Tenpo Prepago S.A", label: "Tenpo Prepago S.A"}

        ];

        const options2 = [
            {value: "Cuenta Corriente", label: "Cuenta Corriente"},
            {value: "Cuenta Vista", label: "Cuenta Vista"},
            {value: "Chequera Electrónica", label: "Chequera Electrónica"},
            {value: "Cuenta de Ahorro", label: "Cuenta de Ahorro"},
        ];

        const options3 = [
            {value: "Boleta", label: "Boleta"},
            {value: "Factura", label: "Factura"},
        ];

        return (
            <Container fluid={true}>

                <div id="login" className="cont-login cont-100vh">
                    <div className="cont-info">
                        <div className="izquierda"><LinkContainer to={"/"}>
                            <Navbar.Brand>
                                <img className="nav-global" src={icon.logoColorGris} alt=":p"/>
                            </Navbar.Brand>
                        </LinkContainer></div>
                        <div>
                            <div className="bien-registro text-center">{title}</div>
                        </div>
                        <p className="bien-registro-p">{text}</p>
                        <span>
                ¿Ya tienes una cuenta?{" "}
                            <a onClick={() => goToStep(1)} className="color-referir">
                Iniciar sesión
                </a>
            </span>
                    </div>

                    <Formik
                        initialValues={{
                            nombres: "",
                            apellidos: "",
                            rut: "",
                            Edad: "",
                            Direccion: "",
                            mail: "",
                            telefono: "",
                            password: "",
                            passwordConfirm: "",
                            NumeroCuenta: ""
                        }}
                        validate={validate}
                        onSubmit={(e, opts) => this.onSubmit(e, opts)}
                    >
                        {({isSubmitting, setFieldValue}) => (
                            <Form>
                                <Row>
                                    <Col md="4">
                                        <div className="form-group-proper">
                                            <div className="izquierda"><label className="contact-proper2">Nombre o Razón
                                                Social*{" "}</label></div>
                                            <div className="input-group">
                                                <Field className="reginorma" type="" name="nombres"/>
                                            </div>
                                            <ErrorMessage
                                                name="nombres"
                                                className="contact-error"
                                                component="div"
                                            />
                                        </div>
                                        <div className="form-group-proper">
                                            <div className="izquierda"><label
                                                className="contact-proper2">Apellido{" "}</label></div>
                                            <div className="input-group">
                                                <Field className="reginorma" type="" name="apellidos"/>
                                            </div>
                                            <ErrorMessage
                                                name="apellidos"
                                                className="contact-error"
                                                component="div"
                                            />
                                        </div>

                                        <div className="form-group-proper">
                                            <div className="izquierda"><label className="contact-proper2"> Correo
                                                Electrónico*</label></div>
                                            <div className="input-group">
                                                <Field
                                                    className="reginorma"
                                                    type=""
                                                    name="mail"
                                                />
                                            </div>
                                            <ErrorMessage
                                                name="mail"
                                                className="contact-error"
                                                component="div"
                                            />
                                        </div>
                                        <div className="form-group-proper">
                                            <div className="izquierda"><label
                                                className="contact-proper2"> Celular*</label></div>
                                            <div className="input-group">
                                                <Field
                                                    className="reginorma"
                                                    type=""
                                                    name="telefono"
                                                    maxLength="12"
                                                />
                                            </div>
                                            <ErrorMessage
                                                name="telefono"
                                                className="contact-error"
                                                component="div"
                                            />
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="form-group-proper">
                                            <div className="izquierda"><label className="contact-proper2">Rut*</label>
                                            </div>
                                            <div className="input-group">

                                                <Field
                                                    className="reginorma"
                                                    type=""
                                                    name="rut"
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
                                        <div className="form-group-proper">
                                            <div className="izquierda"><label className="contact-proper2">Edad*</label>
                                            </div>
                                            <div className="input-group">
                                                <Field
                                                    className="reginorma"
                                                    type=""
                                                    name="Edad"
                                                />
                                            </div>
                                            <ErrorMessage
                                                name="edad"
                                                className="contact-error"
                                                component="div"
                                            />
                                        </div>
                                        <div className="form-group-proper">
                                            <div className="izquierda"><label className="contact-proper2"> Comuna de
                                                residencia*</label></div>
                                            <div className="input-group">
                                                <Field
                                                    className="reginorma"
                                                    type=""
                                                    name="Direccion"
                                                />
                                            </div>
                                            <ErrorMessage
                                                name="rut"
                                                className="contact-error"
                                                component="div"
                                            />
                                        </div>
                                        <div className="form-group-proper">
                                            <div className="izquierda"><label
                                                className="contact-proper2"> Contraseña</label></div>
                                            <div className="input-group">
                                                <Field
                                                    className="reginorma"
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
                                        <div className="form-group-proper">
                                            <div className="izquierda"><label className="contact-proper2"> Confirmar
                                                Contraseña</label></div>
                                            <div className="input-group">
                                                <Field
                                                    className="reginorma"
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
                                        <div className="form-group-proper form-check terminos">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="terminos"
                                                onChange={this.handleTerms}
                                            />
                                            <label className="form-check-label">
                                                Aceptar{" "}
                                                <a
                                                    className="text-primary-propers"
                                                    href="/terminosycondiciones"
                                                >
                                                    términos y condiciones
                                                </a>
                                            </label>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="">
                                            Datos Bancarios
                                        </div>
                                        <div className="form-group-proper">
                                            <div className="izquierda"><label className="contact-proper2">Tipo
                                                Documento</label></div>
                                            <div className="input-group">
                                                <Select
                                                    className="largo-opciones-select reginorma "
                                                    classNamePrefix="Seleccionar"
                                                    options={options3}
                                                    id="MedioPago"
                                                    onChange={this.CambioPago}
                                                    value={MedioPago}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group-proper">
                                            <div className="izquierda"><label className="contact-proper2">Banco</label>
                                            </div>
                                            <div className="input-group">

                                                <Select
                                                    className="largo-opciones-select reginorma"
                                                    classNamePrefix=""
                                                    options={options}
                                                    id="Banco"
                                                    onChange={this.CambioBanco}
                                                    value={Banco}
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="form-group-proper">
                                            <div className="izquierda"><label className="contact-proper2">Tipo de
                                                cuenta</label></div>
                                            <div className="input-group">

                                                <Select
                                                    className="largo-opciones-select reginorma"
                                                    classNamePrefix=""
                                                    options={options2}
                                                    name="TipoCuenta"
                                                    onChange={this.CambioCuenta}
                                                    value={TipoCuenta}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group-proper">
                                            <div className="izquierda"><label className="contact-proper2">Número de
                                                cuenta</label></div>
                                            <div className="input-group">

                                                <Field
                                                    className="reginorma"
                                                    name="NumeroCuenta"
                                                />
                                            </div>
                                        </div>
                                        
                                    </Col>
                                </Row>


                                <Row>
                                    <Col md="12" className="center text-center">
                                        <button
                                            className=" btn-referir-proper text-center center"
                                            type="submit"
                                            disabled={isSubmitting || !acceptTerms}
                                        >
                                            {isSubmitting ? "Enviando..." : "Registrarme"}
                                        </button>
                                        <button
                                            className="hideWEB2 btn-referir-proper text-center center"
                                            type="submit"
                                            disabled={isSubmitting || !acceptTerms}
                                        >
                                            <div className="submit-letra-proper">Registrarme</div>
                                        </button>
                                    </Col>
                                </Row>
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
    if (formValues.password !== "" && formValues.password.length < 8) {
        errors.password = "Debe tener un mínimo de 8 caracteres";
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
    const {auth, app} = state;
    return {...auth, data: app.data, userAccount: app.userAccount, loading: app.loading};
};

const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => {
        dispatch(action);
    },
});

CrearCuentaproper = connect(mapStateToProps, mapDispatchToProps)(CrearCuentaproper);

export default CrearCuentaproper;
