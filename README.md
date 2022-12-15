# arh-05

## useRef || forwardRef || useImperativeHandle


### useRef()

The `useRef` hook lets you reference a value that’s not needed for rendering. You set an initial value that is stored as `current` property. You can change `current` property value but importantly __this does not initiate a re-render__. So you are able to update and store information based upon some event/change in the app/environment and retrieve the value later.

The basic properties of `useRef` are

- Stored values do not change with re-renders
- Changing values does not force a re-render
- The stored value is local to each copy of the component
- `refs` should be modified in event handlers and effects. Avoid setting `refs` during rendering.  

```
function MyInput() {
  const ref = React.useRef()
  
  function handleClick(e) {
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

By default DOM Nodes are private and therefore the child DOM Node is not accessible by the parent. In order to expose the DOM Node of the child to the parent element you can use `forwardRef`. This allows the parent to pass a reference to the child, which then gives the parent access the that DOM Node.

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
function MyInput (props, ref){
  return (
    <div>
      <input type="text" ref={ref} disabled/>
      <button onClick={props.onClick}>Click me!</button>
    </div>
  )
}

// eslint-disable-next-line no-func-assign
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
