import { Meta, StoryFn } from '@storybook/react';
import Header from '.';

export default {
  title: 'Components/Header',
  component: Header,
} as Meta;

const Template: StoryFn = () => <Header />;

export const Default = Template.bind({});