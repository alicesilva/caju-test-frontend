import { Meta, StoryFn } from '@storybook/react';
import StatusButton from '.';
import { ReactNode } from 'react';
import { fn } from '@storybook/test';

export default {
  title: 'Components/Buttons/StatusButton',
  component: StatusButton,
  parameters: {},
  args: { onClick: fn() }
} as Meta;

const Template: StoryFn<{
    children: ReactNode;
    bgColor?: string
  }> = (args) => {
    return <StatusButton {...args} />;
  }


export const ReviewStatus = Template.bind({});
ReviewStatus.args = {
  children: "Revisar",
  bgColor: "#ff8858"
};

export const ApprovedStatus = Template.bind({});
ApprovedStatus.args = {
  children: "Aprovar",
  bgColor: "rgb(155, 229, 155)"
};


export const ReprovedStatus = Template.bind({});
ReprovedStatus.args = {
  children: "Reprovar",
  bgColor: "rgb(255, 145, 154)"
};