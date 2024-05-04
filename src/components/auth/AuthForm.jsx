import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";

import { continueWithGoogle, signUpWithCredentials, signInWithCredentials } from '../../firebase';
import { storeDataInSessionStorage, getDataFromSessionStorage } from '../../utils/helper';
import { myHistory } from '../../utils/router/history';

import Input from '../input/Input';
import Button from '../input/Button';
import AuthSocialButton from './AuthSocialButton';

const AuthForm = () => {
    const [variant, setVariant] = useState('LOGIN');
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const data = getDataFromSessionStorage('user');
        if (data?.name) {
            myHistory.replace('/');
        }
    }, []);

    const toggleVariant = (() => {
        variant === 'LOGIN' ? setVariant('REGISTER') : setVariant('LOGIN')
    })

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit = (data) => {
        setIsLoading(true)
        if (variant === 'REGISTER') {
            signUpWithCredentials(data.name, data.email, data.password)
                .then(res => {
                    if (res.success) {
                        storeDataInSessionStorage('user', res);
                        window.dispatchEvent(new Event('storage'));
                        toast.success('Signed Up Successfully!');
                        myHistory.replace('/');
                    } else {
                        toast.error(`${res.error}!`)
                    }
                })
                .catch(() => toast.error('Something went wrong!'))
                .finally(() => setIsLoading(false))
        }
        if (variant === 'LOGIN') {
            signInWithCredentials(data.email, data.password)
                .then(res => {
                    if (res.success) {
                        storeDataInSessionStorage('user', res);
                        window.dispatchEvent(new Event('storage'));
                        toast.success('Signed In Successfully!')
                        myHistory.replace('/');
                    } else {
                        toast.error(`${res.error}!`)
                    }
                })
                .catch(() => toast.error('Something went wrong!'))
                .finally(() => setIsLoading(false))
        }
    }

    const socialAction = () => {
        setIsLoading(true);
        continueWithGoogle()
            .then(res => {
                if (res.success) {
                    storeDataInSessionStorage('user', res);
                    window.dispatchEvent(new Event('storage'));
                    toast.success('Logged In!');
                    myHistory.replace('/');
                } else {
                    toast.error(`${res.error}!`);
                }
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => setIsLoading(false))
    }

    return (
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className=' bg-stone-50 px-4 py-8 shadow-lg sm:rounded-lg sm:px-10'>
                <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                    {variant === 'REGISTER' && (
                        <Input
                            label="Name"
                            register={register}
                            errors={errors}
                            id='name'
                            type='text'
                            disabled={isLoading}
                        />
                    )}
                    <Input
                        label="Email"
                        register={register}
                        errors={errors}
                        id='email'
                        type='text'
                        disabled={isLoading}
                    />
                    <Input
                        label="Password"
                        register={register}
                        errors={errors}
                        id='password'
                        type='password'
                        disabled={isLoading}
                    />
                    <div>
                        <Button disabled={isLoading} fullWidth type="submit" >
                            {variant === 'LOGIN' ? 'Sign in' : 'Register'}
                        </Button>
                    </div>
                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div className=" absolute   inset-0 flex  items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton
                            Icon={FcGoogle}
                            onClick={() => socialAction()}
                            disabled={isLoading}
                        />
                    </div>
                </div>
                <div className="flex  gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                    <div> {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'} </div>
                    <div onClick={toggleVariant} className="underline cursor-pointer">
                        {variant === 'LOGIN' ? 'Create an account' : 'Login'}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthForm