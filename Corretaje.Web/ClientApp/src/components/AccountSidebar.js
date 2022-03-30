import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { connect } from "react-redux";
import { getPropiedadesByClienteId, getOfertasByOfertadorId } from "../action";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import icon from "../utils/images";

class AccountSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true,
      propiedadesCliente: [],
      collapsed: true,
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    const { getOfertasByOfertadorId, userId } = this.props;
    getOfertasByOfertadorId(userId);
  }

  componentDidMount = async () => {
    const { getPropiedadesByClienteId } = this.props;
    getPropiedadesByClienteId();
  };

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  onchangecollapsed = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    const { propiedadesCliente, ofertasEmitidas, userData } = this.props;
    const { collapse } = this.state;

    return (
      <div className="altolateralmenu">
        <ProSidebar collapsed={this.state.collapsed} className="">
          <Menu className="">
            <MenuItem
              onClick={() => {
                this.onchangecollapsed();
              }}
              icon={
                <img
                  src={icon.flechamenulateral}
                  className={collapse ? "" : "moverflecha-menulateral"}
                />
              }
            >
              Menu
            </MenuItem>

            <LinkContainer to={"/perfil"}>
              <MenuItem icon={<img src={icon.fotoperfil} />}>Perfil</MenuItem>
            </LinkContainer>

            { userData && userData.esEmbajador && (
              <SubMenu
                title={"Embajador"} 
                icon={<img src={icon.iconStar} className="w-100" />}
              >
                <MenuItem>
                  Referir comprador
                  <Link
                    to={{
                      pathname: `/referir-comprador`
                    }}
                  />
                </MenuItem>
                <MenuItem>
                  Referir vendedor
                  <Link
                    to={{
                      pathname: `/referir-vendedor`
                    }}
                  />
                </MenuItem>
                <MenuItem>
                  Mis datos bancarios
                  <Link
                    to={{
                      pathname: `/datos-bancarios`
                    }}
                  />
                </MenuItem>
              </SubMenu>
            )}

            {ofertasEmitidas &&
              ofertasEmitidas.data &&
              ofertasEmitidas.data.length > 0 && (
                <LinkContainer to={"/ofertas"}>
                  <MenuItem icon={<img src={icon.fotoperfil} />}>
                    Ofertas y contraofertas
                  </MenuItem>
                </LinkContainer>
              )}
            {propiedadesCliente && propiedadesCliente.length > 0
              ? propiedadesCliente.map((item, i) => {
                  return (
                    <SubMenu
                      title={
                        item.nombreCalle !== null
                          ? item.nombreCalle
                          : item.direccionReferencial
                      } //si uno es nulo que ponga el otro.
                      icon={<img src={icon.casita} className="casitapeque" />}
                      key={i}
                    >
                      <MenuItem>
                        Características
                        <Link
                          to={{
                            pathname: `/propiedad/${item.id}/caracteristicas`,
                            state: {
                              valor: item.valor,
                              direccion: item.direccionReferencial,
                              direccion2: item.nombreCalle,
                              comuna: item.comuna,
                              tipoPropiedad: item.tipoPropiedad,
                              anoConstruccion: item.anioConstruccion,
                              dormitorios: item.dormitorios,
                              banos: item.banio,
                              metrosUtiles: item.superficieUtil,
                              metrosTotales: item.superficieTotales,
                              codigoPropiedad: item.codigoPropiedad,
                              estado: item.estadoPropiedad,
                              tipoPrecio: item.tipoPrecio
                            },
                          }}
                        />
                      </MenuItem>

                      <MenuItem>
                        Plan contratado
                        <Link
                          to={{
                            pathname: `/propiedad/${item.id}/plancontratado`,
                            state: {
                              planContratado: item.planContratado,
                              serviciosAdicionalesContratados:
                                item.serviciosAdicionalesContratados,
                              fechaContratacion: item.createdAt,
                            },
                          }}
                        />
                      </MenuItem>
                      {item.planContratado != null &&
                        item.planContratado.fast != null &&
                        !item.planContratado.fast && (
                          <MenuItem>
                            Calendario
                            <Link
                              to={{
                                pathname: `/propiedad/${item.id}/Calendario`,
                                state: {
                                  planContratado: item.planContratado,
                                  serviciosAdicionalesContratados:
                                    item.serviciosAdicionalesContratados,
                                  fechaContratacion: item.createdAt,
                                  propiedadId: item.id,
                                },
                              }}
                            />
                          </MenuItem>
                        )}
                      {item.planContratado != null &&
                        item.planContratado.fast != null &&
                        !item.planContratado.fast && (
                          <MenuItem>
                            Ofertas recibidas
                            <Link
                              to={{
                                pathname: `/propiedad/${item.id}/Oferta`,
                                state: {
                                  valor: item.valor,
                                  propiedadId: item.id,
                                },
                              }}
                            />
                          </MenuItem>
                        )}
                      {item.planContratado != null &&
                        item.planContratado.fast != null &&
                        !item.planContratado.fast && (
                          <MenuItem>
                            Métricas
                            <Link
                              to={{
                                pathname: `/propiedad/${item.id}/metricas`,
                                state: {
                                  propiedadId: item.id,
                                  propiedad: item,
                                  planId: item.planContratado.id
                                },
                              }}
                            />
                          </MenuItem>
                        )}
                      {item.planContratado != null &&
                        item.planContratado.fast != null &&
                        !item.planContratado.fast && (
                          <MenuItem className="hideWEB hideMOBILE">
                            Contrato
                            <Link
                              to={{
                                pathname: `/propiedad/${item.id}/contrato`,
                                state: {
                                  propiedadId: item.id,
                                  propiedad: item,
                                },
                              }}
                            />
                          </MenuItem>
                        )}
                    </SubMenu>
                  );
                })
              : ""}
          </Menu>
        </ProSidebar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.app,
  ...state.auth,
  userId: state.app.user.userId,
  propiedadesCliente: state.app.propiedadesCliente,
  ofertasEmitidas: state.app.ofertasEmitidas,
});

const mapDispatchToProps = (dispatch) => ({
  getPropiedadesByClienteId: () => dispatch(getPropiedadesByClienteId()),
  getOfertasByOfertadorId: (id) => dispatch(getOfertasByOfertadorId(id)),
});

AccountSidebar = connect(mapStateToProps, mapDispatchToProps)(AccountSidebar);

export default AccountSidebar;
