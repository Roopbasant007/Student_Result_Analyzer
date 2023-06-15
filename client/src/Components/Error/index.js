import { Box, useToast } from "@chakra-ui/react"
import { useEffect } from "react"

function ErrorAlert({ message }) {
  const toast = useToast()

  useEffect(() => {
    toast({
      title: typeof message === "string" ? message : "Some Error Occured",
      description: "Please try again",
      status: 'error',
      duration: 2500,
      position: "top-right",
      isClosable: true,
    })
  }, [toast, message])

  return (
    <Box display="none" />
  )
}

export default ErrorAlert