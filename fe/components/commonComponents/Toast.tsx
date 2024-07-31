import {
  Toast as _Toast,
  ToastDescription as _ToastDescription,
  ToastTitle as _ToastTitle,
  styled,
} from '@gluestack-ui/themed'

/**
  Toast example:
  const toast = useToast()
  const onPress = () => {
    toast.show({
      placement: "top",
      render: ({ id }) => (
        <Toast nativeID={`toast-${id}`}>
          <ToastTitle>title</ToastTitle>
          <ToastDescription>description</ToastDescription>
        </Toast>
      ),
    })
  }
 */
export const Toast = styled(_Toast)
export const ToastTitle = styled(_ToastTitle)
export const ToastDescription = styled(_ToastDescription)
