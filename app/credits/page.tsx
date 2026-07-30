import type { Metadata } from 'next'
import { Section, Heading } from '@/components/ui-components'

export const metadata: Metadata = {
  title: 'Photo credits | LeadPath',
  description:
    'Attribution for the photography used across the LeadPath website.',
}

const LICENCES: Record<string, string> = {
  'CC BY-SA 4.0': 'https://creativecommons.org/licenses/by-sa/4.0/',
  'CC BY 4.0': 'https://creativecommons.org/licenses/by/4.0/',
  CC0: 'https://creativecommons.org/publicdomain/zero/1.0/',
}

const photos = [
  {
    file: 'uganda-youth-training.jpg',
    used: 'Home page hero',
    title: 'CSC 0747 — Wiki Loves Women Training at Kawempe Youth Centre',
    author: 'AKibombo',
    licence: 'CC BY-SA 4.0',
    changes: 'Cropped and resized',
    source:
      'https://commons.wikimedia.org/wiki/File:CSC_0747_-_Wiki_Loves_Women_Training_at_Kawempe_Youth_Centre.jpg',
  },
  {
    file: 'uganda-training-focus.jpg',
    used: 'About — Our Story',
    title: 'DSC0730 — Wiki Loves Women Training at Kawempe Youth Centre',
    author: 'AKibombo',
    licence: 'CC BY-SA 4.0',
    changes: 'Cropped and resized',
    source:
      'https://commons.wikimedia.org/wiki/File:DSC0730_-_Wiki_Loves_Women_Training_at_Kawempe_Youth_Centre.jpg',
  },
  {
    file: 'uganda-digital-skills.jpg',
    used: 'Get Involved hero',
    title: 'DSC0723 — Wiki Loves Women Training at Kawempe Youth Centre',
    author: 'AKibombo',
    licence: 'CC BY-SA 4.0',
    changes: 'Resized',
    source:
      'https://commons.wikimedia.org/wiki/File:DSC0723_-_Wiki_Loves_Women_Training_at_Kawempe_Youth_Centre.jpg',
  },
  {
    file: 'uganda-student-portrait.jpg',
    used: 'Contact hero',
    title: 'DSC0724 — Wiki Loves Women Training at Kawempe Youth Centre',
    author: 'AKibombo',
    licence: 'CC BY-SA 4.0',
    changes: 'Cropped and resized',
    source:
      'https://commons.wikimedia.org/wiki/File:DSC0724_-_Wiki_Loves_Women_Training_at_Kawempe_Youth_Centre.jpg',
  },
  {
    file: 'uganda-graduation.jpg',
    used: 'About — Why Choose LeadPath',
    title:
      'Pictorial of the Aga Khan University Uganda students for the class of 2025',
    author: 'Tamdra',
    licence: 'CC BY 4.0',
    changes: 'Resized',
    source:
      'https://commons.wikimedia.org/wiki/File:Pictorial_of_the_Aga_Khan_University_Uganda_students_for_the_class_of_2025.jpg',
  },
  {
    file: 'uganda-classroom.jpg',
    used: 'Donate hero',
    title: 'Luganda Wikipedia sensitisation, Makerere University',
    author: 'Ssemmanda will',
    licence: 'CC0',
    changes: 'Cropped and resized',
    source:
      'https://commons.wikimedia.org/wiki/File:Luganda_Wikipedia_sensitisation,_Makerere_University.jpg',
  },
]

export default function CreditsPage() {
  return (
    <>
      <Section bgColor="primary" className="pt-32 pb-16 md:pt-40 md:pb-20" id="hero">
        <div>
          <Heading level={1} className="text-white mb-6">
            Photo <span className="text-lime">Credits</span>
          </Heading>
          <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
            The photographs on this site were made by Ugandan photographers and
            are used under open licences. Each one is credited below, with a link
            to the original and the licence it carries.
          </p>
        </div>
      </Section>

      <Section id="photos" className="bg-white">
        <ul className="max-w-3xl space-y-8">
          {photos.map((photo) => (
            <li
              key={photo.file}
              className="border-l-4 border-l-lime pl-5 py-1"
            >
              <p className="font-serif text-xs font-bold uppercase tracking-[0.14em] text-accent-ink mb-2">
                {photo.used}
              </p>
              <p className="font-serif font-bold text-lg text-primary mb-1">
                {photo.title}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Photograph by {photo.author}, licensed under{' '}
                <a
                  href={LICENCES[photo.licence]}
                  className="text-accent-ink font-semibold hover:underline"
                  rel="license noopener noreferrer"
                  target="_blank"
                >
                  {photo.licence}
                </a>
                . {photo.changes} for use on this site.{' '}
                <a
                  href={photo.source}
                  className="text-accent-ink font-semibold hover:underline"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  View the original
                </a>
                .
              </p>
            </li>
          ))}
        </ul>

        <p className="max-w-3xl mt-12 text-sm text-muted-foreground leading-relaxed">
          The people pictured are not LeadPath participants — these are
          documentary photographs of youth training, university and community
          events in Uganda, used to illustrate the work LeadPath does. Portraits
          of the LeadPath team on the{' '}
          <a href="/about" className="text-accent-ink font-semibold hover:underline">
            About page
          </a>{' '}
          are photographs of our own people.
        </p>
      </Section>
    </>
  )
}
