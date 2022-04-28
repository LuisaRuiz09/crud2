import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

//Sweet alert2
const MySwal = withReactContent(Swal)

//datos de la base de datos
const Create = () => {
    const [ nombre, setNombre ] = useState('')
    const [ apellido, setApellido ] = useState('')
    const [ telefono, setTelefono ] = useState(0)
    const [ email, setEmail ] = useState('')
    const [ producto, setProducto ] = useState('')
    const navigate = useNavigate()
  

   //Variable para crear un numero aleatorio y luego concatenarlo al link de la imagen
   let image = 'https://picsum.photos/100/100?image='
   const valorAleatorio = () =>{
       return Math.floor(Math.random()*(599-100+1)+100)
   }

   const listaCollection = collection(db, "lista")

   const store = async (e) => {
    e.preventDefault()

    //Validar inputs vacios
    if (!nombre.trim()) {
        MySwal.fire({
            icon: 'warning',
            title: 'Error',
            text: 'Por favor ingrese el nombre'
        })
        return 
    }

    if (!apellido.trim()) {
        MySwal.fire({
            icon: 'warning',
            title: 'Error',
            text: 'Por favor ingrese el apellido'
        })
        return 
    }

    if (!telefono.trim()) {
        MySwal.fire({
            icon: 'warning',
            title: 'Error',
            text: 'Por favor ingrese el telefono'
        })
        return 
    }

    if (!email.trim()) {
        MySwal.fire({
            icon: 'warning',
            title: 'Error',
            text: 'Por favor ingrese el email'
        })
        return 
    }

    if (!producto.trim()) {
        MySwal.fire({
            icon: 'warning',
            title: 'Error',
            text: 'Por favor ingrese el producto'
        })
        return 
    }
    await addDoc( listaCollection, {  
        nombre: nombre, 
        apellido:apellido, 
        telefono: telefono, 
        email: email, 
        producto: producto, 
        image : image+valorAleatorio()
      })
    navigate('/')
    //console.log(e.target[0].value)
  }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Agregar nuevo registro</h1>
                 <form onSubmit={store}>
                    <div className='mb-3'>
                        <label className='form-label'>Nombre</label>
                        <input
                            value={nombre}
                            onChange={ (e) => setNombre(e.target.value)} 
                            type="text"
                            className='form-control' placeholder = "Ingrese el nombre"
                        />
                    </div>  
                    <div className='mb-3'>
                        <label className='form-label'>Apellido</label>
                        <input
                            value={apellido}
                            onChange={ (e)=> setApellido(e.target.value)} 
                            type="text"
                            className='form-control' placeholder = "Ingrese el apellido"
                        />                 
                    </div>  
                    <div className='mb-3'>
                        <label className='form-label'>Telefono</label>
                        <input
                            value={telefono}
                            onChange={ (e)=> setTelefono(e.target.value)} 
                            type="number"
                            className='form-control' placeholder ="Ingrese el telefono"
                        />                 
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>E-mail</label>
                        <input
                            value={email}
                            onChange={ (e)=> setEmail(e.target.value)} 
                            type="email"
                            className='form-control' placeholder = "Ingrese el E-mail"
                        />                 
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Producto</label>
                        <input
                            value={producto}
                            onChange={ (e)=> setProducto(e.target.value)} 
                            type="text"
                            className='form-control' placeholder = "Nombre producto Y/O referencia"
                        />                 
                    </div>          
                    <button type='submit' className='btn btn-primary'>Guardar</button>
                    
                    <p></p>
                 </form>   
            </div>
        </div>
    </div> 
  )
}
//commit
export default Create