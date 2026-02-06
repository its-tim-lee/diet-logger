import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import FoodDetailsSection from './FoodDetailsSection';
import { FoodItem } from '../types';

const sampleItems: FoodItem[] = [
  {
    id: '1',
    name: 'Greek Salad',
    amount: '1 bowl',
    meal: 'Lunch',
    time: '12:30 PM',
  },
  {
    id: '2',
    name: 'Grilled Chicken',
    amount: '150g',
    meal: 'Lunch',
    time: '12:30 PM',
  },
  {
    id: '3',
    name: 'Quinoa',
    amount: '1 cup',
    meal: 'Lunch',
    time: '12:30 PM',
  },
];

const meta = {
  title: 'Components/FoodDetailsSection',
  component: FoodDetailsSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    addItem: fn(),
    updateItem: fn(),
    deleteItem: fn(),
    onOpenSearch: fn(),
  },
} satisfies Meta<typeof FoodDetailsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithItems: Story = {
  args: {
    items: sampleItems,
  },
};

export const SingleItem: Story = {
  args: {
    items: [
      {
        id: '1',
        name: 'Oatmeal',
        amount: '1 bowl',
        meal: 'Breakfast',
        time: '8:00 AM',
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
};

export const ManyItems: Story = {
  args: {
    items: [
      {
        id: '1',
        name: 'Toast with Avocado',
        amount: '2 slices',
        meal: 'Breakfast',
        time: '8:00 AM',
      },
      {
        id: '2',
        name: 'Scrambled Eggs',
        amount: '2 eggs',
        meal: 'Breakfast',
        time: '8:00 AM',
      },
      {
        id: '3',
        name: 'Greek Salad',
        amount: '1 bowl',
        meal: 'Lunch',
        time: '12:30 PM',
      },
      {
        id: '4',
        name: 'Grilled Salmon',
        amount: '150g',
        meal: 'Dinner',
        time: '7:00 PM',
      },
      {
        id: '5',
        name: 'Steamed Broccoli',
        amount: '1 cup',
        meal: 'Dinner',
        time: '7:00 PM',
      },
    ],
  },
};
