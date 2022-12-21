import placeholderImage from '@/assets/image/placeholderImage.png'
import { Button, IconButton} from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'

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

    useEffect(() => {
        onSubmit && onSubmit(imageFile)
    }, [imageFile, image])

    useEffect(() => {
        if (selectedData) {
            setImage({
                photoMainName: selectedData?.imageUrl,
            })
            console.log(image)
        }
    }, [])

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', px: 3 }}>
                {/* <Box sx={{ position: 'relative' }}>
                    {image?.photoMainName && isEdit && (
                    <IconButton
                        aria-label="delete"
                        sx={{ position: 'absolute' }}
                        onClick={() => handleDeleteImage(1)}>
                        <CancelRoundedIcon />
                    </IconButton>
                    )} */}
                <img
                    src={image?.photoMainName || placeholderImage}
                    alt="placeholderImage"
                    width="100%"
                />
                {/* </Box> */}
                <Button variant="contained" component="label" sx={{ mt: 2 }}>
                    Chọn ảnh
                    {isEdit && (
                        <input
                            hidden
                            name="photoMainName"
                            accept="image/*"
                            type="file"
                            onChange={(event) => handleFileUpload(event)}
                        />
                    )}
                </Button>
            </Box>
        </>
    )
}

export default ImageUpload
