import React from 'react';
import ApplicationCard from './ApplicationCard';
import FilterByStatus from './FilterByStatus';
import Hero, {aquamarine} from '../../components/Hero';
import CardBlock from '../../components/CardBlock';
import Column from '../../components/Column';

export default function Application(props) {
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
        <ApplicationCard
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
      <FilterByStatus onChange={onFilterChange} />
      <CardBlock cardList={cardList} />
    </div>
  );
}
