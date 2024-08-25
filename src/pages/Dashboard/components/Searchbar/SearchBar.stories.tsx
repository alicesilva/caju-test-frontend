import { Meta, StoryFn } from "@storybook/react";
import SearchBar from ".";

export default {
  title: "Components/Dashboard/SearchBar",
  component: SearchBar,
} as Meta;

const Template: StoryFn = (args) => {
  return <SearchBar {...args} />;
};

export const Default = Template.bind({});
