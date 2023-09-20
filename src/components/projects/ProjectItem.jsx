import React from "react"
import { AiOutlinePlusCircle } from "react-icons/ai"
import { Link } from "react-router-dom"
import { useHistory } from 'react-router-dom';

export const ProjectItem = ({ id, cover, name, price }) => {
  const history = useHistory();

  const openProjectDetails = () => {
    history.push(`/projects/${id}`)
  }


  return (
    <>
      <div className='box boxItems' id='product' onClick={openProjectDetails}>
        <div className='img'>
          <Link>
            <img src={cover} alt='cover' />
          </Link>
        </div>
        <div className='details'>
          <h3>${price}</h3>
          <p>{name}</p>
          <button className="btn btn-info" onClick={openProjectDetails}>
            <AiOutlinePlusCircle /> Fund project
          </button>
        </div>
      </div>
    </>
  )
}
