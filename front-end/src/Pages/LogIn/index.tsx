import { Link } from "react-router-dom";
import LandingIntro from "./LandingIntro";

import { useNotification, useUser } from "@/hooks";
import { useLogOutMutation, useSignInMutation } from "@/app/backend/export/auth";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { Copyright } from "@/Components/Copyright";
import { Input } from "../../Components/Input";
import useStoreDesk from "@/hooks/useStoreDesk";

const inputs: InputRequiredFields<UserAuthI>[] = [
	{
		required: true,
		type: "text",
		id: "username",
		label: "Username",
		placeholder: "username",
		name: "username",
		className: "md:max-w-md",
		inputClassName: "md:max-w-md",
		autoComplete: "username",
		autoFocus: true,
	},
	{
		required: true,

		name: "password",
		label: "Password",
		placeholder: "password",
		type: "password",
		id: "password",
		autoComplete: "current-password",
	},
];

function Login() {
	const [AuthMethod, { isLoading }] = useSignInMutation();
	const [Logout] = useLogOutMutation();
	const { setUser } = useUser();
	const { setDesks, removeDesk } = useStoreDesk();
	const { Notify, Errofy } = useNotification();

	const formik = useFormik<UserAuthI>({
		initialValues: {
			username: "",
			password: "",
			stay: false,
		},
		validationSchema: Yup.object().shape({
			username: Yup.string().required("You have to provide a username"),
			password: Yup.string().required("You have to provide a password"),
			stay: Yup.boolean(),
		}),
		validateOnChange: true,
		onSubmit: (body: UserAuthI) => {
			AuthMethod(body)
				.unwrap()
				.then((response) => {
					const user = response.data;
					if (user && user.kind === "Admin") {
						setUser(user);
						Notify("Logged In", "welcome back.");
						setDesks(user.desks);
					} else {
						Logout()
							.unwrap()
							.then(() => {
								removeDesk();
								Errofy("Logged In", {
									message: "You aren't allowed to enter here with this account",
								});
							});
					}
				})
				.catch((err) => {
					removeDesk();
					Errofy("Logged In", err);
				});
		},
	});

	const { errors, touched, getFieldProps, handleSubmit } = formik;

	return (
		<div className="min-h-screen bg-base-200 flex flex-col justify-center w-full">
			<div className="card mx-auto w-full max-w-5xl  md:shadow-xl md:mt-40 px-4">
				<div className="grid  md:grid-cols-2 grid-cols-1  md:bg-base-100 rounded-xl">
					<div className="">
						<LandingIntro />
					</div>
					<div className="md:py-24 px-10 flex flex-col items-center">
						<h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>
						<FormikProvider value={formik}>
							<Form onSubmit={handleSubmit} className="mx-auto w-[70vw] md:mx-0 md:w-full">
								{inputs.map(({ name, type = "text", ...props }, i) => (
									<Input
										key={i}
										{...props}
										type={type}
										error={touched[name] && errors[name] ? errors[name] : undefined}
										props={getFieldProps(name)}
									/>
								))}

								<div className="form-control w-full md:max-w-md">
									<label className="label cursor-pointer">
										<span className="label-text">Remember me</span>
										<input {...getFieldProps("stay")} type="checkbox" className="checkbox checkbox-sm" />
									</label>
								</div>

								<button type="submit" className="btn btn-primary mt-2 w-full " disabled={isLoading}>
									{isLoading ? (
										<>
											<span className="loading loading-spinner"></span>Loading
										</>
									) : (
										"Login"
									)}
								</button>
								<Link to="/forgot-password">
									<span className="w-full text-center inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200 mt-2">
										Forgot password?
									</span>
								</Link>
							</Form>
						</FormikProvider>
					</div>
				</div>
			</div>
			<Copyright />
		</div>
	);
}

export default Login;
