import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Col, Row, Button, Container } from "shards-react";
import { Link } from "react-router-dom";

const PageTitle = ({
  title,
  subtitle,
  className,
  namebutton,
  to,
  show,
  ...attrs
}) => {
  const classes = classNames(
    className,
    "text-center",
    "text-md-left",
    "mb-sm-0"
  );

  return (
    <Container>
      <Row>
        <Col xs={12} md={10} className={classes} {...attrs}>
          <span className="text-uppercase page-subtitle">{subtitle}</span>
          <h3 className="page-title">{title}</h3>
        </Col>
        {show && (
          <Col xs={6} md={2}>
            <Link to={to}>
              <Button theme="primary">{namebutton}</Button>
            </Link>
          </Col>
        )}
      </Row>
    </Container>
  );
};

PageTitle.propTypes = {
  /**
   * The page title.
   */
  title: PropTypes.string,
  /**
   * The page subtitle.
   */
  subtitle: PropTypes.string
};

export default PageTitle;
