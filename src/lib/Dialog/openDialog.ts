import { createApp, h } from 'vue'
import Dialog from './Dialog.vue'

export const openDialog = (options) => {
  const {
    title,
    content,
    ok,
    cancel,
    closeOnClickOverlay,
  } = options

  const div = document.createElement('div')
  document.body.appendChild(div)
  const close = () => {
    app.unmount(div)
    div.remove()
  }

  const app = createApp({
    render() {
      return h(
        Dialog,
        {
          visible: true,
          ok,
          closeOnClickOverlay,
          cancel,
          'onUpdate:visible': (newVisible) => {
            if (newVisible === false) {
              close()
            }
          }
        },
        {
          title,
          content
        }
      )
    }
  })

  app.mount(div)
}
