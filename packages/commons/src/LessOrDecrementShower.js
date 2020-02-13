import React from 'react';
import * as Ionicons from 'react-icons/io';
export const checkPositveAndNegativeIcons = value => {
  return value > 0 ? (
    <Ionicons.IoIosTrendingUp />
  ) : (
    <Ionicons.IoIosTrendingDown />
  )
}
