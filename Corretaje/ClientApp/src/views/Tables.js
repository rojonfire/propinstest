/** @format */

import React from 'react';

import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Button
} from 'shards-react';
import PageTitle from '../components/common/PageTitle';

const Tables = () => (
  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle
        sm="4"
        title="Servicios Propins"
        subtitle="Servicios"
        className="text-sm-left"
      />
    </Row>

    <Row>
      <Col md={4}>
        <Card style={{ maxWidth: '300px' }}>
          <CardHeader className="border-bottom">
            <h6 className="m-0">Servicios Adicionales</h6>
          </CardHeader>
          <CardBody>
            <CardTitle>Opciones Disponibles:</CardTitle>
            <Col>
              <Link
                to={`/servicioAdicional/list`}
                style={{
                  color: 'inherit',
                  textDecoration: 'inherit'
                }}
              >
                <Button theme="info" className="btn form-control">
                  Listar Servicios Adicionales
                </Button>
              </Link>
              <hr />

              <Link
                to={`/servicioAdicional/agregar`}
                style={{
                  color: 'inherit',
                  textDecoration: 'inherit'
                }}
              >
                <Button theme="success" className="btn form-control">
                  Agregar Servicio Adicional
                </Button>
              </Link>
            </Col>
          </CardBody>
        </Card>
      </Col>
      <Col md={4}>
        <Card style={{ maxWidth: '300px' }}>
          <CardHeader className="border-bottom">
            <h6 className="m-0">Servicios Base</h6>
          </CardHeader>
          <CardBody>
            <CardTitle>Opciones Disponibles:</CardTitle>
            <Col>
              <Link
                to={`/servicioBase/agregar`}
                style={{
                  color: 'inherit',
                  textDecoration: 'inherit'
                }}
              >
                <Button theme="success" className="btn form-control">
                  Agregar Servicio Base
                </Button>
              </Link>
              <hr />
            </Col>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default Tables;
