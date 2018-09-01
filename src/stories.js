import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

const Button = () => {
    return (
        <p>This is a story of a button</p>
    )
}

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')} />
  ))