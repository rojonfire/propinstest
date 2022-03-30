/** @format */

import React from "react";

import { FormGroup } from "shards-react";

import { Field, ErrorMessage } from "formik";

import DateTimePicker from "react-widgets/lib/DateTimePicker";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import "react-widgets/dist/css/react-widgets.css";
import ErrorLabel from "./ErrorLabel";

Moment.locale("es");
momentLocalizer();

export const DateFieldGroup = (props) => {
  const FormikDatePicker = (props) => {
    const { form } = props;
    return (
      <React.Fragment>
        <DateTimePicker
          format="DD/MM/YYYY"
          locale="es"
          time={false}
          {...props}
          onChange={(time) => form.setFieldValue(props.name, time)}
        />
        <ErrorMessage
          name={props.name}
          className="contact-error"
          component={ErrorLabel}
        />
      </React.Fragment>
    );
  };

  return (
    <FormGroup>
      <label>{props.label}</label>
      <Field>
        {(fieldProps) => <FormikDatePicker {...props} {...fieldProps} />}
      </Field>
    </FormGroup>
  );
};

export const DateTimeFieldGroup = (props) => {
  const FormikDatePicker = (props) => {
    const { form, name } = props;
    return (
      <React.Fragment>
        <DateTimePicker
          onChange={(time) => form.setFieldValue(name, time)}
          {...props}
        />
        <ErrorMessage
          name={name}
          className="contact-error"
          component={ErrorLabel}
        />
      </React.Fragment>
    );
  };

  return (
    <FormGroup>
      <label>{props.label}</label>
      <Field>
        {(fieldProps) => <FormikDatePicker {...props} {...fieldProps} />}
      </Field>
    </FormGroup>
  );
};

// export const FieldGroup = ({ label, name }) => {
export const FieldGroup = (props) => {
  return (
    <FormGroup>
      <label className={props.labelClass && props.labelClass}>{props.label}</label>
      <Field type="text" className="form-control" {...props} />
      <ErrorMessage
        name={props.name}
        className={`contact-error`}
        component={ErrorLabel}
      />
    </FormGroup>
  );
};

export const CheckFieldGroup = (props) => {
  const { label, ...inputProps } = props;
  return (
    <FormGroup>
      <label>{props.label}</label>
      <Field component="input" type="checkbox" {...inputProps} />
    </FormGroup>
  );
};

export const SelectFieldGroup = (props) => {
  const { onChange, ...fieldProps } = props;
  const { name, label, arrayOps } = fieldProps;

  if (onChange) {
    fieldProps.onChange = onChange;
  }

  const items = arrayOps.map((num, i) => (
    <option key={i} value={num.value}>
      {num.label}
    </option>
  ));

  return (
    <FormGroup>
      <label>{label}</label>
      <Field {...fieldProps} component="select" className="form-control">
        {items}
      </Field>
      <ErrorMessage
        name={name}
        className="contact-error"
        component={ErrorLabel}
      />
    </FormGroup>
  );
};

export const RadioFieldGroup = ({
  id,
  label,
  value,
  name,
  className,
  ...props
}) => {
  return (
    <div>
      <label>{label}</label>{" "}
      <Field
        type="radio"
        value={value}
        name={name}
        className={className}
        {...props}
      />
    </div>
  );
};

export const TextAreaFieldGroup = ({ name, label, ...props }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <Field
        component="textarea"
        className="form-control"
        rows="3"
        name={name}
        {...props}
      />
      <ErrorMessage
        name={name}
        className="contact-error"
        component={ErrorLabel}
      />
    </div>
  );
};
