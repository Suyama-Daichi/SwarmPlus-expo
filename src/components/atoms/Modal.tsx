import { Button, Modal as NBModal } from 'native-base'
import { IModalProps } from 'native-base/lib/typescript/components/composites/Modal/types'
import { useState } from 'react'

type Props = {
  headerTitle: string
  body: string | JSX.Element
  buttons: {title: string, onPress: () => void | unknown, close?: boolean}[]
}
export const Modal = ({ headerTitle, body, buttons, ...option }: IModalProps & Props) => {
  const [isOpen, setIsOpen] = useState(option.isOpen)

  return (
    <NBModal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false)
        option.onClose()
      }}
    >
      <NBModal.Content>
        <NBModal.CloseButton />
        <NBModal.Header >{headerTitle || 'Header Title'}</NBModal.Header>
        <NBModal.Body >
          {body || 'body'}
        </NBModal.Body>
        <NBModal.Footer >
          <Button.Group variant="ghost" space="2">
            {buttons?.map(button => {
              return (
                <Button
                  key={button.title}
                  onPress={() => {
                    button.onPress()
                    button.close && setIsOpen(false)
                  }}
                >{button.title || 'button'}</Button>
              )
            })}

          </Button.Group>
        </NBModal.Footer>
      </NBModal.Content>
    </NBModal>
  )

}