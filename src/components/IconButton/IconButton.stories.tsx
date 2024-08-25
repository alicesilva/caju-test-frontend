import { Meta, StoryFn } from '@storybook/react';
import IconButton from '.';
import { HiRefresh } from 'react-icons/hi';
import { fn } from '@storybook/test';

export default {
  title: 'Components/IconButton',
  component: IconButton,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  args: { onClick: fn() }
} as Meta;

const Template: StoryFn = (args) => <IconButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <HiRefresh size={24} />,
};