// app/components/site/cafe-landing/WeatherIcons.tsx
import React from 'react'
import { Sun, Cloud, CloudRain, Wind } from 'lucide-react'
import { WeatherCondition } from './cafe-landing-types'

interface WeatherIconProps {
    condition: WeatherCondition
    className?: string
    size?: number
}

export const WeatherIcon = ({ condition, className = '', size = 24 }: WeatherIconProps) => {
    const iconProps = {
        size,
        className,
        strokeWidth: 2
    }

    switch (condition) {
        case 'sunny':
            return <Sun {...iconProps} className={`${className} text-[#FFC73B]`} />
        case 'cloudy':
            return <Cloud {...iconProps} className={`${className} text-gray-400`} />
        case 'rainy':
            return <CloudRain {...iconProps} className={`${className} text-blue-400`} />
        case 'partly-cloudy':
            return <Wind {...iconProps} className={`${className} text-gray-500`} />
        default:
            return <Sun {...iconProps} className={`${className} text-[#FFC73B]`} />
    }
}

export default WeatherIcon