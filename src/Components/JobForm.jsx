import React, { useState } from 'react'

const emptyForm = {
    company:"",
    role:"",
    status:"applied",
    location:"",
    appliedOn:""
}


function validate(values){
    const netErrors = {}
    if(!values.company.trim()){
        netErrors.company = "Companyeh Podra Venna"
    }
    if(!values.role.trim()){
        netErrors.role = "Role Illama Enna Pudunka Poriya Role eh Podra Dubukku"
    }
    if(!values.appliedOn.trim()){
        netErrors.appliedOn = "Date Calculate Pannale Nee uruppuda Matte Athu Illame"
    }
    return netErrors;
}


const JobForm = ({onSave,editingJob,onCancel}) => {
    const [form,setForm] = useState(emptyForm)
    const [errors,setErrors] = useState({})
    const [loadedJobId,setLoadedJobId] = useState(null)
    const currenJobId = editingJob?.id??null
    if(currenJobId!==loadedJobId){
        setLoadedJobId(currenJobId)
        setForm(
            editingJob?{
                company: editingJob?.company ?? "" ,
                role: editingJob?.role ?? "" ,
                status: editingJob?.status ?? "applied" ,
                location: editingJob?.location ?? "" ,
                appliedOn: editingJob?.appliedOn ?? ""
            }
            : emptyForm
        );
        setErrors({});
    };
    function handleChange(event){
        const{name,value} = event.target;
        setForm((current)=>({
            ...current,
            [name]:value
        }));
        setErrors((current)=>({
            ...current,
            [name]:""
        }));
    };
    async function handleSubmit(event){
        event.preventDefault()
        const nextErrors = validate(form);
        setErrors(nextErrors)

    if(Object.keys(nextErrors).length > 0){
        return;
    }

    const payLoad = {
        company: form.company.trim(),
        role: form.role.trim(),
        status: form.status,
        location: form.location.trim(),
        appliedOn: form.appliedOn
    }

    try {
        await onSave(payLoad)
        setForm({...emptyForm});
        setErrors({});
    } catch (error) {

    }
    // setForm(emptyForm);
    // setErrors({});
    // setLoadedJobId(null);
    };
    

    function handleCancel(){
        setForm(emptyForm);
        setErrors({});
        setLoadedJobId(null);
        onCancel();
    }

  return (
    <form onSubmit={handleSubmit} className='job-form'>
        <h2 className='text-2xl pb-5'>{editingJob ? "Edit Application" : "Add Application"}</h2>
        <label htmlFor='company'>Company*</label>
        <input
            id='company'
            name='company'
            value={form.company}
            onChange={handleChange}
            placeholder='enter company name'
        />
        {errors.company && (
            <p>{errors.company}</p>
        )}
        <label htmlFor='role'>Job Role*</label>
        <input
            id='role'
            name='role'
            value={form.role}
            onChange={handleChange}
            placeholder='enter role you applied'
        />
        {errors.role && (
            <p>{errors.role}</p>
        )}
        <label htmlFor='status'>Job Status</label>
        <input
            id='status'
            name='status'
            value={form.status}
            onChange={handleChange}
            placeholder='enter your current status'
        />
        {errors.status && (
            <p>{errors.status}</p>
        )}
        <label htmlFor='location'>Location</label>
        <input
            id='location'
            name='location'
            value={form.location}
            onChange={handleChange}
            placeholder='enter your location'
        />
        {errors.location && (
            <p>{errors.location}</p>
        )}
        <label htmlFor='appliedOn'>Applied Date*</label>
        <input
            id='appliedOn'
            name='appliedOn'
            value={form.appliedOn}
            onChange={handleChange}
            type='date'
        />
        {errors.appliedOn && (
            <p>{errors.appliedOn}</p>
        )}
        <div className='jobform-buttons'>
            <button type='submit'>{editingJob ? "Save Changes" : "Add Job"}</button>
            {editingJob && (
                <button className='cancel-btn' type='button' onClick={handleCancel}>Cancel</button>
            )}
            
        </div>
    </form>
  )
}

export default JobForm