import { PageEditor } from '@/components/cms/page-editor'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function EditPagePage({ params }: PageProps) {
  const { slug } = await params

  return (
    <div className="h-full">
      <PageEditor mode="edit" slug={slug} />
    </div>
  )
}