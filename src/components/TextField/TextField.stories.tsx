import { Meta, StoryFn } from '@storybook/react';
import TextField from '.';

export default {
  title: 'Components/TextField',
  component: TextField,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
    },
    error: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

const Template: StoryFn = (args) => <TextField {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Test Label',
  error: '',
};

export const WithError = Template.bind({});
WithError.args = {
  label: 'Test Label',
  error: 'This field is required'
};