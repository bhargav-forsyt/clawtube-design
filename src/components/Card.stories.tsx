import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card'
import { Button } from './Button'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass', 'elevated'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    hover: {
      control: 'boolean',
    },
    interactive: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
    padding: 'md',
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>This is a description of the card content.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground-secondary">Main content goes here. Cards are used to group related content.</p>
        </CardContent>
        <CardFooter>
          <Button variant="primary" size="sm">Action</Button>
          <Button variant="ghost" size="sm">Cancel</Button>
        </CardFooter>
      </>
    ),
  },
}

export const Glass: Story = {
  args: {
    variant: 'glass',
    padding: 'md',
    children: (
      <>
        <CardHeader>
          <CardTitle>Glass Card</CardTitle>
          <CardDescription>With backdrop blur effect</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground-secondary">Glass cards are perfect for floating UI elements.</p>
        </CardContent>
      </>
    ),
  },
}

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    padding: 'md',
    children: (
      <>
        <CardHeader>
          <CardTitle>Elevated Card</CardTitle>
          <CardDescription>With shadow and higher elevation</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground-secondary">Elevated cards draw more attention with their shadow.</p>
        </CardContent>
      </>
    ),
  },
}

export const Interactive: Story = {
  args: {
    variant: 'default',
    padding: 'md',
    hover: true,
    interactive: true,
    children: (
      <>
        <CardHeader>
          <CardTitle>Interactive Card</CardTitle>
          <CardDescription>Hover and click to see animations</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground-secondary">This card responds to hover and tap interactions.</p>
        </CardContent>
      </>
    ),
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Card variant="default">
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
          <CardDescription>Standard card style</CardDescription>
        </CardHeader>
      </Card>
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Glass Card</CardTitle>
          <CardDescription>With backdrop blur</CardDescription>
        </CardHeader>
      </Card>
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Elevated Card</CardTitle>
          <CardDescription>With shadow</CardDescription>
        </CardHeader>
      </Card>
    </div>
  ),
}
