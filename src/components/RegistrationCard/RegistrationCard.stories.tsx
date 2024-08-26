import { Meta, StoryFn } from "@storybook/react";
import RegistrationCard from ".";
import { RegistrationStatus } from "~/types/RegistrationStatus";
import { Registration } from "~/types/Registration";

const mockDataReview: Registration = {
  id: "1",
  status: RegistrationStatus.REVIEW,
  employeeName: "João da Silva",
  admissionDate: "2021-10-10",
  cpf: "123.456.789-00",
  email: "joao.silva@email.com",
};

const mockDataReviewed: Registration = {
  id: "2",
  status: RegistrationStatus.APPROVED,
  employeeName: "Pedro da Silva",
  admissionDate: "2021-10-10",
  cpf: "123.456.789-00",
  email: "predro.silva@email.com",
};


export default {
  title: "Components/RegistrationCard",
  component: RegistrationCard,
  parameters: {},
} as Meta;

const Template: StoryFn<{
  data: Registration;
}> = (args) => {
  return <RegistrationCard {...args} />;
};

export const Review = Template.bind({});
Review.args = {
  data: mockDataReview,
};

export const Reviewed = Template.bind({});
Reviewed.args = {
  data: mockDataReviewed,
};
