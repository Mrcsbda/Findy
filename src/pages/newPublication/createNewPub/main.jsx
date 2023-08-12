import React from 'react'

const CreateNewPub = () => {
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='form' >
        <div className='form__box'>
          <label htmlFor="pubType">Agregar ****</label>
          <input type="url" {...register("pubType")} />
        </div>
        <div className='form__box'>
          <label htmlFor="pubText">Agregar descripcion</label>
          <input type="text"  {...register("pubText")} />
        </div>
        <div className='form__box'>
          <label htmlFor="pubTags">Etiquetar personas</label>
          <input type="text"  {...register("pubTags")} />
        </div>
        <div className='form__box'>
          <label htmlFor="pubTopics">Agregar temas</label>
          <input type="text"  {...register("pubTopics")} />
        </div>
      </form>
    </>
  )
}

export default CreateNewPub