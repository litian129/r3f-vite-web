import { useEffect } from "react"
import { useState } from "react"
import { useRef } from "react"

const CURSOR_SPEED = 0.08

let mouseX = 0
let mouseY = 0
let outlineX = 0
let outlineY = 0

export const Cursor = () => {
  const cursorOutline = useRef()
  const [hoverButton, setHoverButton] = useState(false)

  const animate = () => {
    let distX = mouseX - outlineX
    let distY = mouseY - outlineY

    outlineX = outlineX + distX * CURSOR_SPEED
    outlineY = outlineY + distY * CURSOR_SPEED

    cursorOutline.current.style.left = `${outlineX}px`
    cursorOutline.current.style.top = `${outlineY}px`
    requestAnimationFrame(animate)
  }

  useEffect(() => {
    console.log('加载组件 :>>1 ');
    const mouseEventsListener = document.addEventListener(
      "mousemove",
      function (event) {
        console.log('event :>> ', event);
        mouseX = event.pageX
        mouseY = event.pageY
      }
    )
    const animateEvent = requestAnimationFrame(animate)
    // return语句在回调函数执行后被调用，用于清除或取消副作用操作。它通常用于清除订阅、取消网络请求或释放资源等。
    // 通过使用return语句，我们可以确保在组件卸载时执行必要的清理操作，以避免内存泄漏或其他问题。
    /**
     * 在React中，useEffect()是一个副作用钩子函数，它用于在组件渲染后执行一些副作用操作，例如订阅数据、操作DOM元素等。当然，有时候我们还需要在组件卸载或下一次渲染前执行一些清理操作，以避免内存泄漏或其他问题。
在useEffect()中，return语句用于定义一个清理函数，该函数将在组件卸载或下一次渲染前执行。具体来说，当组件即将被移除时，React会先调用清理函数，然后再执行下一次渲染。这样可以确保在组件被销毁之前，我们可以执行一些必要的清理操作。
清理函数可以用来取消订阅、清除定时器、取消网络请求等等，以确保在组件卸载时不会产生任何副作用。
下面是一个使用useEffect()的例子，其中包含了一个清理函数：
```javascript
useEffect(() => {
  // 副作用操作
  subscribeToData();
  // 清理函数
  return () => {
    // 执行清理操作，比如取消订阅
    unsubscribeFromData();
  };
}, []);
```
在上述例子中，我们传递了一个空数组作为第二个参数给useEffect()，这意味着副作用操作只会在组件首次渲染时执行一次，而不会在后续的渲染中再次执行。同时，由于没有依赖项，清理函数只会在组件卸载时执行一次。
     */
    return () => {
      console.log('卸载组件 :>>1 ');
      document.removeEventListener("mousemove", mouseEventsListener)
      cancelAnimationFrame(animateEvent)
    }
  }, [])

  useEffect(() => {
    const mouseEventsListener = document.addEventListener(
      "mouseover",
      function (e) {
        if (
          e.target.tagName.toLowerCase() === "button" ||
          e.target.parentElement.tagName.toLowerCase() === "button" ||
          e.target.tagName.toLowerCase() === "input" ||
          e.target.tagName.toLowerCase() === "textarea"
        ) {
          setHoverButton(true)
        } else {
          setHoverButton(false)
        }
      }
    )
    return () => {
      console.log('卸载组件 :>> ');
      document.removeEventListener("mousemove", mouseEventsListener)
    }
  }, [])

  return (
    <>
      <div
        className={`z-50 fixed -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-transform
        ${
          hoverButton ? "bg-transparent border-2 border-indigo-900 w-5 h-5"
          : "bg-indigo-500 w-3 h-3"
        }`}
        ref={cursorOutline}
      >
      </div>
    </>
  )
}