import './error.css'

function Error(props){
    console.log(props)
    return(
        <div className='error'>
            <p>⚠️&nbsp;{props.error.message}&nbsp;⚠️</p>
        </div>
    )
}

export default Error;