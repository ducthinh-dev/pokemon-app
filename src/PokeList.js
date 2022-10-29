import React from 'react'

export default function PokeList({ pokemons }) {
    return (
        <div>
            {pokemons.map(pokemon => (
                <div key={pokemon}>{pokemon}</div>
            ))}
        </div>
    )
}
