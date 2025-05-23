import { Fragment } from 'react';
import { Icon } from '@patternfly/react-core';
import PlusCircleIcon from '@patternfly/react-icons/dist/esm/icons/plus-circle-icon';

export const BodyIconSizes: React.FunctionComponent = () => (
  <Fragment>
    <Icon size="bodySm">
      <PlusCircleIcon />
    </Icon>{' '}
    <Icon size="bodyDefault">
      <PlusCircleIcon />
    </Icon>{' '}
    <Icon size="bodyLg">
      <PlusCircleIcon />
    </Icon>
  </Fragment>
);
