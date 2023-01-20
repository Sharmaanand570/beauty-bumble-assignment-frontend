import './colorHandler.css'

function ColorsBox(props) {
    let rgbCode = props.rgbCode
    return (
        <>
            <div className="color" style={{ backgroundColor: rgbCode }}>
                {rgbCode}
            </div>
        </>
    )
}

function ImageColors(props) {
    const colors = props.colors
    return (
        <div className="colorBox">
            <div>
                {colors.map((e) => { return <ColorsBox rgbCode={e} /> })}
            </div>
        </div>
    )
}

export default ImageColors