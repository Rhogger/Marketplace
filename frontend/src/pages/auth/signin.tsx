import Input from "@/components/Input";
import React from "react";

const Signin = () => {
	const [password, setPassword] = React.useState<string>('');

	const handleLogin = () => {
		// login(password);
	}

	function handleKeyDown(event: any) {
		if (event.key === 'Enter') {
			handleLogin();
		}
	}

	return (
		<div className="min-h-screen flex justify-center items-center">
			<form className="p-8 bg-[#F5F5F5] rounded shadow-sm">
				<h1 className="text-2xl text-black font-semibold mb-4 text-center">Login</h1>
				<Input
					placeholder="Usuário"
					prefixIcon={{ iconName: "faUser" }}
					type="text"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Input
					placeholder="Senha"
					prefixIcon={{ iconName: 'faLock' }}
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button className="w-full bg-accent text-white p-2 rounded" type="button" onClick={handleLogin}>
					Entrar
				</button>
			</form>
		</div>
	);
};

export default Signin;
