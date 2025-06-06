import { useState } from 'react';
import { Chip, ChipGroup } from '@patternfly/react-core/deprecated';

export const ChipGroupWithCategories: React.FunctionComponent = () => {
  const [chips, setChips] = useState([
    'Chip one',
    'Really long chip that goes on and on',
    'Chip three',
    'Chip four',
    'Chip five'
  ]);

  const deleteItem = (id: string) => {
    const copyOfChips = [...chips];
    const filteredCopy = copyOfChips.filter((chip) => chip !== id);
    setChips(filteredCopy);
  };

  return (
    <ChipGroup categoryName="Category one">
      {chips.map((currentChip) => (
        <Chip key={currentChip} onClick={() => deleteItem(currentChip)}>
          {currentChip}
        </Chip>
      ))}
    </ChipGroup>
  );
};
