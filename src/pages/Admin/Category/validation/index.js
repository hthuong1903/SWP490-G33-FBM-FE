import yup from '@/utils/yupValidation'

const schema = yup.object().shape({
  name: yup.string().required('Vui lòng điền vào trường này.').trim(),
  description: yup.string().required('Vui lòng điền vào trường này.').trim(),
})
export default schema
