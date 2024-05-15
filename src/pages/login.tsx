import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { url } from "@/contexts/url";
import useLoading from "@/hooks/use-loading";
import { LoginInterface } from "@/interfaces/login";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useCookies } from "react-cookie";

const defaultValue: LoginInterface = {
    userName: '',
    password: ''
}

export default function Login() {

    const [loginData, setLoginData] = useState<LoginInterface>(defaultValue)
    const [, setCookies] = useCookies(['accessToken'])
    const {loading, handleLoading} = useLoading()

    const handleLogin = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setLoginData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const res = await axios.post(url + '/login', loginData)
            setCookies('accessToken', res.data.token)
        }catch(err) {
            console.log(err);
        }finally {
            handleLoading(false)
        }
    }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
        <div className="max-w-[400px] w-full border rounded flex flex-col gap-4 px-4 pt-2 pb-4">
            <h4 className="font-bold text-2xl">Login page</h4>
            <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
                <Input name="userName" value={loginData.userName} onChange={(e) => handleLogin(e)} type="text" placeholder="Admin name"/>
                <Input name="password" value={loginData.password} onChange={(e) => handleLogin(e)} type="password" placeholder="User password"/>
                <Button type="submit">{loading ? "Loading..." : "Kirish"}</Button>
            </form>
        </div>
    </div>
  )
}
