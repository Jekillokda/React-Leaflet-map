import React from 'react'
import Place from './Place'

function PlaceList (props) {
    return (
        <div>
            {
                props.list.map(function(item, idx){
                    return (<li key={idx}><Place text = {item.text}></Place></li>)
                })
            }
        </div>
    )
}
  export default PlaceList;