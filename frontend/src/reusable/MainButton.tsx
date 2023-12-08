
type ButtonType = {
    content: string,
    action: ()=>void,
    classes: string
}
const MainButton = ({content, action, classes}: ButtonType) => {
  return (
    <button
        type='button'
        className={`${classes} w-fit bg-yellow-main hover:bg-yellow-dark transition-all px-3 py-2 text-black font-semibold rounded-md`}
        onClick={action}
    >
        {content}
    </button>
  )
}

export default MainButton