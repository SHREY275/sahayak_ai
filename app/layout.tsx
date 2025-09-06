import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { UserProvider } from '@/contexts/UserContext'

export const metadata = {
  title: 'SahayakAI - Government Schemes Portal',
  description: 'Find and apply for government and state-level schemes easily',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </UserProvider>
      </body>
    </html>
  )
}
