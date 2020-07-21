import React from 'react';
import{IoIosTrendingUp} from 'react-icons/io';
import{IoIosTrendingDown} from 'react-icons/io';
export const checkPositveAndNegativeIcons = value => {
  return value > 0 ? (
    <IoIosTrendingUp />
  ) : (
    <IoIosTrendingDown />
  )
}
