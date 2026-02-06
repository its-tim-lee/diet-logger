import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Toast from './Toast';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClose: fn(),
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    message: 'Food logged successfully!',
  },
};

export const ShortMessage: Story = {
  args: {
    message: 'Saved!',
  },
};

export const LongMessage: Story = {
  args: {
    message: 'Your food entry has been successfully logged to your daily wellness tracker.',
  },
};

export const Hidden: Story = {
  args: {
    message: null,
  },
};
