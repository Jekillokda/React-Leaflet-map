import React from 'react'
import Place from './Place'

function PlaceList (props) {
    return (
        <div>
            {
                props.list.map(function(d, idx){
                    return (<li key={idx}><Place text = {d.text}></Place></li>)
                })
            }
        </div>
    )
}
  export default PlaceList;