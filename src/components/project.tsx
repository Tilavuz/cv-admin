import { useLoad } from "@/hooks/use-load";
import { Projects } from "@/interfaces/projects";
import { Image, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import axios from "axios";
import { url } from "@/contexts/url";
import { useContext } from "react";
import { toastContext } from "@/contexts/toast-context";
import { useCookies } from "react-cookie";


type ProjectProps<T> = T & {
  getProjects: () => Promise<void>; // Assuming getProjects is a function returning a Promise<void>
};

const Project = <T extends Projects>({ title, desc, createDate, contents, _id, getProjects }: ProjectProps<T>) => {
  const { loading, handleLoading } = useLoad();
  const { handleToast } = useContext(toastContext)
  const [cookies] = useCookies()

  async function deleteProject(id: string) {
    try {
      const res = await axios.delete(url + `/project/${id}`, {
        headers: {
          'x-auth-token': cookies.accessToken
        }
      })
      getProjects()
      handleToast(res.data.message);
    }catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col max-w-[350px] w-full">
      <div className="h-[200px]">
        <Link to={`/projects/${_id}`}>
            <img
            onLoad={() => handleLoading()}
            className={`${loading ? "w-full h-full rounded-md" : "hidden"}`}
            src={contents[0].imgUrl}
            alt="image"
            />
            <div
            className={`${
                !loading
                ? "flex h-[200px] w-full justify-center items-center border-2 bg-slate-300 opacity-45"
                : ""
            }`}
            >
            {!loading && <Image size={120} />}
            </div>
        </Link>
      </div>
      <div className="">
        <h4 className="font-bold mt-4 mb-1">
          {title} - {new Date(createDate).getFullYear()}
        </h4>
        <p className="line-clamp-4 leading-6 tracking-widest">{desc}</p>
      </div>
      <div className="flex items-start gap-2 py-4">
        <AlertDialog>
          <AlertDialogTrigger asChild className="w-full">
            <Button variant={"destructive"} className="font-bold">
                <Trash2 size={24}/>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>No</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteProject(_id)}>Yes</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default Project