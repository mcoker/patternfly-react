import { Chip, ChipGroup } from '@patternfly/react-core/deprecated';
import { Badge } from '@patternfly/react-core';
import { Component } from 'react';

interface BadgeChipState {
  badgeChipArray: {
    name: string;
    isRead: boolean;
    count: number;
  }[];
}

export class ChipGroupDefaultIsOpenDemo extends Component<{}, BadgeChipState> {
  deleteItem: (id: string) => void;
  constructor(props: {}) {
    super(props);
    this.state = {
      badgeChipArray: [
        {
          name: 'Lemons',
          isRead: true,
          count: 10
        },
        {
          name: 'Limes',
          isRead: true,
          count: 8
        },
        {
          name: 'oranges',
          isRead: true,
          count: 3
        },
        {
          name: 'grapefruit',
          isRead: true,
          count: 1
        }
      ]
    };
    this.deleteItem = (id: string) => {
      const copyOfbadgeChipArray = this.state.badgeChipArray;
      const index = copyOfbadgeChipArray.findIndex((chipObj) => chipObj.name === id);

      if (index !== -1) {
        copyOfbadgeChipArray.splice(index, 1);
        this.setState({ badgeChipArray: copyOfbadgeChipArray });
      }
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { badgeChipArray } = this.state;
    return (
      <ChipGroup id="demo-chip-group" defaultIsOpen>
        {badgeChipArray.map((chip) => (
          <Chip
            id={`chip-${chip.name}`}
            key={chip.name}
            onClick={() => this.deleteItem(chip.name)}
            badge={<Badge isRead={chip.isRead}>{chip.count}</Badge>}
          >
            {chip.name}
          </Chip>
        ))}
      </ChipGroup>
    );
  }
}
