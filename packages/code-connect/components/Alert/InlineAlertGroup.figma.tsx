import figma from '@figma/code-connect';
import { AlertGroup } from '@patternfly/react-core';

// Documentation for Alert can be found at https://www.patternfly.org/components/alert

figma.connect(
  AlertGroup,
  'https://www.figma.com/design/aEBBvq0J3EPXxHvv6WgDx9/PatternFly-6--Components-Test?node-id=1110-2780',
  {
    props: {
      children: figma.children('*')
    },
    example: (props) => (
      <AlertGroup isLiveRegion hasAnimations>
        {props.children}
      </AlertGroup>
    )
  }
);
