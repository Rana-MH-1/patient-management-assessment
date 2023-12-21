import NavBar from '@/Components/NavBar'
import SideBar from '@/Components/SideBar'
import WrapperLayout from '@/Components/WrapperLayout'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* <NavBar /> */}
        <WrapperLayout>{children}</WrapperLayout>
                
      </body>
    </html>
  )
}
