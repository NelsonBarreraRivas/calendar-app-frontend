import { FC } from 'react';
import ReactLoading from 'react-loading'


type LoadingType = "blank" | "balls" | "bars" | "bubbles" | "cubes" | "cylon" | "spin" | "spinningBubbles" | "spokes";

interface SpinnerProps{
    type : LoadingType
    height: number
    width: number
    color: string
}

export const Spinner : FC<SpinnerProps> = ( { type, color, height, width } ) => {

    return (
        <main className="relative">
            <div className="pre-loader absolute bg-white">
                <ReactLoading type={type} color={color} height={ height } width={ width } />
            </div>
        </main>
    )
}
