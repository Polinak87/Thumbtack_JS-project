import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import Hero from '../../components/hero';
import ButtonAddRemoveFromMarket from  '../../scenes/profile/buttonAddRemoveFromMarket';
import Card from '../../scenes/profile/card';

afterEach(cleanup);

it('should has hero name', () => {
  const heroText = 'Your inventory';
  const { getByText } = render(<Hero heroText={heroText}/>);
  expect(getByText(heroText).textContent).toBe(heroText);
});

it('clicks button', () => {
  const onMarket = false;
  const { getByText } = render(<ButtonAddRemoveFromMarket onMarket={onMarket} />);
  fireEvent.click(getByText('Add to market'));
});

it('snapshort of button', () => {
  const onMarket = true;
  const { container } = render(<ButtonAddRemoveFromMarket onMarket={onMarket} />);
  expect(container.firstChild).toMatchSnapshot();
});

it('snapshort of card', () => {
  const id=1;
  const name='summer dress';
  const description='light';
  const categoryName='dresses';
  const onMarket=true;
  const onMarketAt='2019-05-15T05:21:56.000Z';
  const { container } = render(<Card
                                id={id}
                                name={name}
                                description={description}
                                categoryName={categoryName}
                                onMarket={onMarket}
                                onMarketAt={onMarketAt}/>);
  expect(container.firstChild).toMatchSnapshot();
});

