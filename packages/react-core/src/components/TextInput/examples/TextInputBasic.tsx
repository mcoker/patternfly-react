import { useState } from 'react';
import { TextInput } from '@patternfly/react-core';

export const TextInputBasic: React.FunctionComponent = () => {
  const [value, setValue] = useState('');
  return (
    <TextInput
      value={value}
      type="text"
      onChange={(_event, value) => setValue(value)}
      aria-label="text input example"
    />
  );
};
