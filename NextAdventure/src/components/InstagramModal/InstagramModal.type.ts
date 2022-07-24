import { Social } from "../../utils/Type";

export type Props = {
  onConfirm: (social: Social) => void
  onDismiss: () => void
  visible: boolean
}
