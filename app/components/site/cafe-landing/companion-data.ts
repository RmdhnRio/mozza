//app/components/site/cafe-landing/companion-data.ts
import { CompanionData, CompanionSchedule } from './cafe-landing-types'

// ===== COMPANION DATABASE =====
export const companions: CompanionData[] = [
    {
        id: 'ginger',
        name: 'Ginger',
        breed: 'Orange Tabby',
        image: '/images/companions/ginger.png',
        visitingHours: '10:00 AM - 2:00 PM',
        personality: 'Curious & Playful',
        description: 'Ginger is a playful and curious orange tabby who loves exploring new areas and chasing after toys.',
        quirks: [
            'Loves feather wands and anything that dangles!',
            'Will purr loudly when he\'s happy or excited.',
            'Enjoys napping in sunny spots.'
        ],
        visitTips: [
            'Ginger may nibble when overstimulated – watch for body language cues like tail flicking or ears flattening.',
            'Do not give Ginger any milk or dairy products – it can upset his stomach.'
        ]
    },
    {
        id: 'bailey',
        name: 'Bailey',
        breed: 'Golden Retriever',
        image: '/images/companions/bailey.png',
        visitingHours: '11:00 AM - 4:00 PM',
        personality: 'Friendly & Energetic',
        description: 'Bailey is an enthusiastic golden retriever who loves meeting new people and playing fetch.',
        quirks: [
            'Always wants to play fetch – bring a ball!',
            'Loves belly rubs and will roll over for them.',
            'Gets excited around other dogs.'
        ],
        visitTips: [
            'Bailey may jump when excited – brace yourself!',
            'Keep small items away as Bailey likes to carry things in his mouth.'
        ]
    },
    {
        id: 'mochi',
        name: 'Mochi',
        breed: 'British Shorthair',
        image: '/images/companions/mochi.png',
        visitingHours: '1:00 PM - 5:00 PM',
        personality: 'Playful & Affectionate',
        description: 'Mochi is a sweet British Shorthair who enjoys gentle play and cuddling on laps.',
        quirks: [
            'Enjoys chasing laser pointers.',
            'Likes to knead blankets before settling down.',
            'Prefers quiet environments.'
        ],
        visitTips: [
            'Approach Mochi slowly – sudden movements may startle her.',
            'She loves chin scratches but avoid touching her belly.'
        ]
    },
    {
        id: 'luna',
        name: 'Luna',
        breed: 'Siamese Cat',
        image: '/images/companions/luna.png',
        visitingHours: '10:00 AM - 3:00 PM',
        personality: 'Curious & Playful',
        description: 'Luna is a talkative Siamese who loves to chat and follow you around the café.',
        quirks: [
            'Very vocal – will meow to get your attention!',
            'Loves climbing and high places.',
            'Enjoys interactive puzzle toys.'
        ],
        visitTips: [
            'Luna may try to steal food – keep your snacks secure!',
            'She responds well to her name being called softly.'
        ]
    },
    {
        id: 'max',
        name: 'Max',
        breed: 'Shiba Inu',
        image: '/images/companions/max.png',
        visitingHours: '12:00 PM - 4:00 PM',
        personality: 'Calm & Gentle',
        description: 'Max is a dignified Shiba Inu who enjoys calm interactions and gentle pets.',
        quirks: [
            'Does the famous "Shiba scream" when very excited.',
            'Loves treats – especially cheese!',
            'Independent but affectionate on his terms.'
        ],
        visitTips: [
            'Let Max come to you – don\'t force interaction.',
            'Avoid direct eye contact initially – it may seem threatening.'
        ]
    },
    {
        id: 'coco',
        name: 'Coco',
        breed: 'Poodle Mix',
        image: '/images/companions/coco.png',
        visitingHours: '10:00 AM - 1:00 PM',
        personality: 'Friendly & Energetic',
        description: 'Coco is a fluffy poodle mix with endless energy and a love for tricks.',
        quirks: [
            'Knows many tricks – ask staff to show you!',
            'Loves to dance on hind legs for treats.',
            'Very social with other dogs.'
        ],
        visitTips: [
            'Coco needs regular water breaks – she plays hard!',
            'She may bark when she wants attention.'
        ]
    }
]

// ===== SCHEDULE DATABASE =====
// Helper to generate date string
const dateStr = (daysFromToday: number): string => {
    const date = new Date()
    date.setDate(date.getDate() + daysFromToday)
    return date.toISOString().split('T')[0]
}

export const companionSchedule: CompanionSchedule[] = [
    { date: dateStr(-3), companionIds: ['luna', 'max', 'coco'] },
    { date: dateStr(-2), companionIds: ['ginger', 'bailey', 'mochi'] },
    { date: dateStr(-1), companionIds: ['luna', 'max', 'coco'] },
    { date: dateStr(0), companionIds: ['ginger', 'bailey', 'mochi'] },
    { date: dateStr(1), companionIds: ['luna', 'max', 'coco'] },
    { date: dateStr(2), companionIds: ['ginger', 'bailey', 'mochi'] },
    { date: dateStr(3), companionIds: ['luna', 'max', 'coco'] },
    { date: dateStr(4), companionIds: ['ginger', 'bailey', 'mochi'] },
    { date: dateStr(5), companionIds: ['luna', 'max', 'coco'] },
    { date: dateStr(6), companionIds: ['ginger', 'bailey', 'mochi'] },
    { date: dateStr(7), companionIds: ['luna', 'max', 'coco'] },
    { date: dateStr(8), companionIds: ['ginger', 'bailey', 'mochi'] },
    { date: dateStr(9), companionIds: ['luna', 'max', 'coco'] },
    { date: dateStr(10), companionIds: ['ginger', 'bailey', 'mochi'] },
    { date: dateStr(11), companionIds: ['luna', 'max', 'coco'] },
]

// ===== HELPER FUNCTIONS =====

// Get companions for a specific date
export function getCompanionsForDate(date: Date): CompanionData[] {
    const dateString = date.toISOString().split('T')[0]
    const schedule = companionSchedule.find(s => s.date === dateString)

    if (!schedule) {
        return companions.slice(0, 3)
    }

    return schedule.companionIds
        .map(id => companions.find(c => c.id === id))
        .filter((c): c is CompanionData => c !== undefined)
}

// Get companion by ID
export function getCompanionById(id: string): CompanionData | undefined {
    return companions.find(c => c.id === id)
}

