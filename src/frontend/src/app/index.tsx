import { Form } from "@tamagui/form";
import { Redirect, router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Label } from "tamagui";
import { Input } from "tamagui";
import { Button } from "tamagui";

export default function Index() {
  const [status, setStatus] = useState('idle');
  useEffect(() => {
    router.replace("/home");
  }, []);

  
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



