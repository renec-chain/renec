import { useState } from 'react';

const useModalState = (defaultState = false) => {
  const [open, setOpen] = useState(defaultState)

  const onClose = () => {
    setOpen(false)
  }

  const onOpen = () => {
    setOpen(true)
  }

  const toggle = () => {
    setOpen(prev => !prev)
  }

  return {
    open,
    onClose,
    onOpen,
    toggle
  }
}

export {
  useModalState
}
