
const ChefsitoInfo = () => {
  return (
    <div className='bg-gray rounded shadow-2xl shadow-strong-gray w-full p-2'>
        <h4 className='text-center text-xl'>Hola, yo soy el <span className='text-yellow-main'>Chefsito</span></h4>
        <p>Estoy aquí para ayudarte</p>
        <ul className="list-disc">
            <li className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-yellow-dark"></div>Puedo personalizar la pizza que tu me pidas.</li>
            <li className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-yellow-dark"></div>Registrar el domicilio donde quieres recibir tu pedido.</li>
            <li className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-yellow-dark"></div>Y agregar los complementos que tú me pidas.</li>
        </ul>
        <p>Si quieres que te ayude sólo presiona el botón del micrófono</p>
        <p>graba la tarea que quieras que ejecute</p>
        <p>Espera a que la analice y te responda con algún mensaje</p>
    </div>
  )
}

export default ChefsitoInfo