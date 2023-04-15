import React from 'react'

import { poseImages } from '../../utils/pose_images'

import './DropDown.css'

export default function DropDown({ poseList, currentPose, setCurrentPose }) {
return (
        <div
        className='dropdown dropdown-container flex flex-col-reverse'
         
      >
        <button 
            className="text-center text-3xl font-bold mb-10 -mt-40 "
            type='button'
            // data-bs-toggle="dropdown"
            id="pose-dropdown-btn"
            aria-expanded="false"
        >{currentPose}
        </button>
        <ul class="dropdown-menu dropdown-custom-menu flex flex-row mt-8" aria-labelledby="dropdownMenuButton1">
            {poseList.map((pose) => (
                <li onClick={() => setCurrentPose(pose)}>
                    <div class="dropdown-item-container">
                        <p className="dropdown-item-1">{pose}</p>
                        <img 
                        alt="pose"
                            src={poseImages[pose]}
                            className="dropdown-img"
                        />
                        
                    </div>
                </li>
            ))}
            
        </ul>
              
          
      </div>
    )
}
 