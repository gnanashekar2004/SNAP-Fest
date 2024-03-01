import React from 'react';
import {useFormik} from 'formik';
import {orgsignuphandle} from '../api-helpers/api-helpers.js'

export function orgsignup(){
    const formik =useFormik({
        initialValues:{
            name:'',
            password:''
        }
    });
    return (
        <form onSubmit={orgsignuphandle}>
            <label htmlFor='name'>Name</label>
            <input id='name'
                    name='name'
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.name}/>
            <label htmlFor='password'>Password</label>
            <input id='password'
                    name='password'
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.password}/>
            <button className="input-button" type="submit">
                      Signup
            </button>
        </form>
    )
}