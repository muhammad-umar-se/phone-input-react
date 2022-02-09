import PhoneInput from '../src/components/PhoneInput/index';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'PhoneInput',
  component: PhoneInput,
  args: {
    phoneNumber:'123 ',
    setPhoneNumber:()=>{}
  
  }
} as ComponentMeta<typeof PhoneInput>;


const Template: ComponentStory<typeof PhoneInput> = (args) => (
  
  <PhoneInput {...args}/>
);

export const Primary = Template.bind({});
