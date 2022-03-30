import React from "react";
import "react-pro-sidebar/dist/css/styles.css";
import {
  Row,
  CardGroup,
  Col,
  Card,
  Image,
  Button,
  Spinner,
} from "react-bootstrap";
import { connect } from "react-redux";
import AccountSidebar from "../../components/AccountSidebar";
import img from "../../utils/images";
import { getUsuario } from "../../action";
import CustomErrorMessage from "../../components/CustomErrorMessage";
import EditPerfil from "./editPerfil";
import ReactGa from "react-ga";
import { LoadingModal } from "../../components/Loading-nuevo";
import ChangePassword from "./changePassword";
import QuieroSerEmbajador from "./quieroSerEmbajador";

export const initGA = () => {
  console.log("GA init");
  ReactGa.initialize("UA-167957495-1");
};

export const logPageView = () => {
  ReactGa.set({ page: window.location.pathname });
  ReactGa.pageview(window.location.pathname);
};

class Perfil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      isEdit: false,
      showEditModal: false,
      isChangingPassword: false,
      showChangePasswordModal: false,
      showEmbajadorModal: false
    };
    const { getUsuario } = this.props;
    getUsuario();
  }

  componentDidMount = async () => {
    initGA();
    logPageView();
    document.querySelector("body").scrollTo(0, 0);
  };

  onClickEdit = () => {
    this.setState({
      showEditModal: true,
    });
  };

  onClickChangePassword = () => {
    this.setState({
      showChangePasswordModal: true,
    });
  };

  onClickEmbajadorModal = () => {
    this.setState({
      showEmbajadorModal: true,
    });
  };

  redirectToMethod = () => {
    return <LoadingModal />;
  };

  profileRender = (userData) => {
    return (
      <div className="bg-white">
        <Row className="center hideWEB2">
          <Col className="center">
            <div className="text-center">
              <Image
                className="center imagen-perfil"
                src={img.noFotoPerfil}
                roundedCircle
              />
            </div>
            <div className="label-perfil moverdearribaperfil">NOMBRE</div>
            <div className="info-label-perfil">{userData.nombres}</div>
            <div className="label-perfil">APELLIDO</div>
            <div className="info-label-perfil"> {userData.apellidos}</div>
            <div className="label-perfil">RUT</div>
            <div className="info-label-perfil"> {userData.rut}</div>
            <div className="label-perfil">CORREO</div>
            <div className="info-label-perfil"> {userData.mail}</div>
            <div className="label-perfil">TÉLEFONO</div>
            <div className="info-label-perfil"> {userData.telefono}</div>
            <div className="text-center mt-4">
              {" "}
              <Button
                onClick={() => this.setState({ showEditModal: true })}
                variant="editarperfil classic-padding-buttons mb-2"
              >
                Editar
              </Button>
              <Button
                onClick={() => this.setState({ showChangePasswordModal: true })}
                variant="editarperfil classic-padding-buttons mb-2"
                className="center"
              >
                Cambiar contraseña
              </Button>
              {!userData.esEmbajador && (
                <Button
                  onClick={() => this.setState({ showEmbajadorModal: true })}
                  variant="editarperfil classic-padding-buttons mb-2"
                  className="center"
                >
                  Quiero ser embajador
                </Button>
              )}
            </div>
          </Col>
        </Row>

        <Row className="hideMOBILE">
          <Col md="3">
            <Image
              className="imagen-perfil"
              src={img.noFotoPerfil}
              roundedCircle
            />
          </Col>
          <Col md="9">
            <Row>
              <Col md="6">
                <Card.Title className="mb-0">
                  <span className="font-weight-bold">NOMBRES</span>
                </Card.Title>
                <p className="comfortaa-font small-font">{userData.nombres}</p>
              </Col>
              <Col md="6">
                <Card.Title className="mb-0">
                  <span className="font-weight-bold">APELLIDOS</span>
                </Card.Title>
                <p className="comfortaa-font small-font">
                  {userData.apellidos}
                </p>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <Card.Title className="mb-0">
                  <span className="font-weight-bold">RUT</span>
                </Card.Title>
                <p className="comfortaa-font small-font">{userData.rut}</p>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <Card.Title className="mb-0">
                  <span className="font-weight-bold">CORREO</span>
                </Card.Title>
                <p className="comfortaa-font small-font">{userData.mail}</p>
              </Col>
              <Col md="6">
                <Card.Title className="mb-0">
                  <span className="font-weight-bold">TELÉFONO</span>
                </Card.Title>
                <p className="comfortaa-font small-font">{userData.telefono}</p>
              </Col>
            </Row>

            <Row className="mt-4">
              <Col className="text-right">
                <Button
                  onClick={() => this.setState({ showEditModal: true })}
                  variant="editarperfil small-padding-buttons small-margin-buttons" 
                >
                  Editar
                </Button>
                <Button
                  onClick={() => this.setState({ showChangePasswordModal: true })}
                  variant="editarperfil small-padding-buttons small-margin-buttons"
                  className="center"
                >
                  Cambiar contraseña
                </Button>
                {!userData.esEmbajador && (
                  <Button
                    onClick={() => this.setState({ showEmbajadorModal: true })}
                    variant="editarperfil small-padding-buttons small-margin-buttons"
                    className="center"
                  >
                    Quiero ser embajador
                  </Button>
                )}
                
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  };

  render() {
    const { loading, userData } = this.props;
    const { showEditModal, showChangePasswordModal, showEmbajadorModal } = this.state;
    
    return (
      <div className="fondo-perfil bg-white">
        <AccountSidebar />
        <EditPerfil
          show={showEditModal}
          onHide={() => this.setState({ showEditModal: false })}
          userData={userData}
        />
        <ChangePassword
          show={showChangePasswordModal}
          onHide={() => this.setState({ showChangePasswordModal: false })}
        />
        <QuieroSerEmbajador
          show={showEmbajadorModal}
          onHide={() => this.setState({ showEmbajadorModal: false })}
        />
        <Row className="">
          <Col md="3"></Col>
          <Col md="5">
            <div className="tituloperfil">Perfil</div>
            <div className="sub-titulo-perfil">
              Edita tus datos de ser necesario.
            </div>
            <CardGroup>
              <Card className="tarjeta-perfil-mobile">
                <Card.Body>
                  {loading && (
                    <div className="text-center">
                      <Spinner animation="border" />
                    </div>
                  )}
                  {!loading && userData && this.profileRender(userData)}
                  {!loading && !userData && (
                    <CustomErrorMessage message="Ha habido un error cargando la información de tu perfil, por favor inténtalo más tarde" />
                  )}
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.app,
  ...state.auth,
  userData: state.app.userData,
});

const mapDispatchToProps = (dispatch) => ({
  getUsuario: () => dispatch(getUsuario()),
});

Perfil = connect(mapStateToProps, mapDispatchToProps)(Perfil);

export default Perfil;
