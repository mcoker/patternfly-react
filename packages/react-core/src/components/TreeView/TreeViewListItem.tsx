import { memo, useState, useEffect, Children, isValidElement, cloneElement } from 'react';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/TreeView/tree-view';
import AngleRightIcon from '@patternfly/react-icons/dist/esm/icons/angle-right-icon';
import { TreeViewDataItem } from './TreeView';
import { Badge } from '../Badge';
import { GenerateId } from '../../helpers/GenerateId/GenerateId';

export interface TreeViewCheckProps extends Omit<Partial<React.InputHTMLAttributes<HTMLInputElement>>, 'checked'> {
  checked?: boolean | null;
}

export interface TreeViewListItemProps {
  /** Action of a tree view item, which can be either a button or dropdown component. */
  action?: React.ReactNode;
  /** Active items of tree view. */
  activeItems?: TreeViewDataItem[];
  /** Additional properties of the tree view item badge. */
  badgeProps?: any;
  /** Additional properties of the tree view item checkbox. */
  checkProps?: TreeViewCheckProps;
  /** Child nodes of a tree view item. */
  children?: React.ReactNode;
  /** Callback for item comparison function. */
  compareItems?: (item: TreeViewDataItem, itemToCheck: TreeViewDataItem) => boolean;
  /** Optional prop for a custom badge. */
  customBadgeContent?: React.ReactNode;
  /** Flag indicating if node is expanded by default. */
  defaultExpanded?: boolean;
  /** Expanded icon of a tree view item. */
  expandedIcon?: React.ReactNode;
  /** Flag indicating if a tree view item has a badge. */
  hasBadge?: boolean;
  /** Flag indicating if a tree view item has a checkbox. */
  hasCheckbox?: boolean;
  /** Default icon of a tree view item. */
  icon?: React.ReactNode;
  /** ID of a tree view item. */
  id?: string;
  /** Flag indicating if the tree view is using a compact variation. */
  isCompact?: boolean;
  /** Flag indicating if the node is expanded, overrides internal state. */
  isExpanded?: boolean;
  /** Flag indicating that tree nodes should be independently selectable, even when having
   * children.
   */
  isSelectable?: boolean;
  /** Data structure of tree view item. */
  itemData?: TreeViewDataItem;
  /** Internal content of a tree view item. */
  name: React.ReactNode;
  /** Callback for item checkbox selection. */
  onCheck?: (event: React.ChangeEvent<HTMLInputElement>, item: TreeViewDataItem, parentItem: TreeViewDataItem) => void;
  /** Callback for item selection. Note: calling event.preventDefault() will prevent the node
   * from toggling.
   */
  onSelect?: (event: React.MouseEvent, item: TreeViewDataItem, parentItem: TreeViewDataItem) => void;
  /** Callback for expanding a node with children. */
  onExpand?: (event: React.MouseEvent, item: TreeViewDataItem, parentItem: TreeViewDataItem) => void;
  /** Callback for collapsing a node with children. */
  onCollapse?: (event: React.MouseEvent, item: TreeViewDataItem, parentItem: TreeViewDataItem) => void;
  /** Parent item of tree view item. */
  parentItem?: TreeViewDataItem;
  /** Title of a tree view item. */
  title: React.ReactNode;
  /** Flag indicating the tree view should utilize memoization to help render large data sets.
   * Setting this property requires that the activeItems property is passed an array containing
   * every node in the selected item's path.
   */
  useMemo?: boolean;
  /** Flag indicating whether a tree view has animations. This will always render
   * nested tree view items rather than dynamically rendering them. This prop will be removed in
   * the next breaking change release in favor of defaulting to always-rendered items.
   */
  hasAnimations?: boolean;
}

const TreeViewListItemBase: React.FunctionComponent<TreeViewListItemProps> = ({
  name,
  title,
  id,
  isExpanded,
  defaultExpanded = false,
  children = null,
  onSelect,
  onExpand,
  onCollapse,
  onCheck,
  hasCheckbox = false,
  checkProps = {
    checked: false
  },
  hasBadge = false,
  customBadgeContent,
  badgeProps = { isRead: true },
  isSelectable = false,
  isCompact,
  activeItems = [],
  itemData,
  parentItem,
  icon,
  expandedIcon,
  action,
  compareItems,
  hasAnimations,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useMemo
}: TreeViewListItemProps) => {
  const [internalIsExpanded, setIsExpanded] = useState(defaultExpanded);
  useEffect(() => {
    if (isExpanded !== undefined && isExpanded !== null) {
      setIsExpanded(isExpanded);
    } else if (defaultExpanded !== undefined && defaultExpanded !== null) {
      setIsExpanded(internalIsExpanded || defaultExpanded);
    }
  }, [isExpanded, defaultExpanded]);

  let Component: 'label' | 'div' | 'button' = 'button';
  if (hasCheckbox) {
    Component = 'label';
  } else if (isSelectable) {
    Component = 'div';
  }

  const ToggleComponent = hasCheckbox || isSelectable ? 'button' : 'span';

  const renderToggle = (randomId: string) => (
    <ToggleComponent
      className={css(styles.treeViewNodeToggle)}
      onClick={(evt: React.MouseEvent) => {
        if (isSelectable || hasCheckbox) {
          if (internalIsExpanded) {
            onCollapse && onCollapse(evt, itemData, parentItem);
          } else {
            onExpand && onExpand(evt, itemData, parentItem);
          }
          setIsExpanded(!internalIsExpanded);
        }
        if (isSelectable) {
          evt.stopPropagation();
        }
      }}
      {...((hasCheckbox || isSelectable) && { 'aria-labelledby': `label-${randomId}` })}
      {...(ToggleComponent === 'button' && { type: 'button' })}
      tabIndex={-1}
    >
      <span className={css(styles.treeViewNodeToggleIcon)}>
        <AngleRightIcon />
      </span>
    </ToggleComponent>
  );

  const isCheckboxChecked = checkProps.checked === null ? false : checkProps.checked;
  const renderCheck = (randomId: string) => (
    <span className={css(styles.treeViewNodeCheck)}>
      <input
        type="checkbox"
        onChange={(evt) => onCheck && onCheck(evt, itemData, parentItem)}
        onClick={(evt) => evt.stopPropagation()}
        ref={(elem) => {
          elem && (elem.indeterminate = checkProps.checked === null);
        }}
        {...checkProps}
        checked={isCheckboxChecked}
        id={randomId}
        tabIndex={-1}
      />
    </span>
  );
  const iconRendered = (
    <span className={css(styles.treeViewNodeIcon)}>
      {!internalIsExpanded && icon}
      {internalIsExpanded && (expandedIcon || icon)}
    </span>
  );
  const renderNodeContent = () => {
    const content = (
      <>
        {isCompact && title && <span className={css(styles.treeViewNodeTitle)}>{title}</span>}
        {isSelectable ? (
          <button tabIndex={-1} className={css(styles.treeViewNodeText)} type="button">
            {name}
          </button>
        ) : (
          <span className={css(styles.treeViewNodeText)}>{name}</span>
        )}
      </>
    );
    return isCompact ? <span className={css(styles.treeViewNodeContent)}>{content}</span> : content;
  };
  const badgeRendered = (
    <>
      {hasBadge && children && (
        <span className={css(styles.treeViewNodeCount)}>
          <Badge {...badgeProps}>{customBadgeContent ?? (children as React.ReactElement<any>).props.data.length}</Badge>
        </span>
      )}
      {hasBadge && !children && customBadgeContent !== undefined && (
        <span className={css(styles.treeViewNodeCount)}>
          <Badge {...badgeProps}>{customBadgeContent}</Badge>
        </span>
      )}
    </>
  );

  const isSelected =
    (!children || isSelectable) &&
    activeItems &&
    activeItems.length > 0 &&
    activeItems.some((item) => compareItems && item && compareItems(item, itemData));

  const clonedChildren = Children.map(
    children,
    (child) =>
      isValidElement(child) &&
      cloneElement(child as React.ReactElement<any>, {
        inert: internalIsExpanded ? undefined : ''
      })
  );

  return (
    <li
      id={id}
      className={css(styles.treeViewListItem, internalIsExpanded && styles.modifiers.expanded)}
      aria-expanded={internalIsExpanded}
      role="treeitem"
      tabIndex={-1}
      {...(hasCheckbox && { 'aria-checked': isCheckboxChecked })}
      {...(!hasCheckbox && { 'aria-selected': isSelected })}
    >
      <div className={css(styles.treeViewContent)}>
        <GenerateId prefix={isSelectable ? 'selectable-id' : 'checkbox-id'}>
          {(randomId) => (
            <Component
              className={css(styles.treeViewNode, isSelected && styles.modifiers.current)}
              onClick={(evt: React.MouseEvent) => {
                if (!hasCheckbox) {
                  onSelect && onSelect(evt, itemData, parentItem);
                  if (!isSelectable && children && evt.isDefaultPrevented() !== true) {
                    if (internalIsExpanded) {
                      onCollapse && onCollapse(evt, itemData, parentItem);
                    } else {
                      onExpand && onExpand(evt, itemData, parentItem);
                    }
                    setIsExpanded(!internalIsExpanded);
                  }
                }
              }}
              {...(hasCheckbox && { htmlFor: randomId })}
              {...((hasCheckbox || (isSelectable && children)) && { id: `label-${randomId}` })}
              {...(Component === 'button' && { type: 'button' })}
            >
              <span className={css(styles.treeViewNodeContainer)}>
                {children && renderToggle(randomId)}
                {hasCheckbox && renderCheck(randomId)}
                {icon && iconRendered}
                {renderNodeContent()}
                {badgeRendered}
              </span>
            </Component>
          )}
        </GenerateId>
        {action && <div className={css(styles.treeViewAction)}>{action}</div>}
      </div>
      {(internalIsExpanded || hasAnimations) && clonedChildren}
    </li>
  );
};

export const TreeViewListItem = memo(TreeViewListItemBase, (prevProps, nextProps) => {
  if (!nextProps.useMemo) {
    return false;
  }

  const prevIncludes =
    prevProps.activeItems &&
    prevProps.activeItems.length > 0 &&
    prevProps.activeItems.some(
      (item) => prevProps.compareItems && item && prevProps.compareItems(item, prevProps.itemData)
    );
  const nextIncludes =
    nextProps.activeItems &&
    nextProps.activeItems.length > 0 &&
    nextProps.activeItems.some(
      (item) => nextProps.compareItems && item && nextProps.compareItems(item, nextProps.itemData)
    );

  if (prevIncludes || nextIncludes) {
    return false;
  }

  if (
    prevProps.name !== nextProps.name ||
    prevProps.title !== nextProps.title ||
    prevProps.id !== nextProps.id ||
    prevProps.isExpanded !== nextProps.isExpanded ||
    prevProps.defaultExpanded !== nextProps.defaultExpanded ||
    prevProps.onSelect !== nextProps.onSelect ||
    prevProps.onCheck !== nextProps.onCheck ||
    prevProps.onExpand !== nextProps.onExpand ||
    prevProps.onCollapse !== nextProps.onCollapse ||
    prevProps.hasCheckbox !== nextProps.hasCheckbox ||
    prevProps.checkProps !== nextProps.checkProps ||
    prevProps.hasBadge !== nextProps.hasBadge ||
    prevProps.customBadgeContent !== nextProps.customBadgeContent ||
    prevProps.badgeProps !== nextProps.badgeProps ||
    prevProps.isCompact !== nextProps.isCompact ||
    prevProps.icon !== nextProps.icon ||
    prevProps.expandedIcon !== nextProps.expandedIcon ||
    prevProps.action !== nextProps.action ||
    prevProps.parentItem !== nextProps.parentItem ||
    prevProps.itemData !== nextProps.itemData
  ) {
    return false;
  }

  return true;
});

TreeViewListItem.displayName = 'TreeViewListItem';
