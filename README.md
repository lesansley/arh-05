# arh-05

## useRef || forwardRef || useImperativeHandle


### useRef()

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

### forwardRef()

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

It is also possible to refactor the `forwardRef` as below.

```
const MyInput = (props, ref) => {
  return (
    <div>
      <input type="text" ref={ref} disabled/>
      <button onClick={props.onClick}>Click me!</button>
    </div>
  )
}

// eslint-disable-next-line no-const-assign
MyInput = React.forwardRef(MyInput)

```

### useImperativeHandle()

The `useImperativehandle` allows you to expose custom methods and properties on the `forwardRef` element to the user.

```
const MyInput = React.forwardRef((props, ref) => {
  const [state, setState] = React.useState("Unclicked")
  
  React.useImperativeHandle(ref, () => ({
    update
  }))
  
  function update(newValue){
    setState(newValue)
  }
  
  return (
    <div>
      <input type="text" ref={ref} value={state} disabled/>
      <button onClick={props.onClick}>Click me!</button>
    </div>
  )
})

function App() {
  const ref = React.useRef(null)
  
  function handleClick() {
    ref.current.update("Clicked")
  }
  
  return (
    <>
      <h1>Example of useRef</h1>
      <p>The parent component can now pass ref into the child component and have access to the underlying DOM Node. But the parent component only has access to a custom `update` method on the DOM Node</p>
      <MyInput ref={ref} onClick={handleClick} />
    </>
  )
}

```
