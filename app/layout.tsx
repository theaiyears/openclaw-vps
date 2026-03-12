export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body style={{fontFamily:'Inter,Arial,sans-serif',margin:0,background:'#0b1020',color:'#f5f7ff'}}>{children}</body></html>;
}
