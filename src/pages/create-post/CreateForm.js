import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import  { addDoc, collection} from 'firebase/firestore'
import { auth, db } from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

function CreateForm() {
    const [user] = useAuthState(auth);
    const navigator = useNavigate()
    const schema = yup.object().shape({
        title: yup.string().required("You must add a title"),
        description: yup.string().required("You must add description")
    });

    const { 
        register, 
        handleSubmit, 
        formState: { errors }, 
    } = useForm({
        resolver: yupResolver(schema)
    })

    const postRef = collection(db, "posts")

    const onCreatePost = async(data) => {
        await addDoc(postRef, {
            ...data,
            username: user?.displayName,
            userId: user?.uid,
        })
        navigator('/')
    };
  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
        <input  placeholder='Title..' {...register("title")}/>
        <p>{errors.title?.message}</p>
        <textarea placeholder='Description..' {...register("description")} />
        <p>{errors.description?.message}</p>
        <input type='submit'/>
    </form>
  )
}

export default CreateForm