import { Children } from 'react';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/JumpLinks/jump-links';
import { JumpLinksList } from './JumpLinksList';
import { Button, ButtonVariant } from '../Button';

export interface JumpLinksItemProps extends Omit<React.HTMLProps<HTMLLIElement>, 'onClick'> {
  /** Whether this item is active. Parent JumpLinks component sets this when passed a `scrollableSelector`. */
  isActive?: boolean;
  /** Href for this link */
  href: string;
  /** Selector or HTMLElement to spy on */
  node?: string | HTMLElement;
  /** Text to be rendered inside span */
  children?: React.ReactNode;
  /** Click handler for anchor tag. Parent JumpLinks components tap into this. */
  onClick?: (ev: React.MouseEvent) => void;
  /** Class to add to li */
  className?: string;
}

export const JumpLinksItem: React.FunctionComponent<JumpLinksItemProps> = ({
  isActive,
  href,
  // eslint-disable-next-line
  node,
  children,
  onClick,
  className,
  ...props
}: JumpLinksItemProps) => {
  const childrenArr = Children.toArray(children) as any[];
  const sublists = childrenArr.filter((child) => child.type === JumpLinksList);
  children = childrenArr.filter((child) => child.type !== JumpLinksList);

  return (
    <li
      className={css(styles.jumpLinksItem, isActive && styles.modifiers.current, className)}
      {...(isActive && { 'aria-current': 'location' })}
      {...props}
    >
      <span className={styles.jumpLinksLink}>
        <Button variant={ButtonVariant.link} component="a" href={href} onClick={onClick}>
          <span className={styles.jumpLinksLinkText}>{children}</span>
        </Button>
      </span>
      {sublists}
    </li>
  );
};
JumpLinksItem.displayName = 'JumpLinksItem';
