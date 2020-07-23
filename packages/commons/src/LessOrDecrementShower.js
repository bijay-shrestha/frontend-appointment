import React from 'react';
import{MdTrendingUp} from 'react-icons/md';
import{MdTrendingDown} from 'react-icons/md';
export const checkPositveAndNegativeIcons = value => {
  return value > 0 ? (
    <MdTrendingUp />
  ) : (
    <MdTrendingDown />
  )
}
