import React from 'react';
import ThingInfo from '../../components/Card/ThingInfo';
import FooterItem from '../../components/Card/FooterItem';
import Content, { full } from '../../components/Card/Content';

export default function CardFooterItem({ userThing, title }) {
  const { Thing:thing, id, onMarket, onMarketAt } = userThing;
  const { image, name, description, Category:category } = thing;
  const { name: categoryName } = category;
  return (
    <FooterItem>
      <Content className={full}>
        <p>{title}</p>
        <br />
        <ThingInfo
          id={id}
          image={image}
          name={name}
          description={description}
          categoryName={categoryName}
          onMarket={onMarket}
          onMarketAt={onMarketAt}
        />
      </Content>
    </FooterItem>
  );
}
