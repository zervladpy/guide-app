import { Editor } from "@tiptap/core"
import { StarterKit } from "@tiptap/starter-kit"
import { EditorContent } from "@tiptap/react"

type PageEditorProps = {
  content: string
}

const extensions = [
  StarterKit
]

export default function PageEditor({ content }: PageEditorProps) {

  const editor = new Editor({
    content: content,
    extensions: extensions,
  })


  return (
    <EditorContent editor={editor} />
  )

}
