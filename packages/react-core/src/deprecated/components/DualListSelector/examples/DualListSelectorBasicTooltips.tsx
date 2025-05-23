import { useState } from 'react';
import { DualListSelector as DLSDeprecated } from '@patternfly/react-core/deprecated';

export const DualListSelectorBasicTooltips: React.FunctionComponent = () => {
  const [availableOptions, setAvailableOptions] = useState<React.ReactNode[]>([
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4'
  ]);
  const [chosenOptions, setChosenOptions] = useState<React.ReactNode[]>([]);

  const onListChange = (
    event: React.MouseEvent<HTMLElement>,
    newAvailableOptions: React.ReactNode[],
    newChosenOptions: React.ReactNode[]
  ) => {
    setAvailableOptions(newAvailableOptions.sort());
    setChosenOptions(newChosenOptions.sort());
  };

  return (
    <DLSDeprecated
      availableOptions={availableOptions}
      chosenOptions={chosenOptions}
      onListChange={onListChange}
      addAllTooltip="Add all options"
      addAllTooltipProps={{ position: 'top' }}
      addSelectedTooltip="Add selected options"
      addSelectedTooltipProps={{ position: 'right' }}
      removeSelectedTooltip="Remove selected options"
      removeSelectedTooltipProps={{ position: 'left' }}
      removeAllTooltip="Remove all options"
      removeAllTooltipProps={{ position: 'bottom' }}
      id="dual-list-selector-basic-tooltips"
    />
  );
};
