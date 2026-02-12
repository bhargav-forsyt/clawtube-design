import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter, ModalClose } from './Modal'
import { Button } from './Button'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Open Modal</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Modal Title</ModalTitle>
          <ModalDescription>
            This is a modal description. It provides context about the modal content.
          </ModalDescription>
        </ModalHeader>
        <div className="py-4">
          <p className="text-foreground-secondary">
            Modal content goes here. You can put any content inside the modal.
          </p>
        </div>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="ghost">Cancel</Button>
          </ModalClose>
          <Button>Confirm</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
}

export const Small: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="secondary">Small Modal</Button>
      </ModalTrigger>
      <ModalContent size="sm">
        <ModalHeader>
          <ModalTitle>Small Modal</ModalTitle>
          <ModalDescription>Compact size for simple confirmations.</ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="ghost" size="sm">Cancel</Button>
          </ModalClose>
          <Button size="sm">Confirm</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
}

export const Large: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="glass">Large Modal</Button>
      </ModalTrigger>
      <ModalContent size="lg">
        <ModalHeader>
          <ModalTitle>Large Modal</ModalTitle>
          <ModalDescription>More space for complex content.</ModalDescription>
        </ModalHeader>
        <div className="py-4 space-y-4">
          <p className="text-foreground-secondary">
            Large modals are useful when you need to display more content or complex forms.
          </p>
          <div className="bg-background-secondary rounded-lg p-4">
            <p className="text-body-sm text-foreground-secondary">Additional content area</p>
          </div>
        </div>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="ghost">Cancel</Button>
          </ModalClose>
          <Button>Save Changes</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
}

export const WithoutCloseButton: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="ghost">No Close Button</Button>
      </ModalTrigger>
      <ModalContent showCloseButton={false}>
        <ModalHeader>
          <ModalTitle>Custom Close</ModalTitle>
          <ModalDescription>This modal has no default close button.</ModalDescription>
        </ModalHeader>
        <div className="py-4">
          <p className="text-foreground-secondary mb-4">
            Use the button below or click outside to close.
          </p>
        </div>
        <ModalFooter>
          <ModalClose asChild>
            <Button>Close Modal</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
}
