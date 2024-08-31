import axios from "axios";
import React, { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
// import { Context, UserContext } from "../../main";
import uploadImage from "../../utils/Imageuploader";
import { UserContext } from "../../App";
const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);
  const [image,setImage]=useState(null)
  const [url,setUrl]=useState('')

//   const { isAuthorized, user } = useContext(Context);
  let {userAuth,userAuth:{access_token},setUserAuth}=useContext(UserContext)

  const navigateTo = useNavigate();

  // Function to handle file input changes
  const handleBannerUpload=async(e)=>{
    try{
      // console.log(e)
      let image=e.target.files[0]
      setImage(image)
      // console.log(image)
      let imageUploadurl= await uploadImage(image)
      // console.log(imageUploadurl)
      setUrl(imageUploadurl)
      // banner=imageUploadurl
      
      if(imageUploadurl){
        toast.success("Image uploaded ")
        // console.log(banner)
        // setBlog({...blog,banner:imageUploadurl})
      }
      
    }
    catch(err){
     toast.error("Error while uploading image")
    }
  }
  const handleFileChange = (event) => {
    const resume = event.target.files[0];
    setResume(resume);
  };

  const { id } = useParams();
  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", url);
    formData.append("jobId", id);

    try {
      //applicationpost
      const { data } = await axios.post(
        import.meta.env.VITE_SERVER_DOMAIN+'/applicationpost', {
          name:name,
          email:email,
          phone:phone,
          address:address,
          coverLetter:coverLetter,
          resume:url,
          jobId:id
        },{
          
          headers:{
            'authorization': `${access_token}`
          }
        },
        
      );
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume("");
      setUrl("")
      toast.success(data.message);
      // navigateTo("/job/getall");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!access_token || (userAuth && userAuth.role === "Employer")) {
    navigateTo("/");
  }
  console.log(url)

  return (
    <section className="application">
      <Toaster/>
      <div className="container">
        <h3>Application Form</h3>
        <form onSubmit={handleApplication}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <textarea
            placeholder="CoverLetter..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />
          <div>
            <label
              style={{ textAlign: "start", display: "block", fontSize: "20px" }}
            >
              Select Resume
            </label>
            <input
              type="file"
              accept=".pdf, .jpg, .png"
              onChange={handleBannerUpload}
              style={{ width: "100%" }}
            />
          </div>
          <button type="submit">Send Application</button>
        </form>
      </div>
    </section>
  );
};

export default Application;