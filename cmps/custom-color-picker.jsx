import { eventBusService } from '../services/event.bus.service.js'

export function CustomColorPicker({ posX, posY }) {
    function getColor(color) {
        const colors = { white: 'none', yellow: '#fff475', green: '#ccff90', blue: '#cbf0f8', purple: '#d7aefb', pink: '#fdcfe8', red: '#f28b82' }
        return colors[color]
    }

    function onPickColor(color) {
        eventBusService.emit('notes-picked-color', color)
    }

    return <section className='custom-color-picker' style={{ left: posX, top: posY }}>
        <div onClick={() => onPickColor(getColor('white'))} style={{ backgroundColor: getColor('white'), boxShadow: 'inset 0 0 1px #8d939a' }}></div>
        <div onClick={() => onPickColor(getColor('yellow'))} style={{ backgroundColor: getColor('yellow') }}></div>
        <div onClick={() => onPickColor(getColor('green'))} style={{ backgroundColor: getColor('green') }}></div>
        <div onClick={() => onPickColor(getColor('blue'))} style={{ backgroundColor: getColor('blue') }}></div>
        <div onClick={() => onPickColor(getColor('purple'))} style={{ backgroundColor: getColor('purple') }}></div>
        <div onClick={() => onPickColor(getColor('pink'))} style={{ backgroundColor: getColor('pink') }}></div>
        <div onClick={() => onPickColor(getColor('red'))} style={{ backgroundColor: getColor('red') }}></div>
    </section>
}