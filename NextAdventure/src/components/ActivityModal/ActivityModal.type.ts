import type { Activity } from '../../utils/Type'

export type Props = {
  onConfirm: (activity: Activity) => void
  onDismiss: () => void
  visible: boolean
}
