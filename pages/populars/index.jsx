import AppLayout from "@/layouts/AppLayout"

export default function PopularsPage() {
  return (
    <h1>hello world PopularsPage</h1>
  )
}

PopularsPage.getLayout = function(page) {
  return (
    <AppLayout>
      {page}
    </AppLayout>
  )
}