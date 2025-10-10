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
import { useEffect, useState } from "react";
import { localGet, localSet, sessionRemove } from "@/utils/storage";
import { confirmCondoInfo } from "../models/condoClasses";
import { InputMask } from "primereact/inputmask";
import { getMaxBirthDate } from "@/utils/date";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const condoInfoFound: confirmCondoInfo = {
    id: 1,
    name: "Chácaras Flórida",
    address: "Rodovia Marechal Rondon, km 110, Itu - SP",
  };
  const [rememberUser, setRememberUser] = useState(false);
  const [visibleForm, setVisibleForm] = useState("confirmation");
  const [condoInfo, setCondoInfo] = useState<confirmCondoInfo>({
    id: 0,
    name: "",
    address: "",
  });
  const maxBirthDate = getMaxBirthDate();
  const [emailLogin, setEmailLogin] = useState("");
  const [senhaLogin, setSenhaLogin] = useState("");
  const [errorsLogin, setErrorsLogin] = useState<string[]>([]);

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
    const erros: string[] = [];

    // validação básica de email (regex simples)
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(emailLogin)) {
      erros.push("E-mail inválido.");
    }

    // validação básica de senha
    if (!senhaLogin || senhaLogin.length < 6) {
      erros.push("A senha deve ter pelo menos 6 caracteres.");
    }

    return erros;
  }

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorsLogin(validateLoginInfo());
    if (validateLoginInfo().length == 0) {
      console.log("era pra redirecionar");
      router.push("/home");
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

                <IconField iconPosition="left" className="w-full">
                  <InputIcon>
                    <EnvelopeSimpleIcon size={20} />
                  </InputIcon>
                  <InputText
                    placeholder="Email"
                    className="w-full"
                    value={emailLogin}
                    onChange={(e) => setEmailLogin(e.target.value)}
                  />
                </IconField>

                <IconField iconPosition="left" className="w-full">
                  <InputIcon>
                    <LockIcon size={20} />
                  </InputIcon>
                  <InputText
                    type="password"
                    placeholder="Senha"
                    className="w-full"
                    value={senhaLogin}
                    onChange={(e) => setSenhaLogin(e.target.value)}
                  />
                </IconField>

                <div className="w-full flex justify-between items-center">
                  <div className="flex items-center">
                    <Checkbox
                      onChange={(e) => setRememberUser(!!e.checked)}
                      checked={rememberUser}
                    ></Checkbox>
                    <p
                      className="ml-1 font-medium text-zinc-500 cursor-pointer"
                      onClick={() => setRememberUser(!rememberUser)}
                    >
                      Lembrar usuário
                    </p>
                  </div>

                  <a className="text-zinc-500 underline">Esqueceu a senha?</a>
                </div>

                <Button
                  label="Entrar"
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

          {visibleForm == "register" && (
            <div className="w-[80%] h-full flex flex-col justify-center items-center">
              <div className="w-full">
                <h2 className="text-zinc-500">
                  Preencha os campos com suas informações
                </h2>
                <h1 className="text-3xl font-black">Cadastre-se</h1>
              </div>

              <form action="" className="flex flex-col gap-y-4 w-full mt-4">
                <IconField iconPosition="left" className="w-full">
                  <InputIcon>
                    <EnvelopeSimpleIcon size={20} />
                  </InputIcon>
                  <InputText placeholder="Email" className="w-full" />
                </IconField>

                <IconField iconPosition="left" className="w-full">
                  <InputIcon>
                    <UserIcon size={20} />
                  </InputIcon>
                  <InputText placeholder="Nome completo" className="w-full" />
                </IconField>

                <div className="w-full flex gap-x-4">
                  <IconField iconPosition="left" className="grow-1">
                    <InputIcon>
                      <IdentificationCardIcon size={20} />
                    </InputIcon>
                    <InputMask
                      placeholder="CPF"
                      className="w-full"
                      mask="999.999.999-99"
                    />
                  </IconField>

                  <Calendar
                    placeholder="Data de nascimento"
                    className="grow-1"
                    dateFormat="dd/mm/yy"
                    maxDate={maxBirthDate}
                  />
                </div>

                <IconField iconPosition="left" className="w-full">
                  <InputIcon>
                    <LockIcon size={20} />
                  </InputIcon>
                  <InputText
                    type="password"
                    placeholder="Senha"
                    className="w-full"
                  />
                </IconField>

                <IconField iconPosition="left" className="w-full">
                  <InputIcon>
                    <LockIcon size={20} />
                  </InputIcon>
                  <InputText
                    type="password"
                    placeholder="Confirme a senha"
                    className="w-full"
                  />
                </IconField>

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
