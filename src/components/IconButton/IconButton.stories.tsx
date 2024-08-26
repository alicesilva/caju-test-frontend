import { Meta, StoryFn } from '@storybook/react';
import IconButton from '.';
import { HiOutlineArrowLeft, HiRefresh } from 'react-icons/hi';
import { fn } from '@storybook/test';
import { IoMdClose } from 'react-icons/io';
import { ReactNode } from 'react';

export default {
  title: 'Components/IconButton',
  component: IconButton,
  args: { onClick: fn() }
} as Meta;

const Template: StoryFn<{
  children: ReactNode;
}> = (args) => <IconButton {...args} />;

export const Refresh = Template.bind({});
Refresh.args = {
  children: <HiRefresh size={24} />,
};

export const GoToHome = Template.bind({});
GoToHome.args = {
  children: <HiOutlineArrowLeft size={24} />,
};

export const CloseModal = Template.bind({});
CloseModal.args = {
  children: <IoMdClose size={16} />,
};