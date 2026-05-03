import React from 'react'
import type { SizeTokens } from 'tamagui'
import {
  Button,
  Form,
  H4,
  Spinner,
  AnimatePresence,
  Square,
  XStack,
  XGroup,
  Label,
  YStack,
  Input,
} from 'tamagui'

import  Select1  from './Select1'

export function FormsDemo() {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [status, setStatus] = React.useState<'off' | 'submitting' | 'submitted'>('off')

  React.useEffect(() => {
    if (status === 'submitting') {
      const timer = setTimeout(() => setStatus('off'), 2000)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [status])

  return (
    <Form
      alignContent="center"
      gap="$4"
      width="100%"
      onSubmit={() => setStatus('submitting')}
      borderWidth={1}
      bg="$color2"
      borderColor="$borderColor"

      p="$6"
    >
        <Label htmlFor="method">Method</Label>
        <Select1 />
        <Label htmlFor="emailAddress">Email</Label>
        <Input id="emailAddress" placeholder="Enter your email" />
    <Form.Trigger asChild>
      <Button>Submit</Button>
    </Form.Trigger>
  </Form>
  )
}