import React from 'react'

function TextField({value,onChange,question_id}) {

    const handleChange = (ev) => {
        const { name, value } = ev.target;
       onChange({
        value,
          [name]: value,
          question_id:question_id
        });
      };
  return (
    <>
        <input
          className="form-control"
          name="name"
          value={value.name}
          onChange={handleChange}
          placeholder="name"
          type="text"
        />
       
       
      </>
  )
}

export default TextField