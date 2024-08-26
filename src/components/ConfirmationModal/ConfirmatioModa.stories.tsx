import { Meta, StoryFn } from '@storybook/react';
import ConfirmationModal from '.';

export default {
  title: 'Components/ConfirmationModal',
  component: ConfirmationModal,
} as Meta;

const Template: StoryFn = (args) => {
    return <ConfirmationModal {...args} />;
  }


export const Default = Template.bind({});