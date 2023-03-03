import React from 'react'

const ModelListComponent = ({ currentModel, setCurrentModel, models }) => {

  return (
    <div className='container'>
        <select value={currentModel} onChange={(e) => setCurrentModel(e.target.value)}>
            {
              models?.map(model => (
                <option value={model?.id} key={model?.id}>{model?.id}</option>
              ))
            }
          </select>
    </div>
  )
}

export default ModelListComponent