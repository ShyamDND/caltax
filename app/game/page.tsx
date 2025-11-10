'use client'
import React, { useEffect, useState } from 'react'

type Props = {}

function genNum() {
  return Math.ceil(Math.random() * 90)
}

export default function Page({}: Props) {
  const [Score, setScore] = useState(0)

  function removeItem() {
    let container = document.getElementById('container')
    let item = document.getElementById('item')
    if (item) container?.removeChild(item)
  }

  function increaseScore() {
    setScore((prev) => prev + 1)
    removeItem()
    appendItem()
  }

  function appendItem() {
    let container = document.getElementById('container')
    let div = document.createElement('div')
    div.classList.add('size-10', 'bg-lime-500', 'absolute', 'rounded-full')
    div.style.top = genNum() + 'svh'
    div.style.left = genNum() + 'svh'
    div.id = 'item'
    div.onclick = increaseScore
    container?.appendChild(div)
  }

  useEffect(() => {
    const timeout = setInterval(() => {
      removeItem()
      appendItem()
    }, 3000)

    return () => {
      clearInterval(timeout)
    }
  }, [])

  return (
    <div id="container" className="h-svh relative bg-black">
      <div className="size-20 absolute top-0 right-0 text-orange-500">
        Score {Score}
      </div>
    </div>
  )
}
