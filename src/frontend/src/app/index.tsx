import { Redirect, router, Stack } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    router.replace("/home");
  }, []);

  
  return (
    null
  );
}



