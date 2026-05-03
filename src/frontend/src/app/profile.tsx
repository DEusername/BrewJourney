import { Text, View } from "react-native";
import { Form } from "tamagui";
import { Label } from "tamagui";
import { Input } from "tamagui";
import { Button } from "tamagui";
import { useState } from "react";

export default function Profile() {
  const [status, setStatus] = useState('idle');
  return (
    <Form
      alignContent="center"
      gap="$2"
      onSubmit={() => setStatus('submitting')}
      borderWidth={1}
      bg="$color2"
      borderColor="$borderColor"

      p="$6"
    >
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Enter your name" />
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="Enter your email" />
    <Form.Trigger asChild>
      <Button>Submit</Button>
    </Form.Trigger>
  </Form>
  );
}
