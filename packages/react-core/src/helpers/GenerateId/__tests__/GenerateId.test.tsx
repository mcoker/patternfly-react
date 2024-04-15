import React from 'react';
import { render } from '@testing-library/react';
import { GenerateId } from '../GenerateId';

test('generates id', () => {
<<<<<<< HEAD
  const { asFragment } = render(<GenerateId>{(id) => <div id={id}>div with random ID</div>}</GenerateId>);
=======
  const { asFragment } = render(
    <GenerateId isRandom={false}>{(id) => <div id={id}>div with random ID</div>}</GenerateId>
  );
>>>>>>> main

  expect(asFragment()).toMatchSnapshot();
});
