import { useRouter } from 'next/router';
import styles from './index.module.css';
import { useState } from 'react';
import axios from 'axios';

export const Upscale = () => {
  const router = useRouter();
  const [file, setFile] = useState(null);

  const handleFileChange = (e:any) => {
    const selectedFile = e.target.files[0];
    console.log('Selected file:', selectedFile); // Add this line for debugging
    setFile(selectedFile);
  };
  
  

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    console.log('in submit');
    
    if (!file) {
      console.error('No file selected.');
      return;
    }

    try {
        const formData = new FormData();
        formData.append('file',file);
        const response = await axios.post('http://localhost:8080/upscale',formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        });
        router.push({
            pathname: '/img',
            query: { images: JSON.stringify(response.data) }
          },'/img');
      
        console.log('Response:', response.data);
      
        // Rest of your code
      } catch (error) {
        console.error('Error submitting form:', error);
      }
  };

  return (
    <div className="page aligned-center">
      <div className={styles.form}>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
  <label htmlFor="imagefile">Upload Image</label>
  <input type="file" accept="image/*" id="imagefile" onChange={handleFileChange} name="imagefile" />
  <button className={styles.button} type="submit">
    Go
  </button>
</form>

      </div>
    </div>
  );
};
