# arh-05

## useRef || forwardRef || useImperativeHandle


### useRef

```
function MyInput() {
  const ref = React.useRef(null)
  
  function handleClick() {
    ref.current.value = "Clicked"
  }
  
  return (
    <div>
      <input type="text" ref={ref} disabled/>
      <button onClick={handleClick}>Click me!</button>
    </div>
  )
}

function App() {
  return (
    <>
      <h1>Example of useRef</h1>
      <p>The parent component does not have access to the ref on the child component. It cannot pass ref as a prop to the child component</p>
      <MyInput />
    </>
  )
}
```

### forwardRef

```
const MyInput = React.forwardRef((props, ref) => {
  return (
    <div>
      <input type="text" ref={ref} disabled/>
      <button onClick={props.onClick}>Click me!</button>
    </div>
  )
})

function App() {
  const ref = React.useRef(null)
  
  function handleClick() {
    console.log(ref)
    ref.current.value = "Clicked"
  }
  
  return (
    <>
      <h1>Example of useRef</h1>
      <p>The parent component can now pass ref into the child component and have access to the underlying DOM Node</p>
      <MyInput ref={ref} onClick={handleClick} />
    </>
  )
}

```


