import AppLayout from "@/layouts/AppLayout"

export default function ExplorePage() {
  return (
    <h1>hello world ExplorePage</h1>
  )
}

ExplorePage.getLayout = function(page) {
  return (
    <AppLayout>
      {page}
    </AppLayout>
  )
}