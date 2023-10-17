import * as React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  Icon,
  Label,
  Nav,
  NavItem,
  NavList,
  PageBreadcrumb,
  PageSection,
  PageSidebar,
  PageSidebarBody,
  Pagination,
  PaginationVariant,
  Text,
  TextContent,
  TextVariants,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem
} from '@patternfly/react-core';

import { Table, TableText, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import { capitalize } from '../../../helpers';
import translationsEn from './examples/translations.en.json';
import translationsHe from './examples/translations.he.json';
import AlignRightIcon from '@patternfly/react-icons/dist/esm/icons/align-right-icon';
import ToolsIcon from '@patternfly/react-icons/dist/esm/icons/tools-icon';
import ClockIcon from '@patternfly/react-icons/dist/esm/icons/clock-icon';
import WalkingIcon from '@patternfly/react-icons/dist/esm/icons/walking-icon';
import pfLogo from '@patternfly/react-core/src/demos/assets/pf-logo.svg';
import BarsIcon from '@patternfly/react-icons/dist/esm/icons/bars-icon';
import CogIcon from '@patternfly/react-icons/dist/esm/icons/cog-icon';

export const ColumnManagementAction = () => {
  const [translation, setTranslation] = React.useState(translationsEn);
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(10);

  const columns = [
    translation.table.columns.servers,
    translation.table.columns.status,
    translation.table.columns.location,
    translation.table.columns.modified,
    translation.table.columns.url
  ];
  const numRows = 25;
  const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const createRows = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      const num = i + 1;
      const rowObj = {
        name: translation.table.rows.node + num,
        status: [
          translation.table.rows.status.stopped,
          translation.table.rows.status.running,
          translation.table.rows.status.down,
          translation.table.rows.status.needsMaintenance
        ][getRandomInteger(0, 3)],
        location: [
          translation.table.rows.locations.raleigh,
          translation.table.rows.locations.boston,
          translation.table.rows.locations.atlanta,
          translation.table.rows.locations.sanFrancisco
        ][getRandomInteger(0, 3)],
        lastModified: [
          translation.table.rows.lastModified.oneHr,
          translation.table.rows.lastModified.threeHrs,
          translation.table.rows.lastModified.fiveHrs,
          translation.table.rows.lastModified.sevenMins,
          translation.table.rows.lastModified.fortyTwoMins,
          translation.table.rows.lastModified.twoDays,
          translation.table.rows.lastModified.oneMonth
        ][getRandomInteger(0, 6)],
        url: 'http://www.redhat.com/en/office-locations/node' + num
      };
      rows.push(rowObj);
    }

    return rows;
  };

  const rows = createRows();
  const [managedRows, setManagedRows] = React.useState(rows);
  const [paginatedRows, setPaginatedRows] = React.useState(rows.slice(0, 10));
  const [isDirRTL, setIsDirRTL] = React.useState(false);

  const switchTranslation = () => {
    setIsDirRTL((prevIsDirRTL) => !prevIsDirRTL);
    setTranslation((prevTranslation) => (prevTranslation === translationsEn ? translationsHe : translationsEn));
  };

  React.useEffect(() => {
    const newRows = createRows();
    setManagedRows(newRows);
    setPaginatedRows(newRows.slice((page - 1) * perPage, page * perPage));
  }, [translation]);

  React.useEffect(() => {
    const html = document.querySelector('html');
    html.dir = isDirRTL ? 'rtl' : 'ltr';
  }, [isDirRTL]);

  // Pagination logic

  const handleSetPage = (_evt, newPage, _perPage, startIdx, endIdx) => {
    setPaginatedRows(managedRows.slice(startIdx, endIdx));
    setPage(newPage);
  };

  const handlePerPageSelect = (_evt, newPerPage, _newPage, startIdx, endIdx) => {
    setPaginatedRows(managedRows.slice(startIdx, endIdx));
    setPerPage(newPerPage);
  };

  const renderPagination = (variant, isCompact) => (
    <Pagination
      isCompact={isCompact}
      itemCount={managedRows.length}
      page={page}
      perPage={perPage}
      onSetPage={handleSetPage}
      onPerPageSelect={handlePerPageSelect}
      variant={variant}
      titles={{
        paginationAriaLabel: `${variant} pagination`,
        ofWord: translation.pagination?.ofWord,
        items: translation.pagination?.items,
        perPageSuffix: translation.pagination?.perPageSuffix,
        toNextPageAriaLabel: translation.pagination?.toNextPageAriaLabel,
        toPreviousPageAriaLabel: translation.pagination?.toPreviousPageAriaLabel,
        toFirstPageAriaLabel: translation.pagination?.toFirstPageAriaLabel,
        toLastPageAriaLabel: translation.pagination?.perPageSuffix,
        currentPage: translation.pagination?.currentPage
      }}
    />
  );

  const breadcrumbItems = {
    home: {
      url: '#home'
    },
    category: {
      url: '#category'
    },
    subCategory: {
      url: 'sub-category'
    }
  };

  const renderLabel = (labelText) => {
    switch (labelText) {
      case 'Running':
      case 'רץ':
        return (
          <Label
            color="green"
            icon={
              <Icon shouldMirrorRTL>
                <WalkingIcon />
              </Icon>
            }
          >
            {translation.table.rows.status.running}
          </Label>
        );
      case 'Stopped':
      case 'עצר':
        return (
          <Label icon={<i className="fas fa-octagon"></i>} color="red">
            {translation.table.rows.status.stopped}
          </Label>
        );
      case 'Needs maintenance':
      case 'זקוק לתחזוקה':
        return (
          <Label icon={<ToolsIcon />} color="blue">
            {translation.table.rows.status.needsMaintenance}
          </Label>
        );
      case 'Down':
      case 'מטה':
        return (
          <Label icon={<ClockIcon />} color="orange">
            {translation.table.rows.status.down}
          </Label>
        );
    }
  };

  const toolbarItems = (
    <React.Fragment>
      <Toolbar id="rtl-table-column-management">
        <ToolbarContent>
          <ToolbarItem>
            <Button
              variant="primary"
              icon={
                <Icon shouldMirrorRTL>
                  <AlignRightIcon />
                </Icon>
              }
              iconPosition="end"
              onClick={switchTranslation}
            >
              {translation.switchBtn}
            </Button>
          </ToolbarItem>
          <ToolbarItem variant="pagination">{renderPagination(PaginationVariant.top)}</ToolbarItem>
        </ToolbarContent>
      </Toolbar>
    </React.Fragment>
  );

  const pageNav = (
    <Nav>
      <NavList>
        <NavItem itemId={0} isActive to="#system-panel">
          {translation.nav.systemPanel}
        </NavItem>
        <NavItem itemId={1} to="#policy">
          {translation.nav.policy}
        </NavItem>
        <NavItem itemId={2} to="#auth">
          {translation.nav.authentication}
        </NavItem>
        <NavItem itemId={3} to="#network">
          {translation.nav.networkServices}
        </NavItem>
        <NavItem itemId={4} to="#server">
          {translation.nav.server}
        </NavItem>
      </NavList>
    </Nav>
  );

  const sidebar = (
    <PageSidebar>
      <PageSidebarBody>{pageNav}</PageSidebarBody>
    </PageSidebar>
  );

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isKebabDropdownOpen, setIsKebabDropdownOpen] = React.useState(false);
  const [isFullKebabDropdownOpen, setIsFullKebabDropdownOpen] = React.useState(false);

  const kebabDropdownItems = (
    <>
      <DropdownItem>
        <CogIcon /> Settings
      </DropdownItem>
      <DropdownItem>
        <HelpIcon /> Help
      </DropdownItem>
    </>
  );

  const userDropdownItems = (
    <>
      <DropdownItem key="group 2 profile">My profile</DropdownItem>
      <DropdownItem key="group 2 user">User management</DropdownItem>
      <DropdownItem key="group 2 logout">Logout</DropdownItem>
    </>
  );

  const onDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const onDropdownSelect = () => {
    setIsDropdownOpen(false);
  };

  const onKebabDropdownToggle = () => {
    setIsKebabDropdownOpen(!isKebabDropdownOpen);
  };

  const onKebabDropdownSelect = () => {
    setIsKebabDropdownOpen(false);
  };

  const onFullKebabToggle = () => {
    setIsFullKebabDropdownOpen(!isFullKebabDropdownOpen);
  };

  const onFullKebabSelect = () => {
    setIsFullKebabDropdownOpen(false);
  };

  const masthead = (
    <Masthead>
    <MastheadToggle>
      <PageToggleButton variant="plain" aria-label="Global navigation">
        <BarsIcon />
      </PageToggleButton>
    </MastheadToggle>
    <MastheadMain>
      <MastheadBrand dir="ltr">
        <Brand src={pfLogo} alt="PatternFly" heights={{ default: '36px' }} />
        {translation.brandLanguage && (
          <span className="brand-language">{translation.brandLanguage}</span>
        )}
      </MastheadBrand>
    </MastheadMain>
    <MastheadContent>
      <Toolbar id="toolbar" isFullHeight isStatic>
        <ToolbarContent>
          <ToolbarGroup
            variant="icon-button-group"
            align={{ default: 'alignRight' }}
            spacer={{ default: 'spacerNone', md: 'spacerMd' }}
          >
            <ToolbarGroup variant="icon-button-group" visibility={{ default: 'hidden', lg: 'visible' }}>
              <ToolbarItem>
                <Button aria-label="Settings" variant={ButtonVariant.plain} icon={<CogIcon />} />
              </ToolbarItem>
              <ToolbarItem>
                <Button aria-label="Help" variant={ButtonVariant.plain} icon={<QuestionCircleIcon />} />
              </ToolbarItem>
            </ToolbarGroup>
            <ToolbarItem visibility={{ default: 'hidden', md: 'visible', lg: 'hidden' }}>
              <Dropdown
                isOpen={isKebabDropdownOpen}
                onSelect={onKebabDropdownSelect}
                onOpenChange={setIsKebabDropdownOpen}
                popperProps={{ position: 'right' }}
                toggle={(toggleRef: React.RefObject<any>) => (
                  <MenuToggle
                    ref={toggleRef}
                    isExpanded={isKebabDropdownOpen}
                    onClick={onKebabDropdownToggle}
                    variant="plain"
                    aria-label="Settings and help"
                  >
                    <EllipsisVIcon aria-hidden="true" />
                  </MenuToggle>
                )}
              >
                <DropdownList>{kebabDropdownItems}</DropdownList>
              </Dropdown>
            </ToolbarItem>
            <ToolbarItem visibility={{ md: 'hidden' }}>
              <Dropdown
                isOpen={isFullKebabDropdownOpen}
                onSelect={onFullKebabSelect}
                onOpenChange={setIsFullKebabDropdownOpen}
                popperProps={{ position: 'right' }}
                toggle={(toggleRef: React.RefObject<any>) => (
                  <MenuToggle
                    ref={toggleRef}
                    isExpanded={isFullKebabDropdownOpen}
                    onClick={onFullKebabToggle}
                    variant="plain"
                    aria-label="Toolbar menu"
                  >
                    <EllipsisVIcon aria-hidden="true" />
                  </MenuToggle>
                )}
              >
                <DropdownGroup key="group 2" aria-label="User actions">
                  <DropdownList>{userDropdownItems}</DropdownList>
                </DropdownGroup>
                <Divider />
                <DropdownList>{kebabDropdownItems}</DropdownList>
              </Dropdown>
            </ToolbarItem>
          </ToolbarGroup>
          <ToolbarItem visibility={{ default: 'hidden', md: 'visible' }}>
            <Dropdown
              isOpen={isDropdownOpen}
              onSelect={onDropdownSelect}
              onOpenChange={setIsDropdownOpen}
              popperProps={{ position: 'right' }}
              toggle={(toggleRef: React.RefObject<any>) => (
                <MenuToggle
                  ref={toggleRef}
                  isExpanded={isDropdownOpen}
                  onClick={onDropdownToggle}
                  icon={<Avatar src={imgAvatar} alt="" />}
                  isFullHeight
                >
                  {translation.username}
                </MenuToggle>
              )}
            >
              <DropdownList>{userDropdownItems}</DropdownList>
            </Dropdown>
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>
    </MastheadContent>
  </Masthead>
  );

  return (
    <React.Fragment>
      <Page sidebar={sidebar} header={masthead}>
        <PageBreadcrumb>
          <Breadcrumb>
            {Object.keys(breadcrumbItems).map((key, idx, arr) => (
              <BreadcrumbItem key={idx} isActive={arr.length - 1 === idx} to={`${breadcrumbItems[key].url}`}>
                {translation.breadcrumbs[key]}
                {breadcrumbItems.length}
              </BreadcrumbItem>
            ))}
          </Breadcrumb>
        </PageBreadcrumb>
        <PageSection variant="light">
          <TextContent>
            <Text component={TextVariants.h1}>{translation.title}</Text>
            <Text component={TextVariants.p}>{translation.body}</Text>
          </TextContent>
        </PageSection>
        <PageSection>
          <Card>
            {toolbarItems}
            <Table variant="compact" aria-label="Column Management Table">
              <Thead>
                <Tr>
                  {columns.map((column, columnIndex) => (
                    <Th key={columnIndex}>{column}</Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {paginatedRows.map((row, rowIndex) => (
                  <Tr key={rowIndex}>
                    <>
                      {Object.entries(row).map(([key, value]) => {
                        if (key === 'status') {
                          return (
                            <Td key={key} width={15} dataLabel="Status">
                              {renderLabel(value)}
                            </Td>
                          );
                        } else if (key === 'url') {
                          return (
                            <Td key={key} dataLabel="URL" modifier="truncate">
                              <TableText>
                                <a href="#">{row.url}</a>
                              </TableText>
                            </Td>
                          );
                        } else {
                          return (
                            <Td key={key} dataLabel={key === 'lastModified' ? 'Last modified' : capitalize(key)}>
                              {value}
                            </Td>
                          );
                        }
                      })}
                    </>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            {renderPagination(PaginationVariant.bottom)}
          </Card>
        </PageSection>
      </Page>
    </React.Fragment>
  );
};
