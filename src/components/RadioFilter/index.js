/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

// import { Container } from './styles';

const RadioFilter = ({ name, gender, check, action }) => {
  return (
    <label>
      <input
        type="radio"
        name={name}
        value={gender}
        check={check === gender}
        onChange={action}
        data-testid="gender-female"
      />
      {gender}
    </label>
  );
};

export default RadioFilter;
