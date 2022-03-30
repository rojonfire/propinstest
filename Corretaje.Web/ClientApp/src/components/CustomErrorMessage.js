import React from "react";
import { BiError } from "react-icons/bi";
import PropTypes from 'prop-types';

const CustomErrorMessage = props => {
  const { className, message, iconSize } = props;

  return (
   <div className={ className }>
      <BiError className="d-block" size={iconSize} color="red" />
      <div className="d-block">
         { message }
      </div>
   </div>

  );
};

CustomErrorMessage.defaultProps = {
   className: 'narrow-line-height text-center small-font pb-6',
   message: 'Ha habido un error',
   iconSize: 65
};

CustomErrorMessage.propTypes = {
   className: PropTypes.string,
   message: PropTypes.string,
   iconSize: PropTypes.number
 };

export default CustomErrorMessage;
