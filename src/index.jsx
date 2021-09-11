import { render } from 'solid-js/web'
import { createSignal, createMemo, createEffect, oncCleanUp } from 'solid-js'
import './index.css'

const App = () => {
    const [getCounter, setCounter] = createSignal(0);

    createEffect(prev => {
        const sum = prev + getCounter()
        console.log({prev, sum, actualCounter: getCounter()})
        return sum
    }, 0)

    return ( 
        <>
        <h1>This counter</h1>
            <p>{getCounter()}</p>
            <p>{getCounter() % 2 === 0 ? 'its even' : 'not even'}</p>
        <button onClick={() => {
            setCounter(getCounter() + 1)
        }}>Increment</button>
        </>
    )
}

render(App, document.getElementById('root'))
/* render(App, document.body) */