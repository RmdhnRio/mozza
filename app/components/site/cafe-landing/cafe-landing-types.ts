export interface SlideData {
    id: string
    image: string
    alt: string
}
export type WeatherCondition = 'sunny' | 'cloudy' | 'rainy' | 'partly-cloudy'
export interface WeatherData {
    date: string
    temperature: number
    condition: WeatherCondition
    icon: string
}
export interface DayNavItem {
    date: Date
    dayName: string
    dayShort: string
    dateNumber: number
    monthName: string
    year: number
    weather: WeatherData
    isToday: boolean
}
// Mock weather data untuk 3 jenis cuaca
export const mockWeatherData: Record<WeatherCondition, WeatherData> = {
    'sunny': {
        date: '',
        temperature: 32,
        condition: 'sunny',
        icon: '☀️'
    },
    'cloudy': {
        date: '',
        temperature: 28,
        condition: 'cloudy',
        icon: '☁️'
    },
    'rainy': {
        date: '',
        temperature: 25,
        condition: 'rainy',
        icon: '🌧️'
    },
    'partly-cloudy': {
        date: '',
        temperature: 29,
        condition: 'partly-cloudy',
        icon: '⛅'
    }
}
// Helper function untuk generate weather berdasarkan tanggal
export function getWeatherForDate(date: Date): WeatherData {
    const conditions: WeatherCondition[] = ['sunny', 'cloudy', 'rainy', 'partly-cloudy']
    // Use date as seed untuk konsistensi
    const index = date.getDate() % conditions.length
    const condition = conditions[index]

    return {
        ...mockWeatherData[condition],
        date: date.toISOString().split('T')[0]
    }
}
// Generate navigation items untuk 14 hari (7 sebelum + hari ini + 6 sesudah)
export function generateDayNavItems(centerDate: Date = new Date()): DayNavItem[] {
    const items: DayNavItem[] = []
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const dayShorts = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December']

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    for (let i = -3; i <= 7; i++) {
        const date = new Date(centerDate)
        date.setDate(centerDate.getDate() + i)
        date.setHours(0, 0, 0, 0)

        const dateToCheck = new Date(date)
        dateToCheck.setHours(0, 0, 0, 0)

        items.push({
            date,
            dayName: dayNames[date.getDay()],
            dayShort: dayShorts[date.getDay()],
            dateNumber: date.getDate(),
            monthName: monthNames[date.getMonth()],
            year: date.getFullYear(),
            weather: getWeatherForDate(date),
            isToday: dateToCheck.getTime() === today.getTime()
        })
    }

    return items
}

// Companion personality types
export type PersonalityType =
    | 'Curious & Playful'
    | 'Friendly & Energetic'
    | 'Playful & Affectionate'
    | 'Calm & Gentle'
    | 'Shy & Sweet'

// Companion data interface
export interface CompanionData {
    id: string
    name: string
    breed: string
    image: string
    visitingHours: string
    personality: PersonalityType
    description: string
    quirks: string[]
    visitTips: string[]
}

// Schedule: which companions are available on which dates
export interface CompanionSchedule {
    date: string
    companionIds: string[]
}

