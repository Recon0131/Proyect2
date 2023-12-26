
import {API_KEY} from '../config'

export async function uploadCloud(file){
    const formData = new FormData()
          
    formData.append('file',file)
    formData.append('upload_preset', "ml_default")
    formData.append('api_key', API_KEY)
    
    const res= await fetch("https://api.cloudinary.com/v1_1/demo/image/upload",{
      method: "POST",
      body: formData
    })
    return res
    
}