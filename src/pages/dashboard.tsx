import { url } from "@/contexts/url"
import useLoading from "@/hooks/use-loading"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { Projects } from "@/interfaces/projects"
import Project from "@/components/project"


export default function Dashboard() {
  const [projects, setProjects] = useState<Projects[] | null>(null)
  const { loading, handleLoading } = useLoading()

  const getProjects = useCallback(async () => {
    try {
      handleLoading(true)
      const res = await axios.get(url + '/projects')
      setProjects(res.data)
    }catch(err) {
      console.log(err);
    }finally {
      handleLoading(false)
    }
  } ,[handleLoading])


  useEffect(() => {
    getProjects()
  }, [getProjects])

  return (
    <main>
        <div className="pb-8">
          <h5 className="font-mono text-2xl">Projects</h5>
        </div>
        {
          !loading && projects !== null && projects.length > 0 ? <div className="flex flex-wrap gap-4">
            {
              projects?.map((project) => {
                return <Project key={project._id} _id={project._id} title={project.title} createDate={project.createDate} desc={project.desc} contents={project.contents} getProjects={getProjects} />
              })
            }
          </div> : <p className="font-bold">No data</p>
        }
    </main>
  )
}
