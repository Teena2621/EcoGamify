import { Linkedin, Phone, Mail } from 'lucide-react'
import Link from 'next/link'

const contactInfo = {
  linkedin: 'https://www.linkedin.com/company/example',
  landline: '+1-202-555-0182',
  helpline: '+1-800-555-0199',
  emails: [
    'contact@gamex.com',
    'support@gamex.com',
    'media@gamex.com'
  ]
}

export default function Footer() {
  return (
    <footer className="bg-card/50 mt-12 py-8">
      <div className="container mx-auto px-4 md:px-6">
        <h3 className="text-center text-lg font-bold font-headline mb-6 text-foreground">About Us</h3>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
          <Link href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors">
            <Linkedin className="w-5 h-5" />
            <span>LinkedIn</span>
          </Link>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            <span>Landline: {contactInfo.landline}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            <span>Helpline: {contactInfo.helpline}</span>
          </div>
          {contactInfo.emails.map((email) => (
            <a href={`mailto:${email}`} key={email} className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Mail className="w-5 h-5" />
              <span>{email}</span>
            </a>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-8">© {new Date().getFullYear()} GameX. All Rights Reserved.</p>
      </div>
    </footer>
  )
}
