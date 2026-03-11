import React, { useEffect, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import FieldGroup from "@/Components/Form/FieldGroup";
import TextInput from "@/Components/Form/TextInput";
import Checkbox from "@/Components/Form/Checkbox";
import LoadingButton from "@/Components/Button/LoadingButton";
import { Eye, EyeOff } from "lucide-react";

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    username: "",
    password: "",
    remember: false,
  });

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  const [showPassword, setShowPassword] = useState(false);
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

  const submit = (e) => {
    e.preventDefault();

    post(route("login"));
  };

  return (
    <GuestLayout heading="Log in" description="Enter your username and password to access the dashboard.">
      <Head title="Log in" />

      {status && (
        <div className="mb-4 font-medium text-sm text-green-600">{status}</div>
      )}

      <form onSubmit={submit}>
        <FieldGroup
					label='Username'
					name='username'
					error={errors.username}
					isPrimary={true}
				>
					<TextInput
						id='username'
						name='username'
						value={data.username}
						onChange={(e) => setData('username', e.target.value)}
						className='mt-1 block w-full'
						required
						isFocused={true}
						autoComplete='username'
						placeholder='Username...'
					/>
				</FieldGroup>

				<FieldGroup
					label='Password'
					name='password'
					error={errors.password}
					isPrimary={true}
					className='relative'
				>
					<TextInput
						id='Password'
						type={showPassword ? 'text' : 'password'}
						name='Password'
						value={data.password}
						onChange={(e) => setData('password', e.target.value)}
						className='mt-1 block w-full'
						required
						autoComplete='Password'
						placeholder='Password...'
					/>

					<button type='button' onClick={togglePasswordVisibility} className='absolute top-1/2 right-3 mt-1'>
						{showPassword ? <Eye className='text-slate-400' /> : <EyeOff className='text-slate-400' />}
					</button>
				</FieldGroup>

				<div className='block mt-4'>
					<label className='flex items-center'>
						<Checkbox
							name='remember'
							checked={data.remember}
							onChange={(e) => setData('remember', e.target.checked)}
						/>
						<span className='ms-2 text-sm text-gray-600'>Remember me</span>
					</label>
				</div>

        <div className="flex items-center justify-end mt-4">
          <LoadingButton disabled={processing}>Log in</LoadingButton>
        </div>
      </form>
    </GuestLayout>
  );
}
