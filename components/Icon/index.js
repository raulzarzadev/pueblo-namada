import DownArrow from "./icons/DownArrow"

// https://www.svgrepo.com/collection/sexyicons-line-icons/
export default function Icon({ iconName }) {

  const ICONS = {
    down: DownArrow
  }
  return ICONS[iconName]
}