import React from 'react';
import FilterByStatus from './FilterByStatus';
import Hero, { aquamarine } from '../../components/Hero';
import ColumnsMultiline from '../../components/Columns/ColumnsMultiline';
import InlineBlock from '../../components/InlineBlock';
import Label from '../../components/Label';
import CardFooterItem from './CardFooterItem';
import CardButton from './CardButton';
import Card from '../../components/Card';
import Header from '../../components/Card/Header';
import Footer from '../../components/Card/Footer';

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
    const { id, ThingDesired, ThingOffered, status } = application;
    return (
      <Card
        key={id}
        header={
          <Header>
            Status: {status}
          </Header>
        }
        button={
          <CardButton
            status={status}
            applicationType={applicationType}
            id={id}
            onClickComplete={onClickComplete}
            onClickReject={onClickReject}
            onClickCancel={onClickCancel}
          />
        }
      >
        <Footer>
          <CardFooterItem
            title={titleLeft}
            userThing={ThingDesired}
          />
          <CardFooterItem
            title={titleRight}
            userThing={ThingOffered}
          />
        </Footer>
      </Card>
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
