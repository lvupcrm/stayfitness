import { PageEditor } from '@/components/cms/page-editor'

export default function NewPagePage() {
  return (
    <div className="h-full">
      <PageEditor mode="create" />
    </div>
  )
}