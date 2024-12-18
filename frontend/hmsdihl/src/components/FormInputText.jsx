
function FormInputText(props) {
  return (
    <input type={props.type} placeholder={props.placeholder} onChange={props.onChange} className="rounded p-2 m-2 text-text"/>
  )
}

export default FormInputText
