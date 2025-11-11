"use client";

import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Calendar } from "primereact/calendar";
import {
  EnvelopeSimpleIcon,
  LockIcon,
  UserIcon,
  IdentificationCardIcon,
  CheckIcon,
  XIcon,
  HouseLineIcon,
} from "@phosphor-icons/react";
import { useContext, useEffect, useState } from "react";
import { localGet, localSet, sessionRemove, sessionSet } from "@/utils/storage";
import { confirmCondoInfo } from "../models/condoClasses";
import { InputMask } from "primereact/inputmask";
import { getMaxBirthDate } from "@/utils/date";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { AuthContext } from "@/context/AuthProvider";
import z from "zod";
import { phoneRegex, validateCPF } from "@/utils/validators";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClientContext, toastProps } from "@/context/ClientContext";

//Schema zod para registro
const registerSchema = z
  .object({
    email: z.email("Insira um e-mail válido"),
    name: z.string().min(10, "Insira seu nome completo"),
    phone: z.string().regex(phoneRegex, "Telefone inválido"),
    cpf: z.string().refine(validateCPF, "CPF inválido"),
    birthDate: z.date().refine((data) => {
      const birth = new Date(data);
      const today = new Date();
      const age =
        today.getFullYear() -
        birth.getFullYear() -
        (today < new Date(today.getFullYear(), birth.getMonth(), birth.getDay())
          ? 1
          : 0);
      return age >= 12;
    }, "A idade mínima para cadastro é de 12 anos"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Senhas não coincidem",
    path: ["confirmPassword"],
  });

//Define tipo do schema
type NewUser = z.infer<typeof registerSchema>;

export default function LoginPage() {
  const { login } = useContext(AuthContext) as any;
  const { showToast } = useContext(ClientContext) as any;

  //Define o react hook form com schema
  const {
    control,
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewUser>({
    resolver: zodResolver(registerSchema),
  });

  const router = useRouter();
  const condoInfoFound: confirmCondoInfo = {
    id: 1,
    name: "Chácaras Flórida",
    address: "Rodovia Marechal Rondon, km 110, Itu - SP",
  };
  const [visibleForm, setVisibleForm] = useState("confirmation");
  const [condoInfo, setCondoInfo] = useState<confirmCondoInfo>({
    id: 0,
    name: "",
    address: "",
  });
  const maxBirthDate = getMaxBirthDate();
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
    rememberUser: false,
  });
  const [erroLogin, setErroLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function confirmCondo() {
    localSet("confirmCondoInfo", condoInfoFound);
    setCondoInfo(condoInfoFound);
    setVisibleForm("login");
  }

  function findLastCondo() {
    const lastCondoInfo = localGet("confirmCondoInfo") as confirmCondoInfo;
    if (lastCondoInfo) {
      setCondoInfo(lastCondoInfo);
      setVisibleForm("login");
    }
  }

  function validateLoginInfo() {
    // validação básica de email (regex simples)
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(formLogin.email)) {
      return false;
    }

    // validação básica de senha
    if (!formLogin.password || formLogin.password.length < 3) {
      return false;
    }

    return true;
  }

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErroLogin(false);
    setIsLoading(true);

    if (validateLoginInfo()) {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await axios.post(
          `${apiUrl}/auth/login`,
          {
            email: formLogin.email,
            senha: formLogin.password,
            lembrarUsuario: formLogin.rememberUser,
          },
          { withCredentials: true }
        );

        login(response.data.usuario);
        router.push("/home");
      } catch (error: any) {
        setIsLoading(false);
        if (error.response && error.response.status === 401) setErroLogin(true);
        console.error("Erro de login: ", error);
      }
    } else {
      setErroLogin(true);
      setIsLoading(false);
    }
  };

  const onRegisterSubmit = async (data: NewUser) => {
    try {
      // const response = await axios.post(
      //   process.env.NEXT_PUBLIC_API_URL + "/user",
      //   {
      //     email: data.email,
      //     phone: data.phone,
      //     password: data.password,
      //     name: data.name,
      //     cpf: data.cpf.replaceAll(".", "").replace("-", ""),
      //     birthDate: data.birthDate,
      //     idCondominio: 1,
      //   }
      // );

      showToast({
        title: "Conta criada",
        text: "Faça login com sua nova conta para continuar",
        duration: 10000,
        type: "success",
      });

      reset();

      setVisibleForm("login");
    } catch (error) {
      console.log("Erro de registro: ", error);
    }
  };

  useEffect(() => {
    findLastCondo();
  }, []);

  return (
    <div className="w-full h-screen">
      <div className="w-full h-full flex">
        <div className="w-[68%] relative overflow-hidden">
          <img
            src="/images/login_bg.jpg"
            alt="Família feliz dentro de sua casa"
            className="w-full h-full object-cover"
          />
          <div className="w-full h-full start-0 top-0 absolute bg-gradient-to-r from-lime-500 to-sky-500 opacity-70"></div>
        </div>

        <div className="w-[32%] flex justify-center">
          {visibleForm == "confirmation" && condoInfoFound.id > 0 && (
            <div className="w-[80%] h-full flex flex-col justify-center items-center">
              <div className="w-full">
                <h2 className="text-zinc-500">
                  Verifique seu condomínio para continuar
                </h2>
                <h1 className="text-3xl font-black">Bem-vindo!</h1>
              </div>

              <div className="my-4 rounded-md border border-zinc-300 w-full p-3 bg-white flex justify-between">
                <div className="flex flex-col h-full justify-center max-w-[60%]">
                  <h1 className="font-bold">Este é o seu condomínio?</h1>
                  <p>{condoInfoFound.name}</p>
                  <span className="text-sm text-zinc-500">
                    {condoInfoFound.address}
                  </span>
                </div>
                <div className="flex gap-x-2 h-full items-center">
                  <Button
                    icon={<CheckIcon size={20} />}
                    rounded
                    outlined
                    aria-label="Filter"
                    onClick={() => confirmCondo()}
                  />
                  <Button
                    icon={<XIcon size={20} />}
                    rounded
                    outlined
                    severity="danger"
                    aria-label="Cancel"
                  />
                </div>
              </div>
            </div>
          )}

          {visibleForm == "login" && (
            <div className="w-[80%] h-full flex flex-col justify-center items-center">
              <div className="w-full">
                <h2 className="text-zinc-500">Entre com suas informações</h2>
                <h1 className="text-3xl font-black">Bem-vindo de volta!</h1>
              </div>

              <form
                action=""
                onSubmit={handleLoginSubmit}
                className="flex flex-col gap-y-4 w-full mt-4"
              >
                <div className="w-full flex">
                  <IconField iconPosition="left" className="grow-1">
                    <InputIcon>
                      <HouseLineIcon size={20} />
                    </InputIcon>
                    <InputText
                      placeholder="Condomínio"
                      className="w-full !rounded-r-none"
                      disabled
                      value={condoInfo.name}
                    />
                  </IconField>

                  <Button
                    label="Alterar"
                    severity="info"
                    className="!rounded-l-none !bg-primary"
                    onClick={() => {
                      sessionRemove("confirmCondoInfo");
                      setVisibleForm("confirmation");
                    }}
                  />
                </div>

                <div>
                  <IconField iconPosition="left" className="w-full">
                    <InputIcon>
                      <EnvelopeSimpleIcon size={20} />
                    </InputIcon>
                    <InputText
                      placeholder="Email"
                      className="w-full"
                      invalid={erroLogin}
                      value={formLogin.email}
                      onChange={(e) =>
                        setFormLogin((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                    />
                  </IconField>
                </div>

                <div>
                  <IconField iconPosition="left" className="w-full">
                    <InputIcon>
                      <LockIcon size={20} />
                    </InputIcon>
                    <InputText
                      type="password"
                      placeholder="Senha"
                      className="w-full"
                      invalid={erroLogin}
                      value={formLogin.password}
                      onChange={(e) =>
                        setFormLogin((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                    />
                  </IconField>
                  {erroLogin && (
                    <p className="mt-2 text-xs text-red-600">
                      {validateLoginInfo()
                        ? "Usuário ou senha incorretos"
                        : "Usuário ou senha inválidos."}
                    </p>
                  )}
                </div>

                <div className="w-full flex justify-between items-center text-sm">
                  <div className="flex items-center">
                    <Checkbox
                      onChange={(e) =>
                        setFormLogin((prev) => ({
                          ...prev,
                          rememberUser: !!e.checked,
                        }))
                      }
                      checked={formLogin.rememberUser}
                    ></Checkbox>
                    <p
                      className="ml-1.5 font-medium text-zinc-500 cursor-pointer"
                      onClick={() =>
                        setFormLogin((prev) => ({
                          ...prev,
                          rememberUser: !!formLogin.rememberUser,
                        }))
                      }
                    >
                      Lembrar usuário
                    </p>
                  </div>

                  <a className="text-zinc-500 underline">Esqueceu a senha?</a>
                </div>

                <Button
                  label={isLoading ? "" : "Entrar"}
                  loading={isLoading}
                  severity="info"
                  type="submit"
                  className="!w-full !bg-primary !border-primary"
                />

                <Button
                  label="Entre com o Google"
                  severity="secondary"
                  outlined
                  icon={
                    <img
                      src={"/images/google_logo.png"}
                      className="size-[20px]"
                    />
                  }
                />

                <div className="w-full text-center">
                  Não tem uma conta?{" "}
                  <span
                    className="text-sky-600 underline cursor-pointer"
                    onClick={() => setVisibleForm("register")}
                  >
                    Cadastre-se
                  </span>
                </div>
              </form>
            </div>
          )}

          {/* Registro */}
          {visibleForm == "register" && (
            <div className="w-[80%] h-full flex flex-col justify-center items-center">
              <div className="w-full">
                <h2 className="text-zinc-500">
                  Preencha os campos com suas informações
                </h2>
                <h1 className="text-3xl font-black">Cadastre-se</h1>
              </div>

              <form
                action=""
                onSubmit={handleSubmit(onRegisterSubmit)}
                className="flex flex-col gap-y-2 w-full mt-4"
              >
                <div className="w-full">
                  <IconField iconPosition="left" className="w-full">
                    <InputIcon>
                      <EnvelopeSimpleIcon size={20} />
                    </InputIcon>
                    <InputText
                      {...register("email")}
                      invalid={errors.email?.message ? true : false}
                      placeholder="Email"
                      className="w-full"
                    />
                  </IconField>
                  {errors.email && (
                    <span className="text-red-500 text-xs">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className="w-full">
                  <IconField iconPosition="left" className="w-full">
                    <InputIcon>
                      <i className="pi pi-user"></i>
                    </InputIcon>
                    <InputText
                      {...register("name")}
                      invalid={errors.name?.message ? true : false}
                      placeholder="Nome completo"
                      className="w-full"
                    />
                  </IconField>
                  {errors.name && (
                    <span className="text-red-500 text-xs">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                <div className="w-full">
                  <Controller
                    name="phone"
                    control={control}
                    rules={{ required: "Telefone é obrigatório" }}
                    render={({ field }) => {
                      const digits = (field.value || "").replace(/\D/g, "");
                      const mask =
                        digits.length <= 10
                          ? "(99)9999-99999"
                          : "(99)99999-9999";

                      return (
                        <IconField iconPosition="left" className="w-full">
                          <InputIcon>
                            <i className="pi pi-phone"></i>
                          </InputIcon>
                          <InputMask
                            {...field}
                            value={field.value || ""}
                            onChange={(e) => field.onChange(e.value)}
                            mask={mask}
                            placeholder="Telefone"
                            invalid={!!errors.phone}
                            className="w-full"
                          />
                        </IconField>
                      );
                    }}
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-xs">
                      {errors.phone.message}
                    </span>
                  )}
                </div>

                <div className="w-full">
                  <div className="w-full flex gap-x-2">
                    <IconField iconPosition="left" className="grow-1">
                      <InputIcon>
                        <IdentificationCardIcon size={20} />
                      </InputIcon>
                      <InputMask
                        {...register("cpf")}
                        invalid={errors.cpf?.message ? true : false}
                        placeholder="CPF"
                        className="w-full"
                        mask="999.999.999-99"
                      />
                    </IconField>

                    <Controller
                      name="birthDate"
                      control={control}
                      render={({ field }) => {
                        const value =
                          field.value instanceof Date
                            ? field.value
                            : field.value
                            ? new Date(field.value)
                            : null;

                        return (
                          <Calendar
                            {...field}
                            value={value}
                            onChange={(e) => field.onChange(e.value)}
                            invalid={!!errors.birthDate}
                            placeholder="Data de nascimento"
                            className="grow-1"
                            dateFormat="dd/mm/yy"
                          />
                        );
                      }}
                    />
                  </div>
                  {errors.cpf ? (
                    <span className="text-red-500 text-xs">
                      {errors.cpf.message}
                    </span>
                  ) : errors.birthDate ? (
                    <span className="text-red-500 text-xs">
                      {errors.birthDate.message}
                    </span>
                  ) : (
                    ""
                  )}
                </div>

                <div className="w-full">
                  <IconField iconPosition="left" className="w-full">
                    <InputIcon>
                      <LockIcon size={20} />
                    </InputIcon>
                    <InputText
                      {...register("password")}
                      invalid={errors.password?.message ? true : false}
                      type="password"
                      placeholder="Senha"
                      className="w-full"
                    />
                  </IconField>
                  {errors.password && (
                    <span className="text-red-500 text-xs">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <div className="w-full">
                  <IconField iconPosition="left" className="w-full">
                    <InputIcon>
                      <LockIcon size={20} />
                    </InputIcon>
                    <InputText
                      {...register("confirmPassword")}
                      invalid={errors.confirmPassword?.message ? true : false}
                      type="password"
                      placeholder="Confirme a senha"
                      className="w-full"
                    />
                  </IconField>
                  {errors.confirmPassword && (
                    <span className="text-red-500 text-xs">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>
                <Button
                  label="Cadastrar"
                  severity="info"
                  type="submit"
                  className="w-full !bg-primary"
                />

                <Button
                  label="Entre com o Google"
                  severity="secondary"
                  outlined
                  icon={
                    <img
                      src={"/images/google_logo.png"}
                      className="size-[20px]"
                    />
                  }
                />

                <div className="w-full text-center">
                  Já possui uma conta?{" "}
                  <a
                    className="text-sky-600 underline cursor-pointer"
                    onClick={() => setVisibleForm("login")}
                  >
                    Faça login
                  </a>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
