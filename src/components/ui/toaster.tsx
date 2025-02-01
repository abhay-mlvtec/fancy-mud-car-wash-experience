import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, variant = "default", ...props }) => {
        // Define custom colors for different toast types
        const toastVariants = {
          success: "bg-green-600 text-white border border-green-700 shadow-lg",
          error: "bg-red-600 text-white border border-red-700 shadow-lg",
          warning: "bg-yellow-500 text-black border border-yellow-600 shadow-lg",
          default: "bg-gray-800 text-white border border-gray-700 shadow-lg",
        };

        return (
          <Toast key={id} {...props} className={`rounded-lg p-4 ${toastVariants[variant] || toastVariants.default}`}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport className="top-5 right-5 fixed z-50" /> {/* Moves toast to the top-right */}
    </ToastProvider>
  )
}
