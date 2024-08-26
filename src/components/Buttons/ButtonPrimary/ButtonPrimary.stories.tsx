import { Meta, StoryFn } from '@storybook/react';
import ButtonPrimary from '.';
import { ReactNode } from 'react';
import { fn } from '@storybook/test';

export default {
  title: 'Components/Buttons/ButtonPrimary',
  component: ButtonPrimary,
  args: { onClick: fn() }
} as Meta;

const Template: StoryFn<{
    children: ReactNode;
  }> = (args) => {
    return <ButtonPrimary {...args} />;
  }


export const Default = Template.bind({});
Default.args = {
  children: "Nova admissão",
};