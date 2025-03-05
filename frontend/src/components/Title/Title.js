import React from 'react'

export default function Title({title, fontSize, margin}) {
  return (
    <h1 stype={{fontSize, margin, color: '#616161'}}>
        {title}
    </h1>
  )
}
