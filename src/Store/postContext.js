import {createContext, useState} from 'react'

export const PostContext = createContext(null)

export default function PostDetails({children}){
    const [postDatail,setPostDetail] = useState(null)
    return(

        <PostContext.Provider value={{postDatail,setPostDetail}}>
            
        {children}
        
        </PostContext.Provider>

    )
  
}