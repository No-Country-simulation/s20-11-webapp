import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Ojotachado } from "../icons/Ojotachado";
import { Ojovisible } from "../icons/Ojovisible";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("El email es inválido")
    .required("El email es requerido"),
  password: Yup.string()
    .min(8, "La contraseña es demasiado corta")
    .required("Este campo es obligatorio"),
});

function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
      <div className="max-w-md mx-auto bg-gray-800/50 backdrop-blur-md p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#9333ea] to-[#2563eb] text-transparent bg-clip-text">
          Iniciar sesión
        </h2>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
            console.log("Datos del formulario:", values);
          }}
          validationSchema={schema}
        >
          {({ isValid, dirty, isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <Field
                placeholder="Email"
                className="pl-4 bg-gray-700/50 w-full border h-10 rounded"
                type="text"
                name="email"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-sm"
              />

              <div className="relative w-full">
                <Field
                  placeholder="Contraseña"
                  className="pl-4 bg-gray-700/50 w-full border h-10 rounded"
                  type={showPassword ? "text" : "password"}
                  name="password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-500 absolute top-[-7px] right-0 flex items-center px-3 py-3"
                >
                  {showPassword ? <Ojovisible /> : <Ojotachado />}
                </button>
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500"
                />
              </div>

              <button
                type="submit"
                className="cursor-pointer w-full bg-gradient-to-r from-[#9333ea] to-[#2563eb] hover:from-[#9333ea]/90 hover:to-[#2563eb]/90 transition-all duration-300 h-10 rounded"
                disabled={!isValid || !dirty || isSubmitting}
              >
                {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
              </button>
            </Form>
          )}
        </Formik>

        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </main>
  );
}

export default Login;
