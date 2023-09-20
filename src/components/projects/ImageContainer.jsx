import React from "react"

export const ImageContainer = ({ imageUrls }) => {

    return (
        <>
            <div className="img-1">
                {/* <img src={imageUrls[0]} alt="" /> */}
            </div>
            <div className="img-2">
                <img src="https://cdn.acodez.in/wp-content/uploads/2020/10/langogo.png" alt="" />
            </div>
            <div className="img-3">
                <img src="https://cdn.acodez.in/wp-content/uploads/2020/10/langogo.png" alt="" />
                <img src="https://cdn.acodez.in/wp-content/uploads/2020/10/langogo.png" alt="" />
                <img src="https://cdn.acodez.in/wp-content/uploads/2020/10/langogo.png" alt="" />
                <img src="https://cdn.acodez.in/wp-content/uploads/2020/10/langogo.png" alt="" />
            </div>
        </>
    )
}
