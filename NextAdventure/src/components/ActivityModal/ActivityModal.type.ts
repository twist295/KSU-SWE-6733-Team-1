import type { Activity } from '../../utils/Type'

export type Props = {
  activity?: Activity | null
  onConfirm: (activity: Activity) => void
  onDismiss: () => void
  visible: boolean
}
