import placeholderImage from '@/assets/image/placeholderImage.png'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import { IconButton } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'

function ImageUpload({ onSubmit }) {
  const [image, setImage] = useState(null)
  const handleFileUpload = (event) => {
    let file = URL.createObjectURL(event.target.files[0])
    let img = new Image()
    img.src = file
    img.onload = () => {
      console.log(img.width, img.height)
    }
    setImage({ ...image, [event.target.name]: file })
  }
  const handleDeleteImage = (imageSlot) => {
    switch (imageSlot) {
    case 1:
      setImage({ ...image, image1: null })
      break
    case 2:
      setImage({ ...image, image2: null })
      break
    case 3:
      setImage({ ...image, image3: null })
      break
    case 4:
      setImage({ ...image, image4: null })
      break
    }
  }
  
  return (
    <Box sx={{ pr: 5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', gap: '6px' }}>
          <Box>
            {image?.image1 && (
              <IconButton
                aria-label="delete"
                sx={{ position: 'absolute' }}
                onClick={() => handleDeleteImage(1)}>
                <CancelRoundedIcon />
              </IconButton>
            )}
            <Box component="label">
              <img
                src={image?.image1 || placeholderImage}
                alt="placeholderImage"
                width="268px"
                height="268px"
              />
              <input
                name="image1"
                hidden
                accept="image/*"
                type="file"
                onChange={(event) => handleFileUpload(event)}
              />
            </Box>
          </Box>
          <Box>
            {image?.image2 && (
              <IconButton
                aria-label="delete"
                sx={{ position: 'absolute' }}
                onClick={() => handleDeleteImage(2)}>
                <CancelRoundedIcon />
              </IconButton>
            )}
            <Box component="label">
              <img
                src={image?.image2 || placeholderImage}
                alt="placeholderImage"
                width="268px"
                height="268px"
              />
              <input
                name="image2"
                hidden
                accept="image/*"
                type="file"
                onChange={(event) => handleFileUpload(event)}
              />
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: '6px' }}>
          <Box>
            {image?.image3 && (
              <IconButton
                aria-label="delete"
                sx={{ position: 'absolute' }}
                onClick={() => handleDeleteImage(3)}>
                <CancelRoundedIcon />
              </IconButton>
            )}
            <Box component="label">
              <img
                src={image?.image3 || placeholderImage}
                alt="placeholderImage"
                width="268px"
                height="268px"
              />
              <input
                name="image3"
                hidden
                accept="image/*"
                type="file"
                onChange={(event) => handleFileUpload(event)}
              />
            </Box>
          </Box>
          <Box>
            {image?.image4 && (
              <IconButton
                aria-label="delete"
                sx={{ position: 'absolute' }}
                onClick={() => handleDeleteImage(4)}>
                <CancelRoundedIcon />
              </IconButton>
            )}
            <Box component="label">
              <img
                src={image?.image4 || placeholderImage}
                alt="placeholderImage"
                width="268px"
                height="268px"
              />
              <input
                name="image4"
                hidden
                accept="image/*"
                type="file"
                onChange={(event) => handleFileUpload(event)}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ImageUpload
