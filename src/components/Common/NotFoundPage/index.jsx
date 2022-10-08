import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  let navigate = useNavigate()
  return (
    <>
      <h1>Không tìm thấy nội dung !</h1>
      <Button variant='contained' onClick={() => navigate(-1)}>Quay lại</Button>
    </>
  )
}
