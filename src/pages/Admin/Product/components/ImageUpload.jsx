import placeholderImage from '@/assets/image/placeholderImage.png'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import { IconButton } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'

function ImageUpload({ onSubmit, selectedData, isEdit }) {
  const [image, setImage] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const handleFileUpload = (event) => {
    let file = URL.createObjectURL(event.target.files[0])
    let img = new Image()
    img.src = file
    setImage({ ...image, [event.target.name]: file })
    setImageFile({ ...imageFile, [event.target.name]: event.target.files[0] })
  }
  const handleDeleteImage = (imageSlot) => {
    switch (imageSlot) {
    case 1:
      setImage({ ...image, photoMainName: null })
      setImageFile({ ...imageFile, photoMainName: null })
      break
    case 2:
      setImage({ ...image, photoOnceName: null })
      setImageFile({ ...imageFile, photoOnceName: null })
      break
    case 3:
      setImage({ ...image, photoSecondName: null })
      setImageFile({ ...imageFile, photoSecondName: null })
      break
    case 4:
      setImage({ ...image, photoThirdName: null })
      setImageFile({ ...imageFile, photoThirdName: null })
      break
    }
  }
  useEffect(() => {
    onSubmit && onSubmit(imageFile)
  }, [imageFile, image])

  useEffect(() => {
    if (selectedData) {
      setImage({
        photoMainName: selectedData?.row.photoMainURl,
        photoOnceName: selectedData?.row.photoOnceURL,
        photoSecondName: selectedData?.row.photoSecondURL,
        photoThirdName: selectedData?.row.photoThirdURL
      })
      console.log(image)
    }
  }, [])

  return (
    <Box sx={{ pr: 5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', gap: '6px' }}>
          <Box sx={{ position: 'relative' }}>
            {image?.photoMainName && isEdit && (
              <IconButton
                aria-label="delete"
                sx={{ position: 'absolute' }}
                onClick={() => handleDeleteImage(1)}>
                <CancelRoundedIcon />
              </IconButton>
            )}
            <Box component="label">
              <img
                src={image?.photoMainName || placeholderImage}
                alt="placeholderImage"
                width="268px"
                height="268px"
              />
              {isEdit && (
                <input
                  name="photoMainName"
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(event) => handleFileUpload(event)}
                />
              )}
            </Box>
          </Box>
          <Box sx={{ position: 'relative' }}>
            {image?.photoOnceName && isEdit && (
              <IconButton
                aria-label="delete"
                sx={{ position: 'absolute' }}
                onClick={() => handleDeleteImage(2)}>
                <CancelRoundedIcon />
              </IconButton>
            )}
            <Box component="label">
              <img
                src={image?.photoOnceName || placeholderImage}
                alt="placeholderImage"
                width="268px"
                height="268px"
              />
              {isEdit && (
                <input
                  name="photoOnceName"
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(event) => handleFileUpload(event)}
                />
              )}
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: '6px' }}>
          <Box sx={{ position: 'relative' }}>
            {image?.photoSecondName && isEdit && (
              <IconButton
                aria-label="delete"
                sx={{ position: 'absolute' }}
                onClick={() => handleDeleteImage(3)}>
                <CancelRoundedIcon />
              </IconButton>
            )}
            <Box component="label">
              <img
                src={image?.photoSecondName || placeholderImage}
                alt="placeholderImage"
                width="268px"
                height="268px"
              />
              {isEdit && (
                <input
                  name="photoSecondName"
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(event) => handleFileUpload(event)}
                />
              )}
            </Box>
          </Box>
          <Box sx={{ position: 'relative' }}>
            {image?.photoThirdName && isEdit && (
              <IconButton
                aria-label="delete"
                sx={{ position: 'absolute' }}
                onClick={() => handleDeleteImage(4)}>
                <CancelRoundedIcon />
              </IconButton>
            )}
            <Box component="label">
              <img
                src={image?.photoThirdName || placeholderImage}
                alt="placeholderImage"
                width="268px"
                height="268px"
              />
              {isEdit && (
                <input
                  name="photoThirdName"
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(event) => handleFileUpload(event)}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ImageUpload
