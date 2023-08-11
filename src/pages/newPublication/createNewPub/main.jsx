import React from 'react'

const CreateNewPub = () => {
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='form' >
        <div className='form__type'>
          <label htmlFor="pubType">imagen12345</label>
          <input type="url" placeholder='Ingrese la url del contenido' {...register("pubType")} />
        </div>
        <div className='form__type'>
          <label htmlFor="pubType">Correo electronico</label>
          <input type="url"  {...register("pubType")} />
        </div>
        <div className='form__type'>
          <label htmlFor="pubType">Correo electronico</label>
          <input type="url"  {...register("pubType")} />
        </div>
      </form>
    </>
  )
}

export default CreateNewPub