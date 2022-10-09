import yup from "@/utils/yupValidation"

const schema = yup.object().shape({
  name: yup.string().required('Vui lòng điền vào trường này.'),
  category: yup.string().required('Vui lòng điền vào trường này.'),
  supplier: yup.string().required('Vui lòng điền vào trường này.'),
  quantity: yup.string().required('Vui lòng điền vào trường này.'),
  price: yup.string().required('Vui lòng điền vào trường này.'),
  description: yup.string().required('Vui lòng điền vào trường này.')
})
export default schema
