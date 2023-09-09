import axios from "axios";
import styles from "./index.module.css"
import  { useRouter } from "next/router"
import { useState } from "react";


export const Form = () =>{
  const router = useRouter()
  const [formData, setFormData] = useState({
    lighting:"",
    artstyle:"",
    frame:"",
    time:"",
    color:"",
    inspiration:"",
    prompt:"",
    provider:"openai",
    resolution:"512x512"
  });


  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e:any) => {
    console.log("in submit")
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/', formData);
      console.log('Response:', response.data);
      router.push({
        pathname: '/img',
        query: { images: JSON.stringify(response.data) }
      },'/img');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  
  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.form}>
        <label htmlFor="prompt">Enter your Prompt:</label>
        <div className={styles.option}>
          <select name="lighting" value={formData.lighting} onChange={handleChange}>
            <option value="">Select Lighting</option>
            <option value=" in backlit lighting">Backlit</option>
            <option value=" in mood lighting">Mood Lighting</option>
            <option value=" in glowing lighting">Glowing</option>
            <option value=" in shimmering lighting">Shimmering</option>
            <option value=" in polished lighting">Polished</option>
            <option value=" in luminous lighting">Luminous</option>
            <option value=" in chiaroscuro lighting">Chiaroscuro</option>
            <option value=" in bioluminescent lighting">
              Bioluminescent
            </option>
            <option value=" in holographic lighting">Holographic</option>
          </select>
          <select name="artstyle" value={formData.artstyle} onChange={handleChange}>
            <option value="">Select Art Style</option>
            <option value=" ,illustration style">Illustration</option>
            <option value=", pencil drawing style">Pencil Drawing</option>
            <option value=" ,pixar style">Pixar</option>
            <option value=" ,cyberpunk style">Cyberpunk</option>
            <option value=" ,realism style">Realism</option>
            <option value=" ,studio ghibli style">Studio Ghibli</option>
            <option value=" ,watercolor style">Watercolor</option>
            <option value=" ,architechture design style">
              Architectural design
            </option>
            <option value=" ,neo-realism style">Neo-realism</option>
            <option value=" ,pixel art style">Pixel Art</option>
          </select>
          <select name="frame" value={formData.frame} onChange={handleChange}>
            <option value="">Select Framing</option>
            <option value=" , close-up">Close-up</option>
            <option value=" , bird's eye view">Bird's eye view</option>
            <option value=" , wide angle shot">Wide angle shot</option>
            <option value=" , cinematic angle">Cinematic angle</option>
            <option value=" , framed by architechture">
              Framed by architechture
            </option>
            <option value=" dramatic silhouette">Dramatic silhouette</option>
          </select>
          <select name="time" value={formData.time} onChange={handleChange}>
            <option value="">Select Time of Day</option>
            <option value=" in the morning">Morning</option>
            <option value=" in the afternoon">Afternoon</option>
            <option value=" in the evening">Evening</option>
            <option value=" at night">Night</option>
          </select>
          <select name="color" value={formData.color} onChange={handleChange}>
            <option value="">Select Color Palette</option>
            <option value=" bright and vibrant color palette">
              Bright and Vibrant
            </option>
            <option value=" moody and dramatic color palette">
              Moody and Dramatic
            </option>
            <option value=" pastel and soft color palette">
              Pastel and Soft
            </option>
            <option value=" earthy and natural color palette">
              Earthy and Natural
            </option>
            <option value=" monochromatic color palette">
              Monochromatic
            </option>
            <option value=" dark and grim color palette">
              Dark and Grim
            </option>
          </select>
          <select name="inspiration" value={formData.inspiration} onChange={handleChange}>
            <option value="">Select Inspiration</option>
            <option value=", in the style of Pablo Picasso">
              Pablo Picasso
            </option>
            <option value=", in the style of Max Ernst">Max Ernst</option>
            <option value=", in the style of Jackson Pollock">
              Jackson Pollock
            </option>
            <option value=", in the style of Salvador Dali">
              Salvador Dali
            </option>
            <option value=", in the style of Vincent van Gogh">
              Vincent van Gogh
            </option>
            <option value=", in the style of Mattias Adolfsso">
              Mattias Adolfsso
            </option>
            <option value=", in the style of Wassily Kandinsky">
              Wassily Kandinsky
            </option>
            <option value=", in the style of Leonardo da Vinci">
              Leonardo da Vinci
            </option>
          </select>
        </div>
        <textarea
          id="prompt"
          name="prompt"
          onChange={handleChange}
          value={formData.prompt}
        ></textarea>
        <select id="provider" name="provider" value={formData.provider} required onChange={handleChange}>
          <option value="openai">OpenAI</option>
          <option value="deepai">DeepAI</option>
          <option value="stabilityai">StabilityAI</option>
          <option value="replicate">Replicate</option>
          <option value="clipdropai">ClipDrop AI</option>
          <option value="stablediffusion">Stable Diffusion</option>
        </select>
        <select name="resolution" required value={formData.resolution} onChange={handleChange}>
          <option value="512x512">512x512</option>
          <option value="1024x1024">1024x1024</option>
        </select>
        <button className={styles.button} type="submit">Go</button>
      </div>
    </form>
  )
}

