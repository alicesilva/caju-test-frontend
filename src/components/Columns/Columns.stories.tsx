import { Meta, StoryFn } from '@storybook/react';
import Columns from '.';

export default {
  title: 'Components/Columns',
  component: Columns,
} as Meta;

const Template: StoryFn = () => <Columns />;

export const Default = Template.bind({});