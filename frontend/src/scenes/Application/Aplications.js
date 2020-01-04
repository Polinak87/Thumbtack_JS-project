import React from 'react';
import Card from './Card';
import FilterByStatus from './FilterByStatus';
import Hero, { aquamarine } from '../../components/Hero';
import ColumnsMultiline from '../../components/Columns/ColumnsMultiline';
import Column from '../../components/Columns/Column';
import InlineBlock from '../../components/InlineBlock';
import Label from '../../components/Label';

export default function Applications(props) {
  const {
    heroText,
    applicationsMap,
    applicationType,
    titleLeft,
    titleRight,
    onClickComplete,
    onClickReject,
    onFilterChange,
    onClickCancel,
  } = props;

  const applicationsArray = Array.from(applicationsMap.values());

  let cardList = applicationsArray.map(application => {
    const { id } = application;
    return (
      <Column key={id}>
        <Card
          application={application}
          applicationType={applicationType}
          titleLeft={titleLeft}
          titleRight={titleRight}
          onClickComplete={onClickComplete}
          onClickReject={onClickReject}
          onClickCancel={onClickCancel}
        />
      </Column>
    );
  });

  return (
    <div>
      <br />
      <Hero className={aquamarine} text={heroText} />
      <br />
      <InlineBlock>
        <Label>Status of application</Label>
        <FilterByStatus onChange={onFilterChange} />
      </InlineBlock>
      <ColumnsMultiline>{cardList}</ColumnsMultiline>
    </div>
  );
}
