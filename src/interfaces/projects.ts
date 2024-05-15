export interface Projects {
    _id: string,
    title: string,
    desc: string,
    createDate: string,
    contents: Array<{
      imgUrl: string,
      desc: string,
      _id: string,
      getProjects?: () => Promise<void> | any
    }>
  }