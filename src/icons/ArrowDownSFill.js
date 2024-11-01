/*import { ArrowDownSFill as RiArrowDownSFill } from 'react-icons/ri'; //Import using a different name

const ArrowDownSFill = () => {
  return <RiArrowDownSFill size={24} />;
};

export default ArrowDownSFill;*/

import React from 'react';
import { ReactComponent as ArrowDownSFillIcon } from '../assets/arrowdownsfill.svg';

const ArrowDownSFill = () => {
  return <ArrowDownSFillIcon width={24} height={24} />; // Set desired width and height
};

export default ArrowDownSFill;
