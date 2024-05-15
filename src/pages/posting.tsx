import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Contents } from "@/interfaces/contents";
import { Topic } from "@/interfaces/topic";
import { Image } from "lucide-react";
import useLoadingImage from "@/hooks/use-loading-image";
import useLoading from "@/hooks/use-loading";
import axios from "axios";
import { url } from "@/contexts/url";
import { toastContext } from "@/contexts/toast-context";
import { useCookies } from "react-cookie";

const defaultTopic: Topic = {
  title: '',
  desc: ''
}

const defaultContent: Contents = {
  imgUrl: '',
  desc: '',
}

export default function Posting() {

  const [contents, setContents] = useState<Contents[]>([])
  const [content, setContent] = useState<Contents>(defaultContent)

  const [topic, setTopic] = useState<Topic>(defaultTopic)
  const { load, handleLoad } = useLoadingImage()
  const { loading, handleLoading } = useLoading()
  const { handleToast } = useContext(toastContext)
  const [cookies] = useCookies()

  function handleInput(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { value, name } = e.target as HTMLInputElement

    setTopic(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  function handleContentsInput(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { value, name } = e.target;
    setContent(prev => {
      return {
        ...prev,
        [name]: value
      }
    });
  }

  function addContent() {
    setContents(prev => {
      return [...prev, content!]
    })
    setContent(defaultContent)
  }

  async function postProject(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      handleLoading(true)
      const postData = {
        ...topic,
        contents
      }
      const res = await axios.post(url + '/project', postData, {
        headers: {
          'x-auth-token': cookies.accessToken
        }
      })
      setTopic(defaultTopic)
      setContents([])
      handleToast(res.data.message);
    }catch(err) {
      console.log(err);
    }finally {
      handleLoading(false)
    }

  }

  return (
    <div className="flex flex-col">
      <form className="flex flex-col gap-4" onSubmit={(e) => postProject(e)}>
        <div className="flex flex-col gap-4 border-b-2 pb-8">
          <Label className="font-bold text-xl flex flex-col gap-2">
            Title
            <Input type="text" name="title" value={topic.title} onChange={(e) => handleInput(e)} placeholder="Enter project title"/>
          </Label>
          <Label className="font-bold text-xl flex flex-col gap-2">
            Description
            <Textarea placeholder="Enter project description" value={topic.desc} name="desc" onChange={(e) => handleInput(e)} className="h-32"/>
          </Label>
        </div>
        <div className="flex flex-col gap-4">
          <Label className="font-bold text-xl flex flex-col gap-2">
            Image url
            <Input type="text" name="imgUrl" value={content.imgUrl} onChange={(e) => handleContentsInput(e)} placeholder="Enter project image's url"/>
          </Label>
          <Label className="font-bold text-xl flex flex-col gap-2">
            Description
            <Textarea placeholder="Enter project's picture description" name="desc" value={content.desc} onChange={(e) => handleContentsInput(e)} className="font-bold h-32 mb-4" />
          </Label>
          <Button variant={'outline'} type="button" className="w-[250px] font-bold" onClick={() => addContent()}>Add content</Button>
        </div>
        <Button className="font-bold">{loading ? "loading..." : "Posting"}</Button>
      </form>
      <div className="py-24 max-w-[800px] mx-auto w-full">
        <div className="mb-8">
          <h3 className="uppercase font-thin text-3xl mb-4">{topic.title}</h3>
          <p className="max-w-[600px]">{topic.desc}</p>
        </div>
        <div className="flex flex-col gap-8 mb-8">
          {
            contents.map((content, i) => {
              return <div key={i} className="">
                <div className="mb-4">
                  <img onLoad={() => handleLoad(true)} className={`${load ? "w-full h-full" : "hidden"}`} src={content.imgUrl} alt="image" />
                  <div className={`${!load ? "flex h-[200px] sm:h-[400px] w-full justify-center items-center border-2 bg-slate-300 opacity-45" : ""}`}>
                    {
                      !load && <Image size={120}/> 
                    }
                  </div>
                </div>
                <p>{content.desc}</p>
              </div>
            })
          }
        </div>
      </div>
    </div>
  )
}
