import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {collection, getDocs, deleteDoc, doc} from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
//import { nanoid } from "nanoid";
//import { async } from '@firebase/util'

const MySwal = withReactContent(Swal)

const Show = () => {
  //1 - configurar los hooks
  const [lista, setListas] = useState( [] )

  //2 - referenciar a la DB firestore
  const listaCollection = collection(db, "lista")

  //3 - Funcion para mostrar TODOS los docs
  const getListas = async ()   => {
   const data = await getDocs(listaCollection)
   //console.log(data.docs)
   setListas(
       data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
   )
   //console.log(lista)
  }

  //4 - Funcion para eliminar un doc
  const deleteLista = async (id) => {
    const listaDoc = doc(db, "lista", id)
    await deleteDoc(listaDoc)
    getListas()
   }

  


    //5 - Funcion de confirmacion para Sweet Alert 2
  const confirmDelete = (id) => {
    MySwal.fire({
      title: '¿Eliminar el registro?',
      text: "No seras capaz de restaurarlo",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '¡Si, eliminalo!'
    }).then((result) => {
      if (result.isConfirmed) { 
        //llamar a la fcion para eliminar   
        deleteLista(id)               
        Swal.fire(
          'Eliminado',
          'El registro ha sido eliminado',
          'success'
        )
      }
    })    
  }

  //6 - usamos useEffect
  useEffect( () => {
    getListas()
    // eslint-disable-next-line
  }, [] )
  //7 - devolver vista de nuestro componente
  //campos de la base de datos
  return (
    <>
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h1>Lista de Registros</h1>
          <table className='table table-hover'>
          <thead> 
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Telefono</th>
                            <th>Email</th>
                            <th>Producto</th>
                            <th>Imagen Aleatoria</th>
                            <th>Acciones</th>
                        </tr>
           </thead>
            <tbody>
              { lista.map( (lista) => (
                <tr key={lista.id}>
                  <td>{lista.nombre}</td>
                  <td>{lista.apellido}</td>
                  <td>{lista.telefono}</td>
                  <td>{lista.email}</td>
                  <td>{lista.producto}</td>
                  <td><img src ={lista.image} alt=""/></td>
                 

                  <td>
                    <Link to={`/edit/${lista.id}`} className="btn btn-light"><i className="fa-solid fa-pencil"></i></Link>
                    <button onClick={ () => { confirmDelete(lista.id) } } className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                  </td>


                </tr>                
              )) }
            </tbody>
          </table>
          <div className="d-grid gap-2">
            <Link to="/create" className='btn btn-success mt-2 mb-2'>Agregar</Link>    
          </div>
          
        </div>
      </div>
    </div>
    </>
  )



}


export default Show