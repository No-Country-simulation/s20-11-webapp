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
    <main className="flex-grow container mx-auto px-1 py-8 lg:pl-12 lg:pt-24 relative z-10">
      <div className="max-w-md mx-auto md:mx-0 md:w-[381px] lg:md:w-[381px] bg-card backdrop-blur-md p-8 rounded-lg border border-card-border">
        <h2 className="text-xl pt-3 mb-4 text-center ">
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
              <div className="">
                  <div className="flex flex-row">
                    <p>Correo</p><span className="text-destructive">*</span>
                  </div>
                  
                  <Field
                    placeholder="correo@ejemplo.com"
                    className="pl-4 w-full border border-card-border bg-card h-10 rounded"
                    type="text"
                    name="email"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-sm"
                  />
              </div>
              
              <div className="pb-3">
                  <div className="flex flex-row">
                    <p>Contraseña</p><span className="text-destructive">*</span>
                  </div>
                  <div className="relative w-full">
                  <Field
                    placeholder="Contraseña"
                    className="pl-4 w-full border border-card-border bg-card h-10 rounded"
                    type={showPassword ? "text" : "password"}
                    name="password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-gray-500 absolute top-[-5px] right-0 flex items-center px-2 py-3"
                  >
                    {showPassword ? <Ojovisible /> : <Ojotachado />}
                  </button>
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500"
                  />
                </div>
              </div>
              

              <div className="pb-3">
                <button
                  type="submit"
                  className="cursor-pointer w-full bg-primary hover:from-[#9333ea]/90 transition-all duration-300 p-1.5 rounded text-primary-foreground"
                  disabled={!isValid || !dirty || isSubmitting}
                >
                  {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
                </button>
              </div>
              
            </Form>
          )}
        </Formik>

        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </main>
  );
}

export default Login;
