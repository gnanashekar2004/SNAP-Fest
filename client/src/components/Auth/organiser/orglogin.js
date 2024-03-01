import React from 'react';
import {useFormik} from 'formik';
import {orgloginhandle} from '../api-helpers/api-helpers.js'

export function orglogin(){
    const formik =useFormik({
        initialValues:{
            OrganiserID:'',
            password:''
        }
    });
    return (
        <form onSubmit={orgloginhandle}>
            <label htmlFor='OrganiserID'>OrganiserID</label>
            <input id='OrganiserID'
                    name='OrganiserID'
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.OrganiserID}/>
            <label htmlFor='password'>Password</label>
            <input id='password'
                    name='password'
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.password}/>
            <button className="input-button" type="submit">
                      Login
            </button>
        </form>
    )
}