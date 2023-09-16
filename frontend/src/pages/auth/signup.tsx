import Input from "@/components/Input";
import React from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback } from "react";

type SignupProps = {
	usuario: string;
	senha: string;
	confirmar_senha: string;
}


const validationSchema = z.object({
	usuario: z.string({ required_error: 'Usuário é requerido' }).min(6, 'É necessário ao menos 4 caracteres'),
	senha: z.string({ required_error: 'Senha é requerida' }).min(4, 'É necessário ao menos 4 caracteres'),
	confirmar_senha: z.string({ required_error: 'Confirmação de senha é requerida' }),
}).refine(v => v.senha.length >= 4 && v.senha === v.confirmar_senha, {
	message: 'As senha e confirmação devem ser iguais.',
	path: ['confirmar_senha'],
});

type ValidationSchema = z.infer<typeof validationSchema>;


const Signup = () => {
	const [form, setForm] = React.useState<SignupProps>();

	const { register, handleSubmit, formState } = useForm<ValidationSchema>({
		resolver: zodResolver(validationSchema),
	});


	const updateFormValues = (data: any) => {
		setForm((prevFormData) => ({
			...prevFormData,
			...data,
		}));
	};

	const handleLogin = () => {
		// login(password);
	}

	const submit = useCallback(async (values: ValidationSchema) => {

	}, []);

	function handleKeyDown(event: any) {
		if (event.key === 'Enter') {
			handleLogin();
		}
	}

	return (
		<div className="min-h-screen flex justify-center items-center">
			<form className="p-8 bg-[#F5F5F5] rounded shadow-sm" onSubmit={handleSubmit(submit)}>
				<h1 className="text-2xl text-black font-semibold mb-4 text-center">Registrar</h1>
				<Input
					placeholder="Usuário"
					prefixIcon={{ iconName: "faUser" }}
					type="text"
					{...register('usuario')}
					error={formState.errors.usuario}
				/>
				<Input
					placeholder="Senha"
					prefixIcon={{ iconName: 'faLock' }}
					type="password"
					{...register('senha')}
					error={formState.errors.senha}
				/>
				<Input
					placeholder="Confirmar Senha"
					prefixIcon={{ iconName: 'faLock' }}
					type="password"
					{...register('confirmar_senha')}
					error={formState.errors.confirmar_senha}
				/>
				<button className="w-full bg-accent text-white p-2 rounded" type="button" onClick={handleLogin}>
					Entrar
				</button>
			</form>
		</div>
	);
};

export default Signup;
