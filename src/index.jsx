import { render } from 'solid-js/web'
import { createSignal, createResource, For, createMemo, createEffect, onCleanup, mergeProps, onMount, Switch } from 'solid-js'
import './index.css'

const fetchData = () => {
return fetch('https://rickandmortyapi.com/api/character')
    .then(res => res.json())
    .then(resp => {
        console.log(resp.results)
        return resp.results.slice(0, 5)
    })
}   

const App = () => {
    const [getResults, setResults] = createSignal([])
    const [getFav, setFavs] = createSignal([])

    const [getData, { mutate, refetch }] = createResource(fetchData, { initialValue: [] })

    const handleFav = e => {
        setFavs(...getFav() + e)
        localStorage.setItem("favorites", JSON.stringify(getFav()));
    }

    return (
        <>
        <h1>New app, with Solid.JS and Rick and Morty  API REST  :D</h1>
        <Switch fallback={<div>Loading...</div>}>
            <Match when={getData.error}>
                <div>Error.</div>
            </Match>

            <Match when={getData.loading}>
                <div>Loading...</div>
            </Match>

{/*         <Show when={getData.loading}>
            <div>Loading...</div>
            </Show>
            
            <Show when={getData.error}>
            <div>Error.</div>
        </Show> */}
        <Match when={getData}>
            <For each={getData()} /* fallback={<div>Loading...</div>} */>
                {e => (
                    <div>
                    <span>{e.name}, status: {e.status}{<br/>}</span>
                    <img src={e.image} />
                    <button onClick={() => handleFav(e.id)}>Fav</button>
                    {<hr/>}
                </div>                
                )}
            </For>
        </Match>
        </Switch>
{/*         {
            getData().map(e => {
                return (
                    <>
                        <span>{e.name}</span>
                        <span>{e.status}</span>
                        <img src={e.image} />
                    </>
                )
            })
        } */}
        </>
    )
}

/* const App = () => {
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
} */

render(App, document.getElementById('root'))
/* render(App, document.body) */