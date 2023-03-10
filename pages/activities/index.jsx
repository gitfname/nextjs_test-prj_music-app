import AppLayout from "@/layouts/AppLayout"

export default function ActivitiesPage() {
  return (
    <h1>hello world from activities page</h1>
  )
}

ActivitiesPage.getLayout = function(page) {
  return (
    <AppLayout>
      {page}
    </AppLayout>
  )
}