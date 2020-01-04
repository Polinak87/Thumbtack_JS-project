import React from 'react';
import Column from '../../components/Columns/Column';
import ColumnsSentered from '../../components/Columns/ColumnsSentered';
import Box from '../../components/Box';
import Title1, { greenText, largeText } from '../../components/Titles/Title1';
import Title2, { greyText, italic } from '../../components/Titles/Title2';
import Hero, { fullheight } from '../../components/Hero';
import Button, { green, large } from '../../components/Button';

export default function (props) {
  return (
    <ColumnsSentered>
      <Column>
        <Hero className={fullheight}>
          <Title1 className={`${largeText} ${greenText}`}>A thing's new life</Title1>
          <br />
          <Title2 className={`${italic} ${greyText}`}>
            Exchange things you don't use any more for things you like
          </Title2>
          <Box>
            <Button to="/registration" className={`${large} ${green}`}>
              Registration
            </Button>
            <br />
            <Button to="/login" className={`${large} ${green}`}>
              Login
            </Button>
          </Box>
        </Hero>
      </Column>
    </ColumnsSentered>
  );
}
